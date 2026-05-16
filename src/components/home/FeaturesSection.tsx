"use client";

import { motion } from "framer-motion";

function AIVisibilityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="2" fill="currentColor" strokeWidth="0" opacity="0.9" />
      <circle cx="12" cy="12" r="5" strokeDasharray="2 2" opacity="0.5" />
      <circle cx="12" cy="12" r="9" strokeDasharray="3 3" opacity="0.3" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeWidth="1.6" opacity="0.6" />
      <path d="M12 12 L17 7" strokeWidth="1.8" opacity="0.85" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" strokeWidth="0" opacity="0.9" />
      <path d="M6.5 17.5 L9 15" strokeWidth="1.2" opacity="0.5" />
      <circle cx="6" cy="18" r="1" fill="currentColor" strokeWidth="0" opacity="0.5" />
    </svg>
  );
}

function ReputationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2 L20 5.5 V11 C20 15.5 16.5 19.5 12 21 C7.5 19.5 4 15.5 4 11 V5.5 Z" opacity="0.35" />
      <path d="M12 5 L17.5 7.5 V11 C17.5 14.2 15.2 17 12 18.2 C8.8 17 6.5 14.2 6.5 11 V7.5 Z" opacity="0.6" />
      <path d="M9 11.5 L11 13.5 L15 9.5" strokeWidth="1.7" opacity="0.95" />
      <path d="M19.5 3.5 C21 5 21.5 7 21 9" strokeWidth="1.2" opacity="0.4" />
      <path d="M4.5 3.5 C3 5 2.5 7 3 9" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

function GrowthIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 19 L8 13 L12 15.5 L19 6" strokeWidth="1.8" opacity="0.9" />
      <circle cx="3" cy="19" r="1.5" fill="currentColor" strokeWidth="0" opacity="0.6" />
      <circle cx="8" cy="13" r="1.5" fill="currentColor" strokeWidth="0" opacity="0.7" />
      <circle cx="12" cy="15.5" r="1.5" fill="currentColor" strokeWidth="0" opacity="0.8" />
      <circle cx="19" cy="6" r="2" fill="currentColor" strokeWidth="0" opacity="1" />
      <path d="M15 6 H19 V10" strokeWidth="1.6" opacity="0.85" />
      <path d="M3 22 H21" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

const FEATURES = [
  {
    title: "AI Visibility Intelligence",
    desc: "How AI systems represent your brand",
    body: "We audit how large language models, AI search engines, and emerging discovery platforms represent your organization. Gaps in your visibility infrastructure directly cost you authority — we close them with analytical precision.",
    Icon: AIVisibilityIcon,
    iconWrap: "from-blue-500/50 to-indigo-600/35 shadow-[0_0_28px_-6px_rgba(59,130,246,0.55)] ring-white/15",
    orb: "rgba(59,130,246,0.12)",
    topLine: "from-transparent via-sky-400/80 to-transparent",
    hoverColor: "rgba(59,130,246,0.12)",
  },
  {
    title: "Reputation & Perception Intelligence",
    desc: "How digital ecosystems shape market positioning",
    body: "Your authority is built — or eroded — across media coverage, review platforms, forums, and public narrative. We analyze, map, and strategically reposition the signals that define how markets perceive you.",
    Icon: ReputationIcon,
    iconWrap: "from-violet-500/45 to-purple-600/35 shadow-[0_0_28px_-6px_rgba(139,92,246,0.5)] ring-white/15",
    orb: "rgba(139,92,246,0.1)",
    topLine: "from-transparent via-fuchsia-400/75 to-transparent",
    hoverColor: "rgba(139,92,246,0.1)",
  },
  {
    title: "Strategic Growth Infrastructure",
    desc: "Translating intelligence into market positioning",
    body: "Intelligence without execution is just data. We build the SEO architecture, GEO content systems, and authority frameworks that compound visibility into measurable strategic growth over time.",
    Icon: GrowthIcon,
    iconWrap: "from-teal-500/45 to-cyan-600/35 shadow-[0_0_28px_-6px_rgba(20,184,166,0.48)] ring-white/15",
    orb: "rgba(20,184,166,0.1)",
    topLine: "from-transparent via-cyan-400/80 to-transparent",
    hoverColor: "rgba(20,184,166,0.1)",
  },
] as const;

export function FeaturesSection() {
  return (
    <section
      className="px-6 py-20 sm:px-10 sm:py-28 transition-colors duration-300"
      style={{ background: "var(--bg-page)", borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          className="mx-auto mb-16 max-w-3xl text-center sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight transition-colors duration-300"
            style={{ color: "var(--text-primary)" }}
          >
            We Analyze How the Market Sees You
          </h2>
          <p
            className="mt-5 max-w-2xl mx-auto text-base leading-relaxed sm:text-lg transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            Most companies invest in marketing without fully understanding how they are represented across AI systems, search engines, digital media, and public perception.
            GINTEX combines strategic consulting, proprietary analytical frameworks, and intelligence systems to help organizations make better market decisions.
          </p>
        </motion.header>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {FEATURES.map(({ title, desc, body, Icon, iconWrap, orb, topLine }, idx) => (
            <motion.article
              key={title}
              data-cursor-hover
              className="group relative flex flex-col overflow-hidden rounded-2xl p-8 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2"
              style={{
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
              }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{
                boxShadow: `0 24px 56px -12px ${orb}`,
              }}
            >
              {/* Corner orb */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${orb} 0%, transparent 70%)` }}
                aria-hidden
              />
              {/* Top accent line on hover */}
              <div
                className={`pointer-events-none absolute inset-x-6 top-0 h-[2px] rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${topLine}`}
                aria-hidden
              />
              <div
                className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:ring-white/20 ${iconWrap}`}
              >
                <Icon className="relative z-10 h-7 w-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3
                className="font-label relative text-lg font-bold uppercase tracking-[0.12em] transition-colors duration-300"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <p className="relative mt-1.5 text-xs font-medium text-sky-500">
                {desc}
              </p>
              <p
                className="relative mt-4 text-sm leading-relaxed sm:text-[0.9375rem] transition-colors duration-300"
                style={{ color: "var(--text-secondary)" }}
              >
                {body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
