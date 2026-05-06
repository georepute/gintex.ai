import type { Metadata } from "next";
import { AboutCtaSection } from "@/components/about/AboutCtaSection";
import { AboutCoreSection } from "@/components/about/AboutCoreSection";
import { AboutEdgeSection } from "@/components/about/AboutEdgeSection";
import { AboutJourneySection } from "@/components/about/AboutJourneySection";
import { AboutLeadershipSection } from "@/components/about/AboutLeadershipSection";
import { AboutPhilosophySection } from "@/components/about/AboutPhilosophySection";

export const metadata: Metadata = {
  title: "About | Gintex Ai",
  description:
    "Our core purpose: intelligence that redefines how brands understand markets, people, and AI-driven discovery.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col bg-[#0a0a0a] text-white">
      <AboutCoreSection />
      <AboutPhilosophySection />
      <AboutEdgeSection />
      <AboutLeadershipSection />
      <AboutJourneySection />
      <AboutCtaSection />
    </main>
  );
}
