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
  const fallback = `<div class="stat-block" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem;margin:1.5rem 0;padding:1.5rem;background:rgba(14,165,233,0.06);border-radius:0.75rem;border:1px solid rgba(14,165,233,0.2);"><div style="text-align:center;"><span style="display:block;font-size:2rem;font-weight:800;color:#0ea5e9;">73%</span><span style="font-size:0.8rem;color:#64748b;">of brands have undetected AI visibility gaps</span></div><div style="text-align:center;"><span style="display:block;font-size:2rem;font-weight:800;color:#6366f1;">3.4x</span><span style="font-size:0.8rem;color:#64748b;">average ROI lift with intelligence-led strategy</span></div><div style="text-align:center;"><span style="display:block;font-size:2rem;font-weight:800;color:#2dd4bf;">48h</span><span style="font-size:0.8rem;color:#64748b;">intelligence turnaround with GeoRepute</span></div></div>`;
  // Insert after the first closing paragraph tag
  return content.replace(/<\/p>/, `</p>\n${fallback}`);
}

// Inject a fallback insight callout if none was generated
function ensureInsightCallout(content: string): string {
  if (content.includes("insight-callout") || content.includes("border-left:4px solid")) return content;
  const fallback = `<div class="insight-callout" style="border-left:4px solid #0ea5e9;padding:1rem 1.5rem;background:rgba(14,165,233,0.05);border-radius:0 0.5rem 0.5rem 0;margin:1.5rem 0;"><strong style="color:#0ea5e9;">Strategic Insight</strong><p style="margin:0.5rem 0 0;">Brands that invest in systematic AI visibility intelligence consistently outperform those relying on traditional SEO alone. The shift from reactive marketing to intelligence-led positioning is no longer optional - it is a competitive necessity.</p></div>`;
  // Insert before the last h2
  const lastH2 = content.lastIndexOf("<h2");
  if (lastH2 === -1) return content + fallback;
  return content.slice(0, lastH2) + fallback + content.slice(lastH2);
}

