"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "500+",  label: "Brands Audited"         },
  { value: "94%",   label: "AI Visibility Lift"      },
  { value: "3.4×",  label: "Avg. ROI Improvement"    },
  { value: "48h",   label: "Audit Turnaround"        },
] as const;

const INDUSTRIES = [
  "SaaS & Tech",
  "Finance & Fintech",
  "Healthcare",
  "E-commerce",
  "Legal & Consulting",
  "Real Estate",
  "Media & Publishing",
  "Startups",
] as const;

export function TrustedBy() {
  return (
    <section className="border-t border-white/[0.07] bg-black px-6 py-14 sm:px-10 sm:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Label */}
        <motion.p
          className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted across industries worldwide
        </motion.p>

        {/* Stats row */}
        <div className="mb-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map(({ value, label }, idx) => (
            <motion.div
              key={label}
              className="flex flex-col items-center gap-1.5 text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
            >
              <span
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                style={{
                  background: "linear-gradient(135deg, #fff 0%, rgba(56,189,248,0.85) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {value}
              </span>
              <span className="text-xs font-medium text-gray-500 sm:text-sm">{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

        {/* Industry badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {INDUSTRIES.map((industry, idx) => (
            <motion.span
              key={industry}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-gray-400 backdrop-blur-sm transition-colors hover:border-sky-500/30 hover:text-gray-300"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.25 + idx * 0.05 }}
            >
              {industry}
            </motion.span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
