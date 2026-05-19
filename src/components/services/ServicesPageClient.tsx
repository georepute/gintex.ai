"use client";

import { ServiceCard } from "@/components/services/ServiceCard";
import { SystemCard } from "@/components/services/SystemCard";
import { ServicesCtaSection } from "@/components/services/ServicesCtaSection";
import { SYSTEMS } from "@/data/services";
import type { ServiceItem } from "@/data/services";
import { useLang } from "@/components/LanguageContext";
import { t, tx } from "@/lib/translations";

export function ServicesPageClient() {
  const { lang } = useLang();

  const SERVICES_DATA: ServiceItem[] = [
    { title: tx(t.services.cards.c1.title, lang),  summary: tx(t.services.cards.c1.summary, lang),  accent: "purple", icon: "target"    },
    { title: tx(t.services.cards.c2.title, lang),  summary: tx(t.services.cards.c2.summary, lang),  accent: "teal",   icon: "briefcase" },
    { title: tx(t.services.cards.c3.title, lang),  summary: tx(t.services.cards.c3.summary, lang),  accent: "purple", icon: "clipboard" },
    { title: tx(t.services.cards.c4.title, lang),  summary: tx(t.services.cards.c4.summary, lang),  accent: "teal",   icon: "search"    },
    { title: tx(t.services.cards.c5.title, lang),  summary: tx(t.services.cards.c5.summary, lang),  accent: "purple", icon: "user"      },
    { title: tx(t.services.cards.c6.title, lang),  summary: tx(t.services.cards.c6.summary, lang),  accent: "teal",   icon: "rocket"    },
    { title: tx(t.services.cards.c7.title, lang),  summary: tx(t.services.cards.c7.summary, lang),  accent: "purple", icon: "share"     },
    { title: tx(t.services.cards.c8.title, lang),  summary: tx(t.services.cards.c8.summary, lang),  accent: "teal",   icon: "layers"    },
    { title: tx(t.services.cards.c9.title, lang),  summary: tx(t.services.cards.c9.summary, lang),  accent: "purple", icon: "pen"       },
    { title: tx(t.services.cards.c10.title, lang), summary: tx(t.services.cards.c10.summary, lang), accent: "teal",   icon: "code"      },
  ];

  const SYSTEMS_DATA: ServiceItem[] = SYSTEMS.map((s) => {
    const key = s.title === "GeoRepute"
      ? "georepute"
      : s.title === "CopyApp"
      ? "copyapp"
      : "onlinePerception";
    return { ...s, summary: tx(t.services.systems[key].summary, lang) };
  });

  return (
    <main
      className="flex flex-1 flex-col transition-colors duration-300"
      style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      {/* Hero */}
      <section
        className="px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20 transition-colors duration-300"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className={`mx-auto max-w-6xl ${lang === "he" ? "text-right" : "text-left"}`}>
          <p className="font-label text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-500 sm:text-xs">
            {tx(t.services.hero.kicker, lang)}
          </p>
          <h1
            className="mt-6 text-4xl font-bold tracking-tight sm:mt-7 sm:text-5xl md:text-[3.5rem] md:leading-[1.08] transition-colors duration-300"
            style={{ color: "var(--text-primary)" }}
          >
            {tx(t.services.hero.heading, lang)}
          </h1>
          <p
            className="mt-8 max-w-3xl text-base font-normal leading-[1.65] sm:mt-10 sm:text-lg sm:leading-relaxed transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            {tx(t.services.hero.intro, lang)}
          </p>
        </div>
      </section>

      {/* Our Systems */}
      <section
        className="px-6 py-14 sm:px-10 sm:py-16 transition-colors duration-300"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
            </span>
            <p className="font-label text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-500">
              {tx(t.services.liveSystems, lang)}
            </p>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {SYSTEMS_DATA.map((system) => (
              <SystemCard key={system.title} system={system} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Cards grid */}
      <section className="px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <ServicesCtaSection />
    </main>
  );
}
