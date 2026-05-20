"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { t, tx } from "@/lib/translations";

const SIGNAL_ICONS = [
  "M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z",
  "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z",
  "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  "M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10m6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v14",
  "M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z",
] as const;

const REPORT_STYLES = [
  { grad: "from-sky-500 to-cyan-400",      bg: "rgba(14,165,233,0.08)",  border: "rgba(14,165,233,0.2)"  },
  { grad: "from-violet-500 to-purple-400", bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.2)"  },
  { grad: "from-teal-500 to-emerald-400",  bg: "rgba(20,184,166,0.08)",  border: "rgba(20,184,166,0.2)"  },
  { grad: "from-blue-500 to-indigo-400",   bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.2)"  },
  { grad: "from-cyan-500 to-sky-400",      bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.2)"   },
  { grad: "from-indigo-500 to-blue-400",   bg: "rgba(79,70,229,0.08)",   border: "rgba(79,70,229,0.2)"   },
  { grad: "from-rose-500 to-pink-400",     bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.2)"   },
  { grad: "from-amber-500 to-yellow-400",  bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)"  },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };

export function GeoReputeSection() {
  const { lang } = useLang();

  const SIGNALS = [
    { label: tx(t.georepute.signals.ai, lang),          icon: SIGNAL_ICONS[0] },
    { label: tx(t.georepute.signals.reputation, lang),  icon: SIGNAL_ICONS[1] },
    { label: tx(t.georepute.signals.perception, lang),  icon: SIGNAL_ICONS[2] },
    { label: tx(t.georepute.signals.authority, lang),   icon: SIGNAL_ICONS[3] },
    { label: tx(t.georepute.signals.search, lang),      icon: SIGNAL_ICONS[4] },
    { label: tx(t.georepute.signals.competitive, lang), icon: SIGNAL_ICONS[5] },
    { label: tx(t.georepute.signals.narrative, lang),   icon: SIGNAL_ICONS[6] },
  ];

  const REPORTS = [
    { label: tx(t.georepute.reports.r1, lang), ...REPORT_STYLES[0] },
    { label: tx(t.georepute.reports.r2, lang), ...REPORT_STYLES[1] },
    { label: tx(t.georepute.reports.r3, lang), ...REPORT_STYLES[2] },
    { label: tx(t.georepute.reports.r4, lang), ...REPORT_STYLES[3] },
    { label: tx(t.georepute.reports.r5, lang), ...REPORT_STYLES[4] },
    { label: tx(t.georepute.reports.r6, lang), ...REPORT_STYLES[5] },
    { label: tx(t.georepute.reports.r7, lang), ...REPORT_STYLES[6] },
    { label: tx(t.georepute.reports.r8, lang), ...REPORT_STYLES[7] },
  ];

  return (
    <>
      {/* ── GeoRepute Engine ── */}
      <section
        className="relative overflow-hidden px-6 py-20 sm:px-10 sm:py-28 transition-colors duration-300"
        style={{ background: "var(--bg-page)", borderTop: "1px solid var(--border)" }}
      >
        {/* ambient glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* header */}
          <motion.div className="mb-16 text-center" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p className="font-label text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-500 sm:text-xs" variants={fadeUp}>
              {tx(t.georepute.kicker, lang)}
            </motion.p>
            <motion.h2
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] transition-colors duration-300"
              style={{ color: "var(--text-primary)" }}
              variants={fadeUp}
            >
              {tx(t.georepute.heading, lang)}
            </motion.h2>
            <motion.p
              className="mt-5 mx-auto max-w-2xl text-base leading-relaxed sm:text-lg transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
              variants={fadeUp}
            >
              {tx(t.georepute.sub, lang)}
            </motion.p>
          </motion.div>

          {/* two-col layout: label left, signals grid right */}
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* left: engine badge + description */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* badge */}
              <div className="mb-8 inline-flex items-center gap-3 rounded-2xl px-5 py-3"
                style={{ border: "1px solid rgba(14,165,233,0.25)", background: "rgba(14,165,233,0.07)" }}>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(99,102,241,0.2))", border: "1px solid rgba(14,165,233,0.3)" }}>
                  <svg className="h-4.5 w-4.5 text-sky-400" style={{ height: 18, width: 18 }} viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold transition-colors duration-300" style={{ color: "var(--text-primary)" }}>{tx(t.georepute.badgeTitle, lang)}</p>
                  <p className="text-[11px] transition-colors duration-300" style={{ color: "var(--text-muted)" }}>{tx(t.georepute.badgeSub, lang)}</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold leading-snug mb-4 transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                {tx(t.georepute.h3, lang)}
              </h3>
              <p className="text-base leading-relaxed mb-8 transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>
                {tx(t.georepute.body, lang)}
              </p>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 hover:shadow-sky-500/30"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)", boxShadow: "0 8px 32px rgba(14,165,233,0.25)" }}
              >
                {tx(t.georepute.cta, lang)}
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>

            {/* right: signals grid */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {SIGNALS.map(({ label, icon }) => (
                <motion.div
                  key={label}
                  className="group flex flex-col gap-3 rounded-xl p-4 transition-all duration-200"
                  style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
                  variants={fadeUp}
                  whileHover={{ borderColor: "rgba(14,165,233,0.35)", scale: 1.02, transition: { duration: 0.15 } }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.15)" }}>
                    <svg className="h-4 w-4 text-sky-400" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={icon} stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium leading-snug transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Intelligence Reports ── */}
      <section
        className="relative overflow-hidden px-6 py-20 sm:px-10 sm:py-28 transition-colors duration-300"
        style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div className="mb-14 text-center" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p className="font-label text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-500 sm:text-xs" variants={fadeUp}>
              {tx(t.georepute.reportsKicker, lang)}
            </motion.p>
            <motion.h2
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] transition-colors duration-300"
              style={{ color: "var(--text-primary)" }}
              variants={fadeUp}
            >
              {tx(t.georepute.reportsHeading, lang)}
            </motion.h2>
            <motion.p
              className="mt-5 mx-auto max-w-2xl text-base leading-relaxed sm:text-lg transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
              variants={fadeUp}
            >
              {lang === "he" ? (
                <>כולל למעלה מ-<span className="font-semibold" style={{ color: "var(--text-primary)" }}>{tx(t.georepute.reportsSub70, lang)}</span> שנועדו לעזור לארגונים להבין את מיצובם האמיתי בשוק.</>
              ) : (
                <>Our infrastructure includes over{" "}<span className="font-semibold" style={{ color: "var(--text-primary)" }}>70 proprietary analytical reports</span>{" "}designed to help organizations understand their real market position.</>
              )}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {REPORTS.map(({ label, grad, bg, border }) => (
              <motion.div
                key={label}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-5 transition-all duration-200"
                style={{ border: `1px solid ${border}`, background: bg }}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {/* gradient bar top */}
                <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${grad} opacity-70`} />
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${grad} opacity-20`} />
                <p className="text-sm font-semibold leading-snug transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                  {label}
                </p>
                <div className="mt-auto flex items-center gap-1 text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                  <svg className="h-3 w-3 opacity-60" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M2 8h12M8 2v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {tx(t.georepute.propFramework, lang)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
