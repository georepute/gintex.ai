type EdgeCard = {
  id: string;
  wide: boolean;
  title: string;
  description: string;
  icon: "adaptive" | "ethical" | "precision" | "velocity";
};

const CARDS: EdgeCard[] = [
  {
    id: "adaptive",
    wide: true,
    title: "Adaptive architecture",
    description:
      "Stacks tuned to your reality—GeoRepute baselines, SEO and GEO, content, and distribution evolve as Google and AI-driven discovery shift, not months later.",
    icon: "adaptive",
  },
  {
    id: "ethical",
    wide: false,
    title: "Ethical AI",
    description:
      "Transparency, data boundaries, and bias-aware workflows are designed into the core—trust is a module, not an afterthought.",
    icon: "ethical",
  },
  {
    id: "precision",
    wide: false,
    title: "Precision",
    description:
      "Planning and execution tie to visibility, perception, and narrative signals—so every move aligns with intelligence, not guesswork.",
    icon: "precision",
  },
  {
    id: "velocity",
    wide: true,
    title: "Insight velocity",
    description:
      "From audit to action, signals compress into decisions you can ship—fast enough to matter in markets indexed by search and generative AI.",
    icon: "velocity",
  },
];

function EdgeIcon({ type }: { type: EdgeCard["icon"] }) {
  const cls = "h-8 w-8 text-cyan-500 sm:h-9 sm:w-9";
  switch (type) {
    case "adaptive":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 7h4v10H4V7ZM10 5h4v14h-4V5ZM16 9h4v6h-4V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M19 3v4M17 5h4M6 14l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "ethical":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 21s8-4.5 8-11V5l-8-3-8 3v5c0 6.5 8 11 8 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 8.5c-1.2 1.5-3 2.4-3 4.2 0 1.4 1.1 2.3 3 3.8 1.9-1.5 3-2.4 3-3.8 0-1.8-1.8-2.7-3-4.2Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "precision":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 21h8M12 17v4M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 11h14v2a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 15v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M13 2 3 14h7l-1 8 11-12h-7l2-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
  }
}

function BentoCard({ card }: { card: EdgeCard }) {
  return (
    <article
      data-cursor-hover
      className={`flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${card.wide ? "md:col-span-2" : "md:col-span-1"}`}
      style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
    >
      <div className="mb-5 sm:mb-6">
        <EdgeIcon type={card.icon} />
      </div>
      <h3
        className="text-xl font-bold leading-snug tracking-tight sm:text-2xl sm:leading-snug md:text-[1.65rem] md:leading-tight transition-colors duration-300"
        style={{ color: "var(--text-primary)" }}
      >
        {card.title}
      </h3>
      <p
        className="mt-4 text-sm leading-relaxed sm:mt-5 sm:text-[0.9375rem] sm:leading-relaxed transition-colors duration-300"
        style={{ color: "var(--text-secondary)" }}
      >
        {card.description}
      </p>
    </article>
  );
}

export function AboutEdgeSection() {
  return (
    <section
      className="px-6 py-20 sm:px-10 sm:py-24 lg:py-28 transition-colors duration-300"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg-page)" }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-center text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-[3.25rem] md:leading-[1.08] transition-colors duration-300"
          style={{ color: "var(--text-primary)" }}
        >
          The Gintex Edge
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3">
          {CARDS.map((card) => (
            <BentoCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