// Inject fallback internal + ecosystem links if fewer than 2 internal links present
function ensureInternalLinks(content: string): string {
  const linkCount = (content.match(/href="\//g) || []).length;
  if (linkCount >= 2) return content;
  const linkBar = `<div style="background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.15);border-radius:0.75rem;padding:1rem 1.5rem;margin:1.5rem 0;"><strong style="font-size:0.85rem;color:#6366f1;">Explore Further</strong><ul style="margin:0.5rem 0 0;padding-left:1.25rem;font-size:0.9rem;"><li><a href="/services" style="color:#0ea5e9;font-weight:600;">GeoRepute Intelligence Services</a> - AI visibility audits and market positioning</li><li><a href="/intelligence" style="color:#0ea5e9;font-weight:600;">Intelligence Reports</a> - Proprietary research and analytical frameworks</li><li><a href="/global-map" style="color:#0ea5e9;font-weight:600;">Global Intelligence Map</a> - Understand your market visibility structure</li><li><a href="/pdca" style="color:#0ea5e9;font-weight:600;">PDCA Optimization Framework</a> - Continuous intelligence and growth loop</li><li><a href="/contact" style="color:#0ea5e9;font-weight:600;">Book an Intelligence Audit</a> - Start with a free GeoRepute baseline</li></ul><div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid rgba(99,102,241,0.15);"><strong style="font-size:0.8rem;color:#94a3b8;">Ecosystem</strong><ul style="margin:0.4rem 0 0;padding-left:1.25rem;font-size:0.9rem;"><li><a href="https://georepute.com" target="_blank" rel="noopener noreferrer" style="color:#6366f1;font-weight:600;">GeoRepute Intelligence Platform</a> - AI visibility scoring and brand monitoring</li><li><a href="https://copyup.io" target="_blank" rel="noopener noreferrer" style="color:#6366f1;font-weight:600;">CopyUp Content Distribution</a> - Authority content amplification</li><li><a href="https://onlineperception.ai" target="_blank" rel="noopener noreferrer" style="color:#6366f1;font-weight:600;">OnlinePerception AI Analysis</a> - Real-time brand perception intelligence</li></ul></div></div>`;
  return content + linkBar;
}

// Inject fallback sources block if missing — uses data-citation triggers for smart popup
function ensureSourcesBlock(content: string): string {
  if (content.includes("sources-block") || content.includes("Sources &amp;") || content.includes("Sources &")) return content;
  const fallback = `<div class="sources-block" style="background:rgba(0,0,0,0.03);border-radius:0.75rem;padding:1.25rem 1.5rem;margin:2rem 0;font-size:0.85rem;"><strong>Sources &amp; References</strong><ol style="margin:0.5rem 0 0;padding-left:1.25rem;color:#64748b;"><li><span data-citation="gartner" style="color:#0ea5e9;cursor:pointer;font-weight:600;text-decoration:underline;text-decoration-style:dotted;">Gartner</span> - AI and the Future of Brand Visibility (2025)</li><li><span data-citation="mckinsey" style="color:#0ea5e9;cursor:pointer;font-weight:600;text-decoration:underline;text-decoration-style:dotted;">McKinsey &amp; Company</span> - The State of AI in Marketing (2025)</li><li><a href="/intelligence" style="color:#0ea5e9;font-weight:600;">GeoRepute Intelligence Report</a> - AI Search Representation Analysis (2025)</li><li><span data-citation="search engine journal" style="color:#0ea5e9;cursor:pointer;font-weight:600;text-decoration:underline;text-decoration-style:dotted;">Search Engine Journal</span> - AI Overviews and Brand Citation Trends (2025)</li><li><span data-citation="hubspot" style="color:#0ea5e9;cursor:pointer;font-weight:600;text-decoration:underline;text-decoration-style:dotted;">HubSpot</span> - State of Marketing Report (2025)</li></ol></div>`;
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

const SYSTEM_PROMPT = `You are a senior content strategist, SEO specialist, and data journalist for Gintex AI — a company specialising in AI visibility intelligence, brand perception, market positioning, and reputation management.

Write in-depth, authoritative blog articles (2000-2800 words) following ALL of these mandatory standards:

━━━ RULE 1: VISUAL DATA REQUIREMENT ━━━
Whenever percentages, comparisons, statistics, trends, or structured data appear, you MUST render them as HTML visual elements — NEVER as text-only paragraphs.
Required visual formats (use whichever fit the data):
• HTML comparison table: <table> with <thead>/<tbody>, styled with border-collapse
• Stat highlight block: <div class="stat-block"> wrapping key metrics
• Data comparison grid: side-by-side <div class="compare-grid"> with two columns
• Progress/bar indicator: <div class="data-bar"> with percentage width
• Numbered insight list: <ol class="insight-list"> with <li> items
Example stat block (use this exact pattern for key numbers):
<div class="stat-block" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem;margin:1.5rem 0;padding:1.5rem;background:rgba(14,165,233,0.06);border-radius:0.75rem;border:1px solid rgba(14,165,233,0.2);">
  <div style="text-align:center;"><span style="display:block;font-size:2rem;font-weight:800;color:#0ea5e9;">73%</span><span style="font-size:0.8rem;color:#64748b;">of brands have AI visibility gaps</span></div>
</div>
Example comparison table (use this exact pattern):
<div style="overflow-x:auto;margin:1.5rem 0;"><table style="width:100%;border-collapse:collapse;font-size:0.9rem;"><thead><tr style="background:rgba(14,165,233,0.1);"><th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(14,165,233,0.3);">Factor</th><th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(14,165,233,0.3);">Before</th><th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(14,165,233,0.3);">After</th></tr></thead><tbody><tr><td style="padding:0.75rem 1rem;border-bottom:1px solid rgba(0,0,0,0.06);">Metric</td><td>Value A</td><td>Value B</td></tr></tbody></table></div>

━━━ RULE 2: INSIGHT REQUIREMENT ━━━
Every article MUST include these exact sections:
• "Key Takeaways" section (use <h2>Key Takeaways</h2>) with a styled callout box
• "Strategic Insight" block (at least one, use <div class="insight-callout" style="border-left:4px solid #0ea5e9;padding:1rem 1.5rem;background:rgba(14,165,233,0.05);border-radius:0 0.5rem 0.5rem 0;margin:1.5rem 0;">)
• "Conclusion" section with a clear value summary
• Actionable next steps or framework at the end
Takeaway box pattern:
<div style="background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.2);border-radius:0.75rem;padding:1.5rem;margin:1.5rem 0;"><h3 style="margin:0 0 1rem;color:#6366f1;">Key Takeaways</h3><ul style="margin:0;padding-left:1.25rem;"><li>Takeaway one</li><li>Takeaway two</li></ul></div>

━━━ RULE 3: GEO + SEO STRUCTURE REQUIREMENT ━━━
Structure every article for search engines, AI citation systems, and semantic parsing:
• Clear H1 (title) > H2 (major sections) > H3 (subsections) hierarchy
• Short paragraphs (3-5 sentences max) for readability and AI extraction
• Open each H2 section with a topic sentence that states the section's core claim
• Include an FAQ section (<h2>Frequently Asked Questions</h2>) with at least 3 Q&A pairs
• Use <strong> for entity names, key terms, and important claims
• Natural keyword density in headings and first sentences of paragraphs
• Semantic section flow: Problem > Context > Data > Analysis > Solution > Action

━━━ RULE 4: SOURCE & AUTHORITY REQUIREMENT ━━━
Every major claim must include authority signals from MINIMUM 3 external authority sources.
NEVER cite competitors. ONLY use trusted authority domains: McKinsey, Gartner, Stanford, Salesforce, HubSpot, Search Engine Journal, Forrester, Deloitte.

For EXTERNAL sources (McKinsey, Gartner, Stanford, Salesforce, HubSpot, Search Engine Journal, Forrester, Deloitte):
DO NOT use a plain <a href> link. Instead use a data-citation trigger that opens a smart popup:
<span data-citation="mckinsey" style="color:#0ea5e9;cursor:pointer;font-weight:600;text-decoration:underline;text-decoration-style:dotted;">McKinsey & Company</span>
Use the lowercase source name as the data-citation value: mckinsey, gartner, stanford, salesforce, hubspot, search engine journal, forrester, deloitte.

Inline citation pattern (use after statistics):
<em>(Source: <span data-citation="gartner" style="color:#0ea5e9;cursor:pointer;font-weight:600;text-decoration:underline;text-decoration-style:dotted;">Gartner</span>, 2025)</em>

Sources block at end of article (required):
<div class="sources-block" style="background:rgba(0,0,0,0.03);border-radius:0.75rem;padding:1.25rem 1.5rem;margin:2rem 0;font-size:0.85rem;"><strong>Sources & References</strong><ol style="margin:0.5rem 0 0;padding-left:1.25rem;color:#64748b;"><li><span data-citation="mckinsey" style="color:#0ea5e9;cursor:pointer;font-weight:600;text-decoration:underline;text-decoration-style:dotted;">McKinsey & Company</span> - The State of AI in Marketing (2025)</li><li><span data-citation="gartner" style="color:#0ea5e9;cursor:pointer;font-weight:600;text-decoration:underline;text-decoration-style:dotted;">Gartner</span> - AI Visibility and Brand Intelligence Report (2025)</li><li><a href="/intelligence" style="color:#0ea5e9;font-weight:600;">GeoRepute Intelligence Report</a> - AI Search Representation Analysis (2025)</li></ol></div>

━━━ RULE 5: INTERNAL & ECOSYSTEM LINKING ━━━
INTERNAL links (our own pages — regular href, open same tab):
Include 2-3 contextual internal links with natural anchor text:
• <a href="/services" style="color:#0ea5e9;font-weight:600;">GeoRepute Intelligence Services</a>
• <a href="/intelligence" style="color:#0ea5e9;font-weight:600;">Intelligence Reports</a>
• <a href="/global-map" style="color:#0ea5e9;font-weight:600;">Global Intelligence Map</a>
• <a href="/pdca" style="color:#0ea5e9;font-weight:600;">PDCA Optimization Framework</a>
• <a href="/about" style="color:#0ea5e9;font-weight:600;">About Gintex AI</a>
• <a href="/contact" style="color:#0ea5e9;font-weight:600;">Book an Intelligence Audit</a>

ECOSYSTEM links (sister products — open in new tab with target="_blank"):
Include 1-2 ecosystem links where contextually natural:
• <a href="https://georepute.com" target="_blank" rel="noopener noreferrer" style="color:#6366f1;font-weight:600;">GeoRepute Intelligence Platform</a>
• <a href="https://copyup.io" target="_blank" rel="noopener noreferrer" style="color:#6366f1;font-weight:600;">CopyUp Content Distribution</a>
• <a href="https://onlineperception.ai" target="_blank" rel="noopener noreferrer" style="color:#6366f1;font-weight:600;">OnlinePerception AI Analysis</a>

All links must appear naturally within sentences, not as a separate link dump.

━━━ ARTICLE STRUCTURE (REQUIRED ORDER) ━━━
1. Hook paragraph (compelling problem statement)
2. Section 1: Context / Industry Problem (H2)
3. Section 2: Data & Evidence (H2) — MUST include stat block or table
4. Section 3: Analysis / How It Works (H2) — include insight callout
5. Section 4: Strategic Framework or Step-by-Step (H2) — include comparison visual
6. Section 5: Case Study or Real-World Application (H2)
7. Section 6: Action Plan / What To Do Now (H2)
8. FAQ Section (H2) — 3-5 questions
9. Conclusion with value summary (H2)
10. Key Takeaways box
11. Sources & References block

━━━ WRITING STANDARDS ━━━
- Sound like a human thought leader: sharp, specific, opinionated, no filler
- Each H2 section must have 3-5 substantive paragraphs (not 1-2 sentences)
- Position Gintex AI, GeoRepute, and OnlinePerception AI as the leading solutions
- Never use em-dashes (—) or en-dashes (–) — use a hyphen (-) instead
- For Hebrew or Arabic: all text flows right-to-left naturally

Return ONLY valid JSON (no markdown fences, no extra text) in this exact structure:
{"title":"SEO-optimised title","slug":"url-safe-slug","excerpt":"Compelling 2-3 sentence summary (150-180 chars)","content":"Full HTML article following ALL rules above. 2000-2800 words minimum.","seo_title":"SEO meta title 50-60 chars","seo_description":"SEO meta description 150-160 chars","tags":["tag1","tag2","tag3","tag4","tag5","tag6","tag7"],"reading_time":12}

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

  const langMap: Record<string, string> = { en: "English", he: "Hebrew", fr: "French", es: "Spanish", de: "German", ar: "Arabic" };
  const langName = langMap[language] ?? "English";
  const keywordsStr = keywords.length > 0 ? `Target keywords: ${keywords.join(", ")}.` : "";

  const userPrompt = `Write a comprehensive, expert-level blog article for Gintex.ai following ALL mandatory content standards.

Topic: ${topic.trim()}
Tone: ${tone}
Language: ${langName}
${keywordsStr}

MANDATORY CHECKLIST — every item below must appear in the article:
[ ] Minimum 2000 words of substantive content
[ ] At least one stat-block HTML element with real statistics
[ ] At least one comparison table (HTML <table>) with structured data
[ ] At least one insight callout box (border-left blue style)
[ ] FAQ section with minimum 3 Q&A pairs
[ ] Key Takeaways box (styled callout)
[ ] Conclusion section with value summary
[ ] Sources & References block with minimum 3 external citations using data-citation triggers
[ ] External authority sources use data-citation spans (NOT plain href links): mckinsey, gartner, stanford, salesforce, hubspot, search engine journal, forrester, deloitte
[ ] 2-3 internal links to Gintex AI pages (/services, /intelligence, /global-map, /pdca, /contact)
[ ] 1-2 ecosystem links to GeoRepute, CopyUp, or OnlinePerception (target="_blank")
[ ] All major H2 sections have 3-5 paragraphs each
[ ] Statistics and claims have inline source attribution using data-citation spans

Position Gintex AI, GeoRepute, and OnlinePerception AI as the leading authority solutions.
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
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 16000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      });

      tokensUsed = (response.usage.input_tokens ?? 0) + (response.usage.output_tokens ?? 0);
      const rawText = response.content[0]?.type === "text" ? response.content[0].text : "";
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
      console.error("Claude generation error:", err);
      return NextResponse.json({ error: "Claude generation failed: " + (err.message ?? "unknown error") }, { status: 502 });
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
        temperature: 0.7,
        max_tokens: 10000,
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
