import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { IntelligenceReport } from "@/types/report";
import BlogContent from "@/components/blog/BlogContent";
import { AuthorCard } from "@/components/AuthorCard";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

const RTL_LANGS = new Set(["he", "ar"]);

const TYPE_LABEL: Record<string, string> = {
  short: "Short Analysis",
  standard: "Intelligence Article",
  research: "Research Report",
};

async function getReport(slug: string): Promise<IntelligenceReport | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("intelligence_reports")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error || !data) return null;
  return data as IntelligenceReport;
}

// Resolve a changed/old report slug to the current one via the redirects table.
async function resolveRedirectTarget(slug: string): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("report_redirects")
    .select("new_slug")
    .eq("old_slug", slug)
    .maybeSingle();
  return data?.new_slug ?? null;
}

function formatDate(iso: string | null, lang?: string): string {
  if (!iso) return "";
  const locale = lang === "he" ? "he-IL" : lang === "ar" ? "ar-SA" : "en-US";
  return new Date(iso).toLocaleDateString(locale, { month: "long", day: "numeric", year: "numeric" });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) return { title: "Report Not Found" };

  return {
    title: report.seo_title || report.title || "Intelligence Report",
    description: report.seo_description || report.excerpt || undefined,
    alternates: { canonical: `https://gintex-ai.vercel.app/intelligence-report/${report.slug}` },
    openGraph: {
      title: report.seo_title || report.title || undefined,
      description: report.seo_description || report.excerpt || undefined,
      url: `https://gintex-ai.vercel.app/intelligence-report/${report.slug}`,
      type: "article",
      publishedTime: report.published_at ?? undefined,
      images: report.cover_image ? [{ url: report.cover_image, alt: report.title ?? "" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: report.seo_title || report.title || undefined,
      description: report.seo_description || report.excerpt || undefined,
      images: report.cover_image ? [report.cover_image] : undefined,
    },
  };
}

export default async function ReportDetailPage({ params }: Props) {
  const { slug } = await params;
  const report = await getReport(slug);

  // On a miss, check whether this is an old slug with a redirect on record.
  // permanentRedirect() serves a 308 (the App Router equivalent of a 301) —
  // both preserve SEO rankings and indexed URLs.
  if (!report) {
    const target = await resolveRedirectTarget(slug);
    if (target && target !== slug) permanentRedirect(`/intelligence-report/${target}`);
    notFound();
  }

  const siteUrl = "https://gintex-ai.vercel.app";

  const reportSchema = {
    "@context": "https://schema.org",
    "@type": "Report",
    headline: report.title,
    description: report.excerpt ?? undefined,
    image: report.cover_image ?? undefined,
    datePublished: report.published_at ?? undefined,
    dateModified: report.updated_at,
    wordCount: report.word_count ?? undefined,
    author: {
      "@type": "Organization",
      name: "Gintex AI Intelligence",
      url: `${siteUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Gintex AI",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    url: `${siteUrl}/intelligence-report/${report.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/intelligence-report/${report.slug}` },
    keywords: (report.tags ?? []).join(", "),
    inLanguage: report.language ?? "en",
  };

  const isRtl = RTL_LANGS.has(report.language ?? "en");
  const dir = isRtl ? "rtl" : "ltr";
  const textAlign = isRtl ? "right" : "left";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }} />

      <main className="flex flex-1 flex-col" style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}>
        {/* Hero */}
        <section className="border-b px-6 pb-12 pt-12 sm:px-10" style={{ borderColor: "var(--border)" }} dir={dir}>
          <div className="mx-auto max-w-3xl" style={{ textAlign }}>
            <nav
              className="mb-6 flex items-center gap-2 text-xs"
              style={{ color: "var(--text-muted)", flexDirection: isRtl ? "row-reverse" : "row", justifyContent: isRtl ? "flex-end" : "flex-start" }}
            >
              <Link href="/intelligence-report" className="hover:opacity-80 transition-opacity">Intelligence Reports</Link>
              <span>/</span>
              <span className="truncate max-w-[200px]">{report.title}</span>
            </nav>

            <div className={`mb-4 flex flex-wrap items-center gap-2 ${isRtl ? "justify-end" : ""}`}>
              <span
                className="rounded-full px-2.5 py-1 text-xs font-medium"
                style={{ background: "var(--accent-cyan-bg)", color: "var(--accent-cyan)", border: "1px solid var(--accent-cyan-border)" }}
              >
                {TYPE_LABEL[report.report_type] ?? "Report"}
              </span>
              {(report.tags ?? []).map(tag => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ background: "var(--bg-muted)", color: "var(--text-secondary)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.5rem] md:leading-[1.1]">
              {report.title}
            </h1>

            {report.excerpt && (
              <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
                {report.excerpt}
              </p>
            )}

            <div className={`mt-6 flex flex-wrap items-center gap-4 text-sm ${isRtl ? "flex-row-reverse justify-end" : ""}`} style={{ color: "var(--text-muted)" }}>
              {report.published_at && <span>Published {formatDate(report.published_at, report.language)}</span>}
              {report.reading_time && (<><span>·</span><span>{report.reading_time} min read</span></>)}
              {report.word_count ? (<><span>·</span><span>{report.word_count.toLocaleString()} words</span></>) : null}
            </div>
          </div>
        </section>

        {/* Reports are intentionally image-free — no cover hero. */}

        {/* Report content */}
        <article className="px-6 pb-20 pt-10 sm:px-10" dir={dir}>
          <BlogContent
            html={report.content ?? ""}
            isRtl={isRtl}
            shareUrl={`${siteUrl}/intelligence-report/${report.slug}`}
            shareTitle={report.title ?? ""}
          />
        </article>

        {/* About the Author */}
        <AuthorCard />

        {/* Footer CTA */}
        <div className="border-t px-6 py-12 sm:px-10" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-label uppercase tracking-widest" style={{ color: "var(--accent-cyan)" }}>
              Gintex AI
            </p>
            <h2 className="mt-3 text-xl font-bold sm:text-2xl">
              Need a custom intelligence report on your market?
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              We produce evidence-backed, decision-grade research tailored to your strategic questions.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
            >
              Talk to an Analyst →
            </Link>
            <div className="mt-6">
              <Link href="/intelligence-report" className="text-sm" style={{ color: "var(--text-muted)" }}>
                ← All Intelligence Reports
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
