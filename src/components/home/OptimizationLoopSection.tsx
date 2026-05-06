const STEPS = [
  {
    n: "01",
    title: "Analyze",
    detail: "GeoReput scan",
  },
  {
    n: "02",
    title: "Decide",
    detail: "Strategy engine",
  },
  {
    n: "03",
    title: "Publish",
    detail: "SEO + GEO",
  },
  {
    n: "04",
    title: "Measure",
    detail: "Dashboard",
  },
  {
    n: "05",
    title: "Improve",
    detail: "Loop",
  },
] as const;

export function OptimizationLoopSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-24 sm:px-10 sm:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(90%,64rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500/40 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.5rem] md:leading-tight">
            A Continuous Optimization Loop
          </h2>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-sky-400/95 sm:text-sm">
            From analyze to improve
          </p>
        </header>

        {/* Desktop / tablet: horizontal timeline */}
        <div className="relative hidden md:block">
          <div
            className="absolute left-[6%] right-[6%] top-9 z-0 h-px bg-gradient-to-r from-white/5 via-white/15 to-white/5"
            aria-hidden
          />
          <div className="relative z-10 flex justify-between gap-3 sm:gap-4">
            {STEPS.map(({ n, title, detail }) => (
              <div
                key={n}
                data-cursor-hover
                className="group flex min-w-0 max-w-[14rem] flex-1 flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/12 bg-gradient-to-b from-zinc-800/90 to-zinc-950/90 font-mono text-base font-semibold tabular-nums text-sky-400 shadow-[0_0_28px_-6px_rgba(56,189,248,0.45)] ring-1 ring-white/10 transition-all duration-300 group-hover:border-sky-500/40 group-hover:text-sky-300 group-hover:shadow-[0_0_32px_-4px_rgba(56,189,248,0.55)] sm:h-[4.5rem] sm:w-[4.5rem] sm:text-lg">
                  {n}
                </div>
                <h3 className="mt-7 text-base font-bold text-white sm:text-lg md:text-xl">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-snug text-gray-400 transition-colors group-hover:text-gray-300 sm:text-base">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <ol className="relative mx-auto max-w-md space-y-0 md:hidden">
          <div
            className="absolute bottom-2 left-8 top-2 w-px bg-gradient-to-b from-white/5 via-white/15 to-white/5"
            aria-hidden
          />
          {STEPS.map(({ n, title, detail }) => (
            <li
              key={n}
              data-cursor-hover
              className="group relative flex gap-6 py-5 pl-1"
            >
              <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/12 bg-gradient-to-b from-zinc-800/90 to-zinc-950/90 font-mono text-base font-semibold tabular-nums text-sky-400 shadow-[0_0_24px_-6px_rgba(56,189,248,0.4)] ring-1 ring-white/10 transition-all duration-300 group-active:scale-95">
                {n}
              </div>
              <div className="min-w-0 pt-1.5">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-gray-400">
                  {detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
