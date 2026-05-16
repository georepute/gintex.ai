"use client";

import Link from "next/link";

export default function GlobalMapPage() {
  return (
    <div className="flex flex-col" style={{ background: "var(--bg-page)" }}>

      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden px-6 pb-16 pt-16 sm:px-10 sm:pt-24 sm:pb-20"
        style={{ background: "var(--bg-page)" }}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div style={{
            position: "absolute", left: "50%", top: 0,
            transform: "translateX(-50%)",
            width: 800, height: 400,
            background: "radial-gradient(ellipse, rgba(14,165,233,0.09) 0%, transparent 70%)",
            filter: "blur(40px)",
          }} />
          <div style={{
            position: "absolute", right: 0, top: "50%",
            transform: "translateY(-50%)",
            width: 400, height: 400,
            background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }} />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">

          {/* Label chip */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{
              background: "var(--accent-cyan-bg)",
              border: "1px solid var(--accent-cyan-border)",
              color: "var(--accent-cyan)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent-cyan)" }}
            />
            GeoRepute Global Intelligence Map
          </div>

          {/* Main headline */}
          <h1
            className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-[3.25rem]"
            style={{ color: "var(--text-primary)" }}
          >
            Understand Where Your{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Market Actually Lives
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            The GeoRepute Global Intelligence Map helps businesses understand where customer
            attention exists, which platforms dominate their industry, and what type of digital
            visibility structure fits their market.
          </p>

          {/* Supporting line */}
          <div
            className="mx-auto mt-8 max-w-xl rounded-2xl px-6 py-4"
            style={{
              background: "var(--bg-subtle)",
              border: "1px solid var(--border)",
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Different businesses require different visibility systems.{" "}
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                A local business should not market itself like a global brand.
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/global-map/explore"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              Explore the Intelligence Map
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-colors duration-200"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                background: "var(--bg-subtle)",
              }}
            >
              Analyze My Visibility
            </Link>
          </div>

        </div>
      </section>

      {/* ── Quick Explanation Strip ── */}
      <section
        className="px-6 py-14 sm:px-10"
        style={{ borderTop: "1px solid var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-3">
          {[
            {
              number: "01",
              title: "Platform Intelligence",
              body: "Discover which digital platforms dominate your industry.",
            },
            {
              number: "02",
              title: "Market Visibility Structure",
              body: "Understand whether your business requires local, regional, national, or global visibility.",
            },
            {
              number: "03",
              title: "GEON Visibility Patterns",
              body: "Explore average visibility behavior, authority structure, reviews, AI presence, and narrative strength by profession.",
            },
          ].map(({ number, title, body }) => (
            <div
              key={number}
              className="flex flex-col gap-3 rounded-2xl p-6"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                className="text-xs font-bold tracking-[0.2em]"
                style={{ color: "var(--accent-cyan)" }}
              >
                {number}
              </span>
              <h3
                className="text-base font-semibold leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
