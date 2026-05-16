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
  return Math.max(1, Math.round(words / 200));
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

function sanitiseResult(parsed: Record<string, unknown>, topic: string, slug: string): BlogGenerationResult {
  const content = String(parsed.content || "").trim();
  const tags = Array.isArray(parsed.tags) ? parsed.tags.map(String).slice(0, 8) : [];
  const enrichedContent = injectImages(content, slug, tags);

  return {
    title: String(parsed.title || topic).trim(),
    slug,
    excerpt: String(parsed.excerpt || "").trim(),
    content: enrichedContent,
    seo_title: String(parsed.seo_title || parsed.title || "").trim().slice(0, 60),
    seo_description: String(parsed.seo_description || parsed.excerpt || "").trim().slice(0, 160),
    tags,
    reading_time: estimateReadingTime(enrichedContent),
  };
}

const SYSTEM_PROMPT = `You are a senior content strategist and SEO specialist for Gintex AI — a company specialising in AI visibility intelligence, brand perception, market positioning, and reputation management.

Write in-depth, authoritative blog articles (1800–2500 words) that:
- Provide deep, expert-level insights on AI visibility, GEO, brand perception, digital authority, and market intelligence
- Open with a compelling hook that frames a real business problem
- Use proper H2/H3 structure with at least 5–6 major sections
- Include specific statistics, named examples, case study references, and actionable frameworks
- Each section should be 3–5 paragraphs, not just 1–2 sentences
- Include a "Key Takeaways" or "Action Steps" section at the end
- Sound like a human thought leader — sharp, specific, opinionated
- Follow SEO best practices: keyword-rich headings, natural keyword density, internal logical flow

Return ONLY valid JSON (no markdown fences, no extra text) in this exact structure:
{"title":"SEO-optimised title","slug":"url-safe-slug","excerpt":"Compelling 2-3 sentence summary (150-180 chars)","content":"Full HTML article with h2, h3, p, ul, li, strong tags. No inline styles. 1800-2500 words minimum.","seo_title":"SEO meta title 50-60 chars","seo_description":"SEO meta description 150-160 chars","tags":["tag1","tag2","tag3","tag4","tag5"],"reading_time":10}

CRITICAL JSON RULES — failure to follow these will break the parser:
- Every double quote inside a value MUST be escaped: \\"
- Every backslash MUST be escaped: \\\\
- No literal newlines inside string values — the entire JSON must be one line
- No smart quotes or special characters — ASCII only in JSON structure
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

  const userPrompt = `Write a comprehensive, in-depth blog article for Gintex.ai.

Topic: ${topic.trim()}
Tone: ${tone}
Language: ${langName}
${keywordsStr}
Minimum length: 1800 words
Sections required: at least 5 major H2 sections, each with multiple paragraphs

Position Gintex AI as the leading authority in AI visibility and market intelligence.
Return ONLY valid JSON as specified. No markdown. No truncation.`;

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
        max_tokens: 8000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      });

      tokensUsed = (response.usage.input_tokens ?? 0) + (response.usage.output_tokens ?? 0);
      const rawText = response.content[0]?.type === "text" ? response.content[0].text : "";
      const jsonStr = extractJson(rawText);
      let parsed: Record<string, unknown>;
      try {
        parsed = JSON.parse(jsonStr);
      } catch (parseErr: any) {
        throw new Error(`Claude returned malformed JSON: ${parseErr.message}. Preview: ${jsonStr.slice(0, 300)}`);
      }
      const slug = slugify(String(parsed.slug || parsed.title || topic));
      result = sanitiseResult(parsed, topic, slug);
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
        max_tokens: 6000,
      });

      tokensUsed = response.usage?.total_tokens ?? 0;
      const rawText = response.choices[0]?.message?.content ?? "";
      const parsed = JSON.parse(extractJson(rawText));
      const slug = slugify(String(parsed.slug || parsed.title || topic));
      result = sanitiseResult(parsed, topic, slug);
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
