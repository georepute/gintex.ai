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
      className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#1a1a1a] p-5 transition-colors duration-300 hover:border-white/[0.1] sm:p-6"
    >
      <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#121212] ring-1 ring-white/[0.06]">
        <span className={a.iconColor}>
          <ServiceIcon name={service.icon} />
        </span>
      </div>
      <h2 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-white sm:text-xl sm:leading-snug md:text-[1.35rem] md:leading-tight">
        {service.title}
      </h2>
      <p className="mt-2 line-clamp-3 text-[13px] leading-snug text-[#a0a0a0] sm:mt-2.5 sm:text-sm sm:leading-relaxed">
        {service.summary}
      </p>
      <Link
        href="/contact"
        className={`font-label mt-8 inline-flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors sm:mt-10 sm:text-[11px] ${a.link}`}
      >
        Learn more
        <span aria-hidden className="text-xs font-normal">
          →
        </span>
      </Link>
    </article>
  );
}
