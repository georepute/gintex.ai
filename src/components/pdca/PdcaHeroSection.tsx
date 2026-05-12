const GRID_BG = {
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
} as const;

type PdcaPhase = {
  slug: string;
  n: string;
  title: string;
  description: string;
  accent: string;
  /** Absolute-position classes on large screens; use "" when stacked in the grid */
  position: string;
};

const PHASES: readonly PdcaPhase[] = [
  {
    slug: "act",
    n: "4",
    title: "Act",
    description:
      "Self-correcting feedback loops and strategic pivots grounded in what the data actually says.",
    accent: "border-[#2563eb] bg-[#2563eb]/15 text-[#60a5fa]",
    position:
      "left-[2%] top-[6%] sm:left-[4%] lg:left-[2%] lg:top-[8%] xl:left-[4%]",
  },
  {
    slug: "plan",
    n: "1",
    title: "Plan",
    description:
      "Predictive modeling and scenario analysis powered by LLMs and GeoReput-grade context.",
    accent: "border-sky-400 bg-sky-400/15 text-sky-300",
    position:
      "right-[2%] top-[6%] sm:right-[4%] lg:right-[2%] lg:top-[8%] xl:right-[4%]",
  },
  {
    slug: "check",
    n: "3",
    title: "Check",
    description:
      "Real-time anomaly detection, telemetry, and visibility into what is working—or drifting.",
    accent: "border-[#20c997] bg-[#20c997]/15 text-[#4dd4ac]",
    position:
      "bottom-[6%] left-[2%] sm:left-[4%] lg:bottom-[8%] lg:left-[2%]",
  },
  {
    slug: "do",
    n: "2",
    title: "Do",
    description:
      "Automated workflow execution and disciplined resource allocation across channels.",
    accent: "border-[#a78bfa] bg-[#a78bfa]/15 text-[#c4b5fd]",
    position:
      "bottom-[6%] right-[2%] sm:right-[4%] lg:bottom-[8%] lg:right-[2%]",
  },
];

function CoreIcon() {
  return (
    <svg
      className="h-10 w-10 text-sky-400 sm:h-12 sm:w-12"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <path
        d="M24 6c-4.5 0-8.5 2.2-11 5.6-.8 1.1-.7 2.6.2 3.6l2.1 2.2c.9.9 2.4 1 3.5.3 1.6-1 3.5-1.6 5.5-1.6s3.9.6 5.5 1.6c1.1.7 2.6.6 3.5-.3l2.1-2.2c.9-1 .9-2.5.1-3.6C32.5 8.2 28.5 6 24 6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M12 28c0-4 2.5-7.4 6-8.8M36 28c0-4-2.5-7.4-6-8.8M18 38c2.2 2.8 5.6 4.5 9.5 4.3 3.2-.1 6-1.4 8-3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="22" r="3.2" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function PhaseCard({
  n,
  title,
  description,
  accent,
  position,
}: Omit<PdcaPhase, "slug">) {
  return (
    <div
      data-cursor-hover
      className={`relative z-10 w-full max-w-[16.5rem] rounded-xl border border-white/[0.08] bg-[#141414] p-4 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.8)] sm:p-5 lg:absolute lg:max-w-[13.75rem] xl:max-w-[15rem] ${position}`.trim()}
    >
      <div
        className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold tabular-nums ${accent}`}
      >
        {n}
      </div>
      <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-snug text-[#a3a3a3]">{description}</p>
    </div>
  );
}

export function PdcaHeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/[0.06] px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20"
      style={GRID_BG}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_50%_at_50%_-8%,rgba(56,189,248,0.14),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[#0a0a0a]/80" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-label text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-400/95 sm:text-xs">
            Intelligent optimization
          </p>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:mt-6 sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
            The PDCA Framework: Powered by AI.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#b0b0b0] sm:mt-7 sm:text-lg sm:leading-relaxed">
            We&apos;ve evolved the traditional Plan-Do-Check-Act cycle into a
            high-velocity engine for the digital era—using AI and GeoReput
            intelligence to cut uncertainty and lift measurable outcomes.
          </p>
        </header>

        {/* Mobile / tablet: stack + 2×2 */}
        <div className="relative z-[1] mx-auto mt-14 max-w-md lg:hidden">
          <div
            data-cursor-hover
            className="relative mx-auto flex w-fit flex-col items-center rounded-full border border-sky-500/35 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] px-8 py-8 shadow-[0_0_48px_-12px_rgba(56,189,248,0.35)] ring-1 ring-white/[0.08]"
          >
            <CoreIcon />
            <p className="font-label mt-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90">
              Gintex core
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PHASES.map((phase) => (
              <PhaseCard key={phase.slug} {...phase} position="" />
            ))}
          </div>
        </div>

        {/* Desktop: orbital layout */}
        <div className="relative z-[1] mx-auto mt-16 hidden h-[min(88vw,700px)] max-h-[720px] min-h-[560px] w-full max-w-[820px] lg:block">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[min(72%,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.18]" />
          <div
            data-cursor-hover
            className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-full border border-sky-500/40 bg-gradient-to-b from-[#1c1c1c] to-[#101010] px-10 py-10 shadow-[0_0_56px_-8px_rgba(56,189,248,0.4)] ring-1 ring-white/10 sm:px-12 sm:py-11"
          >
            <CoreIcon />
            <p className="font-label mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90 sm:text-[11px]">
              Gintex core
            </p>
          </div>
          {PHASES.map((phase) => (
            <PhaseCard key={phase.slug} {...phase} />
          ))}
        </div>
      </div>
    </section>
  );
}
