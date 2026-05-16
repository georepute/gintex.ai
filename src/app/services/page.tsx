import type { Metadata } from "next";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServicesCtaSection } from "@/components/services/ServicesCtaSection";
import { SERVICES, SERVICES_INTRO } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — Intelligence-Led Growth Systems",
  description:
    "AI visibility audits, reputation intelligence, SEO systems, strategic advisory, and digital authority-building. Purpose-built services for brands serious about market positioning.",
  alternates: { canonical: "https://gintex-ai.vercel.app/services" },
};

export default function ServicesPage() {
  return (
    <main
      className="flex flex-1 flex-col transition-colors duration-300"
      style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      {/* Hero */}
      <section
        className="px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20 transition-colors duration-300"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-6xl text-left">
          <p className="font-label text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-500 sm:text-xs">
            Our capabilities
          </p>
          <h1
            className="mt-6 text-4xl font-bold tracking-tight sm:mt-7 sm:text-5xl md:text-[3.5rem] md:leading-[1.08] transition-colors duration-300"
            style={{ color: "var(--text-primary)" }}
          >
            Intelligence-Led Growth Systems
          </h1>
          <p
            className="mt-8 max-w-3xl text-base font-normal leading-[1.65] sm:mt-10 sm:text-lg sm:leading-relaxed transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            {SERVICES_INTRO}
          </p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <ServicesCtaSection />
    </main>
  );
}
