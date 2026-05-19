"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { t, tx } from "@/lib/translations";

const BLOCK_STYLES = [
  { brand: "GeoRepute",        color: "from-sky-500/40 to-blue-600/30",    glow: "rgba(56,189,248,0.5)",  ring: "rgba(56,189,248,0.25)",  dot: "bg-sky-400",    tag: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  { brand: "OnlinePerception", color: "from-violet-500/40 to-purple-600/30", glow: "rgba(139,92,246,0.5)", ring: "rgba(139,92,246,0.25)", dot: "bg-violet-400", tag: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  { brand: "GINTEX",           color: "from-teal-500/40 to-cyan-600/30",   glow: "rgba(20,184,166,0.5)",  ring: "rgba(20,184,166,0.25)",  dot: "bg-teal-400",   tag: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
] as const;

export function EcosystemSection() {
  const { lang } = useLang();

  const BLOCKS = [
    { ...BLOCK_STYLES[0], purpose: tx(t.ecosystem.b1.purpose, lang), desc: tx(t.ecosystem.b1.desc, lang) },
    { ...BLOCK_STYLES[1], purpose: tx(t.ecosystem.b2.purpose, lang), desc: tx(t.ecosystem.b2.desc, lang) },
    { ...BLOCK_STYLES[2], purpose: tx(t.ecosystem.b3.purpose, lang), desc: tx(t.ecosystem.b3.desc, lang) },
  ];
  return (
    /* Always a dark strip regardless of theme — acts as a section separator */
    <section className="relative overflow-hidden bg-[#080c12] px-6 py-24 sm:px-10 sm:py-32">

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
        style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">

        <motion.header
          className="mx-auto mb-16 max-w-2xl text-center sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.6rem] md:leading-tight">
            {tx(t.ecosystem.heading, lang)}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-400 sm:text-lg">
            {tx(t.ecosystem.sub, lang)}
          </p>
        </motion.header>

        <div className="grid gap-6 md:grid-cols-3">
          {BLOCKS.map(({ brand, purpose, desc, color, glow, ring, dot, tag }, idx) => (
            <motion.div
              key={brand}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-transparent p-7 backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.03) inset" }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{
                boxShadow: `0 20px 48px -12px ${glow.replace("0.5", "0.2")}, 0 0 0 1px ${ring} inset`,
              }}
            >
              <div
                className={`pointer-events-none absolute inset-x-6 top-0 h-[1.5px] rounded-full bg-gradient-to-r ${color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle, ${glow.replace("0.5", "0.25")} 0%, transparent 70%)` }}
              />
              <div className="mb-5 flex items-center gap-3">
                <motion.span
                  className={`h-2.5 w-2.5 rounded-full ${dot}`}
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 0.75, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                />
                <span className="font-mono text-lg font-bold tracking-tight text-white">
                  {brand}
                </span>
              </div>
              <span className={`mb-4 inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tag}`}>
                {purpose}
              </span>
              <p className="mt-auto text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-16 flex max-w-lg flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-sky-500/50" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
              {tx(t.ecosystem.unifiedLayer, lang)}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-sky-500/50" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
