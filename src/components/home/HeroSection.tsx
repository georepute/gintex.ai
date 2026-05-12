"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import heroImage from "@/Gintex-images/Main img 1.png";

// Stagger container — children animate in sequence
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

// Floating ambient particle
function GlowOrb({
  x, y, size, color, dur, delay,
}: {
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

  // Parallax on scroll — image drifts up slightly as user scrolls
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageY = useSpring(rawY, { stiffness: 60, damping: 20 });

  // Subtle gradient orb follows scroll
  const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 pb-16 pt-20 sm:px-10 sm:pt-24 lg:pb-24 lg:pt-28 xl:pt-32"
    >
      {/* ── Animated ambient orbs ── */}
      <GlowOrb x="72%" y="-8%"  size={600} color="rgba(34,211,238,0.09)"  dur={7}  delay={0}   />
      <GlowOrb x="85%" y="55%"  size={360} color="rgba(99,102,241,0.07)"  dur={9}  delay={1.5} />
      <GlowOrb x="10%" y="80%"  size={280} color="rgba(56,189,248,0.05)"  dur={8}  delay={3}   />

      {/* ── Static gradient overlays ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: rawOpacity }}
        aria-hidden
      >
        <div className="h-full w-full bg-[radial-gradient(ellipse_85%_55%_at_75%_-10%,rgba(34,211,238,0.13),transparent_55%)]" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.45))]" aria-hidden />

      {/* ── Subtle grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />

      {/* ── Moving light streak ── */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(56,189,248,0) 20%, rgba(56,189,248,0.6) 50%, rgba(56,189,248,0) 80%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        aria-hidden
      />

      {/* ── Content grid ── */}
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-y-12 lg:gap-x-28 xl:gap-x-40">

        {/* ── Left: text ── */}
        <motion.div
          className="flex max-w-xl flex-col gap-8 lg:max-w-none"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <motion.div
              className="font-label inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:text-xs"
              whileHover={{ borderColor: "rgba(56,189,248,0.45)", background: "rgba(56,189,248,0.07)" }}
              transition={{ duration: 0.25 }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-sky-400"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.65, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              Marketing Evolution
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            variants={fadeUp}
          >
            AI Visibility, Reputation &{" "}
            <motion.span
              className="relative inline-block bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Market Intelligence
            </motion.span>
          </motion.h1>

          {/* Body */}
          <motion.p
            className="max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg"
            variants={fadeUp}
          >
            GINTEX helps businesses improve AI visibility, online reputation, GEO presence, SEO
            performance, digital authority, and strategic market positioning through intelligence-driven
            systems.
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
                Explore Intelligence Systems
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="shrink-0 rounded-full border border-white/25"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                View Reports & Analysis
              </Link>
            </motion.div>
          </motion.div>

          {/* Authority line */}
          <motion.p
            className="flex items-center gap-2 text-[11px] font-medium text-gray-500"
            variants={fadeUp}
          >
            <span className="h-px w-5 bg-sky-500/50" />
            Powered by{" "}
            <span className="font-semibold tracking-wide text-sky-400/80">GEON Intelligence</span>
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex items-center gap-8 border-t border-white/[0.07] pt-6"
            variants={fadeUp}
          >
            {[
              { value: "3.4×", label: "Avg. ROI lift" },
              { value: "98%",  label: "Uptime SLA"   },
              { value: "500+", label: "Brands served" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <motion.span
                  className="text-xl font-bold text-white sm:text-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                >
                  {value}
                </motion.span>
                <span className="text-xs text-gray-500">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: image ── */}
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
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(34,211,238,0.12) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Rotating gradient border */}
          <motion.div
            className="absolute -inset-[1.5px] rounded-2xl"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(34,211,238,0.5) 20%, rgba(99,102,241,0.4) 50%, transparent 70%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Image card */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-cyan-500/20 ring-1 ring-white/10 shadow-[0_0_80px_-12px_rgba(34,211,238,0.45),0_25px_50px_-12px_rgba(0,0,0,0.6)]">
            <Image
              src={heroImage}
              alt="Futuristic analytics dashboard with neural network visualizations"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Glass overlay shimmer */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
            />
          </div>

          {/* Floating badge — top right */}
          <motion.div
            className="absolute -right-3 -top-3 flex items-center gap-2 rounded-xl border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-md sm:-right-5 sm:-top-4"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 0.7, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-[11px] font-semibold text-white/90">AI Live</span>
          </motion.div>

          {/* Floating metric card — bottom left */}
          <motion.div
            className="absolute -bottom-4 -left-3 rounded-xl border border-white/10 bg-black/75 px-4 py-3 backdrop-blur-md sm:-bottom-5 sm:-left-5"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.04 }}
          >
            <p className="text-[10px] font-medium uppercase tracking-widest text-sky-400/80">Perception Score</p>
            <div className="mt-1 flex items-end gap-1.5">
              <span className="text-xl font-bold text-white">94.7</span>
              <span className="mb-0.5 text-xs font-semibold text-emerald-400">▲ 12%</span>
            </div>
            {/* Animated mini bar */}
            <div className="mt-2 flex items-end gap-0.5">
              {[40, 55, 48, 70, 62, 80, 94].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[5px] rounded-sm bg-sky-500/70"
                  initial={{ height: 0 }}
                  animate={{ height: h * 0.22 }}
                  transition={{ delay: 1.3 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
