const STATS = [
  { value: "1.2k+", label: "Successful campaigns" },
  { value: "40M",   label: "Clients reached"      },
  { value: "84%",   label: "Efficiency gain"       },
] as const;

export function AboutCoreSection() {
  return (
    <section
      className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20 lg:pt-24 transition-colors duration-300"
      style={{ background: "var(--bg-page)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_-5%,rgba(56,189,248,0.08),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl text-center">
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-500 sm:text-xs">
          Our core purpose
        </p>
        <h1
          className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight sm:mt-7 sm:text-5xl md:text-6xl md:leading-[1.08] transition-colors duration-300"
          style={{ color: "var(--text-primary)" }}
        >
          Intelligence that{" "}
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
            redefines
          </span>{" "}
          existence.
        </h1>
        <p
          className="mx-auto mt-8 max-w-3xl text-base leading-relaxed sm:mt-10 sm:text-lg sm:leading-relaxed transition-colors duration-300"
          style={{ color: "var(--text-secondary)" }}
        >
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
              className="rounded-xl px-6 py-8 sm:px-8 sm:py-10 transition-colors duration-300"
              style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
            >
              <span
                className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-4xl font-bold tabular-nums tracking-tight text-transparent sm:text-5xl md:text-[3.25rem]"
                style={{ filter: "drop-shadow(0 0 20px rgba(34,211,238,0.25))" }}
              >
                {stat.value}
              </span>
              <p
                className="font-label mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs sm:tracking-[0.26em] transition-colors duration-300"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
