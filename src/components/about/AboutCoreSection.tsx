const STATS = [
  { value: "1.2k+", label: "Successful campaigns" },
  { value: "40M", label: "Clients reached" },
  { value: "84%", label: "Efficiency gain" },
] as const;

function GradientStat({ value }: { value: string }) {
  return (
    <span
      className="block bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 bg-clip-text text-4xl font-bold tabular-nums tracking-tight text-transparent sm:text-5xl md:text-[3.25rem]"
      style={{
        filter: "drop-shadow(0 0 28px rgba(34,211,238,0.35))",
      }}
    >
      {value}
    </span>
  );
}

export function AboutCoreSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20 lg:pt-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_-5%,rgba(56,189,248,0.12),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-400/95 sm:text-xs">
          Our core purpose
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-white sm:mt-7 sm:text-5xl md:text-6xl md:leading-[1.08]">
          Intelligence that{" "}
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
            redefines
          </span>{" "}
          existence.
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-[#a3a3a3] sm:mt-10 sm:text-lg sm:leading-relaxed">
          To pioneer the frontier of human-AI synergy, creating systems that
          don&apos;t just calculate, but understand. We envision a world where
          complexity is solved by a single, elegant pulse of artificial
          intelligence.
        </p>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              data-cursor-hover
              className="rounded-xl border border-white/[0.08] bg-[#141414] px-6 py-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.04] sm:px-8 sm:py-10"
            >
              <GradientStat value={stat.value} />
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#888] sm:text-xs sm:tracking-[0.26em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
