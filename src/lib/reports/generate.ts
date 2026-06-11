// Two-phase intelligence-report engine.
//
// Phase 1 (research): Claude + server-side web search gathers verifiable
// evidence — real source URLs, dates, confidence, verification status.
// Phase 2 (writing): a second Claude call composes the fixed 9-section,
// decision-grade report using ONLY the Phase-1 evidence. No fabricated stats.
//
// Conventions (slugify, reading time, JSON extraction, em-dash strip) mirror
// src/app/api/admin/blogs/generate/route.ts so the two engines stay consistent.

import Anthropic from "@anthropic-ai/sdk";
import type {
  EvidenceItem,
  ReportSource,
  ResearchResult,
  ReportWriteResult,
  ReportType,
} from "@/types/report";
// Single source of truth for slug normalisation (shared with the blog routes).
import { slugify } from "@/lib/slug";

export { slugify };

const MODEL = "claude-opus-4-8";

// ── shared text helpers ──

export function estimateReadingTime(text: string): number {
  const words = countWords(text);
  return Math.max(1, Math.round(words / 220));
}

export function countWords(html: string): number {
  return html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

function removeEmDashes(text: string): string {
  return text.replace(/—/g, " - ").replace(/–/g, " - ");
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

const RTL_LANGUAGES = new Set(["he", "ar"]);

const LANG_MAP: Record<string, string> = {
  en: "English", he: "Hebrew", fr: "French", es: "Spanish",
  de: "German", ar: "Arabic", am: "Amharic", ru: "Russian",
};

// Word targets per the AGENTS.md content-depth standards.
const WORD_TARGET: Record<ReportType, string> = {
  short: "1,500-2,500 words",
  standard: "3,000-5,000 words",
  research: "5,000-9,000 words",
};

export interface GenerateOutcome {
  research: ResearchResult;
  report: ReportWriteResult;
  tokensUsed: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 — RESEARCH (web search)
// ─────────────────────────────────────────────────────────────────────────────

const RESEARCH_SYSTEM = `You are a senior intelligence analyst at Gintex AI producing decision-grade research. Your job in this phase is EVIDENCE GATHERING ONLY — not writing the article.

Use the web_search tool aggressively. Run multiple distinct searches to triangulate every material claim from independent sources. Prefer primary sources and recognised authorities (research firms, academic institutions, official filings, reputable journalism, vendor docs). Capture publication dates.

For EVERY material claim you intend to support, record:
- the exact claim
- the source name and its URL (a real, resolvable URL you actually retrieved via search)
- the publisher/domain
- the publication date (if discoverable; else "")
- a confidence rating: high | medium | low
- a verification status: verified | partially-verified | unverified | interpretation | hypothesis | opinion
- a short supporting excerpt or paraphrase

CRITICAL RULES:
- Never invent statistics, sources, URLs, or dates. If you cannot find evidence for a claim, either omit it or record it with verification "unverified" / "hypothesis" / "opinion" and confidence "low".
- Do NOT fabricate proprietary indices or benchmarks. Only report numbers you actually found, attributed to the real source.
- Distinguish fact (verified) from interpretation, hypothesis, and opinion.
- List sources you could not fully verify under gaps.

Return ONLY a single JSON object (no prose, no markdown fences) with this exact shape:
{"summary":"2-4 sentence synthesis of what the body of evidence shows","findings":[{"claim":"...","source":"...","url":"https://...","publisher":"...","date":"...","confidence":"high|medium|low","verification":"verified|partially-verified|unverified|interpretation|hypothesis|opinion","excerpt":"..."}],"sources":[{"title":"...","url":"https://...","publisher":"...","date":"..."}],"gaps":["..."]}

Aim for 12-25 well-sourced findings for a standard report; more for a research report. Every URL must be one you retrieved during search.`;

export async function runResearch(
  anthropic: Anthropic,
  topic: string,
  keywords: string[],
  language: string,
  reportType: ReportType,
): Promise<{ research: ResearchResult; tokens: number }> {
  const langName = LANG_MAP[language] ?? "English";
  const kw = keywords.length ? `\nPriority sub-topics / keywords: ${keywords.join(", ")}.` : "";
  const depth =
    reportType === "research"
      ? "This is a deep RESEARCH REPORT: gather extensive evidence (20+ findings) across multiple angles, time periods, and stakeholders."
      : reportType === "short"
        ? "This is a SHORT ANALYSIS: gather a focused, high-signal evidence set (10-15 findings)."
        : "This is a STANDARD intelligence article: gather a thorough evidence set (12-20 findings).";

  const userPrompt = `Research the following topic and return the evidence JSON described in the system prompt.

Topic: ${topic.trim()}
Output language for claims/excerpts: ${langName}.${kw}

${depth}

Search broadly first, then drill into specifics. Triangulate key claims across independent sources. Return ONLY the JSON object.`;

  const stream = anthropic.messages.stream({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    output_config: { effort: "high" },
    tools: [{ type: "web_search_20260209", name: "web_search" }],
    system: RESEARCH_SYSTEM,
    messages: [{ role: "user", content: userPrompt }],
  });

  const response = await stream.finalMessage();
  const tokens =
    (response.usage.input_tokens ?? 0) + (response.usage.output_tokens ?? 0);

  const rawText = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  // Collect real source URLs surfaced by the web_search tool as a ground-truth
  // allowlist — we keep only findings/sources whose URL was actually retrieved.
  const searchedUrls = collectSearchedUrls(response);

  let parsed: Partial<ResearchResult>;
  try {
    parsed = JSON.parse(extractJson(rawText));
  } catch {
    throw new Error(
      "Research phase returned unparseable JSON. Preview: " + rawText.slice(0, 300),
    );
  }

  const findings = sanitiseFindings(parsed.findings, searchedUrls);
  const sources = sanitiseSources(parsed.sources, searchedUrls);

  if (findings.length === 0) {
    throw new Error("Research phase produced no usable, sourced findings for this topic.");
  }

  return {
    research: {
      summary: String(parsed.summary ?? "").trim(),
      findings,
      sources,
      gaps: Array.isArray(parsed.gaps) ? parsed.gaps.map(String) : [],
    },
    tokens,
  };
}

// Pull every URL the web_search tool actually returned across the message.
function collectSearchedUrls(response: Anthropic.Message): Set<string> {
  const urls = new Set<string>();
  for (const block of response.content) {
    // web_search_tool_result blocks carry the retrieved results.
    const b = block as unknown as {
      type?: string;
      content?: Array<{ type?: string; url?: string }>;
    };
    if (b.type === "web_search_tool_result" && Array.isArray(b.content)) {
      for (const r of b.content) {
        if (r?.url) urls.add(normaliseUrl(r.url));
      }
    }
  }
  return urls;
}

function normaliseUrl(u: string): string {
  try {
    const url = new URL(u);
    return (url.hostname + url.pathname).replace(/\/$/, "").toLowerCase();
  } catch {
    return u.trim().toLowerCase();
  }
}

// Keep only findings with a plausible, retrieved URL. This is the anti-fabrication
// gate: a claim whose URL was never returned by search is dropped rather than shown.
function sanitiseFindings(
  raw: unknown,
  searchedUrls: Set<string>,
): EvidenceItem[] {
  if (!Array.isArray(raw)) return [];
  const out: EvidenceItem[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const f = item as Record<string, unknown>;
    const url = String(f.url ?? "").trim();
    const claim = removeEmDashes(String(f.claim ?? "").trim());
    if (!claim) continue;

    const verification = normaliseVerification(String(f.verification ?? ""));
    const urlOk = url.startsWith("http") && (searchedUrls.size === 0 || searchedUrls.has(normaliseUrl(url)));

    // A claim presented as fact MUST have a retrieved URL. If not, downgrade it
    // to "unverified" rather than dropping the analytical point entirely.
    const finalVerification =
      verification === "verified" && !urlOk ? "unverified" : verification;

    out.push({
      claim,
      source: removeEmDashes(String(f.source ?? f.publisher ?? "").trim()),
      url: urlOk ? url : "",
      publisher: String(f.publisher ?? "").trim(),
      date: String(f.date ?? "").trim(),
      confidence: normaliseConfidence(String(f.confidence ?? "medium")),
      verification: finalVerification,
      excerpt: removeEmDashes(String(f.excerpt ?? "").trim()),
    });
  }
  return out;
}

function sanitiseSources(raw: unknown, searchedUrls: Set<string>): ReportSource[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: ReportSource[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const s = item as Record<string, unknown>;
    const url = String(s.url ?? "").trim();
    if (!url.startsWith("http")) continue;
    if (searchedUrls.size > 0 && !searchedUrls.has(normaliseUrl(url))) continue;
    const key = normaliseUrl(url);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      title: removeEmDashes(String(s.title ?? "").trim()) || url,
      url,
      publisher: String(s.publisher ?? "").trim(),
      date: String(s.date ?? "").trim(),
    });
  }
  return out;
}

function normaliseConfidence(v: string): EvidenceItem["confidence"] {
  const x = v.toLowerCase();
  return x === "high" || x === "low" ? (x as EvidenceItem["confidence"]) : "medium";
}

function normaliseVerification(v: string): EvidenceItem["verification"] {
  const x = v.toLowerCase().replace(/\s+/g, "-");
  const allowed = [
    "verified", "partially-verified", "unverified",
    "interpretation", "hypothesis", "opinion",
  ];
  return (allowed.includes(x) ? x : "unverified") as EvidenceItem["verification"];
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2 — WRITING (no tools; uses Phase-1 evidence only)
// ─────────────────────────────────────────────────────────────────────────────

const WRITE_SYSTEM = `You are the lead intelligence editor at Gintex AI. You write decision-grade strategic intelligence reports comparable to Gartner, McKinsey, Forrester, and Deloitte research — NOT generic AI blog posts.

You will be given a topic and a body of pre-verified EVIDENCE (claims with sources, dates, confidence, and verification status). Write the full report using ONLY that evidence.

ABSOLUTE RULES (non-negotiable):
- Use ONLY the supplied evidence for factual claims. NEVER invent statistics, sources, URLs, dates, or proprietary indices.
- Every major factual claim must cite its source inline, e.g. <em>(Source: McKinsey & Company, 2025)</em>. Where a real URL exists, wrap the source name in a link: <a href="URL" target="_blank" rel="noopener noreferrer">Source</a>.
- For any statement NOT backed by verified evidence, explicitly label it as Interpretation, Hypothesis, or Opinion — do not present it as fact.
- No marketing filler, no generic intros ("In today's world"), no empty conclusions. Every section must add new intelligence.
- Never use em-dashes or en-dashes; use a hyphen.

Produce the report as HTML using these REQUIRED sections, in order, each opened by an <h2>:
1. Executive Summary — key findings, key risks, key opportunities, strategic implications (use a <div class="takeaway-box"> for the at-a-glance points).
2. Background & Context — historical, industry, and market context with supporting evidence.
3. Evidence Review — present the verified facts and research findings. For each major claim show Source, Date, Confidence, Verification status (a <table> works well here).
4. AI Intelligence Analysis — label this section heading exactly "AI Intelligence Analysis". Analyse what the evidence means, relationships, patterns, emerging signals, risks, opportunities. Use at least one <div class="insight-callout"> with a sharp strategic insight.
5. Competitive & Market Implications — industry, competitor, market, customer, and geographic impact where relevant.
6. Scenario Analysis — three scenarios (Optimistic, Neutral, Risk). For each: assumptions, supporting evidence, and a confidence level.
7. Strategic Recommendations — prioritized Priority 1 / Priority 2 / Priority 3. For each: expected impact, risk level, confidence score. Make them actionable and evidence-supported.
8. Sources & Evidence Appendix — list every source used with publication date and verification status. Link real URLs.
9. Audit Trail — for each major conclusion, show the chain "Claim -> Evidence -> Source" (a <table> or structured list).

Use semantic HTML and these existing CSS classes where helpful: stat-block, insight-callout, takeaway-box, sources-block, framework-line, and standard <table>/<thead>/<tbody>. Use <strong> for entity names. Use <h3> for sub-sections.

Return ONLY a single JSON object (no markdown fences) with this exact shape:
{"title":"...","excerpt":"2-3 sentence thesis (150-200 chars)","content":"<full HTML report>","tags":["...","...","..."],"seo_title":"50-60 chars","seo_description":"150-160 chars","reading_time":18,"word_count":4200}

The content must be valid JSON-escaped HTML on a single line. Escape every double quote as \\" and every backslash as \\\\. Do not truncate.`;

const REPORT_WRITE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    excerpt: { type: "string" },
    content: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    seo_title: { type: "string" },
    seo_description: { type: "string" },
    reading_time: { type: "integer" },
    word_count: { type: "integer" },
  },
  required: [
    "title", "excerpt", "content", "tags",
    "seo_title", "seo_description", "reading_time", "word_count",
  ],
} as const;

