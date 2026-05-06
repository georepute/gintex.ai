import type { StaticImageData } from "next/image";
import planImg from "@/Gintex-images/Services img1.png";
import doImg from "@/Gintex-images/Services img2.png";
import checkImg from "@/Gintex-images/Main img 1.png";

export type PdcaPhaseLayout = "text-image" | "image-text";

export type PdcaPhaseDetail = {
  slug: string;
  num: string;
  title: string;
  body: string;
  layout: PdcaPhaseLayout;
  image: StaticImageData;
  imageAlt: string;
  bullets: { emphasis: string; text: string }[];
};

export const PDCA_PHASE_DETAILS: readonly PdcaPhaseDetail[] = [
  {
    slug: "plan",
    num: "01",
    title: "Plan",
    layout: "text-image",
    image: planImg,
    imageAlt: "Analytics visualization with charts and data glow",
    body:
      "The Plan stage begins with GeoReput. This is where visibility across Google and AI systems is analyzed, narrative and perception gaps are identified, competition and market focus are mapped, and opportunities are prioritized. Planning without intelligence is guessing; this stage establishes the factual truth before any action is taken.",
    bullets: [
      {
        emphasis: "GeoReput baseline:",
        text: "Map how you appear across Google, AI answers, and key discovery surfaces—not assumptions.",
      },
      {
        emphasis: "Truth before tactics:",
        text: "Prioritize gaps, competitors, and opportunities so the plan reflects reality, not habit.",
      },
    ],
  },
  {
    slug: "do",
    num: "02",
    title: "Do",
    layout: "image-text",
    image: doImg,
    imageAlt: "Execution and systems in motion",
    body:
      "Execution begins only after a clear intelligence foundation exists. Actions are selected based on necessity, not habit, across channels such as SEO, GEO, content, advertising, and social. The goal is precision—doing what is required, not everything that is possible—while ensuring full alignment between message, market, and strategy.",
    bullets: [
      {
        emphasis: "Necessity-driven work:",
        text: "Ship only what the plan demands across SEO, GEO, content, ads, and social.",
      },
      {
        emphasis: "Aligned execution:",
        text: "Keep message, market, and strategy in sync so effort compounds instead of drifts.",
      },
    ],
  },
  {
    slug: "check",
    num: "03",
    title: "Check",
    layout: "text-image",
    image: checkImg,
    imageAlt: "Performance review and intelligence dashboards",
    body:
      "The Check stage measures real change, not vanity metrics. It evaluates shifts in visibility, perception, and narrative, compares results against the original plan, and identifies emerging market and AI-driven trends. This stage ensures accountability and prevents execution from drifting away from strategic intent.",
    bullets: [
      {
        emphasis: "Signal over vanity:",
        text: "Track visibility, perception, and narrative shifts—not only surface-level counts.",
      },
      {
        emphasis: "Plan vs reality:",
        text: "Compare outcomes to the plan and surface AI- and market-driven trends early.",
      },
    ],
  },
  {
    slug: "act",
    num: "04",
    title: "Act",
    layout: "image-text",
    image: doImg,
    imageAlt: "Strategy refinement and continuous improvement",
    body:
      "Act is where the system learns. Based on measured outcomes, strategies are refined, messages and channels are adjusted, priorities are recalibrated, and new intelligence feeds back into the next planning cycle. This continuous improvement loop is what separates a system from a campaign.",
    bullets: [
      {
        emphasis: "Learn from outcomes:",
        text: "Refine strategy, messaging, and channel mix from what actually moved the needle.",
      },
      {
        emphasis: "Feed the next Plan:",
        text: "Recalibrate priorities so intelligence flows back into the loop—not a one-off campaign.",
      },
    ],
  },
];
