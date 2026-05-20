import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Blog } from "@/types/blog";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt ?? undefined,
    image: blog.cover_image ?? undefined,
    datePublished: blog.published_at ?? undefined,
    dateModified: blog.updated_at,
    author: { "@type": "Organization", name: "Gintex AI", url: "https://gintex-ai.vercel.app" },
    publisher: {
      "@type": "Organization",
      name: "Gintex AI",
      logo: { "@type": "ImageObject", url: "https://gintex-ai.vercel.app/logo.png" },
    },
    url: `https://gintex-ai.vercel.app/blog/${blog.slug}`,
    keywords: (blog.tags ?? []).join(", "),
  };

  const isRtl = RTL_LANGS.has(blog.language ?? "en");
  const dir = isRtl ? "rtl" : "ltr";
  const textAlign = isRtl ? "right" : "left";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
          <div
            className={`blog-content mx-auto max-w-3xl${isRtl ? " blog-content-rtl" : ""}`}
            dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
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

      <style>{`
        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
          font-weight: 700;
          line-height: 1.3;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        .blog-content h1 { font-size: 1.875rem; }
        .blog-content h2 { font-size: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }
        .blog-content h3 { font-size: 1.25rem; }
        .blog-content p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
          color: var(--text-secondary);
          font-size: 1rem;
        }
        .blog-content ul, .blog-content ol {
          margin: 1rem 0 1.5rem 1.5rem;
          color: var(--text-secondary);
          line-height: 1.8;
        }
        .blog-content ul { list-style-type: disc; }
        .blog-content ol { list-style-type: decimal; }
        .blog-content li { margin-bottom: 0.4rem; }
        .blog-content a {
          color: var(--accent-cyan);
          text-decoration: underline;
          text-decoration-color: transparent;
          transition: text-decoration-color 0.2s;
        }
        .blog-content a:hover { text-decoration-color: var(--accent-cyan); }
        .blog-content blockquote {
          border-left: 3px solid var(--accent-cyan);
          padding: 0.75rem 1.25rem;
          margin: 1.5rem 0;
          background: var(--accent-cyan-bg);
          border-radius: 0 0.5rem 0.5rem 0;
          font-style: italic;
          color: var(--text-secondary);
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.875rem;
        }
        .blog-content th {
          background: var(--bg-muted);
          font-weight: 600;
          text-align: left;
          padding: 0.625rem 0.875rem;
          border: 1px solid var(--border);
        }
        .blog-content td {
          padding: 0.625rem 0.875rem;
          border: 1px solid var(--border);
          color: var(--text-secondary);
        }
        .blog-content pre {
          background: var(--bg-muted);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 1rem 1.25rem;
          overflow-x: auto;
          font-size: 0.875rem;
          margin: 1.5rem 0;
        }
        .blog-content code {
          font-family: ui-monospace, monospace;
          font-size: 0.875em;
          background: var(--bg-muted);
          padding: 0.15em 0.4em;
          border-radius: 0.25rem;
        }
        .blog-content pre code { background: none; padding: 0; }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
        .blog-content strong { font-weight: 600; color: var(--text-primary); }
        .blog-content em { font-style: italic; }
        .blog-content hr { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }

        /* ── RTL overrides (Hebrew / Arabic) ── */
        .blog-content-rtl { direction: rtl; text-align: right; }
        .blog-content-rtl h1,
        .blog-content-rtl h2,
        .blog-content-rtl h3,
        .blog-content-rtl h4 { text-align: right; direction: rtl; }
        .blog-content-rtl p { text-align: right; direction: rtl; }
        .blog-content-rtl ul,
        .blog-content-rtl ol { margin: 1rem 1.5rem 1.5rem 0; padding-right: 1.5rem; padding-left: 0; text-align: right; }
        .blog-content-rtl li { text-align: right; }
        .blog-content-rtl blockquote {
          border-left: none;
          border-right: 3px solid var(--accent-cyan);
          border-radius: 0.5rem 0 0 0.5rem;
          text-align: right;
        }
        .blog-content-rtl table,
        .blog-content-rtl th,
        .blog-content-rtl td { text-align: right; direction: rtl; }
        .blog-content-rtl div { direction: rtl; }
      `}</style>
    </>
  );
}
