export type ServiceAccent = "purple" | "teal";

export type ServiceItem = {
  title: string;
  summary: string;
  accent: ServiceAccent;
  icon:
    | "target"
    | "briefcase"
    | "clipboard"
    | "search"
    | "user"
    | "rocket"
    | "share"
    | "layers"
    | "pen"
    | "code";
};

export const SERVICES_INTRO =
  "We bridge the gap between high-level consultancy and avant-garde artificial intelligence, delivering precision marketing systems that scale with human intelligence.";

export const SERVICES: ServiceItem[] = [
  {
    title: "GeoReput market execution",
    summary:
      "Turn GeoReput intelligence into structured, measurable actions. Execution follows real data and approved plans—no guesswork, only aligned market moves.",
    accent: "purple",
    icon: "target",
  },
  {
    title: "Business & marketing advisory",
    summary:
      "Executive guidance on positioning, growth engines, and ongoing control. Advisory stays tied to metrics and outcomes, not slide decks.",
    accent: "teal",
    icon: "briefcase",
  },
  {
    title: "Plans & strategy development",
    summary:
      "Market analysis, audience definition, and entry or growth strategy distilled into a measurable plan with clear KPIs and timelines.",
    accent: "purple",
    icon: "clipboard",
  },
  {
    title: "Marketing audit",
    summary:
      "Review digital assets, funnels, and past performance. You get gaps, bottlenecks, and prioritized fixes—not a generic checklist.",
    accent: "teal",
    icon: "search",
  },
  {
    title: "Personal reputation intelligence",
    summary:
      "Audit how you show up across search and AI narratives. Shape authority assets and close the gap between perception and the position you want.",
    accent: "purple",
    icon: "user",
  },
  {
    title: "Startup growth intelligence",
    summary:
      "Positioning, product–market fit signals, GTM, and visibility in AI-driven discovery—built for traction, not vanity milestones.",
    accent: "teal",
    icon: "rocket",
  },
  {
    title: "Content & distribution",
    summary:
      "Strategic publishing across the platforms that shape perception—consistent, format-aware presence where your market actually looks.",
    accent: "purple",
    icon: "share",
  },
  {
    title: "Owned assets & blogs",
    summary:
      "Sites and hubs you control—Next.js, WordPress, Shopify, Wix, or custom—so narrative and SEO aren’t rented from a single channel.",
    accent: "teal",
    icon: "layers",
  },
  {
    title: "Authority-first content",
    summary:
      "Original, data-backed content optimized for search and AI visibility—clear voice, credible sourcing, no recycled filler.",
    accent: "purple",
    icon: "pen",
  },
  {
    title: "AI-powered software",
    summary:
      "Custom apps and integrations with modern stacks, ML where it matters, and code you can grow—automation without brittle shortcuts.",
    accent: "teal",
    icon: "code",
  },
];
