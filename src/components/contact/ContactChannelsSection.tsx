"use client";

import Link from "next/link";
import { CONTACT_CHANNELS, type ContactChannel, type ContactChannelAccent } from "@/data/contact-channels";
import { useLang } from "@/components/LanguageContext";
import { t, tx } from "@/lib/translations";

const accentColors: Record<ContactChannelAccent, { icon: string; link: string; iconBg: string; iconBorder: string }> = {
  cyan:   { icon: "text-cyan-500",    link: "text-cyan-500 hover:text-cyan-600",     iconBg: "rgba(6,182,212,0.08)",    iconBorder: "rgba(6,182,212,0.3)"   },
  teal:   { icon: "text-emerald-500", link: "text-emerald-500 hover:text-emerald-600", iconBg: "rgba(16,185,129,0.08)", iconBorder: "rgba(16,185,129,0.3)"  },
  violet: { icon: "text-violet-500",  link: "text-violet-500 hover:text-violet-600", iconBg: "rgba(139,92,246,0.08)",   iconBorder: "rgba(139,92,246,0.3)"  },
};

function ChannelIcon({ id, className }: { id: ContactChannel["id"]; className: string }) {
  if (id === "support") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 14v-1a9 9 0 0 1 18 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 14v2a2 2 0 0 0 2 2h1.5V12H5a2 2 0 0 0-2 2v0Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M21 14v2a2 2 0 0 1-2 2h-1.5V12H19a2 2 0 0 1 2 2v0Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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
        <path d="M6.3 10.2 10 12M17.7 10.2 14 12M9 16.5l3-1.5M15 16.5l-3-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="4" y="7" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 12v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ContactChannelsSection() {
  const { lang } = useLang();

  const channelKey = (id: string): "support" | "sales" | "careers" =>
    id as "support" | "sales" | "careers";

  return (
    <section
      className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:py-24 transition-colors duration-300"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg-subtle)" }}
      aria-label="Other ways to reach us"
    >
      <div className="relative mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
        {CONTACT_CHANNELS.map((ch) => {
          const a = accentColors[ch.accent];
          const k = channelKey(ch.id);
          const title     = tx(t.contact.channels[k].title, lang);
          const desc      = tx(t.contact.channels[k].desc, lang);
          const linkLabel = tx(t.contact.channels[k].linkLabel, lang);

          return (
            <article
              key={ch.id}
              data-cursor-hover
              className={`group flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${lang === "he" ? "text-right" : ""}`}
              style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${lang === "he" ? "self-end" : ""}`}
                style={{ background: a.iconBg, border: `1px solid ${a.iconBorder}` }}>
                <ChannelIcon id={ch.id} className={`h-6 w-6 ${a.icon}`} />
              </div>

              <h2 className="mt-6 text-xl font-bold tracking-tight sm:text-[1.35rem] transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                {title}
              </h2>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed sm:mt-4 transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>
                {desc}
              </p>

              <Link
                href={ch.href}
                className={`mt-7 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors sm:mt-8 ${a.link} ${lang === "he" ? "flex-row-reverse" : ""}`}
              >
                {linkLabel}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
