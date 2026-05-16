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
      <section className="relative overflow-hidden px-6 py-20 sm:px-10" style={{ background: "var(--bg-page)" }}>
        {/* Subtle divider glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(14,165,233,0.3), transparent)" }} />

        <div className="mx-auto max-w-5xl">
          {/* Section label */}
          <p className="mb-12 text-center text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--accent-cyan)" }}>
            What the map reveals
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                number: "01",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                ),
                gradient: "from-sky-500/20 to-blue-600/10",
                iconColor: "#38bdf8",
                title: "Platform Intelligence",
                body: "Discover which digital platforms dominate your industry and where your competitors are winning attention.",
              },
              {
                number: "02",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
                  </svg>
                ),
                gradient: "from-violet-500/20 to-purple-600/10",
                iconColor: "#a78bfa",
                title: "Market Visibility Structure",
                body: "Understand whether your business requires local, regional, national, or global visibility — and build accordingly.",
              },
              {
                number: "03",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
                  </svg>
                ),
                gradient: "from-teal-500/20 to-cyan-600/10",
                iconColor: "#2dd4bf",
                title: "GEON Visibility Patterns",
                body: "Explore visibility behavior, authority structure, reviews, AI presence, and narrative strength by profession.",
              },
            ].map(({ number, icon, gradient, iconColor, title, body }) => (
              <div
                key={number}
                className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Hover gradient wash */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                {/* Top row: icon + number */}
                <div className="relative flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background: `${iconColor}18`,
                      border: `1px solid ${iconColor}30`,
                      color: iconColor,
                    }}
                  >
                    {icon}
                  </div>
                  <span
                    className="text-3xl font-black leading-none tabular-nums"
                    style={{ color: "var(--border)", letterSpacing: "-0.05em" }}
                  >
                    {number}
                  </span>
                </div>

                {/* Text */}
                <div className="relative flex flex-col gap-2">
                  <h3
                    className="text-base font-bold leading-snug"
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

                {/* Bottom accent line */}
                <div
                  className="relative mt-auto h-px w-full rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(to right, ${iconColor}, transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Is This Map? ── */}
      <section
        className="px-6 py-20 sm:px-10 sm:py-28 transition-colors duration-300"
        style={{ background: "var(--bg-page)", borderTop: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--accent-cyan)" }}>
              What is this map?
            </p>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight transition-colors duration-300"
              style={{ color: "var(--text-primary)" }}
            >
              What Is the Global Intelligence Map?
            </h2>
            <p
              className="mt-5 mx-auto max-w-2xl text-base leading-relaxed sm:text-lg transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
            >
              The Global Intelligence Map is an interactive visibility intelligence system developed by GeoRepute.
              It analyzes industries, digital behavior, platform relevance, customer attention patterns, and visibility
              structures across modern search and AI ecosystems.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Industries Mapped",
                value: "100+",
                body: "Covering a broad range of business categories and market verticals.",
                iconWrap: "from-blue-500/50 to-indigo-600/35 shadow-[0_0_28px_-6px_rgba(59,130,246,0.55)] ring-white/15",
                orb: "rgba(59,130,246,0.12)",
                topLine: "from-transparent via-sky-400/80 to-transparent",
                icon: (
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" />
                  </svg>
                ),
              },
              {
                label: "Platforms Tracked",
                value: "12",
                body: "From Google and Instagram to AI-first discovery platforms.",
                iconWrap: "from-violet-500/45 to-purple-600/35 shadow-[0_0_28px_-6px_rgba(139,92,246,0.5)] ring-white/15",
                orb: "rgba(139,92,246,0.1)",
                topLine: "from-transparent via-fuchsia-400/75 to-transparent",
                icon: (
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
                  </svg>
                ),
              },
              {
                label: "Visibility Levels",
                value: "4",
                body: "Local, regional, national, and global — each with its own structure.",
                iconWrap: "from-teal-500/45 to-cyan-600/35 shadow-[0_0_28px_-6px_rgba(20,184,166,0.48)] ring-white/15",
                orb: "rgba(20,184,166,0.1)",
                topLine: "from-transparent via-cyan-400/80 to-transparent",
                icon: (
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                  </svg>
                ),
              },
              {
                label: "Professions Analyzed",
                value: "1,000+",
                body: "Detailed visibility profiles across every major profession and niche.",
                iconWrap: "from-orange-500/45 to-amber-600/35 shadow-[0_0_28px_-6px_rgba(251,146,60,0.48)] ring-white/15",
                orb: "rgba(251,146,60,0.1)",
                topLine: "from-transparent via-orange-400/80 to-transparent",
                icon: (
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
            ].map(({ label, value, body, icon, iconWrap, orb, topLine }) => (
              <article
                key={label}
                className="group relative flex flex-col overflow-hidden rounded-2xl p-8 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2"
                style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
              >
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${orb} 0%, transparent 70%)` }}
                  aria-hidden
                />
                <div
                  className={`pointer-events-none absolute inset-x-6 top-0 h-[2px] rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${topLine}`}
                  aria-hidden
                />
                <div className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:ring-white/20 ${iconWrap}`}>
                  {icon}
                </div>
                <p className="text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>{value}</p>
                <h3 className="font-label mt-1 text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                  {label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>
                  {body}
                </p>
              </article>
            ))}
          </div>

          {/* What it helps understand */}
          <div
            className="mt-12 rounded-2xl p-8 transition-colors duration-300"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.12em]" style={{ color: "var(--text-primary)" }}>
              The system helps businesses understand
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Where their audience actually spends attention",
                "Which platforms matter most in their market",
                "How visibility differs between industries",
                "What type of digital presence is required to compete effectively",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Market Structure Section ── */}
      <section
        className="px-6 py-20 sm:px-10 sm:py-28 transition-colors duration-300"
        style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--accent-cyan)" }}>
              Market Structure
            </p>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight transition-colors duration-300"
              style={{ color: "var(--text-primary)" }}
            >
              Different Markets Require Different Visibility Strategies
            </h2>
          </div>

          {/* 4 cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                tier: "Local",
                tagline: "Focused on nearby customer intent, reviews, maps, and trust signals.",
                channels: ["Google Maps", "Google Business", "Instagram", "Facebook"],
                bestFor: "Restaurants, clinics, salons, gyms, local services.",
                iconWrap: "from-emerald-500/50 to-teal-600/35 shadow-[0_0_28px_-6px_rgba(16,185,129,0.55)] ring-white/15",
                orb: "rgba(16,185,129,0.12)",
                topLine: "from-transparent via-emerald-400/80 to-transparent",
                accent: "#34d399",
                icon: (
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
              },
              {
                tier: "Regional",
                tagline: "Focused on geographic expansion and regional authority.",
                channels: ["Google Search", "Facebook", "YouTube", "Local SEO"],
                bestFor: "Regional companies, agencies, contractors, education.",
                iconWrap: "from-sky-500/50 to-blue-600/35 shadow-[0_0_28px_-6px_rgba(14,165,233,0.55)] ring-white/15",
                orb: "rgba(14,165,233,0.12)",
                topLine: "from-transparent via-sky-400/80 to-transparent",
                accent: "#38bdf8",
                icon: (
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 0 20M2 12h20"/>
                  </svg>
                ),
              },
              {
                tier: "National",
                tagline: "Focused on authority, consistency, and large-scale brand visibility.",
                channels: ["Google", "YouTube", "PR", "SEO", "AI Visibility"],
                bestFor: "National brands, ecommerce, SaaS, coaching brands.",
                iconWrap: "from-violet-500/45 to-purple-600/35 shadow-[0_0_28px_-6px_rgba(139,92,246,0.5)] ring-white/15",
                orb: "rgba(139,92,246,0.1)",
                topLine: "from-transparent via-violet-400/75 to-transparent",
                accent: "#a78bfa",
                icon: (
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h18v18H3z"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
                  </svg>
                ),
              },
              {
                tier: "Global",
                tagline: "Focused on international visibility and AI-driven digital ecosystems.",
                channels: ["AI Search", "YouTube", "LinkedIn", "GEO", "Multilingual"],
                bestFor: "Technology companies, AI brands, global ecommerce, international services.",
                iconWrap: "from-orange-500/45 to-amber-500/35 shadow-[0_0_28px_-6px_rgba(251,146,60,0.5)] ring-white/15",
                orb: "rgba(251,146,60,0.1)",
                topLine: "from-transparent via-orange-400/75 to-transparent",
                accent: "#fb923c",
                icon: (
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
                  </svg>
                ),
              },
            ].map(({ tier, tagline, channels, bestFor, icon, iconWrap, orb, topLine, accent }) => (
              <article
                key={tier}
                className="group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2"
                style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
              >
                {/* Corner orb */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${orb} 0%, transparent 70%)` }}
                  aria-hidden
                />
                {/* Top accent line */}
                <div
                  className={`pointer-events-none absolute inset-x-6 top-0 h-[2px] rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${topLine}`}
                  aria-hidden
                />

                {/* Icon */}
                <div className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 transition-transform duration-300 group-hover:scale-105 group-hover:ring-white/20 ${iconWrap}`}>
                  {icon}
                </div>

                {/* Tier label */}
                <p className="font-label text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                  {tier}
                </p>

                {/* Tagline */}
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {tagline}
                </p>

                {/* Divider */}
                <div className="my-5 h-px w-full" style={{ background: "var(--border)" }} />

                {/* Channels */}
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                  Dominant Channels
                </p>
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {channels.map((ch) => (
                    <span
                      key={ch}
                      className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                      style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}28` }}
                    >
                      {ch}
                    </span>
                  ))}
                </div>

                {/* Best for */}
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                  Best For
                </p>
                <p className="mt-auto text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {bestFor}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
