"use client";

import { useId, useState } from "react";

const FAQS = [
  {
    q: "How does Gintex integrate with our existing tools?",
    a: "We use secure APIs and connectors to work alongside your CRM, analytics, ad platforms, and content systems—so you keep your stack while we layer intelligence on top, without forcing a disruptive migration.",
  },
  {
    q: "Is our data secure when using Gintex AI?",
    a: "Yes. We treat your data with strict access controls, encryption in transit and at rest where applicable, and clear data-handling practices. We’re happy to walk through security, retention, and compliance questions with your team.",
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
      className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-white/10 bg-[#0a0a0a] px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Frequently Asked
        </h2>

        <div className="mt-12 flex flex-col gap-4">
          {FAQS.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const headerId = `${baseId}-header-${index}`;

            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#141414] transition-colors hover:border-white/[0.11]"
                data-cursor-hover
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className="text-base font-medium text-white sm:text-[1.05rem]">
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
                    <p className="border-t border-white/[0.06] px-5 pb-5 pt-3 text-sm leading-relaxed text-gray-400 sm:px-6 sm:pb-6 sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
