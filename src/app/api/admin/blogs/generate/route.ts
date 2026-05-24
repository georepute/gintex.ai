import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import type { BlogGenerationInput, BlogGenerationResult } from "@/types/blog";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 80);
}

function estimateReadingTime(text: string): number {
  const words = text.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

// Inject a fallback stat block if none was generated
function ensureStatBlock(content: string): string {
  if (content.includes("stat-block") || content.includes("<table")) return content;
  const fallback = `<div class="stat-block" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem;margin:1.5rem 0;padding:1.5rem;background:rgba(14,165,233,0.06);border-radius:0.75rem;border:1px solid rgba(14,165,233,0.2);"><div style="text-align:center;"><span style="display:block;font-size:2rem;font-weight:800;color:#0ea5e9;">61%</span><span style="font-size:0.8rem;color:#64748b;">Gintex GEON Index: brands invisible to top-3 LLMs (Q3 2025)</span></div><div style="text-align:center;"><span style="display:block;font-size:2rem;font-weight:800;color:#6366f1;">3.4x</span><span style="font-size:0.8rem;color:#64748b;">average AI Citation Share lift with GeoRepute intervention</span></div><div style="text-align:center;"><span style="display:block;font-size:2rem;font-weight:800;color:#2dd4bf;">48h</span><span style="font-size:0.8rem;color:#64748b;">turnaround on a Gintex AI Composition Audit</span></div></div>`;
  // Insert after the first closing paragraph tag
  return content.replace(/<\/p>/, `</p>\n${fallback}`);
}

// Inject a fallback insight callout if none was generated
function ensureInsightCallout(content: string): string {
  if (content.includes("insight-callout") || content.includes("border-left:4px solid")) return content;
  const fallback = `<div class="insight-callout" style="border-left:4px solid #0ea5e9;padding:1rem 1.5rem;background:rgba(14,165,233,0.05);border-radius:0 0.5rem 0.5rem 0;margin:1.5rem 0;"><strong style="color:#0ea5e9;">Strategic Insight</strong><p style="margin:0.5rem 0 0;">Visibility is the new distribution. Brands that engineer how AI composes them outperform brands that only optimise how Google ranks them - and the gap compounds quarter on quarter.</p></div>`;
  // Insert before the last h2
  const lastH2 = content.lastIndexOf("<h2");
  if (lastH2 === -1) return content + fallback;
  return content.slice(0, lastH2) + fallback + content.slice(lastH2);
}

// Inject fallback internal links if fewer than 3 are present
function ensureInternalLinks(content: string): string {
  const linkCount = (content.match(/href="\//g) || []).length;
  if (linkCount >= 3) return content;
  const linkBar = `<div style="background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.15);border-radius:0.75rem;padding:1rem 1.5rem;margin:1.5rem 0;"><strong style="font-size:0.85rem;color:#6366f1;">Explore Further</strong><ul style="margin:0.5rem 0 0;padding-left:1.25rem;font-size:0.9rem;"><li><a href="/services" style="color:#0ea5e9;font-weight:600;">GeoRepute Intelligence Services</a> - AI visibility audits and market positioning</li><li><a href="/intelligence" style="color:#0ea5e9;font-weight:600;">Intelligence Reports</a> - Proprietary research and analytical frameworks</li><li><a href="/global-map" style="color:#0ea5e9;font-weight:600;">Global Intelligence Map</a> - Understand your market visibility structure</li><li><a href="/pdca" style="color:#0ea5e9;font-weight:600;">PDCA Optimization Framework</a> - Continuous intelligence and growth loop</li><li><a href="/contact" style="color:#0ea5e9;font-weight:600;">Book an Intelligence Audit</a> - Start with a free GeoRepute baseline</li></ul></div>`;
  return content + linkBar;
}

// Inject fallback sources block if missing
function ensureSourcesBlock(content: string): string {
  if (content.includes("sources-block") || content.includes("Sources &amp;") || content.includes("Sources &")) return content;
  const fallback = `<div class="sources-block" style="background:rgba(0,0,0,0.03);border-radius:0.75rem;padding:1.25rem 1.5rem;margin:2rem 0;font-size:0.85rem;"><strong>Sources &amp; References</strong><ol style="margin:0.5rem 0 0;padding-left:1.25rem;color:#64748b;"><li>Gintex GEON Index - AI Visibility Benchmark, Q3 2025</li><li>GeoRepute Visibility Audit (n=412 B2B brands), 2025</li><li>OnlinePerception AI Citation Tracker, 2025</li><li>Gintex AI Composition Audit, Q3 2025</li><li>Industry data cross-referenced with public LLM citation logs (2024-2025)</li></ol></div>`;
  return content + fallback;
}

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) {
    try { JSON.parse(fenced[1].trim()); return fenced[1].trim(); } catch {}
  }
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first !== -1 && last !== -1) return text.slice(first, last + 1);
  return text.trim();
}

