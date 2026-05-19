"use client";

import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/data/services";
import { useLang } from "@/components/LanguageContext";
import { t, tx } from "@/lib/translations";
import copyUpLogo from "@/Gintex-images/image (7).png";
import onlinePerceptionLogo from "@/Gintex-images/WhatsApp Image 2026-02-03 at 20.54.01 (1) (3).jpeg";

const LOGOS: Record<string, { src: typeof copyUpLogo; width: number; height: number; pill?: boolean }> = {
  CopyApp: { src: copyUpLogo, width: 300, height: 90, pill: false },
  "OnlinePerception AI": { src: onlinePerceptionLogo, width: 220, height: 60 },
};

const SYSTEM_STYLES: Record<string, {
  gradient: string;
  orb: string;
  topGlow: string;
  badge: string;
  badgeText: string;
  arrowBg: string;
}> = {
  GeoRepute: {
    gradient: "linear-gradient(135deg, rgba(20,184,166,0.18) 0%, rgba(14,165,233,0.10) 100%)",
    orb: "rgba(20,184,166,0.25)",
    topGlow: "linear-gradient(to right, transparent, rgba(20,184,166,0.6), transparent)",
    badge: "rgba(20,184,166,0.12)",
    badgeText: "#2dd4bf",
    arrowBg: "rgba(20,184,166,0.15)",
  },
  CopyApp: {
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.18) 0%, rgba(139,92,246,0.10) 100%)",
    orb: "rgba(167,139,250,0.25)",
    topGlow: "linear-gradient(to right, transparent, rgba(167,139,250,0.6), transparent)",
    badge: "rgba(167,139,250,0.12)",
    badgeText: "#a78bfa",
    arrowBg: "rgba(167,139,250,0.15)",
  },
  "OnlinePerception AI": {
    gradient: "linear-gradient(135deg, rgba(56,189,248,0.18) 0%, rgba(14,165,233,0.10) 100%)",
    orb: "rgba(56,189,248,0.25)",
    topGlow: "linear-gradient(to right, transparent, rgba(56,189,248,0.6), transparent)",
    badge: "rgba(56,189,248,0.12)",
    badgeText: "#38bdf8",
    arrowBg: "rgba(56,189,248,0.15)",
  },
};

const FALLBACK = SYSTEM_STYLES["GeoRepute"];

export function SystemCard({ system }: { system: ServiceItem }) {
  const { lang } = useLang();
  const s = SYSTEM_STYLES[system.title] ?? FALLBACK;

  return (
    <Link
      href={system.href ?? "/contact"}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-2xl"
      style={{
        background: s.gradient,
        border: `1px solid ${s.badgeText}22`,
        boxShadow: `0 0 0 1px ${s.badgeText}10`,
      }}
    >
      {/* Corner orb */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${s.orb} 0%, transparent 70%)` }}
        aria-hidden
      />

      {/* Top glow line — always visible, intensifies on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: s.topGlow }}
        aria-hidden
      />

      {/* Header row */}
      <div className="relative mb-5 flex items-start justify-between gap-3">
        <span
          className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ background: s.badge, color: s.badgeText, border: `1px solid ${s.badgeText}30` }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: s.badgeText }}
          />
          {tx(t.services.liveSystem, lang)}
        </span>

        {/* External link arrow */}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
          style={{ background: s.arrowBg, color: s.badgeText }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </div>
      </div>

      {/* Logo or Title */}
      {LOGOS[system.title] ? (
        <div className="relative mb-1 flex items-center" style={{ height: 90 }}>
          <Image
            src={LOGOS[system.title].src}
            alt={system.title}
            width={LOGOS[system.title].width}
            height={LOGOS[system.title].height}
            className="object-contain object-left"
            style={{
              maxHeight: 90,
              width: "auto",
              mixBlendMode: "multiply",
              filter: "contrast(1.1) saturate(1.2)",
            }}
          />
        </div>
      ) : (
        <h2
          className="relative text-2xl font-black tracking-tight transition-colors duration-300"
          style={{ color: "var(--text-primary)" }}
        >
          {system.title}
        </h2>
      )}

      {/* Summary */}
      <p
        className="relative mt-3 text-sm leading-relaxed flex-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {system.summary}
      </p>

      {/* Bottom CTA row */}
      <div className="relative mt-7 flex items-center gap-2">
        <span
          className="font-label text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 group-hover:opacity-100"
          style={{ color: s.badgeText }}
        >
          {tx(t.services.visitPlatform, lang)}
        </span>
        <span
          className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1 text-xs"
          style={{ color: s.badgeText }}
          aria-hidden
        >
          →
        </span>
      </div>
    </Link>
  );
}
