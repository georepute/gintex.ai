"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { useLang } from "@/components/LanguageContext";
import { t, tx } from "@/lib/translations";

type PdcaPhase = {
  slug: string;
  n: string;
  title: string;
  description: string;
  accent: string;
  color: string;
};

const PHASE_STYLES = [
  { slug: "plan",  n: "1", accent: "border-sky-400 bg-sky-400/10 text-sky-500",              color: "#38bdf8" },
  { slug: "do",    n: "2", accent: "border-[#a78bfa] bg-[#a78bfa]/10 text-[#a78bfa]",        color: "#a78bfa" },
  { slug: "check", n: "3", accent: "border-[#20c997] bg-[#20c997]/10 text-[#20c997]",        color: "#20c997" },
  { slug: "act",   n: "4", accent: "border-[#2563eb] bg-[#2563eb]/10 text-[#3b82f6]",        color: "#3b82f6" },
] as const;

const CYCLE_MS = 2200;

function CoreIcon() {
  return (
    <svg className="h-8 w-8 text-sky-400" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M24 6c-4.5 0-8.5 2.2-11 5.6-.8 1.1-.7 2.6.2 3.6l2.1 2.2c.9.9 2.4 1 3.5.3 1.6-1 3.5-1.6 5.5-1.6s3.9.6 5.5 1.6c1.1.7 2.6.6 3.5-.3l2.1-2.2c.9-1 .9-2.5.1-3.6C32.5 8.2 28.5 6 24 6Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      <path
        d="M12 28c0-4 2.5-7.4 6-8.8M36 28c0-4-2.5-7.4-6-8.8M18 38c2.2 2.8 5.6 4.5 9.5 4.3 3.2-.1 6-1.4 8-3.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      <circle cx="24" cy="22" r="3.2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PhaseCard({ n, title, description, accent, color, active, index }: PdcaPhase & { active: boolean; index: number }) {
  return (
    <motion.div
      data-cursor-hover
      className="relative flex flex-col rounded-2xl p-5 sm:p-6 transition-colors duration-300"
      style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: active ? -4 : 0,
        boxShadow: active
          ? `0 16px 40px -10px ${color}44, 0 0 0 1px ${color}30`
          : "0 2px 12px -4px rgba(0,0,0,0.08)",
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.1 },
        y: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
        boxShadow: { duration: 0.5 },
      }}
      whileHover={{ y: -6 }}
    >
      {/* Top accent line */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2.5px] rounded-t-2xl"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: `linear-gradient(to right, transparent, ${color}dd, transparent)` }}
      />
      <motion.div
        className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${accent}`}
        animate={{ scale: active ? 1.08 : 1 }}
        transition={{ duration: 0.35 }}
      >
        {n}
      </motion.div>
      <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{description}</p>
    </motion.div>
  );
}

function CentreNode({ activeColor, activeTitle, coreLabel }: { activeColor: string; activeTitle: string; coreLabel: string }) {
  const [deg, setDeg] = useState(0);
  useAnimationFrame((t) => setDeg((t / 8000) * 360));

  return (
    <div className="flex flex-col items-center justify-center gap-6">

      {/* Orbit dot above */}
      <motion.div
        className="h-2 w-2 rounded-full"
        style={{ background: activeColor }}
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Core circle */}
      <motion.div
        className="relative flex flex-col items-center justify-center rounded-full border border-sky-400/30 overflow-hidden"
        style={{ width: 140, height: 140, background: "var(--bg-card)", flexShrink: 0 }}
        animate={{ boxShadow: `0 0 48px -8px ${activeColor}55, 0 0 0 1px ${activeColor}25` }}
        transition={{ duration: 0.8 }}
      >
        {/* Spinning conic layer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: `conic-gradient(from 0deg, transparent 0%, ${activeColor}35 35%, transparent 65%)` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        {/* Outer dashed ring */}
        <motion.div
          className="absolute rounded-full border border-dashed"
          style={{ inset: -18, borderColor: "var(--border)" }}
          animate={{ rotate: deg }}
        />
        {/* Inner ring */}
        <motion.div
          className="absolute rounded-full border"
          style={{ inset: -8, borderColor: "var(--border)", opacity: 0.4 }}
          animate={{ rotate: -deg * 0.6 }}
        />
        {/* Icon */}
        <motion.div
          className="relative z-10"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <CoreIcon />
        </motion.div>
        <p
          className="font-label relative z-10 mt-1.5 text-[8px] font-bold uppercase tracking-[0.24em]"
          style={{ color: "var(--text-muted)" }}
        >
          {coreLabel}
        </p>
      </motion.div>

      {/* Orbit dot below */}
      <motion.div
        className="h-2 w-2 rounded-full"
        style={{ background: activeColor }}
        animate={{ opacity: [1, 0.4, 1], scale: [1.2, 0.8, 1.2] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Active phase label */}
      <motion.div
        className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
        animate={{
          background: `${activeColor}18`,
          color: activeColor,
          borderColor: `${activeColor}40`,
        }}
        transition={{ duration: 0.4 }}
        style={{ border: "1px solid" }}
      >
        {activeTitle}
      </motion.div>
    </div>
  );
}

export function PdcaHeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const elapsed = useRef(0);
  const { lang } = useLang();

  const PHASES: readonly PdcaPhase[] = [
    { ...PHASE_STYLES[0], title: tx(t.pdca.phases.plan.title, lang),  description: tx(t.pdca.phases.plan.desc, lang) },
    { ...PHASE_STYLES[1], title: tx(t.pdca.phases.do.title, lang),    description: tx(t.pdca.phases.do.desc, lang) },
    { ...PHASE_STYLES[2], title: tx(t.pdca.phases.check.title, lang), description: tx(t.pdca.phases.check.desc, lang) },
    { ...PHASE_STYLES[3], title: tx(t.pdca.phases.act.title, lang),   description: tx(t.pdca.phases.act.desc, lang) },
  ];

  useAnimationFrame((_, delta) => {
    elapsed.current += delta;
    if (elapsed.current >= CYCLE_MS) {
      elapsed.current = 0;
      setActiveIdx((i) => (i + 1) % PHASES.length);
    }
  });

  const activeColor = PHASES[activeIdx].color;

  return (
    <section
      className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20 transition-colors duration-300"
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-page)",
        backgroundImage: `
          linear-gradient(rgba(56,189,248,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56,189,248,0.035) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
      }}
    >
      {/* Phase-reactive radial glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ background: `radial-gradient(ellipse 80% 55% at 50% 8%, ${activeColor}10, transparent 60%)` }}
        transition={{ duration: 0.9 }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">

        {/* Header */}
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-label text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-500 sm:text-xs">
            {tx(t.pdca.hero.kicker, lang)}
          </p>
          <h1
            className="mt-5 text-3xl font-bold tracking-tight sm:mt-6 sm:text-4xl md:text-[2.65rem] md:leading-[1.12] transition-colors duration-300"
            style={{ color: "var(--text-primary)" }}
          >
            {tx(t.pdca.hero.heading, lang)}
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:mt-7 sm:text-lg transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            {tx(t.pdca.hero.body, lang)}
          </p>
        </motion.header>

        {/* ── Mobile (< lg): 2×2 grid + core below ── */}
        <div className="mt-12 lg:hidden">
          <div className="mx-auto grid max-w-sm grid-cols-2 gap-3">
            {PHASES.map((phase, i) => (
              <PhaseCard key={phase.slug} {...phase} active={activeIdx === i} index={i} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <CentreNode activeColor={activeColor} activeTitle={PHASES[activeIdx].title} coreLabel={tx(t.pdca.hero.gintexCore, lang)} />
          </div>
        </div>

        {/* ── Desktop (≥ lg): left cards | centre node | right cards ── */}
        <div className="mt-16 hidden lg:flex lg:items-center lg:justify-center lg:gap-8 xl:gap-12">

          {/* Left: Plan + Check */}
          <div className="flex w-56 flex-col gap-5 xl:w-64">
            <PhaseCard {...PHASES[0]} active={activeIdx === 0} index={0} />
            <PhaseCard {...PHASES[2]} active={activeIdx === 2} index={2} />
          </div>

          {/* Centre */}
          <CentreNode activeColor={activeColor} activeTitle={PHASES[activeIdx].title} coreLabel={tx(t.pdca.hero.gintexCore, lang)} />

          {/* Right: Do + Act */}
          <div className="flex w-56 flex-col gap-5 xl:w-64">
            <PhaseCard {...PHASES[1]} active={activeIdx === 1} index={1} />
            <PhaseCard {...PHASES[3]} active={activeIdx === 3} index={3} />
          </div>

        </div>

      </div>
    </section>
  );
}
