"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageContext";
import { t, tx } from "@/lib/translations";

export default function GlobalMapPage() {
  const { lang } = useLang();
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
            {tx(t.globalMap.hero.chip, lang)}
          </div>

          {/* Main headline */}
          <h1
            className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-[3.25rem]"
            style={{ color: "var(--text-primary)" }}
          >
            {tx(t.globalMap.hero.heading1, lang)}{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              {tx(t.globalMap.hero.heading2, lang)}
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {tx(t.globalMap.hero.body, lang)}
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
              {tx(t.globalMap.hero.notice, lang)}{" "}
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                {tx(t.globalMap.hero.noticeB, lang)}
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
              {tx(t.globalMap.hero.cta1, lang)}
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
              {tx(t.globalMap.hero.cta2, lang)}
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
            {tx(t.globalMap.reveals.kicker, lang)}
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                number: "01",
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>),
                gradient: "from-sky-500/20 to-blue-600/10",
                iconColor: "#38bdf8",
                title: tx(t.globalMap.reveals.c1.title, lang),
                body: tx(t.globalMap.reveals.c1.body, lang),
              },
              {
                number: "02",
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>),
                gradient: "from-violet-500/20 to-purple-600/10",
                iconColor: "#a78bfa",
                title: tx(t.globalMap.reveals.c2.title, lang),
                body: tx(t.globalMap.reveals.c2.body, lang),
              },
              {
                number: "03",
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>),
                gradient: "from-teal-500/20 to-cyan-600/10",
                iconColor: "#2dd4bf",
                title: tx(t.globalMap.reveals.c3.title, lang),
                body: tx(t.globalMap.reveals.c3.body, lang),
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
              {tx(t.globalMap.whatIsMap.kicker, lang)}
            </p>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight transition-colors duration-300"
              style={{ color: "var(--text-primary)" }}
            >
              {tx(t.globalMap.whatIsMap.heading, lang)}
            </h2>
            <p
              className="mt-5 mx-auto max-w-2xl text-base leading-relaxed sm:text-lg transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
            >
              {tx(t.globalMap.whatIsMap.body, lang)}
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: tx(t.globalMap.whatIsMap.stats.s1.label, lang),
                value: "100+",
                body: tx(t.globalMap.whatIsMap.stats.s1.body, lang),
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
                label: tx(t.globalMap.whatIsMap.stats.s2.label, lang),
                value: "12",
                body: tx(t.globalMap.whatIsMap.stats.s2.body, lang),
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
                label: tx(t.globalMap.whatIsMap.stats.s3.label, lang),
                value: "4",
                body: tx(t.globalMap.whatIsMap.stats.s3.body, lang),
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
                label: tx(t.globalMap.whatIsMap.stats.s4.label, lang),
                value: "1,000+",
                body: tx(t.globalMap.whatIsMap.stats.s4.body, lang),
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
              {tx(t.globalMap.whatIsMap.helpsKicker, lang)}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                tx(t.globalMap.whatIsMap.helps.h1, lang),
                tx(t.globalMap.whatIsMap.helps.h2, lang),
                tx(t.globalMap.whatIsMap.helps.h3, lang),
                tx(t.globalMap.whatIsMap.helps.h4, lang),
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
              {tx(t.globalMap.marketStructure.kicker, lang)}
            </p>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight transition-colors duration-300"
              style={{ color: "var(--text-primary)" }}
            >
              {tx(t.globalMap.marketStructure.heading, lang)}
            </h2>
          </div>

          {/* 4 cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                tier: tx(t.globalMap.marketStructure.tiers.local.tier, lang),
                tagline: tx(t.globalMap.marketStructure.tiers.local.tagline, lang),
                channels: ["Google Maps", "Google Business", "Instagram", "Facebook"],
                bestFor: tx(t.globalMap.marketStructure.tiers.local.bestFor, lang),
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
                tier: tx(t.globalMap.marketStructure.tiers.regional.tier, lang),
                tagline: tx(t.globalMap.marketStructure.tiers.regional.tagline, lang),
                channels: ["Google Search", "Facebook", "YouTube", "Local SEO"],
                bestFor: tx(t.globalMap.marketStructure.tiers.regional.bestFor, lang),
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
                tier: tx(t.globalMap.marketStructure.tiers.national.tier, lang),
                tagline: tx(t.globalMap.marketStructure.tiers.national.tagline, lang),
                channels: ["Google", "YouTube", "PR", "SEO", "AI Visibility"],
                bestFor: tx(t.globalMap.marketStructure.tiers.national.bestFor, lang),
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
                tier: tx(t.globalMap.marketStructure.tiers.global.tier, lang),
                tagline: tx(t.globalMap.marketStructure.tiers.global.tagline, lang),
                channels: ["AI Search", "YouTube", "LinkedIn", "GEO", "Multilingual"],
                bestFor: tx(t.globalMap.marketStructure.tiers.global.bestFor, lang),
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
                  {tx(t.globalMap.marketStructure.dominantChannels, lang)}
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
                  {tx(t.globalMap.marketStructure.bestFor, lang)}
                </p>
                <p className="mt-auto text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {bestFor}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How the Intelligence Model Works (Legal/Trust) ── */}
      <section
        className="px-6 py-20 sm:px-10 sm:py-28 transition-colors duration-300"
        style={{ background: "var(--bg-page)", borderTop: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--accent-cyan)" }}>{tx(t.globalMap.intelligenceModel.kicker, lang)}</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight" style={{ color: "var(--text-primary)" }}>
                {tx(t.globalMap.intelligenceModel.heading, lang)}
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {tx(t.globalMap.intelligenceModel.body1, lang)}
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {tx(t.globalMap.intelligenceModel.body2, lang)}{" "}<span className="font-semibold" style={{ color: "var(--text-primary)" }}>{tx(t.globalMap.intelligenceModel.body2b, lang)}</span>
              </p>
              <div
                className="mt-8 flex items-start gap-4 rounded-2xl px-6 py-5"
                style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.2)" }}
              >
                <svg className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "#fb923c" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {tx(t.globalMap.intelligenceModel.warning, lang)}{" "}<strong style={{ color: "var(--text-primary)" }}>{tx(t.globalMap.intelligenceModel.warningB, lang)}</strong>{" "}{tx(t.globalMap.intelligenceModel.warningC, lang)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: tx(t.globalMap.intelligenceModel.signals.s1.label, lang), desc: tx(t.globalMap.intelligenceModel.signals.s1.desc, lang), color: "#38bdf8" },
                { label: tx(t.globalMap.intelligenceModel.signals.s2.label, lang), desc: tx(t.globalMap.intelligenceModel.signals.s2.desc, lang), color: "#a78bfa" },
                { label: tx(t.globalMap.intelligenceModel.signals.s3.label, lang), desc: tx(t.globalMap.intelligenceModel.signals.s3.desc, lang), color: "#2dd4bf" },
                { label: tx(t.globalMap.intelligenceModel.signals.s4.label, lang), desc: tx(t.globalMap.intelligenceModel.signals.s4.desc, lang), color: "#34d399" },
              ].map(({ label, desc, color }) => (
                <div key={label} className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${color}22, transparent 70%)` }} />
                  <div className="mb-3 h-1 w-8 rounded-full" style={{ background: color }} />
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{label}</p>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Live / Dynamic Indicators ── */}
      <section
        className="px-6 py-20 sm:px-10 sm:py-28 transition-colors duration-300"
        style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--accent-cyan)" }}>{tx(t.globalMap.liveIntelligence.kicker, lang)}</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight" style={{ color: "var(--text-primary)" }}>
              {tx(t.globalMap.liveIntelligence.heading, lang)}
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {tx(t.globalMap.liveIntelligence.body, lang)}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { signal: tx(t.globalMap.liveIntelligence.signals.s1, lang), color: "#34d399", icon: "↑", delay: "0s",   badge: "TRENDING" },
              { signal: tx(t.globalMap.liveIntelligence.signals.s2, lang), color: "#38bdf8", icon: "◈", delay: "0.4s", badge: "LIVE" },
              { signal: tx(t.globalMap.liveIntelligence.signals.s3, lang), color: "#fb923c", icon: "⚡", delay: "0.8s", badge: "ALERT" },
              { signal: tx(t.globalMap.liveIntelligence.signals.s4, lang), color: "#a78bfa", icon: "★", delay: "1.2s", badge: "SIGNAL" },
              { signal: tx(t.globalMap.liveIntelligence.signals.s5, lang), color: "#2dd4bf", icon: "◎", delay: "1.6s", badge: "ACTIVE" },
              { signal: tx(t.globalMap.liveIntelligence.signals.s6, lang), color: "#f472b6", icon: "✦", delay: "2s",   badge: "KEY" },
            ].map(({ signal, color, icon, delay, badge }) => (
              <div
                key={signal}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${color}22`,
                  boxShadow: `0 0 0 0 ${color}00`,
                }}
              >
                {/* Subtle background wash */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${color}08, transparent 60%)` }}
                />

                {/* Icon with double-ring pulse */}
                <div className="relative shrink-0">
                  <div
                    className="absolute inset-0 rounded-xl animate-ping"
                    style={{ background: `${color}18`, animationDuration: "2s", animationDelay: delay }}
                  />
                  <div
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl text-base font-bold"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}35` }}
                  >
                    {icon}
                  </div>
                </div>

                {/* Text */}
                <p className="relative flex-1 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {signal}
                </p>

                {/* Live badge */}
                <span
                  className="relative shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider"
                  style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: color,
                      boxShadow: `0 0 4px ${color}`,
                      animation: `pulse 1.5s ease-in-out infinite`,
                      animationDelay: delay,
                    }}
                  />
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compare Professions ── */}
      <section
        className="px-6 py-20 sm:px-10 sm:py-28 transition-colors duration-300"
        style={{ background: "var(--bg-page)", borderTop: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--accent-cyan)" }}>{tx(t.globalMap.compare.kicker, lang)}</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight" style={{ color: "var(--text-primary)" }}>
                {tx(t.globalMap.compare.heading, lang)}
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {tx(t.globalMap.compare.body, lang)}
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  { label: tx(t.globalMap.compare.metrics.m1, lang), color: "#38bdf8" },
                  { label: tx(t.globalMap.compare.metrics.m2, lang), color: "#a78bfa" },
                  { label: tx(t.globalMap.compare.metrics.m3, lang), color: "#2dd4bf" },
                  { label: tx(t.globalMap.compare.metrics.m4, lang), color: "#34d399" },
                  { label: tx(t.globalMap.compare.metrics.m5, lang), color: "#fb923c" },
                ].map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/global-map/explore"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
              >
                {tx(t.globalMap.compare.cta, lang)}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            {/* Visual comparison mockup */}
            <div className="flex flex-col gap-4">
              {[
                { metric: tx(t.globalMap.compare.chartMetrics.platformDominance, lang), a: 82, b: 61, colorA: "#38bdf8", colorB: "#a78bfa", labelA: "Dentist", labelB: "SaaS Brand" },
                { metric: tx(t.globalMap.compare.chartMetrics.aiPresence, lang),        a: 45, b: 91, colorA: "#38bdf8", colorB: "#a78bfa", labelA: "Dentist", labelB: "SaaS Brand" },
                { metric: tx(t.globalMap.compare.chartMetrics.competition, lang),       a: 74, b: 88, colorA: "#38bdf8", colorB: "#a78bfa", labelA: "Dentist", labelB: "SaaS Brand" },
                { metric: tx(t.globalMap.compare.chartMetrics.localSignals, lang),      a: 95, b: 12, colorA: "#38bdf8", colorB: "#a78bfa", labelA: "Dentist", labelB: "SaaS Brand" },
              ].map(({ metric, a, b, colorA, colorB, labelA, labelB }) => (
                <div key={metric} className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{metric}</span>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: colorA }} /><span style={{ color: "var(--text-muted)" }}>{labelA}</span></span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: colorB }} /><span style={{ color: "var(--text-muted)" }}>{labelB}</span></span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: "var(--bg-subtle)" }}>
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${a}%`, background: colorA }} />
                      </div>
                      <span className="w-8 text-right text-xs font-bold" style={{ color: colorA }}>{a}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: "var(--bg-subtle)" }}>
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${b}%`, background: colorB }} />
                      </div>
                      <span className="w-8 text-right text-xs font-bold" style={{ color: colorB }}>{b}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Heatmap / Visual Layers ── */}
      <section
        className="px-6 py-20 sm:px-10 sm:py-28 transition-colors duration-300"
        style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--accent-cyan)" }}>{tx(t.globalMap.heatmap.kicker, lang)}</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight" style={{ color: "var(--text-primary)" }}>
              {tx(t.globalMap.heatmap.heading, lang)}
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {tx(t.globalMap.heatmap.body, lang)}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: tx(t.globalMap.heatmap.layers.l1.label, lang), desc: tx(t.globalMap.heatmap.layers.l1.desc, lang), color: "#ef4444", orb: "rgba(239,68,68,0.1)", topLine: "from-transparent via-red-400/80 to-transparent", iconWrap: "from-red-500/50 to-orange-500/35 shadow-[0_0_28px_-6px_rgba(239,68,68,0.5)] ring-white/15", intensity: 87,
                icon: <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
              },
              { label: tx(t.globalMap.heatmap.layers.l2.label, lang), desc: tx(t.globalMap.heatmap.layers.l2.desc, lang), color: "#38bdf8", orb: "rgba(56,189,248,0.1)", topLine: "from-transparent via-sky-400/80 to-transparent", iconWrap: "from-sky-500/50 to-blue-600/35 shadow-[0_0_28px_-6px_rgba(14,165,233,0.55)] ring-white/15", intensity: 72,
                icon: <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
              },
              { label: tx(t.globalMap.heatmap.layers.l3.label, lang), desc: tx(t.globalMap.heatmap.layers.l3.desc, lang), color: "#a78bfa", orb: "rgba(167,139,250,0.1)", topLine: "from-transparent via-violet-400/75 to-transparent", iconWrap: "from-violet-500/45 to-purple-600/35 shadow-[0_0_28px_-6px_rgba(139,92,246,0.5)] ring-white/15", intensity: 65,
                icon: <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
              },
              { label: tx(t.globalMap.heatmap.layers.l4.label, lang), desc: tx(t.globalMap.heatmap.layers.l4.desc, lang), color: "#2dd4bf", orb: "rgba(45,212,191,0.1)", topLine: "from-transparent via-teal-400/80 to-transparent", iconWrap: "from-teal-500/45 to-cyan-600/35 shadow-[0_0_28px_-6px_rgba(20,184,166,0.48)] ring-white/15", intensity: 54,
                icon: <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/><path d="M12 6v6l4 2"/></svg>,
              },
            ].map(({ label, desc, color, orb, topLine, iconWrap, intensity, icon }) => (
              <article
                key={label}
                className="group relative flex flex-col overflow-hidden rounded-2xl p-8 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2"
                style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
              >
                {/* Corner orb */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${orb} 0%, transparent 70%)` }} aria-hidden />
                {/* Top accent line */}
                <div className={`pointer-events-none absolute inset-x-6 top-0 h-[2px] rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${topLine}`} aria-hidden />

                {/* Icon */}
                <div className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 transition-transform duration-300 group-hover:scale-105 group-hover:ring-white/20 ${iconWrap}`}>
                  {icon}
                </div>

                {/* Label + intensity */}
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="font-label text-sm font-bold uppercase tracking-[0.12em]" style={{ color: "var(--text-primary)" }}>{label}</h3>
                  <span className="shrink-0 text-lg font-black" style={{ color }}>{intensity}%</span>
                </div>

                {/* Progress bar */}
                <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--bg-subtle)" }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${intensity}%`, background: `linear-gradient(to right, ${color}99, ${color})` }} />
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA — Connect to GeoRepute ── */}
      <section
        className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32 transition-colors duration-300"
        style={{ background: "var(--bg-strip)", borderTop: "1px solid var(--border)" }}
      >
        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div style={{ position: "absolute", left: "20%", top: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.1), transparent 70%)", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", right: "15%", bottom: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)", filter: "blur(80px)" }} />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--accent-cyan)" }}>
            {tx(t.globalMap.finalCta.kicker, lang)}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl" style={{ color: "#f8fafc" }}>
            {tx(t.globalMap.finalCta.heading1, lang)}{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              {tx(t.globalMap.finalCta.heading2, lang)}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed" style={{ color: "rgba(248,250,252,0.6)" }}>
            {tx(t.globalMap.finalCta.body, lang)}
          </p>

          {/* Expansion list */}
          <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2 text-left">
            {[
              { item: tx(t.globalMap.finalCta.items.i1, lang), color: "#38bdf8" },
              { item: tx(t.globalMap.finalCta.items.i2, lang), color: "#a78bfa" },
              { item: tx(t.globalMap.finalCta.items.i3, lang), color: "#2dd4bf" },
              { item: tx(t.globalMap.finalCta.items.i4, lang), color: "#34d399" },
              { item: tx(t.globalMap.finalCta.items.i5, lang), color: "#fb923c" },
              { item: tx(t.globalMap.finalCta.items.i6, lang), color: "#f472b6" },
            ].map(({ item, color }) => (
              <div key={item} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                <span className="text-sm" style={{ color: "rgba(248,250,252,0.75)" }}>{item}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
            >
              {tx(t.globalMap.finalCta.cta1, lang)}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-colors duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(248,250,252,0.85)", background: "rgba(255,255,255,0.05)" }}
            >
              {tx(t.globalMap.finalCta.cta2, lang)}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
