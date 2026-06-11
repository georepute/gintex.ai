// Intelligence Report types — decision-grade, research-driven reports.
// Distinct from blogs (src/types/blog.ts): reports are built from live web
// research with verifiable, cited evidence and a fixed 9-section structure.

export type ReportStatus =
  | "queued"      // row created, generation not started
  | "researching" // Phase 1: live web search gathering evidence
  | "writing"     // Phase 2: composing the 9-section report
  | "done"        // generated, awaiting review/publish
  | "failed"      // generation errored (see `error`)
  | "published";  // live on the public site

export type ReportType = "short" | "standard" | "research";

export type Confidence = "high" | "medium" | "low";

// How a claim was checked. "verified" = backed by a resolvable primary/secondary
// source; the others classify statements the spec says must NOT be presented as fact.
export type VerificationStatus =
  | "verified"
  | "partially-verified"
  | "unverified"
  | "interpretation"
  | "hypothesis"
  | "opinion";

// One researched claim with its provenance — the audit-trail atom (Claim -> Evidence -> Source).
export interface EvidenceItem {
  claim: string;
  source: string;        // publisher / author name, e.g. "McKinsey & Company"
  url: string;           // real, resolvable URL returned by web search
  publisher: string;     // domain or organisation
  date: string;          // publication date if known (ISO or human), else ""
  confidence: Confidence;
  verification: VerificationStatus;
  excerpt?: string;      // short supporting quote/paraphrase
}

// A deduped source in the references appendix.
export interface ReportSource {
  title: string;
  url: string;
  publisher: string;
  date: string;          // "" if unknown
}

// Structured output of Phase 1 (research). Validated via output_config.format.
export interface ResearchResult {
  summary: string;             // 2-4 sentence synthesis of what the evidence shows
  findings: EvidenceItem[];
  sources: ReportSource[];
  gaps?: string[];             // questions the research could not answer
}

// Structured output of Phase 2 (writing).
export interface ReportWriteResult {
  title: string;
  excerpt: string;
  content: string;             // full HTML (uses .blog-content CSS classes)
  tags: string[];
  seo_title: string;
  seo_description: string;
  reading_time: number;
  word_count: number;
}

// Row shape of the `intelligence_reports` Supabase table.
export interface IntelligenceReport {
  id: string;
  topic: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  content: string | null;
  report_type: ReportType;
  status: ReportStatus;
  stage_detail: string | null;   // human progress string for the polling UI
  evidence: EvidenceItem[] | null;
  sources: ReportSource[] | null;
  tags: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  reading_time: number | null;
  word_count: number | null;
  language: string;
  error: string | null;
  cover_image: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  slug_history?: string[] | null;
  canonical_url?: string | null;
}

export interface ReportRedirect {
  id: string;
  report_id: string | null;
  old_slug: string;
  new_slug: string;
  redirect_type: number;
  created_at: string;
}

// Input accepted by the generate endpoint.
export interface ReportGenerationInput {
  topic: string;
  report_type?: ReportType;
  language?: string;
  keywords?: string[];
}
