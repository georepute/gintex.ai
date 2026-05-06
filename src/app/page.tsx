import { HeroSection } from "@/components/home/HeroSection";
import { TrustedBy } from "@/components/home/TrustedBy";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-black text-white">
      <HeroSection />
      <TrustedBy />
    </main>
  );
}
