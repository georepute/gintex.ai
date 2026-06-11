"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { t, tx } from "@/lib/translations";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: EASE },
  },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.97, filter: "blur(6px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

function GlowOrb({ x, y, size, color, dur, delay }: {
  x: string; y: string; size: number; color: string; dur: number; delay: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: color,
        filter: "blur(72px)",
        transform: "translate(-50%,-50%)",
      }}
      animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.75, 0.5] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const { lang } = useLang();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 pb-16 pt-20 sm:px-10 sm:pt-24 lg:px-16 lg:pb-24 lg:pt-28 xl:px-20 xl:pt-32 transition-colors duration-300"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Ambient orbs */}
      <GlowOrb x="72%" y="-8%"  size={600} color="var(--orb-1)" dur={7}  delay={0}   />
      <GlowOrb x="85%" y="55%"  size={360} color="var(--orb-2)" dur={9}  delay={1.5} />
      <GlowOrb x="10%" y="80%"  size={280} color="var(--orb-3)" dur={8}  delay={3}   />

      {/* Radial gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: rawOpacity }}
        aria-hidden
      >
        <div className="h-full w-full bg-[radial-gradient(ellipse_85%_55%_at_75%_-10%,rgba(34,211,238,0.1),transparent_55%)]" />
      </motion.div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />

      {/* Moving light streak */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(56,189,248,0) 20%, rgba(56,189,248,0.5) 50%, rgba(56,189,248,0) 80%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        aria-hidden
      />

      {/* Content grid */}
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-x-12 xl:gap-x-16">

        {/* Left: text */}
        <motion.div
          className="flex max-w-xl flex-col gap-8 lg:max-w-none"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <motion.div
              className="font-label inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm sm:text-xs transition-colors duration-300"
              style={{
                border: "1px solid var(--border)",
                background: "var(--bg-subtle)",
                color: "var(--text-secondary)",
              }}
              whileHover={{ borderColor: "rgba(56,189,248,0.5)", background: "rgba(56,189,248,0.06)" }}
              transition={{ duration: 0.25 }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-sky-400"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.65, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              {tx(t.hero.badge, lang)}
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl transition-colors duration-300"
            style={{ color: "var(--text-primary)" }}
            variants={fadeUp}
          >
            {tx(t.hero.heading1, lang)}{" "}
            <motion.span
              className="relative inline-block bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              {tx(t.hero.heading2, lang)}
            </motion.span>
          </motion.h1>

          {/* Body */}
          <motion.p
            className="max-w-xl text-base leading-relaxed sm:text-lg transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
            variants={fadeUp}
          >
            {tx(t.hero.body, lang)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
            variants={fadeUp}
          >
            <motion.div
              whileHover={{ scale: 1.035, boxShadow: "0 0 28px 6px rgba(99,102,241,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="shrink-0 rounded-full"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30"
              >
                {tx(t.hero.cta1, lang)}
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="shrink-0 rounded-full"
              style={{ border: "1px solid var(--border)" }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300"
                style={{ color: "var(--text-primary)" }}
              >
                {tx(t.hero.cta2, lang)}
              </Link>
            </motion.div>
          </motion.div>

          {/* Authority line */}
          <motion.p
            className="flex items-center gap-2 text-[11px] font-medium transition-colors duration-300"
            style={{ color: "var(--text-muted)" }}
            variants={fadeUp}
          >
            <span className="h-px w-5 bg-sky-400/60" />
            {tx(t.hero.poweredBy, lang)}{" "}
            <span className="font-semibold tracking-wide text-sky-500">{tx(t.hero.infra, lang)}</span>
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex items-center gap-8 pt-6 transition-colors duration-300"
            style={{ borderTop: "1px solid var(--border)" }}
            variants={fadeUp}
          >
            {[
              { value: "3.4×", label: tx(t.hero.statRoi, lang) },
              { value: "98%",  label: tx(t.hero.statUptime, lang) },
              { value: "500+", label: tx(t.hero.statBrands, lang) },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <motion.span
                  className="text-xl font-bold sm:text-2xl transition-colors duration-300"
                  style={{ color: "var(--text-primary)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                >
                  {value}
                </motion.span>
                <span className="text-xs transition-colors duration-300" style={{ color: "var(--text-muted)" }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: image */}
        <motion.div
          className="relative w-full lg:justify-self-end"
          variants={fadeIn}
          initial="hidden"
          animate="show"
          style={{ y: imageY }}
        >
          {/* Outer glow halo */}
          <motion.div
            className="pointer-events-none absolute -inset-4 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(34,211,238,0.12) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />


          {/* Browser chrome mockup */}
          <div className="relative w-full overflow-hidden rounded-2xl border border-cyan-500/20 ring-1 ring-white/10 shadow-[0_0_80px_-12px_rgba(34,211,238,0.45),0_32px_64px_-12px_rgba(0,0,0,0.5)]"
            style={{ background: "rgba(15,23,42,0.95)" }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07]"
              style={{ background: "rgba(15,23,42,0.98)" }}
            >
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <div className="mx-auto flex items-center gap-2 rounded-md px-3 py-1 text-[11px] text-white/30"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                app.georepute.ai
              </div>
              <div className="w-14" />
            </div>

            {/* Video */}
            <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
              <video
                src="/screen-capture.webm"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full"
                style={{ objectFit: "fill", background: "rgba(10,15,30,1)" }}
              />
              {/* Shimmer sweep */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
              />
              {/* Bottom vignette */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-[rgba(10,15,30,0.6)] to-transparent" />
            </div>
          </div>

          {/* Floating badge — top right */}
          <motion.div
            className="absolute -right-3 -top-3 flex items-center gap-2 rounded-xl px-3 py-2 backdrop-blur-md shadow-md sm:-right-5 sm:-top-4 transition-colors duration-300"
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
            }}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-emerald-500"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 0.7, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-[11px] font-semibold transition-colors duration-300" style={{ color: "var(--text-primary)" }}>{tx(t.hero.aiLive, lang)}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Authority strip */}
      <div
        className="mt-14 border-y py-4 transition-colors duration-300"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6">
          {[
            tx(t.hero.strip.r1, lang),
            tx(t.hero.strip.r2, lang),
            tx(t.hero.strip.r3, lang),
            tx(t.hero.strip.r4, lang),
            tx(t.hero.strip.r5, lang),
            tx(t.hero.strip.r6, lang),
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-xs font-medium tracking-wide transition-colors duration-300"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="h-1 w-1 rounded-full bg-sky-500 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
