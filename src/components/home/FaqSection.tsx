"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleContext";

const FAQS = [
  {
    q: "How does Gintex integrate with our existing tools?",
    a: "We use secure APIs and connectors to work alongside your CRM, analytics, ad platforms, and content systems—so you keep your stack while we layer intelligence on top, without forcing a disruptive migration.",
  },
  {
    q: "Is our data secure when using Gintex AI?",
    a: "Yes. We treat your data with strict access controls, encryption in transit and at rest where applicable, and clear data-handling practices. We're happy to walk through security, retention, and compliance questions with your team.",
  },
  {
    q: "What is a typical ramp-up or engagement timeline?",
    a: "Most engagements start with discovery and audit (often a few weeks), followed by roadmap and quick wins, then ongoing execution and optimization. Exact timing depends on scope, channels, and how fast your team can collaborate.",
  },
  {
    q: "Who is Gintex built for?",
    a: "Marketing and growth teams, founders, and enterprises that want clearer perception in AI and search, stronger visibility, and execution that ties back to measurable outcomes—not one-off campaigns with no feedback loop.",
  },
  {
    q: "How do you measure success?",
    a: "We align on KPIs up front—visibility, pipeline, efficiency, or revenue proxies—then report through dashboards and reviews so you can see what changed, why, and what to do next in the optimization loop.",
  },
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 transition-all duration-300 ${open ? "rotate-180" : ""}`}
      style={{ color: open ? "#0ea5e9" : "var(--text-muted)" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function FaqSection() {
  const { t } = useLocale();
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = t.faq.items;

  return (
    <section
      className="px-6 py-24 sm:px-10 sm:py-28 transition-colors duration-300"
      style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-300"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {t.faq.heading}
        </motion.h2>

        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const headerId = `${baseId}-header-${index}`;

            return (
              <motion.div
                key={item.q}
                className="overflow-hidden rounded-xl transition-all duration-200"
                data-cursor-hover
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  boxShadow: open ? "0 4px 24px -8px rgba(14,165,233,0.12)" : "none",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span
                    className="text-base font-medium sm:text-[1.05rem] transition-colors duration-300"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.q}
                  </span>
                  <Chevron open={open} />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className="px-5 pb-5 pt-3 text-sm leading-relaxed sm:px-6 sm:pb-6 sm:text-base transition-colors duration-300"
                      style={{
                        borderTop: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
