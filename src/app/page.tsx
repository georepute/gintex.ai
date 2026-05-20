import type { Metadata } from "next";
import { CoreCapabilitiesSection } from "@/components/home/CoreCapabilitiesSection";

export const metadata: Metadata = {
  title: "Gintex AI — AI Visibility, Reputation & Market Intelligence",
  description:
    "Control how AI systems, search engines, and digital markets perceive your brand. GeoRepute audits, SEO systems, reputation intelligence, and strategic authority-building.",
  alternates: { canonical: "https://gintex-ai.vercel.app" },
};
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { GeoReputeSection } from "@/components/home/GeoReputeSection";
import { OptimizationLoopSection } from "@/components/home/OptimizationLoopSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FaqSection } from "@/components/home/FaqSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustedBy } from "@/components/home/TrustedBy";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col transition-colors duration-300" style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}>
        <HeroSection />
        <TrustedBy />
        <FeaturesSection />
        <GeoReputeSection />
        <EcosystemSection />
        <CoreCapabilitiesSection />
        <OptimizationLoopSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <CtaSection />
    </>
  );
}
