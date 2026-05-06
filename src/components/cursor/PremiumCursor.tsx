"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  CURSOR,
  INTERACTIVE_SELECTOR,
  MAGNETIC_SELECTOR,
} from "@/components/cursor/config";

type Particle = { x: number; y: number; vx: number; vy: number; a: number };
type Ripple = { id: number; x: number; y: number };

function useMediaQuery(query: string, serverFallback: boolean) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function PremiumCursor() {
  const finePointer = useMediaQuery("(pointer: fine)", false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);

  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const particleRootRef = useRef<HTMLDivElement>(null);
  const particlePoolRef = useRef<HTMLDivElement[]>([]);

  const mouse = useRef({ x: -200, y: -200 });
  const tickPrevMouse = useRef({ x: -200, y: -200 });
  const inner = useRef({ x: -200, y: -200 });
  const outer = useRef({ x: -200, y: -200 });
  const trail = useRef({ x: -200, y: -200 });
  const scale = useRef(1);
  const targetScale = useRef(1);
  const lastMove = useRef(0);
  const visibility = useRef(1);
  const targetVisibility = useRef(1);
  const interactive = useRef(false);
  const magneticEl = useRef<HTMLElement | null>(null);
  const clickPhase = useRef(0);

  const particles = useRef<Particle[]>([]);
  const started = useRef(false);

  const raf = useRef(0);
  const enabled = finePointer && !reducedMotion;

  const removeRipple = useCallback((id: number) => {
    setRipples((r) => r.filter((x) => x.id !== id));
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("premium-cursor-active");

    const clearMagnetic = () => {
      if (magneticEl.current) {
        magneticEl.current.style.transform = "";
        magneticEl.current.style.willChange = "";
        magneticEl.current = null;
      }
    };

    const syncTargets = (clientX: number, clientY: number) => {
      const el = document.elementFromPoint(clientX, clientY);
      const mag = el?.closest(MAGNETIC_SELECTOR) as HTMLElement | null;

      if (magneticEl.current && magneticEl.current !== mag) {
        magneticEl.current.style.transform = "";
        magneticEl.current.style.willChange = "";
      }
      magneticEl.current = mag;

      interactive.current = !!el?.closest(INTERACTIVE_SELECTOR);
      targetScale.current = interactive.current ? CURSOR.hoverScale : 1;
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      lastMove.current = performance.now();
      targetVisibility.current = 1;
      syncTargets(e.clientX, e.clientY);

      if (!started.current) {
        inner.current = { x: e.clientX, y: e.clientY };
        outer.current = { x: e.clientX, y: e.clientY };
        trail.current = { x: e.clientX, y: e.clientY };
        tickPrevMouse.current = { x: e.clientX, y: e.clientY };
        started.current = true;
      }
    };

    const onLeave = () => {
      targetVisibility.current = 0;
      clearMagnetic();
    };

    const onEnter = () => {
      targetVisibility.current = 1;
    };

    const onDown = (e: MouseEvent) => {
      clickPhase.current = 1;
      const id = ++rippleId.current;
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
    };

    let alive = true;

    const tick = () => {
      if (!alive) return;

      if (
        particlePoolRef.current.length === 0 &&
        particleRootRef.current
      ) {
        const rootParticles = particleRootRef.current;
        rootParticles.replaceChildren();
        for (let i = 0; i < CURSOR.maxParticles; i++) {
          const el = document.createElement("div");
          el.className =
            "pointer-events-none absolute left-0 top-0 h-1 w-1 rounded-full will-change-[transform,opacity]";
          el.style.display = "none";
          el.style.boxShadow = `0 0 8px ${CURSOR.colors.dot}`;
          rootParticles.appendChild(el);
          particlePoolRef.current.push(el);
        }
      }

      const now = performance.now();
      const mx = mouse.current.x;
      const my = mouse.current.y;

      let targetX = mx;
      let targetY = my;

      const mag = magneticEl.current;
      if (mag) {
        const r = mag.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const maxR =
          Math.hypot(r.width, r.height) * 0.5 * CURSOR.magneticRadius;
        const d = Math.hypot(mx - cx, my - cy);
        const t = Math.max(0, 1 - d / Math.max(1, maxR));
        targetX += (cx - mx) * CURSOR.magneticPull * t;
        targetY += (cy - my) * CURSOR.magneticPull * t;

        const edx = (mx - cx) * CURSOR.magneticElement * t;
        const edy = (my - cy) * CURSOR.magneticElement * t;
        mag.style.willChange = "transform";
        mag.style.transform = `translate3d(${edx}px, ${edy}px, 0)`;
      }

      inner.current.x = lerp(inner.current.x, targetX, CURSOR.innerLerp);
      inner.current.y = lerp(inner.current.y, targetY, CURSOR.innerLerp);

      outer.current.x = lerp(outer.current.x, inner.current.x, CURSOR.outerLerp);
      outer.current.y = lerp(outer.current.y, inner.current.y, CURSOR.outerLerp);

      trail.current.x = lerp(trail.current.x, outer.current.x, CURSOR.trailLerp);
      trail.current.y = lerp(trail.current.y, outer.current.y, CURSOR.trailLerp);

      scale.current = lerp(scale.current, targetScale.current, CURSOR.scaleLerp);
      visibility.current = lerp(
        visibility.current,
        targetVisibility.current,
        0.14,
      );

      const pm = tickPrevMouse.current;
      const speed = Math.hypot(mx - pm.x, my - pm.y);
      tickPrevMouse.current = { x: mx, y: my };

      if (
        speed > CURSOR.particleSpeed &&
        particles.current.length < CURSOR.maxParticles &&
        started.current
      ) {
        particles.current.push({
          x: inner.current.x,
          y: inner.current.y,
          vx: -(mx - pm.x) * 0.045,
          vy: -(my - pm.y) * 0.045,
          a: 1,
        });
      }

      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.a -= CURSOR.particleLife;
        return p.a > 0;
      });

      const pool = particlePoolRef.current;
      for (let i = 0; i < pool.length; i++) {
        const el = pool[i];
        const p = particles.current[i];
        if (p && el) {
          el.style.display = "block";
          el.style.background = CURSOR.colors.particle;
          el.style.opacity = String(p.a * 0.92 * visibility.current);
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
        } else if (el) {
          el.style.display = "none";
        }
      }

      let clickScale = 1;
      if (clickPhase.current > 0) {
        clickPhase.current = Math.max(0, clickPhase.current - CURSOR.clickPhaseSpeed);
        const k = clickPhase.current;
        clickScale = 1 - CURSOR.clickSquash * Math.sin((1 - k) * Math.PI);
      }

      const idle = now - lastMove.current > CURSOR.idleMs;
      const fx = idle ? Math.sin(now * 0.0021) * CURSOR.idleFloat : 0;
      const fy = idle ? Math.cos(now * 0.00205) * CURSOR.idleFloat : 0;

      const ix = inner.current.x + fx;
      const iy = inner.current.y + fy;
      const ox = outer.current.x + fx * 0.62;
      const oy = outer.current.y + fy * 0.62;
      const tx = trail.current.x + fx * 0.38;
      const ty = trail.current.y + fy * 0.38;

      const s = scale.current * clickScale;
      const glowBoost = interactive.current ? CURSOR.hoverScale * 0.08 : 0;

      const innerEl = innerRef.current;
      const outerEl = outerRef.current;
      const glowEl = glowRef.current;
      const trailEl = trailRef.current;
      const layerEl = layerRef.current;

      if (layerEl) {
        layerEl.style.opacity = String(visibility.current);
      }

      if (innerEl) {
        innerEl.style.transform = `translate3d(${ix}px, ${iy}px, 0) translate(-50%, -50%) scale(${s})`;
      }
      if (outerEl) {
        const ringS = s * 0.92;
        outerEl.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%) scale(${ringS})`;
        const glowMul = interactive.current ? 1.65 : 1;
        outerEl.style.boxShadow = [
          `0 0 ${18 * glowMul}px ${CURSOR.colors.glowSoft}`,
          `0 0 ${42 * glowMul}px ${CURSOR.colors.glow}`,
          `inset 0 0 18px ${CURSOR.colors.ringInner}`,
        ].join(", ");
      }
      if (glowEl) {
        const g = (interactive.current ? 1.35 : 1) + glowBoost;
        glowEl.style.transform = `translate3d(${ix}px, ${iy}px, 0) translate(-50%, -50%) scale(${s * 2.15 * g})`;
        glowEl.style.opacity = String(
          0.48 * visibility.current * (interactive.current ? 1.25 : 0.88),
        );
      }
      if (trailEl) {
        trailEl.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%) scale(${s * 1.12})`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown, { passive: true });

    return () => {
      alive = false;
      cancelAnimationFrame(raf.current);
      root.classList.remove("premium-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      clearMagnetic();
      particlePoolRef.current = [];
      started.current = false;
    };
  }, [enabled, removeRipple]);

  if (!enabled) return null;

  const z = CURSOR.zIndex;

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: z }}
      aria-hidden
    >
      <div ref={particleRootRef} className="pointer-events-none absolute inset-0" />

      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full border-2"
            style={{
              left: r.x,
              top: r.y,
              borderColor: "rgba(0, 191, 255, 0.5)",
              width: CURSOR.ring,
              height: CURSOR.ring,
              marginLeft: -CURSOR.ring / 2,
              marginTop: -CURSOR.ring / 2,
              background:
                "radial-gradient(circle, rgba(0,191,255,0.25) 0%, transparent 72%)",
            }}
            initial={{ scale: 0.22, opacity: 0.9 }}
            animate={{ scale: 3.4, opacity: 0 }}
            transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => removeRipple(r.id)}
          />
        ))}
      </AnimatePresence>

      <div
        ref={trailRef}
        className="absolute left-0 top-0 will-change-transform mix-blend-screen"
        style={{
          width: CURSOR.ring * 1.57,
          height: CURSOR.ring * 1.57,
          background:
            "conic-gradient(from 210deg, rgba(0,191,255,0.35), rgba(59,130,246,0.12), transparent 55%, rgba(0,191,255,0.2))",
          filter: "blur(14px)",
          opacity: 0.85,
        }}
      />

      <div
        ref={outerRef}
        className="absolute left-0 top-0 rounded-full border-2 will-change-transform"
        style={{
          width: CURSOR.ring,
          height: CURSOR.ring,
          borderColor: CURSOR.colors.ring,
          background: `linear-gradient(155deg, ${CURSOR.colors.ringInner}, transparent 58%)`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          mixBlendMode: "screen",
        }}
      />

      <div
        ref={glowRef}
        className="absolute left-0 top-0 rounded-full will-change-transform"
        style={{
          width: CURSOR.dot * 4,
          height: CURSOR.dot * 4,
          background: `radial-gradient(circle, ${CURSOR.colors.glow} 0%, transparent 72%)`,
          filter: "blur(12px)",
          mixBlendMode: "plus-lighter",
        }}
      />

      <div
        ref={innerRef}
        className="absolute left-0 top-0 rounded-full will-change-transform"
        style={{
          width: CURSOR.dot,
          height: CURSOR.dot,
          background: `radial-gradient(circle at 32% 28%, ${CURSOR.colors.dotCore}, ${CURSOR.colors.dot})`,
          boxShadow: [
            `0 0 14px ${CURSOR.colors.dot}`,
            `0 0 32px ${CURSOR.colors.glow}`,
            `0 0 2px rgba(255,255,255,0.45) inset`,
          ].join(", "),
        }}
      />
    </div>
  );
}
