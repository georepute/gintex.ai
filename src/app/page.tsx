import { CoreCapabilitiesSection } from "@/components/home/CoreCapabilitiesSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { OptimizationLoopSection } from "@/components/home/OptimizationLoopSection";
import { FaqSection } from "@/components/home/FaqSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustedBy } from "@/components/home/TrustedBy";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-black text-white">
      <HeroSection />
      <TrustedBy />
      <FeaturesSection />
      <CoreCapabilitiesSection />
      <OptimizationLoopSection />
      <TestimonialsSection />
      <FaqSection />
    </main>
  );
}
