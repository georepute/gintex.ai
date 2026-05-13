export type JourneyMilestone = {
  year: string;
  title: string;
  description: string;
  /** Dot on the center rail */
  dot: "violet" | "teal";
  /** When true: story in left column, year in right column */
  narrativeOnLeft: boolean;
};

export const ABOUT_JOURNEY_MILESTONES: readonly JourneyMilestone[] = [
  {
    year: "2020",
    title: "Genesis",
    description:
      "Gintex is formed around one idea: marketing decisions should follow intelligence, not hunches. Early work focuses on visibility, narrative, and perception—before campaigns, before spend.",
    dot: "violet",
    narrativeOnLeft: true,
  },
  {
    year: "2022",
    title: "The intelligence layer",
    description:
      "GeoRepute-style baselines, audits, and the Plan–Do–Check–Act loop harden into a repeatable system—SEO, GEO, content, and owned assets wired to the same source of truth.",
    dot: "teal",
    narrativeOnLeft: false,
  },
  {
    year: "2024",
    title: "Global expansion",
    description:
      "Advisory and build engagements scale with enterprise partners; delivery, automation, and governance mature while the mission stays the same—truth in the data, speed in the loop.",
    dot: "violet",
    narrativeOnLeft: true,
  },
];
