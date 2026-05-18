"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "GINTEX gave us a level of market intelligence we didn't know was possible. We now understand exactly how our industry perceives us — and how to strategically change it.",
    name: "Marcus Thorne",
    role: "CMO, Veloce Global",
    initials: "MT",
    accentBorder: "#38bdf8",
    avatarBg: "rgba(14,165,233,0.08)",
    avatarText: "#0369a1",
    avatarRing: "rgba(14,165,233,0.2)",
  },
  {
    quote:
      "This is not a marketing vendor. This is a strategic intelligence partner. The depth of their analytical frameworks is unlike anything we've encountered.",
    name: "Elena Vance",
    role: "Founder, Aura Digital",
    initials: "EV",
    accentBorder: "#a78bfa",
    avatarBg: "rgba(139,92,246,0.08)",
    avatarText: "#7c3aed",
    avatarRing: "rgba(139,92,246,0.2)",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section
      className="px-6 py-24 sm:px-10 sm:py-28 transition-colors duration-300"
      style={{ background: "var(--bg-page)", borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-14 xl:gap-16">
        <motion.header
          className="max-w-lg shrink-0 lg:w-[40%] lg:max-w-none lg:pr-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2
            className="text-left text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-tight transition-colors duration-300"
            style={{ color: "var(--text-primary)" }}
          >
            What Our Clients Say
          </h2>
          <p
            className="mt-5 text-left text-base leading-relaxed sm:text-lg transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            Organizations that have used GINTEX intelligence infrastructure to understand and improve their strategic market position.
          </p>
        </motion.header>

        <div className="flex min-w-0 flex-1 flex-col gap-6 lg:gap-7">
          {TESTIMONIALS.map((t, idx) => (
            <motion.figure
              key={t.name}
              data-cursor-hover
              className="group flex flex-col rounded-2xl border-l-4 p-6 sm:p-8 transition-all duration-300"
              style={{
                border: "1px solid var(--border)",
                borderLeftWidth: 4,
                borderLeftColor: t.accentBorder,
                background: "var(--bg-subtle)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ background: "var(--bg-card)" } as never}
            >
              <blockquote
                className="text-base leading-relaxed sm:text-lg transition-colors duration-300"
                style={{ color: "var(--text-primary)" }}
              >
                <p className="italic">&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                  style={{
                    background: t.avatarBg,
                    color: t.avatarText,
                    boxShadow: `0 0 0 1px ${t.avatarRing}`,
                  }}
                  aria-hidden
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold transition-colors duration-300" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                  <p className="mt-0.5 text-sm transition-colors duration-300" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
