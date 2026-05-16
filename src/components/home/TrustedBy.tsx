"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "500+",  label: "Organizations Analyzed"       },
  { value: "94%",   label: "Visibility Improvement"       },
  { value: "3.4×",  label: "Avg. Strategic Growth Lift"   },
  { value: "48h",   label: "Intelligence Turnaround"      },
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
    <section
      className="px-6 py-14 sm:px-10 sm:py-16 transition-colors duration-300"
      style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-6xl">

        <motion.p
          className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300"
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted by organizations across industries worldwide
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
                className="text-3xl font-bold tracking-tight sm:text-4xl"
                style={{
                  background: "linear-gradient(135deg, var(--text-primary) 0%, #0ea5e9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {value}
              </span>
              <span className="text-xs font-medium sm:text-sm transition-colors duration-300" style={{ color: "var(--text-muted)" }}>{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mb-10 h-px w-full"
          style={{ background: "linear-gradient(to right, transparent, var(--border), transparent)" }}
        />

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
              className="rounded-full px-4 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors duration-200"
              style={{
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.25 + idx * 0.05 }}
              whileHover={{ borderColor: "rgba(14,165,233,0.4)", color: "var(--text-primary)" }}
            >
              {industry}
            </motion.span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
