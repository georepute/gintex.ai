import Link from "next/link";
import {
  CONTACT_CHANNELS,
  type ContactChannel,
  type ContactChannelAccent,
} from "@/data/contact-channels";

const theme: Record<
  ContactChannelAccent,
  {
    iconWell: string;
    iconColor: string;
    link: string;
  }
> = {
  cyan: {
    iconWell:
      "border-cyan-400/35 bg-cyan-400/[0.07] shadow-[0_0_28px_-8px_rgba(79,209,237,0.45)]",
    iconColor: "text-[#4fd1ed]",
    link: "text-[#4fd1ed] hover:text-cyan-200",
  },
  teal: {
    iconWell:
      "border-emerald-400/35 bg-emerald-400/[0.07] shadow-[0_0_28px_-8px_rgba(74,222,128,0.4)]",
    iconColor: "text-[#4ade80]",
    link: "text-[#4ade80] hover:text-emerald-200",
  },
  violet: {
    iconWell:
      "border-[#a78bfa]/40 bg-[#a78bfa]/[0.08] shadow-[0_0_28px_-8px_rgba(167,139,250,0.45)]",
    iconColor: "text-[#a78bfa]",
    link: "text-[#a78bfa] hover:text-violet-200",
  },
};

function ChannelIcon({ id, className }: { id: ContactChannel["id"]; className: string }) {
  if (id === "support") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 14v-1a9 9 0 0 1 18 0v1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M3 14v2a2 2 0 0 0 2 2h1.5V12H5a2 2 0 0 0-2 2v0Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M21 14v2a2 2 0 0 1-2 2h-1.5V12H19a2 2 0 0 1 2 2v0Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (id === "sales") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="7" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6.3 10.2 10 12M17.7 10.2 14 12M9 16.5l3-1.5M15 16.5l-3-1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="7"
        width="16"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M12 12v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ContactChannelsSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a] px-6 py-16 sm:px-10 sm:py-20 lg:py-24"
      aria-label="Other ways to reach us"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,rgba(59,130,246,0.12),rgba(124,58,237,0.06),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
        {CONTACT_CHANNELS.map((ch) => {
          const t = theme[ch.accent];
          return (
            <article
              key={ch.id}
              data-cursor-hover
              className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[#1a1b1e] p-7 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 hover:border-white/[0.12] hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)] sm:p-8"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl border ${t.iconWell}`}
              >
                <ChannelIcon id={ch.id} className={`h-6 w-6 ${t.iconColor}`} />
              </div>

              <h2 className="mt-6 text-xl font-bold tracking-tight text-white sm:text-[1.35rem]">
                {ch.title}
              </h2>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[#9ca3af] sm:mt-4">
                {ch.description}
              </p>

              <Link
                href={ch.href}
                className={`mt-7 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${t.link} sm:mt-8`}
              >
                {ch.linkLabel}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
