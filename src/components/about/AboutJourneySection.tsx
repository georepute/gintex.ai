import { ABOUT_JOURNEY_MILESTONES } from "@/data/about-journey";

const dotClass = {
  violet: "bg-[#a78bfa] shadow-[0_0_20px_rgba(167,139,250,0.55)]",
  teal: "bg-[#2dd4bf] shadow-[0_0_20px_rgba(45,212,191,0.5)]",
} as const;

export function AboutJourneySection() {
  return (
    <section className="border-t border-white/[0.06] bg-black px-6 py-16 sm:px-10 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
          The Journey
        </h2>

        <div className="relative mx-auto mt-14 max-w-5xl lg:mt-20">
          <div
            className="pointer-events-none absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-white/5 via-white/18 to-white/5 sm:left-[9px] md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <ul className="relative space-y-14 sm:space-y-16 md:space-y-0">
            {ABOUT_JOURNEY_MILESTONES.map((m, index) => {
              const isLast = index === ABOUT_JOURNEY_MILESTONES.length - 1;
              const narrative = (
                <div data-cursor-hover>
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#9ca3af] sm:mt-3 sm:text-base sm:leading-relaxed">
                    {m.description}
                  </p>
                </div>
              );

              const yearEl = (
                <p className="text-4xl font-bold tabular-nums text-white/[0.14] sm:text-5xl md:text-6xl lg:text-7xl">
                  {m.year}
                </p>
              );

              return (
                <li
                  key={m.year}
                  className={`relative ${isLast ? "" : "md:pb-24 lg:pb-28"}`}
                >
                  {/* Mobile / sm: stacked with rail */}
                  <div className="flex gap-5 sm:gap-6 md:hidden">
                    <div className="flex w-4 shrink-0 justify-center pt-1.5">
                      <span
                        className={`h-3.5 w-3.5 rounded-full ring-4 ring-black ${dotClass[m.dot]}`}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0 pb-2">
                      {yearEl}
                      <div className="mt-3">{narrative}</div>
                    </div>
                  </div>

                  {/* Desktop: alternating 3-column */}
                  <div className="hidden md:grid md:grid-cols-[1fr_2rem_1fr] md:items-start md:gap-x-8 lg:gap-x-12">
                    {m.narrativeOnLeft ? (
                      <>
                        <div className="pr-4 text-right lg:pr-8">
                          {narrative}
                        </div>
                        <div className="relative flex justify-center pt-2">
                          <span
                            className={`relative z-10 h-4 w-4 shrink-0 rounded-full ring-4 ring-black ${dotClass[m.dot]}`}
                            aria-hidden
                          />
                        </div>
                        <div className="pl-4 text-left lg:pl-8">{yearEl}</div>
                      </>
                    ) : (
                      <>
                        <div className="pr-4 text-right lg:pr-8">{yearEl}</div>
                        <div className="relative flex justify-center pt-2">
                          <span
                            className={`relative z-10 h-4 w-4 shrink-0 rounded-full ring-4 ring-black ${dotClass[m.dot]}`}
                            aria-hidden
                          />
                        </div>
                        <div className="pl-4 text-left lg:pl-8">
                          {narrative}
                        </div>
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
