import type { Metadata } from "next";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServicesCtaSection } from "@/components/services/ServicesCtaSection";
import { SERVICES, SERVICES_INTRO } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Gintex Ai",
  description:
    "Our solutions bridge consultancy and AI—GeoReput intelligence, advisory, audits, content, and software powered by innovation.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col bg-[#0a0a0a] text-white">
      <section className="border-b border-white/[0.06] px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-6xl text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#4A90E2] sm:text-xs">
            Our capabilities
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:mt-7 sm:text-5xl md:text-[3.5rem] md:leading-[1.08]">
            Our solutions.
          </h1>
          <p className="mt-8 max-w-3xl text-base font-normal leading-[1.65] text-[#b8b8b8] sm:mt-10 sm:text-lg sm:leading-relaxed">
            {SERVICES_INTRO}
          </p>
        </div>
      </section>

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
