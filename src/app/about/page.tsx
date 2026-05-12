import type { Metadata } from "next";
import { AboutCtaSection } from "@/components/about/AboutCtaSection";
import { AboutCoreSection } from "@/components/about/AboutCoreSection";
import { AboutEdgeSection } from "@/components/about/AboutEdgeSection";
import { AboutJourneySection } from "@/components/about/AboutJourneySection";
import { AboutLeadershipSection } from "@/components/about/AboutLeadershipSection";
import { AboutPhilosophySection } from "@/components/about/AboutPhilosophySection";

export const metadata: Metadata = {
  title: "About — The Intelligence Behind the System",
  description:
    "Gintex AI is a perception intelligence company. We build the systems that help brands understand and control how they appear across AI, search, and digital markets.",
  alternates: { canonical: "https://gintex-ai.vercel.app/about" },
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
