function BrainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M12.002 18h.01" />
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
      <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3v5.243a6 6 0 0 0 3.882 5.614l.353.146a4 4 0 0 0 3.53 0l.353-.146A6 6 0 0 0 18 14.243V9Z" />
    </svg>
  );
}

function OrgChartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 4v4" />
      <path d="M8 20v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
      <rect x="8" y="2" width="8" height="6" rx="1" />
      <rect x="2" y="14" width="6" height="6" rx="1" />
      <rect x="16" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

const FEATURES = [
  {
    title: "Perception Intelligence",
    body: "We analyze how your brand is actually perceived across AI systems, search engines, and digital channels. Our insights uncover visibility gaps, narrative weaknesses, competitive blind spots, and untapped growth opportunities.",
    Icon: BrainIcon,
    iconWrap:
      "from-blue-500/50 to-indigo-600/35 shadow-[0_0_28px_-6px_rgba(59,130,246,0.55)] ring-white/15",
    orb: "bg-blue-500/20 group-hover:bg-blue-400/30",
    topLine: "from-transparent via-sky-400/80 to-transparent",
    hoverShadow:
      "hover:shadow-[0_24px_56px_-12px_rgba(59,130,246,0.28),0_0_0_1px_rgba(59,130,246,0.08)_inset]",
  },
  {
    title: "Visibility Control",
    body: "Using intelligence-driven insights, we define a clear roadmap of what to do and what to avoid. This includes positioning refinement, audience alignment, channel prioritization, and setting measurable performance goals.",
    Icon: TrophyIcon,
    iconWrap:
      "from-violet-500/45 to-purple-600/35 shadow-[0_0_28px_-6px_rgba(139,92,246,0.5)] ring-white/15",
    orb: "bg-violet-500/20 group-hover:bg-violet-400/28",
    topLine: "from-transparent via-fuchsia-400/75 to-transparent",
    hoverShadow:
      "hover:shadow-[0_24px_56px_-12px_rgba(139,92,246,0.26),0_0_0_1px_rgba(139,92,246,0.08)_inset]",
  },
  {
    title: "Market Control",
    body: "Once the strategy is defined, we execute with precision. From SEO and AI-optimized content to paid campaigns and technical enhancements, every action is aligned with your growth objectives.",
    Icon: OrgChartIcon,
    iconWrap:
      "from-teal-500/45 to-cyan-600/35 shadow-[0_0_28px_-6px_rgba(20,184,166,0.48)] ring-white/15",
    orb: "bg-teal-500/20 group-hover:bg-cyan-400/28",
    topLine: "from-transparent via-cyan-400/80 to-transparent",
    hoverShadow:
      "hover:shadow-[0_24px_56px_-12px_rgba(20,184,166,0.24),0_0_0_1px_rgba(20,184,166,0.08)_inset]",
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-tight">
            From Intelligence to Market Control
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base leading-relaxed text-gray-400 sm:text-lg">
            We map how your brand is perceived across AI, search, and digital—then
            define positioning, channels, and measurable goals. We execute SEO,
            AI-ready content, paid, and technical work so every move compounds
            real market control.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {FEATURES.map(
            ({ title, body, Icon, iconWrap, orb, topLine, hoverShadow }) => (
              <article
                key={title}
                data-cursor-hover
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] via-[#101010] to-[#0a0a0a] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-white/[0.14] ${hoverShadow}`}
              >
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl transition-all duration-500 ${orb}`}
                  aria-hidden
                />
                <div
                  className={`pointer-events-none absolute inset-x-6 top-0 h-[2px] rounded-full bg-gradient-to-r opacity-0 shadow-[0_0_12px_rgba(255,255,255,0.35)] transition-opacity duration-300 group-hover:opacity-100 ${topLine}`}
                  aria-hidden
                />
                <div
                  className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:ring-white/20 ${iconWrap}`}
                >
                  <Icon className="relative z-10 h-7 w-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-label relative text-lg font-bold uppercase tracking-[0.12em] text-white">
                  {title}
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300 sm:text-[0.9375rem]">
                  {body}
                </p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
