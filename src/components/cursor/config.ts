/**
 * Premium cursor — tweak colors, sizes, and motion here.
 */
export const CURSOR = {
  /** Inner dot (px) */
  dot: 9,
  /** Outer ring diameter (px) */
  ring: 46,
  /** Inner position smoothing (higher = snappier) */
  innerLerp: 0.48,
  /** Outer ring follows inner (lower = more lag / “trail”) */
  outerLerp: 0.11,
  /** Scale smoothing */
  scaleLerp: 0.14,
  /** Hover scale multiplier (interactive targets) */
  hoverScale: 1.42,
  /** Magnetic pull: cursor drawn toward element center (0–1) */
  magneticPull: 0.32,
  /** Magnetic push: element moves toward cursor (0–1) */
  magneticElement: 0.11,
  /** Magnetic falloff radius multiplier vs element size */
  magneticRadius: 0.85,
  /** Particle spawn: min pointer speed (px/frame @ ~60fps) */
  particleSpeed: 11,
  maxParticles: 14,
  particleLife: 0.035,
  idleMs: 520,
  idleFloat: 4,
  trailLerp: 0.065,
  clickPhaseSpeed: 0.22,
  clickSquash: 0.14,
  colors: {
    dot: "#00BFFF",
    dotCore: "#7ddcff",
    ring: "rgba(59, 130, 246, 0.42)",
    ringInner: "rgba(0, 191, 255, 0.12)",
    glow: "rgba(0, 191, 255, 0.55)",
    glowSoft: "rgba(59, 130, 246, 0.35)",
    particle: "rgba(0, 191, 255, 0.85)",
  },
  zIndex: 2147483646,
} as const;

export const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  '[role="button"]',
  "input",
  "textarea",
  "select",
  "summary",
  "label",
  "[data-cursor-hover]",
].join(",");

export const MAGNETIC_SELECTOR = [
  "button",
  "a[href]",
  '[role="button"]',
  '[data-cursor-magnetic="true"]',
].join(",");
