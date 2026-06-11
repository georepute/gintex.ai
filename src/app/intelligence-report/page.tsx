import type { Metadata } from "next";
import Link from "next/link";
import { createClient as createAnonClient } from "@supabase/supabase-js";
import type { IntelligenceReport } from "@/types/report";

export const metadata: Metadata = {
  title: "Intelligence Reports — Decision-Grade Market Research",
  description:
    "Research-driven intelligence reports on AI visibility, brand perception, and market dynamics. Evidence-backed, cited, decision-grade analysis from Gintex AI.",
  alternates: { canonical: "https://gintex-ai.vercel.app/intelligence-report" },
};

export const revalidate = 60;

type ReportCard = Pick<
  IntelligenceReport,
  "id" | "title" | "slug" | "excerpt" | "tags" | "published_at" | "reading_time" | "report_type" | "word_count" | "language"
>;

async function getPublishedReports(): Promise<ReportCard[]> {
  try {
    const supabase = createAnonClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { data } = await supabase
      .from("intelligence_reports")
      .select("id, title, slug, excerpt, tags, published_at, reading_time, report_type, word_count, language")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(24);
    return (data ?? []) as ReportCard[];
  } catch {
    return [];
  }
}

const TYPE_LABEL: Record<string, string> = {
  short: "Short Analysis",
  standard: "Intelligence Article",
  research: "Research Report",
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function IntelligenceReportIndexPage() {
  const reports = await getPublishedReports();

  return (
    <main className="flex flex-1 flex-col" style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}>
      {/* Hero */}
      <section className="border-b px-6 pb-12 pt-16 sm:px-10" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-4xl">
          <p className="font-label text-xs uppercase tracking-widest" style={{ color: "var(--accent-cyan)" }}>
            Gintex Intelligence
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]">
            Decision-Grade Intelligence Reports
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Research-driven, evidence-backed reports on AI visibility, brand perception, and market dynamics. Every claim is sourced, dated, and verified.
          </p>
        </div>
      </section>

      {/* Reports */}
      <section className="px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-4xl">
          {reports.length === 0 ? (
            <div className="rounded-xl border p-12 text-center" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
              <p className="text-lg font-semibold">No reports published yet.</p>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                Decision-grade intelligence reports will appear here soon.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
              >
                Request a custom report →
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {reports.map((r) => (
                <Link
                  key={r.id}
                  href={`/intelligence-report/${r.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl border p-6 transition-all hover:-translate-y-0.5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                >
                  {/* Accent strip in place of a cover image */}
                  <span
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: "linear-gradient(90deg, #0ea5e9, #818cf8)" }}
                    aria-hidden
                  />

                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                      style={{ background: "var(--accent-cyan-bg)", color: "var(--accent-cyan)", border: "1px solid var(--accent-cyan-border)" }}
                    >
                      {TYPE_LABEL[r.report_type] ?? "Report"}
                    </span>
                    {r.word_count ? (
                      <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                        {r.word_count.toLocaleString()} words
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-4 text-lg font-bold leading-snug transition-colors group-hover:text-[var(--accent-cyan)]">
                    {r.title}
                  </h2>
                  {r.excerpt && (
                    <p className="mt-2 line-clamp-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {r.excerpt}
                    </p>
                  )}

                  {r.tags && r.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {r.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{ background: "var(--bg-muted)", color: "var(--text-secondary)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-5 text-xs" style={{ color: "var(--text-muted)" }}>
                    {r.published_at && <span>{formatDate(r.published_at)}</span>}
                    {r.reading_time && (
                      <>
                        <span>·</span>
                        <span>{r.reading_time} min read</span>
                      </>
                    )}
                    <span className="ml-auto font-medium transition-colors group-hover:text-[var(--accent-cyan)]" style={{ color: "var(--accent-cyan)" }}>
                      Read report →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
