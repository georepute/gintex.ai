// Shared "About the Author" card rendered at the end of every blog post and
// intelligence report. Rendered as a component (not injected into stored HTML)
// so it applies retroactively to all existing content and stays maintainable in
// one place. Theme-aware via the site's CSS variables.

import Link from "next/link";

const EXPERTISE = [
  "AI reputation management",
  "Generative engine optimization",
  "Brand perception intelligence",
  "Digital narrative strategy",
  "Representation gap detection",
];

const LINKS: { label: string; href: string }[] = [
  { label: "GeoRepute", href: "https://georepute.ai" },
  { label: "Gintex", href: "https://www.gintex.ai" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/itai-gelman" },
];

export function AuthorCard() {
  return (
    <section className="px-6 pb-12 sm:px-10" aria-label="About the author">
      <div
        className="mx-auto max-w-3xl rounded-2xl p-6 sm:p-8"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Avatar */}
          <div className="shrink-0">
            <div
              className="overflow-hidden rounded-xl"
              style={{ width: 132, height: 168, border: "1px solid var(--border)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/itai-gelman.png"
                alt="Itai Gelman"
                width={132}
                height={168}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Body */}
          <div className="min-w-0 flex-1">
            <span
              className="inline-block rounded-full px-3 py-1 font-label text-[11px] font-semibold uppercase tracking-widest"
              style={{ background: "var(--accent-cyan-bg)", color: "var(--accent-cyan)" }}
            >
              About the Author
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Itai Gelman
            </h2>
            <p className="mt-1 text-sm font-semibold" style={{ color: "#7c3aed" }}>
              Founder &amp; CEO, GeoRepute · AI perception intelligence &amp; GEO
            </p>

            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Itai Gelman is the founder of GeoRepute and Gintex, focused on how
              businesses are represented and decided upon inside AI-driven
              environments. His work is based on a simple reality: decisions are
              made before users reach your website, shaped by how AI and search
              systems present you. He builds intelligence systems that analyze,
              structure, and improve that visibility - turning data into strategy
              and execution.
            </p>

            {/* Meta lines */}
            <div className="mt-5 space-y-2 border-t pt-5 text-sm" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Methodology:</strong>{" "}
                Analyze → Decide → Publish → Measure → Improve
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Focus:</strong>{" "}
                AI Visibility · Narrative Control · Market Perception
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Proof:</strong>{" "}
                GeoRepute (intelligence layer) · Gintex (strategy &amp; implementation) ·
                AI engines and search ecosystems.
              </p>
            </div>

            {/* Quote */}
            <blockquote
              className="mt-5 pl-4 text-[15px] italic"
              style={{ borderLeft: "3px solid var(--border)", color: "var(--text-secondary)" }}
            >
              &ldquo;In the digital world, you are the story written about you. The
              question is who is writing it.&rdquo;
            </blockquote>

            {/* Expertise tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {EXPERTISE.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1.5 text-xs"
                  style={{ background: "var(--bg-muted)", color: "var(--text-secondary)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-5 flex flex-wrap gap-3">
              {LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                  style={{
                    color: "var(--accent-cyan)",
                    border: "1px solid var(--accent-cyan-border)",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
