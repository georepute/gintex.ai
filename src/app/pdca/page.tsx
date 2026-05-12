import type { Metadata } from "next";
import { PdcaHeroSection } from "@/components/pdca/PdcaHeroSection";
import { PdcaCtaSection } from "@/components/pdca/PdcaCtaSection";
import { PdcaPhaseDetailSections } from "@/components/pdca/PdcaPhaseDetailSections";

export const metadata: Metadata = {
  title: "PDCA Framework | Gintex Ai",
  description:
    "Plan, Do, Check, Act—reimagined with AI and GeoReput intelligence for faster optimization and clearer ROI.",
};

export default function PdcaPage() {
  return (
    <main className="flex flex-1 flex-col transition-colors duration-300" style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}>
      <PdcaHeroSection />
      <PdcaPhaseDetailSections />
      <PdcaCtaSection />
    </main>
  );
}
