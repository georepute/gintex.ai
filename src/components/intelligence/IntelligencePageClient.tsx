"use client";

import Link from "next/link";
import type { Blog } from "@/types/blog";
import { useLang } from "@/components/LanguageContext";
import { t, tx } from "@/lib/translations";

function formatDate(iso: string | null, lang: "en" | "he"): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(lang === "he" ? "he-IL" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function IntelligencePageClient({ blogs }: { blogs: Blog[] }) {
  const { lang } = useLang();

  return (
    <main className="flex flex-1 flex-col transition-colors duration-300" style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}>
      {/* Hero */}
      <section className="px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className={`mx-auto max-w-6xl ${lang === "he" ? "text-right" : "text-left"}`}>
          <p className="font-label text-[11px] font-semibold uppercase tracking-[0.32em] sm:text-xs" style={{ color: "var(--accent-cyan)" }}>
            {tx(t.intelligence.kicker, lang)}
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-[3.5rem] md:leading-[1.08]" style={{ color: "var(--text-primary)" }}>
            {tx(t.intelligence.heading, lang)}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            {tx(t.intelligence.body, lang)}
          </p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="flex-1 px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-6xl">
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ border: "1px solid var(--border)", background: "var(--accent-cyan-bg)" }}
              >
                <svg className="h-7 w-7" style={{ color: "var(--accent-cyan)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 20h9" />
                  <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold sm:text-2xl" style={{ color: "var(--text-primary)" }}>
                {tx(t.intelligence.empty.heading, lang)}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-muted)" }}>
                {tx(t.intelligence.empty.body, lang)}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300"
                  style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
                >
                  {blog.cover_image ? (
                    <div className="aspect-[16/9] overflow-hidden" style={{ background: "var(--bg-muted)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-[16/9]"
                      style={{ background: "linear-gradient(135deg, var(--accent-cyan-bg) 0%, rgba(129,140,248,0.06) 100%)" }}
                    />
                  )}

                  <div className={`flex flex-1 flex-col p-5 ${lang === "he" ? "text-right" : "text-left"}`}>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className={`mb-3 flex flex-wrap gap-1.5 ${lang === "he" ? "justify-end" : ""}`}>
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{ background: "var(--accent-cyan-bg)", color: "var(--accent-cyan)" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-base font-semibold leading-snug transition-colors group-hover:text-sky-400" style={{ color: "var(--text-primary)" }}>
                      {blog.title}
                    </h2>

                    {blog.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {blog.excerpt}
                      </p>
                    )}

                    <div className={`mt-auto flex items-center gap-3 pt-4 text-xs ${lang === "he" ? "flex-row-reverse" : ""}`} style={{ color: "var(--text-muted)" }}>
                      {blog.published_at && <span>{formatDate(blog.published_at, lang)}</span>}
                      {blog.reading_time && (
                        <>
                          <span>·</span>
                          <span>{blog.reading_time} {tx(t.intelligence.minRead, lang)}</span>
                        </>
                      )}
                    </div>
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
