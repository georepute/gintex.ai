import type { Metadata } from "next";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SystemCard } from "@/components/services/SystemCard";
import { ServicesCtaSection } from "@/components/services/ServicesCtaSection";
import { SERVICES, SERVICES_INTRO, SYSTEMS } from "@/data/services";

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

      {/* Our Systems */}
      <section
        className="px-6 py-14 sm:px-10 sm:py-16 transition-colors duration-300"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
            </span>
            <p className="font-label text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-500">
              Our Live Systems
            </p>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {SYSTEMS.map((system) => (
              <SystemCard key={system.title} system={system} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Cards grid */}
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
