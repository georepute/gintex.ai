"use client";

import { ABOUT_JOURNEY_MILESTONES } from "@/data/about-journey";
import { useLang } from "@/components/LanguageContext";
import { t, tx } from "@/lib/translations";

const dotColor = {
  violet: "bg-[#a78bfa] shadow-[0_0_16px_rgba(167,139,250,0.5)]",
  teal:   "bg-[#2dd4bf] shadow-[0_0_16px_rgba(45,212,191,0.45)]",
} as const;

export function AboutJourneySection() {
  const { lang } = useLang();

  const MILESTONES = ABOUT_JOURNEY_MILESTONES.map((m, i) => {
    const key = i === 0 ? "m1" : i === 1 ? "m2" : "m3";
    return {
      ...m,
      title:       tx(t.about.journey.milestones[key].title, lang),
      description: tx(t.about.journey.milestones[key].desc, lang),
    };
  });

  return (
    <section
      className="px-6 py-16 sm:px-10 sm:py-20 lg:py-28 transition-colors duration-300"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg-page)" }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] transition-colors duration-300"
          style={{ color: "var(--text-primary)" }}
        >
          {tx(t.about.journey.heading, lang)}
        </h2>

        <div className="relative mx-auto mt-14 max-w-5xl lg:mt-20">
          <div
            className="pointer-events-none absolute bottom-2 left-[7px] top-2 w-px sm:left-[9px] md:left-1/2 md:-translate-x-1/2 transition-colors duration-300"
            style={{ background: "linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)" }}
            aria-hidden
          />

          <ul className="relative space-y-14 sm:space-y-16 md:space-y-0">
            {MILESTONES.map((m, index) => {
              const isLast = index === MILESTONES.length - 1;

              const narrative = (
                <div data-cursor-hover>
                  <h3 className="text-lg font-bold sm:text-xl transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed sm:mt-3 sm:text-base sm:leading-relaxed transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>
                    {m.description}
                  </p>
                </div>
              );

              const yearEl = (
                <p className="text-4xl font-bold tabular-nums sm:text-5xl md:text-6xl lg:text-7xl transition-colors duration-300" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
                  {m.year}
                </p>
              );

              return (
                <li key={m.year} className={`relative ${isLast ? "" : "md:pb-24 lg:pb-28"}`}>
                  <div className="flex gap-5 sm:gap-6 md:hidden">
                    <div className="flex w-4 shrink-0 justify-center pt-1.5">
                      <span className={`h-3.5 w-3.5 rounded-full transition-colors duration-300 ${dotColor[m.dot]}`} style={{ outline: "4px solid var(--bg-page)" }} aria-hidden />
                    </div>
                    <div className="min-w-0 pb-2">
                      {yearEl}
                      <div className="mt-3">{narrative}</div>
                    </div>
                  </div>

                  <div className="hidden md:grid md:grid-cols-[1fr_2rem_1fr] md:items-start md:gap-x-8 lg:gap-x-12">
                    {m.narrativeOnLeft ? (
                      <>
                        <div className="pr-4 text-right lg:pr-8">{narrative}</div>
                        <div className="relative flex justify-center pt-2">
                          <span className={`relative z-10 h-4 w-4 shrink-0 rounded-full ${dotColor[m.dot]}`} style={{ outline: "4px solid var(--bg-page)" }} aria-hidden />
                        </div>
                        <div className="pl-4 text-left lg:pl-8">{yearEl}</div>
                      </>
                    ) : (
                      <>
                        <div className="pr-4 text-right lg:pr-8">{yearEl}</div>
                        <div className="relative flex justify-center pt-2">
                          <span className={`relative z-10 h-4 w-4 shrink-0 rounded-full ${dotColor[m.dot]}`} style={{ outline: "4px solid var(--bg-page)" }} aria-hidden />
                        </div>
                        <div className="pl-4 text-left lg:pl-8">{narrative}</div>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
