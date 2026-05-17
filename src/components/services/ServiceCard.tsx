"use client";

import Link from "next/link";
import type { ServiceItem } from "@/data/services";
import { ServiceIcon } from "@/components/services/ServiceIcons";

const accentStyles = {
  purple: {
    iconColor: "text-[#a78bfa]",
    link: "text-[#a78bfa] hover:text-[#c4b5fd]",
    badge: { background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.25)" },
    orb: "rgba(167,139,250,0.08)",
    topLine: "from-transparent via-violet-400/60 to-transparent",
  },
  teal: {
    iconColor: "text-[#20c997]",
    link: "text-[#20c997] hover:text-[#4dd4ac]",
    badge: { background: "rgba(32,201,151,0.08)", color: "#20c997", border: "1px solid rgba(32,201,151,0.2)" },
    orb: "rgba(32,201,151,0.08)",
    topLine: "from-transparent via-teal-400/60 to-transparent",
  },
} as const;

export function ServiceCard({ service }: { service: ServiceItem }) {
  const a = accentStyles[service.accent];
  const href = service.href ?? "/contact";
  const isExternal = !!service.href;

  return (
    <article
      data-cursor-hover
      className="group relative flex flex-col overflow-hidden rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6"
      style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
    >
      {/* Corner orb on hover */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${a.orb} 0%, transparent 70%)` }}
        aria-hidden
      />
      {/* Top accent line on hover */}
      <div
        className={`pointer-events-none absolute inset-x-6 top-0 h-[2px] rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${a.topLine}`}
        aria-hidden
      />

      {/* Product badge */}
      {service.isProduct && (
        <div className="relative mb-4 flex items-center justify-between">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={a.badge}
          >
            Live System
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </div>
      )}

      {/* Icon */}
      <div
        className="relative mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
        style={{ background: "var(--bg-subtle)", boxShadow: "0 0 0 1px var(--border)" }}
      >
        <span className={a.iconColor}>
          <ServiceIcon name={service.icon} />
        </span>
      </div>

      {/* Title */}
      <h2
        className="relative line-clamp-2 text-lg font-bold leading-snug tracking-tight sm:text-xl sm:leading-snug md:text-[1.35rem] md:leading-tight transition-colors duration-300"
        style={{ color: "var(--text-primary)" }}
      >
        {service.title}
      </h2>

      {/* Summary */}
      <p
        className="relative mt-2 line-clamp-3 text-[13px] leading-snug sm:mt-2.5 sm:text-sm sm:leading-relaxed transition-colors duration-300"
        style={{ color: "var(--text-secondary)" }}
      >
        {service.summary}
      </p>

      {/* Link */}
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`font-label relative mt-8 inline-flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors sm:mt-10 sm:text-[11px] ${a.link}`}
      >
        {service.isProduct ? "Visit Platform" : "Learn more"}
        <span aria-hidden className="text-xs font-normal">→</span>
      </Link>
    </article>
  );
}