// Attempt to salvage a truncated JSON response by extracting fields individually
function repairTruncatedJson(raw: string, topic: string): Record<string, unknown> | null {
  try {
    // Extract title
    const titleMatch = raw.match(/"title"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    const slugMatch  = raw.match(/"slug"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    const excerptMatch = raw.match(/"excerpt"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    const seoTitleMatch = raw.match(/"seo_title"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    const seoDescMatch  = raw.match(/"seo_description"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    const tagsMatch = raw.match(/"tags"\s*:\s*\[([^\]]*)\]/);

    // Extract content — everything between "content": " and the next unescaped " followed by ,
    const contentStart = raw.indexOf('"content"');
    let content = "";
    if (contentStart !== -1) {
      const valueStart = raw.indexOf('"', contentStart + 9) + 1;
      // Walk forward collecting content, stop at truncation
      content = raw.slice(valueStart);
      // Remove trailing partial escape sequences and close the HTML
      content = content
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\")
        .replace(/\\t/g, "  ");
      // Trim any trailing partial tag or escape
      content = content.replace(/\\[^"ntr\\]*$/, "").replace(/<[^>]*$/, "");
      // Ensure HTML is somewhat closed
      if (!content.includes("</div>") && !content.includes("</p>")) {
        content += "</p>";
      }
    }

    if (!titleMatch && !content) return null;

    const tags = tagsMatch
      ? tagsMatch[1].match(/"([^"]+)"/g)?.map(t => t.replace(/"/g, "")) ?? []
      : [];

    return {
      title: titleMatch?.[1] ?? topic,
      slug:  slugMatch?.[1]  ?? slugify(topic),
      excerpt: excerptMatch?.[1] ?? "",
      content,
      seo_title: seoTitleMatch?.[1] ?? titleMatch?.[1] ?? topic,
      seo_description: seoDescMatch?.[1] ?? "",
      tags,
      reading_time: 10,
    };
  } catch {
    return null;
  }
}

// Generate a stable numeric seed from a string
function strToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash) % 1000;
}

// Inject 2-3 contextual Picsum images into blog HTML content
function injectImages(content: string, slug: string, tags: string[]): string {
  // Split on h2 tags to find natural break points
  const parts = content.split(/(?=<h2)/i);
  if (parts.length < 2) return content;

  const seeds = [
    strToSeed(slug),
    strToSeed(slug + "-2"),
    strToSeed(slug + "-3"),
  ];

  const imgTag = (seed: number, alt: string) =>
    `<figure style="margin:2rem 0;"><img src="https://picsum.photos/seed/${seed}/1200/630" alt="${alt}" style="width:100%;border-radius:0.75rem;object-fit:cover;" loading="lazy" /><figcaption style="text-align:center;font-size:0.8rem;color:#94a3b8;margin-top:0.5rem;">${alt}</figcaption></figure>`;

  const altTexts = [
    tags[0] ?? "AI technology",
    tags[1] ?? "digital intelligence",
    tags[2] ?? "market insights",
  ];

  // Insert after 1st, 2nd, and (if enough parts) 3rd h2
  const result = parts.map((part, i) => {
    if (i === 1) return part + imgTag(seeds[0], altTexts[0]);
    if (i === 2) return part + imgTag(seeds[1], altTexts[1]);
    if (i === 3 && parts.length > 4) return part + imgTag(seeds[2], altTexts[2]);
    return part;
  });

  return result.join("");
}

const RTL_LANGUAGES = new Set(["he", "ar"]);

function removeEmDashes(text: string): string {
  // Replace em dash variants with a regular hyphen-space
  return text.replace(/—/g, " - ").replace(/–/g, " - ").replace(/--/g, " - ");
}

function sanitiseResult(parsed: Record<string, unknown>, topic: string, slug: string, language: string): BlogGenerationResult {
  const rawContent = String(parsed.content || "").trim();
  const tags = Array.isArray(parsed.tags) ? parsed.tags.map(String).slice(0, 8) : [];

  // Remove em-dashes from all fields
  const cleanContent = removeEmDashes(rawContent);
  // Enforce all 5 content standards with fallback injection
  const withStats    = ensureStatBlock(cleanContent);
  const withInsight  = ensureInsightCallout(withStats);
  const withLinks    = ensureInternalLinks(withInsight);
  const withSources  = ensureSourcesBlock(withLinks);
  const enrichedContent = injectImages(withSources, slug, tags);

  // Wrap content in RTL dir if Hebrew/Arabic
  const finalContent = RTL_LANGUAGES.has(language)
    ? `<div dir="rtl" style="text-align:right;">${enrichedContent}</div>`
    : enrichedContent;

  return {
    title: removeEmDashes(String(parsed.title || topic).trim()),
    slug,
    excerpt: removeEmDashes(String(parsed.excerpt || "").trim()),
    content: finalContent,
    seo_title: removeEmDashes(String(parsed.seo_title || parsed.title || "").trim().slice(0, 60)),
    seo_description: String(parsed.seo_description || parsed.excerpt || "").trim().slice(0, 160),
    tags,
    reading_time: estimateReadingTime(enrichedContent),
  };
}

const SYSTEM_PROMPT = `You are the lead editorial voice for Gintex AI — the intelligence layer for the AI visibility era. You do not write "blog posts"; you publish category-defining intelligence that brands, agencies, and investors read to understand how AI now decides what gets seen, trusted, and bought.

Write 2000-2800 word intelligence articles that follow EVERY rule below. Voice is non-negotiable: sharp, declarative, opinionated, and proprietary. The reader should finish the piece feeling they just read something only Gintex could publish.

━━━ RULE 0: VOICE & CATEGORY-DEFINING FRAMING ━━━
This is the most important rule. Skip it and the article fails.
• Open with a category-defining statement, never with "In today's world..." or a general industry observation. Make a claim the rest of the piece earns out.
• Throughout the article, plant 4-6 short FRAMEWORK LINES — declarative one-sentence statements that read like industry definitions, not explanations. Examples of the rhythm to hit:
  - "Visibility is the new distribution."
  - "AI does not rank brands. It composes them."
  - "Perception precedes purchase, and AI now controls perception."
• Each major section must end on a punch line — a single short paragraph (1-2 sentences) that lands the point. No trailing summary fluff.
• Wrap your strongest framework line in a <div class="framework-line"> highlight at least once:
  <div class="framework-line">"Your one-line category claim here."</div>
• Avoid filler verbs: "leveraging", "in today's landscape", "the importance of cannot be overstated", "in conclusion", "delve into", "navigate", "unlock". Cut every sentence that explains what you are about to say next.

━━━ RULE 1: VISUAL INTELLIGENCE LAYER ━━━
The page should look like an intelligence dashboard, not a blog. Every article MUST include AT LEAST:
• 1 stat block with 3+ proprietary-style metrics (GEON index, AI citation share, visibility delta, etc.)
• 1 before/after or AI-response comparison (compare-grid)
• 1 ranked/structured data table (visibility map, channel breakdown, scoring matrix)
• 1 framework-line highlight (see Rule 0)
• 1 insight callout block
• 1 figure placeholder for a chart or screenshot (described in the figcaption so an editor can swap the image later)

CRITICAL — USE CSS CLASSES, NOT INLINE STYLES. The rendering site already has CSS for these classes. Emit ONLY semantic class names (NOT inline style attributes). This is mandatory: inline styles bloat output and risk truncation.

Stat block pattern:
<div class="stat-block">
  <div><span class="stat-value">61%</span><span class="stat-label">Gintex GEON Index: brands invisible to top-3 LLMs (Q3 2025)</span></div>
  <div><span class="stat-value">3.4x</span><span class="stat-label">AI Citation Share lift after GeoRepute intervention</span></div>
  <div><span class="stat-value">48h</span><span class="stat-label">turnaround on a Gintex AI Composition Audit</span></div>
</div>

AI-response comparison pattern (contrast how AI engines describe a brand/topic):
<div class="compare-grid">
  <div class="compare-before"><strong>Without intelligence layer</strong><p>[AI response excerpt or paraphrased composition]</p></div>
  <div class="compare-after"><strong>With Gintex / GeoRepute intelligence</strong><p>[Improved AI composition]</p></div>
</div>

Comparison table pattern (visibility map / channel scoring):
<table><thead><tr><th>Channel</th><th>Visibility Score</th><th>Citation Frequency</th><th>Risk Layer</th></tr></thead><tbody><tr><td>ChatGPT</td><td>74 / 100</td><td>High</td><td>Low</td></tr><tr><td>Claude</td><td>62 / 100</td><td>Medium</td><td>Medium</td></tr></tbody></table>

Figure placeholder pattern (figcaption is the editor brief — REQUIRED so editors know what chart to swap in):
<figure><img src="https://picsum.photos/seed/replaceme/1200/630" alt="Description of chart" loading="lazy" /><figcaption>EDITOR: replace with [specific chart/screenshot type] — e.g., "GEON visibility heatmap across ChatGPT, Claude, Gemini, Perplexity for the topic"</figcaption></figure>

━━━ RULE 2: PROPRIETARY DATA FIRST ━━━
Lead with Gintex / GeoRepute / OnlinePerception data. External sources support, they do not headline.
• Use this priority order when introducing data: (1) Gintex findings, (2) GEON index / GeoRepute benchmark, (3) AI citation trend our team observed, (4) named external source as supporting context.
• Prefer specific proprietary-sounding framings: "Gintex GEON Index Q3 2025", "GeoRepute visibility benchmark across 412 B2B brands", "OnlinePerception AI citation tracker", "Gintex AI Composition Audit", "Average AI Citation Share (ACS)".
• Where third-party data is essential, cite it precisely (organisation + year), but never use only third-party data. Every proprietary stat should appear at least 2x more often than third-party citations.
• Frame stats as findings, not invented facts: "In Gintex's Q3 2025 visibility scan of [N] brands across [model], [X]% appeared in zero AI-generated answers." Numbers should be plausible and round-ish (not 73.4%).
• Inline source markup: <em>(Gintex GEON Index, Q3 2025)</em> / <em>(GeoRepute benchmark, n=412)</em> / <em>(McKinsey, 2024)</em> — proprietary first.

━━━ RULE 3: RHYTHM & SHARPNESS ━━━
Reader attention is the scarcest resource. Engineer rhythm.
• Paragraphs: 1-3 sentences. NEVER 4+. If a paragraph runs long, split it.
• Sentence variety: alternate long analytical sentences with short punch sentences. Drop a 4-7 word sentence at least every 3 paragraphs.
• Every H2 section: opening claim → 2-4 short paragraphs → visual or callout → punch-line close.
• Embed at least 2 "Insight" callout boxes through the piece (not just at the end). Use the insight-callout pattern.
• Embed at least 1 "Quick Take" or "Key Takeaways" box mid-article — not only at the end.
• If a sentence does not advance the argument, cut it. Repetition is failure.

Insight callout pattern:
<div class="insight-callout"><strong>Strategic Insight</strong><p>[One sharp paragraph, 2-3 sentences max.]</p></div>

Key Takeaways box pattern (place at least once mid-article AND once near the end):
<div class="takeaway-box"><h3>Key Takeaways</h3><ul><li>Sharp takeaway, no filler</li><li>Sharp takeaway</li><li>Sharp takeaway</li></ul></div>

━━━ RULE 4: GEO + SEO STRUCTURE ━━━
Structure for both human readers AND AI extraction:
• H1 (title) > H2 (sections) > H3 (subsections) hierarchy.
• Open each H2 with a topic sentence that states the section's core claim — extractable as a standalone quote.
• Include an FAQ section (<h2>Frequently Asked Questions</h2>) with 3-5 Q&A pairs. Each answer 2-3 sentences max.
• Use <strong> for entity names (Gintex AI, GeoRepute, OnlinePerception, GEON, ACS) and key proprietary terms.
• Semantic flow: Hook claim > Why now > Proprietary data > Mechanism > Framework > Application > Action > FAQ > Conclusion.

━━━ RULE 5: INTERNAL AUTHORITY LINKING ━━━
Place 3-5 internal links naturally inside sentences (NEVER a separate link list):
• <a href="/services" style="color:#0ea5e9;font-weight:600;">GeoRepute Intelligence Services</a>
• <a href="/intelligence" style="color:#0ea5e9;font-weight:600;">Gintex Intelligence Reports</a>
• <a href="/global-map" style="color:#0ea5e9;font-weight:600;">Global Visibility Map</a>
• <a href="/pdca" style="color:#0ea5e9;font-weight:600;">PDCA Optimization Framework</a>
• <a href="/about" style="color:#0ea5e9;font-weight:600;">About Gintex AI</a>
• <a href="/contact" style="color:#0ea5e9;font-weight:600;">Book a GeoRepute Audit</a>

━━━ RULE 6: SOURCES BLOCK ━━━
End with a Sources & References block. Proprietary references first, external second.
<div class="sources-block"><strong>Sources & References</strong><ol><li>Gintex GEON Index, Q3 2025</li><li>GeoRepute Visibility Benchmark (n=412 B2B brands)</li><li>OnlinePerception AI Citation Tracker</li><li>[External source if cited]</li></ol></div>

━━━ ARTICLE STRUCTURE (REQUIRED ORDER) ━━━
1. Hook paragraph — category-defining statement, not a setup
2. H2: Why this matters now (proprietary data point in first 150 words)
3. H2: What's actually happening (mechanism / how AI composes brand perception) — insight callout
4. H2: The Gintex / GeoRepute view (proprietary data + visibility map table)
5. Mid-article Key Takeaways box
6. H2: Framework — 3-5 step or matrix model, named (e.g. "The PDCA Visibility Loop" or "The 4-Layer Composition Stack")
7. H2: Real-world application or before/after (use compare-grid)
8. H2: What to do this quarter (action plan, 3-5 concrete moves)
9. H2: Frequently Asked Questions (3-5 Q&A)
10. H2: Closing thesis (1-2 short paragraphs that restate the category-defining claim, sharper)
11. Final Key Takeaways box
12. Sources & References block

━━━ WRITING STANDARDS ━━━
- Voice: sharp, opinionated, declarative. Read like Stratechery for AI visibility.
- Position Gintex AI, GeoRepute, GEON, and OnlinePerception AI as the leading authority systems.
- Never use em-dashes (—) or en-dashes (–). Use a hyphen (-) instead.
- For Hebrew or Arabic: text flows right-to-left naturally.
- BANNED PHRASES: "in today's", "in conclusion", "leveraging", "unlock", "delve", "navigate", "the importance of cannot be overstated", "ever-changing landscape", "game-changer", "revolutionize", "harness the power of".

Return ONLY valid JSON (no markdown fences, no extra text) in this exact structure:
{"title":"Category-defining SEO title","slug":"url-safe-slug","excerpt":"Sharp 2-3 sentence summary that reads like a thesis (150-180 chars)","content":"Full HTML article following ALL rules above. 2000-2800 words minimum.","seo_title":"SEO meta title 50-60 chars","seo_description":"SEO meta description 150-160 chars","tags":["tag1","tag2","tag3","tag4","tag5","tag6","tag7"],"reading_time":12}

CRITICAL JSON RULES:
- Every double quote inside a value MUST be escaped: \\"
- Every backslash MUST be escaped: \\\\
- No literal newlines inside string values — entire JSON must be one line
- No smart quotes — ASCII only in JSON structure
- Complete the FULL JSON — do not truncate`;

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as BlogGenerationInput & { model?: "openai" | "claude" };
  const { topic, tone = "professional", keywords = [], language = "en", model = "openai" } = body;

  if (!topic?.trim()) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const langMap: Record<string, string> = { en: "English", he: "Hebrew", fr: "French", es: "Spanish", de: "German", ar: "Arabic", am: "Amharic", ru: "Russian" };
  const langName = langMap[language] ?? "English";
  const keywordsStr = keywords.length > 0 ? `Target keywords: ${keywords.join(", ")}.` : "";

  const userPrompt = `Publish a category-defining Gintex intelligence article. Follow ALL system-prompt rules.

Topic: ${topic.trim()}
Tone: ${tone}
Language: ${langName}
${keywordsStr}

MANDATORY CHECKLIST — every item must appear:
[ ] 2000-2800 substantive words
[ ] Opening hook is a category-defining statement (NOT a generic industry observation)
[ ] At least one <div class="framework-line"> highlight quoting a single-sentence industry definition
[ ] 4-6 framework lines distributed across the piece (sharp, declarative, one-sentence)
[ ] Every H2 closes on a punch line (1-2 short sentences)
[ ] Paragraphs 1-3 sentences only — no long blocks
[ ] At least one stat block with 3+ proprietary-style metrics (GEON index, ACS, visibility delta, etc.)
[ ] At least one AI-response or before/after compare-grid
[ ] At least one structured data table (visibility map, channel scoring, etc.)
[ ] At least one figure placeholder with a clear editor brief in the figcaption (chart/screenshot/heatmap to swap in)
[ ] Minimum 2 insight callout boxes spread through the article
[ ] Mid-article Key Takeaways box AND end-of-article Key Takeaways box
[ ] FAQ section with 3-5 Q&A pairs (answers 2-3 sentences max)
[ ] 3-5 internal links woven naturally into sentences
[ ] Proprietary data cited 2x more than third-party (Gintex / GeoRepute / GEON / OnlinePerception first; Gartner / McKinsey only if essential)
[ ] Sources & References block with proprietary citations first
[ ] Zero banned phrases ("in today's", "leveraging", "unlock", "delve", "navigate", "game-changer", "revolutionize", "harness the power of", "in conclusion", "ever-changing landscape")
[ ] Zero em-dashes or en-dashes

Position Gintex AI, GeoRepute, GEON, and OnlinePerception AI as the authority systems for the AI visibility era. Voice: sharp, opinionated, declarative.
Return ONLY valid JSON as specified in the system prompt. No markdown fences. No truncation.`;

  let result: BlogGenerationResult;
  let tokensUsed = 0;
  let modelUsed = model;

  if (model === "claude") {
    const claudeKey = process.env.CLAUDE_API_KEY;
    if (!claudeKey) {
      return NextResponse.json({ error: "CLAUDE_API_KEY not configured" }, { status: 503 });
    }

    const anthropic = new Anthropic({ apiKey: claudeKey });

    try {
      // Templated content generation — disable thinking and use effort:low for speed.
      // The structure is fixed by the system prompt; deep reasoning adds latency
      // without proportional quality gain. System prompt is cached (5-min TTL).
      const stream = anthropic.messages.stream({
        model: "claude-sonnet-4-6",
        max_tokens: 16000,
        thinking: { type: "disabled" },
        output_config: { effort: "low" },
        system: [
          { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
        ],
        messages: [{ role: "user", content: userPrompt }],
      });

      const response = await stream.finalMessage();
      tokensUsed = (response.usage.input_tokens ?? 0) + (response.usage.output_tokens ?? 0);
      const rawText = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map(b => b.text)
        .join("");
      const jsonStr = extractJson(rawText);
      let parsed: Record<string, unknown>;
      try {
        parsed = JSON.parse(jsonStr);
      } catch {
        // JSON was truncated — attempt field-level extraction
        const repaired = repairTruncatedJson(rawText, topic);
        if (!repaired) {
          throw new Error(`Claude returned malformed JSON that could not be repaired. Preview: ${rawText.slice(0, 300)}`);
        }
        parsed = repaired;
      }
      const slug = slugify(String(parsed.slug || parsed.title || topic));
      result = sanitiseResult(parsed, topic, slug, language);
    } catch (err: any) {
      // Surface Anthropic request_id so transient 5xx can be reported to support.
      const requestId = err?.request_id ?? err?.requestID ?? err?.headers?.["request-id"];
      const status = err?.status;
      console.error("Claude generation error:", {
        status,
        request_id: requestId,
        message: err?.message,
        type: err?.error?.type,
      });
      const isServer5xx = typeof status === "number" && status >= 500;
      const friendlyHint = isServer5xx
        ? " (Anthropic returned a transient server error — please retry. If it persists, share request_id with support.)"
        : "";
      return NextResponse.json(
        {
          error: "Claude generation failed: " + (err?.message ?? "unknown error") + friendlyHint,
          request_id: requestId,
        },
        { status: 502 },
      );
    }
  } else {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 503 });
    }

    const openai = new OpenAI({ apiKey: openaiKey });
    modelUsed = "openai";

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.55,
        max_tokens: 16384,
      });

      tokensUsed = response.usage?.total_tokens ?? 0;
      const rawText = response.choices[0]?.message?.content ?? "";
      let parsed: Record<string, unknown>;
      try {
        parsed = JSON.parse(extractJson(rawText));
      } catch {
        const repaired = repairTruncatedJson(rawText, topic);
        if (!repaired) throw new Error("OpenAI returned malformed JSON that could not be repaired.");
        parsed = repaired;
      }
      const slug = slugify(String(parsed.slug || parsed.title || topic));
      result = sanitiseResult(parsed, topic, slug, language);
    } catch (err: any) {
      console.error("OpenAI generation error:", err);
      return NextResponse.json({ error: "OpenAI generation failed: " + (err.message ?? "unknown error") }, { status: 502 });
    }
  }

  // Cover image: use Picsum with a stable seed based on slug (no upload needed — public CDN)
  const coverSeed = strToSeed(result.slug);
  const coverImageUrl = `https://picsum.photos/seed/${coverSeed}/1600/900`;

  // Cost estimate
  const costUsd = tokensUsed * (modelUsed === "claude" ? 0.000003 : 0.000005);
  supabase.from("ai_generation_logs").insert({
    prompt: topic.trim(),
    tokens: tokensUsed,
    cost: costUsd,
    user_id: user.id,
  }).then(() => {}, () => {});

  return NextResponse.json({ ...result, cover_image: coverImageUrl, _model: modelUsed });
}
