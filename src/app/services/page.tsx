import type { Metadata } from "next";
import { ServicesPageClient } from "@/components/services/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services — Intelligence-Led Growth Systems",
  description:
    "AI visibility audits, reputation intelligence, SEO systems, strategic advisory, and digital authority-building. Purpose-built services for brands serious about market positioning.",
  alternates: { canonical: "https://gintex-ai.vercel.app/services" },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
