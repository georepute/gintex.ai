"use client";

import Link from "next/link";
import type { ServiceItem } from "@/data/services";
import { ServiceIcon } from "@/components/services/ServiceIcons";

const accentStyles = {
  purple: {
    iconColor: "text-[#a78bfa]",
    link: "text-[#a78bfa] hover:text-[#c4b5fd]",
  },
  teal: {
    iconColor: "text-[#20c997]",
    link: "text-[#20c997] hover:text-[#4dd4ac]",
  },
} as const;

export function ServiceCard({ service }: { service: ServiceItem }) {
  const a = accentStyles[service.accent];

  return (
    <article
      data-cursor-hover
      className="group flex flex-col overflow-hidden rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
      }}
    >
      {/* Icon */}
      <div
        className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 transition-colors duration-300"
        style={{
          background: "var(--bg-subtle)",
          boxShadow: "0 0 0 1px var(--border)",
        }}
      >
        <span className={a.iconColor}>
          <ServiceIcon name={service.icon} />
        </span>
      </div>

      {/* Title */}
      <h2
        className="line-clamp-2 text-lg font-bold leading-snug tracking-tight sm:text-xl sm:leading-snug md:text-[1.35rem] md:leading-tight transition-colors duration-300"
        style={{ color: "var(--text-primary)" }}
      >
        {service.title}
      </h2>

      {/* Summary */}
      <p
        className="mt-2 line-clamp-3 text-[13px] leading-snug sm:mt-2.5 sm:text-sm sm:leading-relaxed transition-colors duration-300"
        style={{ color: "var(--text-secondary)" }}
      >
        {service.summary}
      </p>

      {/* Link */}
      <Link
        href="/contact"
        className={`font-label mt-8 inline-flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors sm:mt-10 sm:text-[11px] ${a.link}`}
      >
        Learn more
        <span aria-hidden className="text-xs font-normal">→</span>
      </Link>
    </article>
  );
}
