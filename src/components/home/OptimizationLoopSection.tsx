"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", title: "Analyze",  detail: "GeoReput scan",    icon: "⬡" },
  { n: "02", title: "Decide",   detail: "Strategy engine",  icon: "◈" },
  { n: "03", title: "Position", detail: "SEO + GEO",        icon: "◎" },
  { n: "04", title: "Execute",  detail: "Dashboard",        icon: "⬟" },
  { n: "05", title: "Improve",  detail: "Loop",             icon: "⟳" },
] as const;

const STEP_DURATION = 2600;

// ─── Background particles ─────────────────────────────────────────────────────

const BG_PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: `${Math.round((i * 37 + 5) % 95)}%`,
  y: `${Math.round((i * 53 + 10) % 85)}%`,
  size: i % 3 === 0 ? 2 : 1,
  delay: (i * 0.31) % 5,
  dur: 4 + (i % 4),
}));

function BackgroundParticle({ x, y, size, delay, dur }: {
  x: string; y: string; size: number; delay: number; dur: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: "rgba(56,189,248,0.5)",
        boxShadow: "0 0 4px 1px rgba(56,189,248,0.3)",
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 0.7, 0],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── Floating orb (blurred gradient blob) ────────────────────────────────────

function AmbientOrb({ x, y, size, color, delay }: {
  x: string; y: string; size: number; color: string; delay: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: color,
        filter: "blur(60px)",
        transform: "translate(-50%, -50%)",
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
      transition={{ duration: 6 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── Node component ───────────────────────────────────────────────────────────

function StepNode({
  step, isActive, isCompleted, index,
}: {
  step: typeof STEPS[number];
  isActive: boolean;
  isCompleted: boolean;
  index: number;
}) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Node wrapper — lifts on active */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ y: isActive ? -8 : 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Outermost ripple wave 1 */}
        {isActive && (
          <motion.div
            className="pointer-events-none absolute rounded-full"
            style={{ border: "1px solid rgba(56,189,248,0.25)", width: 72, height: 72 }}
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        {/* Outermost ripple wave 2 — offset */}
        {isActive && (
          <motion.div
            className="pointer-events-none absolute rounded-full"
            style={{ border: "1px solid rgba(56,189,248,0.15)", width: 72, height: 72 }}
            animate={{ scale: [1, 2.6], opacity: [0.4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
        )}

        {/* Rotating gradient ring */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: 84, height: 84, padding: 1.5 }}
          animate={
            isActive
              ? { rotate: 360, opacity: 1 }
              : isCompleted
              ? { rotate: 0, opacity: 0.4 }
              : { rotate: 0, opacity: 0.15 }
          }
          transition={
            isActive
              ? { rotate: { duration: 3, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }
              : { duration: 0.4 }
          }
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: isActive
                ? "conic-gradient(from 0deg, transparent 0%, rgba(56,189,248,0.9) 40%, rgba(139,92,246,0.7) 70%, transparent 100%)"
                : "conic-gradient(from 0deg, transparent 0%, rgba(56,189,248,0.4) 50%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Glass outer ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 76, height: 76,
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(8px)",
            border: "1px solid",
          }}
          animate={{
            borderColor: isActive
              ? "rgba(56,189,248,0.5)"
              : isCompleted
              ? "rgba(56,189,248,0.2)"
              : "rgba(255,255,255,0.07)",
            boxShadow: isActive
              ? "0 0 32px 8px rgba(56,189,248,0.35), inset 0 0 16px rgba(56,189,248,0.1)"
              : isCompleted
              ? "0 0 12px 2px rgba(56,189,248,0.12)"
              : "none",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Core glow blob */}
        {isActive && (
          <motion.div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: 56, height: 56,
              background: "radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Inner core circle */}
        <motion.div
          className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full"
          animate={{
            background: isActive
              ? "linear-gradient(135deg, rgba(56,189,248,0.22) 0%, rgba(8,8,16,0.98) 100%)"
              : isCompleted
              ? "linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(8,8,16,0.98) 100%)"
              : "linear-gradient(135deg, rgba(30,30,40,0.95) 0%, rgba(8,8,16,0.98) 100%)",
            boxShadow: isActive
              ? "0 0 0 1px rgba(56,189,248,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
              : isCompleted
              ? "0 0 0 1px rgba(56,189,248,0.18), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Number */}
          <motion.span
            className="select-none font-mono text-base font-bold tabular-nums"
            animate={{
              color: isActive
                ? "rgb(224,242,254)"
                : isCompleted
                ? "rgb(125,211,252)"
                : "rgb(71,120,136)",
              textShadow: isActive
                ? "0 0 12px rgba(56,189,248,0.9)"
                : "none",
            }}
            transition={{ duration: 0.4 }}
          >
            {step.n}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Glass info card */}
      <motion.div
        className="relative mt-7 w-[9.5rem] overflow-hidden rounded-xl"
        animate={{
          background: isActive
            ? "rgba(56,189,248,0.07)"
            : isCompleted
            ? "rgba(56,189,248,0.03)"
            : "rgba(255,255,255,0.02)",
          borderColor: isActive
            ? "rgba(56,189,248,0.3)"
            : isCompleted
            ? "rgba(56,189,248,0.12)"
            : "rgba(255,255,255,0.05)",
          boxShadow: isActive
            ? "0 8px 32px rgba(56,189,248,0.12), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "none",
          y: isActive ? -2 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          border: "1px solid",
          backdropFilter: "blur(12px)",
          padding: "14px 16px 16px",
        }}
      >
        {/* Active accent bar at top */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-[2px]"
          animate={{
            background: isActive
              ? "linear-gradient(to right, transparent, rgba(56,189,248,0.9), rgba(139,92,246,0.7), transparent)"
              : "transparent",
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />

        <motion.p
          className="text-[11px] font-semibold uppercase tracking-[0.18em]"
          animate={{
            color: isActive
              ? "rgba(56,189,248,0.85)"
              : isCompleted
              ? "rgba(56,189,248,0.45)"
              : "rgba(255,255,255,0.18)",
          }}
          transition={{ duration: 0.4 }}
        >
          {step.n}
        </motion.p>

        <motion.h3
          className="mt-1.5 text-[1.05rem] font-bold leading-tight tracking-tight"
          animate={{
            color: isActive ? "rgb(255,255,255)" : isCompleted ? "rgb(186,230,253)" : "rgb(100,110,120)",
          }}
          transition={{ duration: 0.4 }}
        >
          {step.title}
        </motion.h3>

        <motion.p
          className="mt-1.5 text-[0.8rem] leading-snug"
          animate={{
            color: isActive ? "rgb(148,212,240)" : isCompleted ? "rgb(103,180,210)" : "rgb(75,85,95)",
          }}
          transition={{ duration: 0.4 }}
        >
          {step.detail}
        </motion.p>

        {/* Active shimmer overlay */}
        {isActive && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(56,189,248,0.07) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function OptimizationLoopSection() {
  const [active, setActive] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const sectionRef = useRef<HTMLElement>(null);

  // Cycle active step
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, []);

  // Mouse parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 24);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 12);
  }, [mouseX, mouseY]);

  const beamProgress = active / (STEPS.length - 1);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#020408] px-6 py-28 sm:px-10 sm:py-32"
    >
      {/* ── Ambient orbs ── */}
      <AmbientOrb x="20%" y="40%"  size={400} color="rgba(56,189,248,0.06)"  delay={0} />
      <AmbientOrb x="80%" y="60%"  size={350} color="rgba(139,92,246,0.05)"  delay={1.5} />
      <AmbientOrb x="50%" y="80%"  size={500} color="rgba(56,189,248,0.04)"  delay={3} />

      {/* ── Background particles ── */}
      {BG_PARTICLES.map((p) => (
        <BackgroundParticle key={p.id} x={p.x} y={p.y} size={p.size} delay={p.delay} dur={p.dur} />
      ))}

      {/* ── Subtle noise texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Top edge glow ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(90%,72rem)] -translate-x-1/2"
        style={{
          background: "linear-gradient(to right, transparent, rgba(56,189,248,0.5), rgba(139,92,246,0.4), transparent)",
        }}
      />

      {/* ── Parallax layer ── */}
      <motion.div
        className="relative mx-auto max-w-6xl"
        style={{ x: springX, y: springY }}
      >
        {/* ── Heading ── */}
        <motion.header
          className="mx-auto mb-20 max-w-2xl text-center sm:mb-24"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: "rgba(56,189,248,0.07)",
              border: "1px solid rgba(56,189,248,0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-sky-400"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 0.7, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400/90">
              Live Pipeline
            </span>
          </motion.div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.6rem] md:leading-[1.15]">
            A Continuous{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, rgb(56,189,248) 0%, rgb(139,92,246) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Optimization Loop
            </span>
          </h2>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-sky-400/70">
            From analyze to improve
          </p>
        </motion.header>

        {/* ══════════════════════ DESKTOP ══════════════════════ */}
        <div className="relative hidden md:block">

          {/* Subtle grid under timeline */}
          <div
            className="pointer-events-none absolute -bottom-12 left-0 right-0 top-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* ── Timeline line system ── */}
          <div className="absolute left-[6%] right-[6%] top-9 z-0">

            {/* Base track */}
            <div
              className="h-px w-full"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 10%, rgba(255,255,255,0.06) 90%, transparent)",
              }}
            />

            {/* Completed fill */}
            <motion.div
              className="absolute left-0 top-0 h-px origin-left"
              style={{
                background: "linear-gradient(to right, rgba(56,189,248,0.6), rgba(139,92,246,0.5))",
                boxShadow: "0 0 6px 2px rgba(56,189,248,0.25)",
              }}
              animate={{ scaleX: beamProgress, width: "100%" }}
              transition={{ duration: (STEP_DURATION / 1000) * 0.9, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Traveling glow head */}
            <motion.div
              className="absolute top-1/2 h-[3px] w-12 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(56,189,248,0.95), rgba(255,255,255,0.9), rgba(56,189,248,0.95), transparent)",
                boxShadow: "0 0 12px 4px rgba(56,189,248,0.6), 0 0 24px 8px rgba(56,189,248,0.2)",
                left: `calc(${beamProgress * 100}% - 24px)`,
              }}
              animate={{ left: `calc(${beamProgress * 100}% - 24px)` }}
              transition={{ duration: (STEP_DURATION / 1000) * 0.9, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* ── Step nodes ── */}
          <div className="relative z-10 flex justify-between">
            {STEPS.map((step, idx) => (
              <StepNode
                key={step.n}
                step={step}
                isActive={idx === active}
                isCompleted={idx < active}
                index={idx}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════ MOBILE ══════════════════════ */}
        {/* NODE_W = 52px (3.25rem). Track centre = 26px from left edge of row */}
        <div className="relative md:hidden">

          {/* Vertical track — centred on the 52 px node column */}
          <div
            className="pointer-events-none absolute bottom-0 top-0"
            style={{ left: 26, width: 1 }}
          >
            {/* base */}
            <div className="h-full w-full" style={{ background: "rgba(255,255,255,0.07)" }} />

            {/* progress fill */}
            <motion.div
              className="absolute left-0 top-0 w-full origin-top"
              style={{
                background: "linear-gradient(to bottom, rgba(56,189,248,0.7), rgba(139,92,246,0.5))",
                boxShadow: "0 0 5px 2px rgba(56,189,248,0.25)",
              }}
              animate={{ scaleY: beamProgress, height: "100%" }}
              transition={{ duration: (STEP_DURATION / 1000) * 0.9, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* traveling glow head */}
            <motion.div
              className="absolute w-[3px] rounded-full"
              style={{
                left: -1,
                height: 32,
                background: "linear-gradient(to bottom, transparent, rgba(56,189,248,0.95), rgba(255,255,255,0.9), transparent)",
                boxShadow: "0 0 10px 3px rgba(56,189,248,0.55)",
                top: `calc(${beamProgress * 100}% - 16px)`,
              }}
              animate={{ top: `calc(${beamProgress * 100}% - 16px)` }}
              transition={{ duration: (STEP_DURATION / 1000) * 0.9, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {STEPS.map((step, idx) => {
            const isActive = idx === active;
            const isCompleted = idx < active;

            return (
              <motion.div
                key={step.n}
                className="relative flex items-center gap-4 py-3"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: "easeOut" }}
              >
                {/* ── Node (52×52) ── */}
                <div className="relative z-10 shrink-0" style={{ width: 52, height: 52 }}>
                  {/* ripple ring */}
                  {isActive && (
                    <motion.div
                      className="pointer-events-none absolute rounded-full"
                      style={{ inset: -7, border: "1px solid rgba(56,189,248,0.45)" }}
                      animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  {/* core circle */}
                  <motion.div
                    className="flex h-full w-full items-center justify-center rounded-full"
                    animate={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(56,189,248,0.22), rgba(8,8,16,0.98))"
                        : isCompleted
                        ? "linear-gradient(135deg, rgba(56,189,248,0.08), rgba(8,8,16,0.98))"
                        : "linear-gradient(135deg, rgba(22,22,32,0.95), rgba(8,8,16,0.98))",
                      boxShadow: isActive
                        ? "0 0 0 1px rgba(56,189,248,0.5), 0 0 18px 4px rgba(56,189,248,0.28)"
                        : isCompleted
                        ? "0 0 0 1px rgba(56,189,248,0.2)"
                        : "0 0 0 1px rgba(255,255,255,0.07)",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.span
                      className="font-mono text-xs font-bold"
                      animate={{
                        color: isActive ? "rgb(224,242,254)" : isCompleted ? "rgb(125,211,252)" : "rgb(71,120,136)",
                        textShadow: isActive ? "0 0 10px rgba(56,189,248,0.9)" : "none",
                      }}
                      transition={{ duration: 0.35 }}
                    >
                      {step.n}
                    </motion.span>
                  </motion.div>
                </div>

                {/* ── Card ── */}
                <motion.div
                  className="relative flex-1 overflow-hidden rounded-2xl"
                  animate={{
                    background: isActive
                      ? "rgba(56,189,248,0.08)"
                      : isCompleted
                      ? "rgba(56,189,248,0.03)"
                      : "rgba(255,255,255,0.02)",
                    borderColor: isActive
                      ? "rgba(56,189,248,0.32)"
                      : isCompleted
                      ? "rgba(56,189,248,0.12)"
                      : "rgba(255,255,255,0.06)",
                    boxShadow: isActive
                      ? "0 4px 24px rgba(56,189,248,0.12), inset 0 1px 0 rgba(255,255,255,0.05)"
                      : "none",
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ border: "1px solid", backdropFilter: "blur(12px)", padding: "13px 16px 15px" }}
                >
                  {/* top accent line */}
                  <motion.div
                    className="absolute left-0 right-0 top-0 h-[1.5px]"
                    animate={{
                      background: isActive
                        ? "linear-gradient(to right, transparent, rgba(56,189,248,0.9), rgba(139,92,246,0.6), transparent)"
                        : "transparent",
                    }}
                    transition={{ duration: 0.35 }}
                  />

                  {/* shimmer sweep on active */}
                  {isActive && (
                    <motion.div
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={{
                        background: "linear-gradient(105deg, transparent 25%, rgba(56,189,248,0.06) 50%, transparent 75%)",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  <motion.div
                    className="mb-0.5 h-[1.5px] w-6 rounded-full"
                    animate={{
                      background: isActive
                        ? "linear-gradient(to right, rgba(56,189,248,0.9), rgba(139,92,246,0.7))"
                        : "rgba(255,255,255,0.06)",
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.h3
                    className="mt-2 text-base font-bold"
                    animate={{
                      color: isActive ? "rgb(255,255,255)" : isCompleted ? "rgb(186,230,253)" : "rgb(90,100,110)",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className="mt-1 text-sm"
                    animate={{
                      color: isActive ? "rgb(148,212,240)" : isCompleted ? "rgb(103,180,210)" : "rgb(60,70,80)",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {step.detail}
                  </motion.p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
