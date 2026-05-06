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

        <div className="relative mx-auto mt-14 max-w-4xl lg:mt-20 lg:max-w-5xl">
          <div
            className="pointer-events-none absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-white/5 via-white/20 to-white/5 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <ul className="relative space-y-12 md:space-y-0">
            {ABOUT_JOURNEY_MILESTONES.map((m, index) => {
              const isLast = index === ABOUT_JOURNEY_MILESTONES.length - 1;
              const narrative = (
                <div
                  data-cursor-hover
                  className={`pl-8 md:pl-0 ${m.narrativeOnLeft ? "md:col-start-1 md:pr-8 md:text-right" : "md:col-start-3 md:pl-8 md:text-left"}`}
                >
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#9ca3af] sm:mt-3 sm:text-base sm:leading-relaxed">
                    {m.description}
                  </p>
                </div>
              );

              const yearBlock = (
                <p
                  className={`select-none pl-8 text-5xl font-bold tabular-nums text-white/[0.12] sm:text-6xl md:pl-0 md:text-7xl md:text-white/[0.14] ${
                    m.narrativeOnLeft
                      ? "md:col-start-3 md:pl-8 md:text-left"
                      : "md:col-start-1 md:pr-8 md:text-right"
                  }`}
                >
                  {m.year}
                </p>
              );

              return (
                <li
                  key={m.year}
                  className={`relative grid grid-cols-1 items-start md:grid-cols-[1fr_auto_1fr] md:gap-x-6 lg:gap-x-10 ${
                    !isLast ? "md:pb-20 lg:pb-24" : ""
                  }`}
                >
                  {/* Mobile: year above story */}
                  <div className="mb-3 pl-8 text-4xl font-bold tabular-nums text-white/20 md:hidden">
                    {m.year}
                  </div>

                  {m.narrativeOnLeft ? (
                    <>
                      <div className="hidden md:block">{narrative}</div>
                      <div className="hidden md:block">{yearBlock}</div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block">{yearBlock}</div>
                      <div className="hidden md:block">{narrative}</div>
                    </>
                  )}

                  <div className="md:hidden">{narrative}</div>

                  <div className="absolute left-0 top-2 flex h-full w-8 flex-col items-center md:relative md:top-0 md:col-start-2 md:row-start-1 md:w-8 md:justify-start md:pt-1">
                    <span
                      className={`relative z-10 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-black ${dotClass[m.dot]}`}
                      aria-hidden
                    />
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
