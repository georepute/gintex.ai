"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import advisoryImg from "@/Gintex-images/Services img1.png";
import auditImg from "@/Gintex-images/Services img2.png";

const SERVICES = [
  {
    kicker: "Advisory",
    title: "Business and Marketing Advisory",
    description:
      "Executive-level guidance to align brand narrative, audience strategy, and channel mix with revenue and long-term market position.",
    image: advisoryImg,
    alt: "Abstract neural network visualization representing strategic intelligence",
    orb: "rgba(14,165,233,0.15)",
    line: "from-transparent via-sky-400/90 to-transparent",
    hoverGlow: "rgba(14,165,233,0.18)",
    imageTint: "from-sky-500/10 via-transparent to-transparent",
  },
  {
    kicker: "Diagnostics",
    title: "Marketing Audit",
    description:
      "Rigorous review of your campaigns, data, and tech stack—surfacing inefficiencies, risks, and high-impact opportunities with clear next steps.",
    image: auditImg,
    alt: "Abstract 3D render representing marketing analysis and insight",
    orb: "rgba(217,70,239,0.12)",
    line: "from-transparent via-fuchsia-400/85 to-transparent",
    hoverGlow: "rgba(167,139,250,0.15)",
    imageTint: "from-fuchsia-500/12 via-transparent to-transparent",
  },
] as const;

export function CoreCapabilitiesSection() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32 transition-colors duration-300"
      style={{ background: "var(--bg-subtle)" }}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[520px] rounded-full bg-sky-400/[0.06] blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[380px] w-[480px] rounded-full bg-violet-500/[0.05] blur-[100px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20 xl:gap-24">

          {/* Sticky header */}
          <motion.header
            className="max-w-lg shrink-0 lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="font-label text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-500">
              Services
            </p>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12] transition-colors duration-300"
              style={{ color: "var(--text-primary)" }}
            >
              Core{" "}
              <span className="bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
            <p
              className="mt-6 max-w-md text-base leading-relaxed sm:text-lg transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
            >
              Our multi-disciplinary team merges creative excellence with
              algorithmic rigor.
            </p>
            <Link
              href="/services"
              className="group/cta font-label mt-10 inline-flex items-center gap-3 rounded-full border border-sky-500/35 bg-sky-500/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-500 shadow-[0_0_24px_-8px_rgba(14,165,233,0.35)] backdrop-blur-sm transition-all duration-300 hover:border-sky-400/55 hover:bg-sky-500/15 hover:shadow-[0_0_32px_-6px_rgba(56,189,248,0.4)] sm:text-sm"
            >
              View all services
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/10 text-sm transition-transform duration-300 group-hover/cta:translate-x-0.5"
                aria-hidden
              >
                →
              </span>
            </Link>
          </motion.header>

          {/* Cards */}
          <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-7">
            {SERVICES.map(({ kicker, title, description, image, alt, orb, line, hoverGlow, imageTint }, index) => (
              <motion.article
                key={title}
                data-cursor-hover
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
                whileHover={{
                  boxShadow: `0 28px 64px -14px ${hoverGlow}`,
                }}
              >
                {/* Corner orb */}
                <div
                  className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ background: `radial-gradient(circle, ${orb} 0%, transparent 70%)` }}
                  aria-hidden
                />
                {/* Top accent line */}
                <div
                  className={`pointer-events-none absolute inset-x-8 top-0 h-[2px] rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${line}`}
                  aria-hidden
                />

                {/* Image */}
                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div className="relative aspect-[16/11] w-full sm:aspect-[5/3]">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${imageTint} to-black/30`}
                      aria-hidden
                    />
                  </div>
                  <span
                    className="font-label absolute left-5 top-5 rounded-md border border-white/20 bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-700 backdrop-blur-md shadow-sm"
                  >
                    {kicker}
                  </span>
                  <span
                    className="absolute bottom-4 right-5 font-mono text-[10px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                  <h3
                    className="text-lg font-semibold leading-snug tracking-tight sm:text-xl transition-colors duration-300"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mt-4 text-sm leading-relaxed sm:text-[0.9375rem] transition-colors duration-300"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {description}
                  </p>
                  <span className="font-label mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    Explore
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