export async function runWrite(
  anthropic: Anthropic,
  topic: string,
  research: ResearchResult,
  language: string,
  reportType: ReportType,
): Promise<{ report: ReportWriteResult; tokens: number }> {
  const langName = LANG_MAP[language] ?? "English";
  const evidenceBlock = JSON.stringify(
    { summary: research.summary, findings: research.findings, sources: research.sources, gaps: research.gaps },
    null,
    0,
  );

  const userPrompt = `Write the full intelligence report in ${langName}.

Topic: ${topic.trim()}
Target length: ${WORD_TARGET[reportType]}. Do not pad; do not artificially shorten. Depth over brevity.

Use ONLY the evidence below. Cite sources inline. Label anything not evidence-backed as Interpretation / Hypothesis / Opinion. Include all 9 required sections.

EVIDENCE:
${evidenceBlock}

Return ONLY the JSON object specified in the system prompt.`;

  // No tools here, so structured outputs (output_config.format) is allowed and
  // guarantees a valid object. Stream because output can be large.
  const stream = anthropic.messages.stream({
    model: MODEL,
    max_tokens: 32000,
    thinking: { type: "adaptive" },
    output_config: {
      effort: "high",
      format: { type: "json_schema", schema: REPORT_WRITE_SCHEMA },
    },
    system: WRITE_SYSTEM,
    messages: [{ role: "user", content: userPrompt }],
  });

  const response = await stream.finalMessage();
  const tokens =
    (response.usage.input_tokens ?? 0) + (response.usage.output_tokens ?? 0);

  const rawText = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(extractJson(rawText));
  } catch {
    throw new Error("Writing phase returned unparseable JSON. Preview: " + rawText.slice(0, 300));
  }

  let content = removeEmDashes(String(parsed.content ?? "").trim());
  if (!content) throw new Error("Writing phase produced empty content.");

  // Structural fallback ONLY (never fabricated numbers): ensure a sources
  // appendix exists, built from the real Phase-1 sources.
  content = ensureSourcesAppendix(content, research.sources);

  if (RTL_LANGUAGES.has(language)) {
    content = `<div dir="rtl" style="text-align:right;">${content}</div>`;
  }

  const wordCount = countWords(content);

  return {
    report: {
      title: removeEmDashes(String(parsed.title ?? topic).trim()),
      excerpt: removeEmDashes(String(parsed.excerpt ?? "").trim()),
      content,
      tags: Array.isArray(parsed.tags) ? parsed.tags.map(String).slice(0, 8) : [],
      seo_title: removeEmDashes(String(parsed.seo_title ?? parsed.title ?? "").trim().slice(0, 60)),
      seo_description: String(parsed.seo_description ?? parsed.excerpt ?? "").trim().slice(0, 160),
      reading_time: estimateReadingTime(content),
      word_count: wordCount,
    },
    tokens,
  };
}

// Append a real-source references block if the model omitted one. Never invents
// sources — only renders what Phase-1 search actually returned.
function ensureSourcesAppendix(content: string, sources: ReportSource[]): string {
  if (/sources-block|Sources &amp; Evidence|Sources &amp; References|Sources & /i.test(content)) {
    return content;
  }
  if (sources.length === 0) return content;
  const items = sources
    .map((s) => {
      const date = s.date ? ` (${escapeHtml(s.date)})` : "";
      return `<li><a href="${escapeAttr(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.title)}</a> - ${escapeHtml(s.publisher)}${date}</li>`;
    })
    .join("");
  return (
    content +
    `<div class="sources-block"><h2>Sources & Evidence Appendix</h2><ol>${items}</ol></div>`
  );
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/"/g, "&quot;");
}
