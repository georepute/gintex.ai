export type ContactChannelAccent = "cyan" | "teal" | "violet";

export type ContactChannel = {
  id: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  accent: ContactChannelAccent;
};

export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  {
    id: "support",
    title: "Technical support",
    description:
      "Priority assistance for GeoRepute baselines, live integrations, and Gintex-built systems—so your intelligence stack stays reliable when it matters.",
    linkLabel: "Open ticket",
    href: "mailto:support@gintex.ai?subject=Support%20request",
    accent: "cyan",
  },
  {
    id: "sales",
    title: "Global sales",
    description:
      "Scoping enterprise advisory, audits, retainers, or build-outs? Let’s align ROI, timelines, and execution with how your markets actually move.",
    linkLabel: "Contact sales",
    href: "#inquiry",
    accent: "teal",
  },
  {
    id: "careers",
    title: "Join the mission",
    description:
      "We look for people who think in systems, respect the data, and ship with judgment. Tell us what you want to build next.",
    linkLabel: "Careers portal",
    href: "mailto:careers@gintex.ai?subject=Careers%20inquiry",
    accent: "violet",
  },
];
