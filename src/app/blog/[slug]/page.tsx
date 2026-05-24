import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Blog } from "@/types/blog";
import BlogContent from "@/components/blog/BlogContent";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

async function getBlog(slug: string): Promise<Blog | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error || !data) return null;
  return data as Blog;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Article Not Found" };

  return {
    title: blog.seo_title || blog.title,
    description: blog.seo_description || blog.excerpt || undefined,
    alternates: { canonical: `https://gintex-ai.vercel.app/blog/${blog.slug}` },
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.seo_description || blog.excerpt || undefined,
      url: `https://gintex-ai.vercel.app/blog/${blog.slug}`,
      type: "article",
      publishedTime: blog.published_at ?? undefined,
      images: blog.cover_image ? [{ url: blog.cover_image, alt: blog.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seo_title || blog.title,
      description: blog.seo_description || blog.excerpt || undefined,
      images: blog.cover_image ? [blog.cover_image] : undefined,
    },
  };
}

const RTL_LANGS = new Set(["he", "ar"]);

function formatDate(iso: string | null, lang?: string): string {
  if (!iso) return "";
  const locale = lang === "he" ? "he-IL" : lang === "ar" ? "ar-SA" : "en-US";
  return new Date(iso).toLocaleDateString(locale, { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const siteUrl = "https://gintex-ai.vercel.app";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt ?? undefined,
    image: blog.cover_image ?? undefined,
    datePublished: blog.published_at ?? undefined,
    dateModified: blog.updated_at,
    author: {
      "@type": "Person",
      name: "Gintex AI Editorial Team",
      url: `${siteUrl}/about`,
      worksFor: { "@type": "Organization", name: "Gintex AI", url: siteUrl },
    },
    publisher: {
      "@type": "Organization",
      name: "Gintex AI",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    url: `${siteUrl}/blog/${blog.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${blog.slug}` },
    keywords: (blog.tags ?? []).join(", "),
    articleSection: "AI Visibility Intelligence",
    inLanguage: blog.language ?? "en",
    isPartOf: { "@type": "Blog", name: "Gintex AI Intelligence", url: `${siteUrl}/intelligence` },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gintex AI",
    url: siteUrl,
    logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    description: "AI visibility intelligence, brand perception analysis, and reputation management platform.",
    sameAs: [siteUrl],
    knowsAbout: [
      "AI Visibility Intelligence",
      "Brand Perception Analysis",
      "GEO Optimization",
      "Generative Engine Optimization",
      "Reputation Management",
      "AI Search Optimization",
    ],
  };

  // Extract FAQ pairs from content for FAQ schema
  const faqSchema = (() => {
    const content = blog.content ?? "";
    const faqSection = content.match(/<h[23][^>]*>(?:Frequently Asked Questions|FAQ)[^<]*<\/h[23]>([\s\S]*?)(?=<h2|$)/i);
    if (!faqSection) return null;
    const pairs: { question: string; answer: string }[] = [];
    const qRegex = /<(?:h3|strong|dt)[^>]*>(.*?)<\/(?:h3|strong|dt)>/gi;
    const aRegex = /<p[^>]*>(.*?)<\/p>/gi;
    const sectionHtml = faqSection[1];
    let qMatch;
    while ((qMatch = qRegex.exec(sectionHtml)) !== null) {
      const q = qMatch[1].replace(/<[^>]+>/g, "").trim();
      aRegex.lastIndex = qMatch.index;
      const aMatch = aRegex.exec(sectionHtml);
      const a = aMatch ? aMatch[1].replace(/<[^>]+>/g, "").trim() : "";
      if (q && a) pairs.push({ question: q, answer: a });
    }
    if (pairs.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: pairs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    };
  })();

  const jsonLd = articleSchema;

  const isRtl = RTL_LANGS.has(blog.language ?? "en");
  const dir = isRtl ? "rtl" : "ltr";
  const textAlign = isRtl ? "right" : "left";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <main className="flex flex-1 flex-col" style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}>
        {/* Hero */}
        <section
          className="border-b px-6 pb-12 pt-12 sm:px-10"
          style={{ borderColor: "var(--border)" }}
          dir={dir}
        >
          <div className="mx-auto max-w-3xl" style={{ textAlign }}>
            {/* Breadcrumb */}
            <nav
              className="mb-6 flex items-center gap-2 text-xs"
              style={{ color: "var(--text-muted)", flexDirection: isRtl ? "row-reverse" : "row", justifyContent: isRtl ? "flex-end" : "flex-start" }}
            >
              <Link href="/intelligence" className="hover:opacity-80 transition-opacity">Intelligence</Link>
              <span>/</span>
              <span className="truncate max-w-[200px]">{blog.title}</span>
            </nav>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className={`mb-4 flex flex-wrap gap-2 ${isRtl ? "justify-end" : ""}`}>
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-1 text-xs font-medium"
                    style={{ background: "var(--accent-cyan-bg)", color: "var(--accent-cyan)", border: "1px solid var(--accent-cyan-border)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.5rem] md:leading-[1.1]">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
                {blog.excerpt}
              </p>
            )}

            <div className={`mt-6 flex flex-wrap items-center gap-4 text-sm ${isRtl ? "flex-row-reverse justify-end" : ""}`} style={{ color: "var(--text-muted)" }}>
              {blog.published_at && <span>Published {formatDate(blog.published_at, blog.language)}</span>}
              {blog.reading_time && (
                <>
                  <span>·</span>
                  <span>{blog.reading_time} min read</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Cover image */}
        {blog.cover_image && (
          <div className="px-6 pt-8 sm:px-10">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="h-auto w-full object-cover"
                style={{ maxHeight: "480px" }}
              />
            </div>
          </div>
        )}

        {/* Article content */}
        <article className="px-6 pb-20 pt-10 sm:px-10" dir={dir}>
          <BlogContent
            html={blog.content ?? ""}
            isRtl={isRtl}
            shareUrl={`${siteUrl}/blog/${blog.slug}`}
            shareTitle={blog.title}
          />
        </article>

        {/* Footer CTA */}
        <div
          className="border-t px-6 py-12 sm:px-10"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-label uppercase tracking-widest" style={{ color: "var(--accent-cyan)" }}>
              Gintex AI
            </p>
            <h2 className="mt-3 text-xl font-bold sm:text-2xl">
              Want to control how AI sees your brand?
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Get a free AI visibility audit and see exactly how AI systems represent your brand today.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
            >
              Book a Consultation →
            </Link>
            <div className="mt-6">
              <Link href="/intelligence" className="text-sm" style={{ color: "var(--text-muted)" }}>
                ← Back to Intelligence
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
