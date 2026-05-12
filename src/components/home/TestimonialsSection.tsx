"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Gintex AI transformed our lead generation within weeks. The AI targeting is scarily accurate.",
    name: "Marcus Thorne",
    role: "CMO, Veloce Global",
    initials: "MT",
    accent:
      "border-l-sky-400/35 hover:border-l-sky-400/55 hover:shadow-[0_0_32px_-16px_rgba(56,189,248,0.12)]",
    avatar:
      "bg-zinc-800/90 text-sky-100/90 ring-1 ring-sky-400/20 group-hover:ring-sky-400/30",
  },
  {
    quote:
      "The only agency that understands both the creative soul and the algorithmic machine.",
    name: "Elena Vance",
    role: "Founder, Aura Digital",
    initials: "EV",
    accent:
      "border-l-violet-400/35 hover:border-l-violet-400/55 hover:shadow-[0_0_32px_-16px_rgba(167,139,250,0.12)]",
    avatar:
      "bg-zinc-800/90 text-violet-100/90 ring-1 ring-violet-400/20 group-hover:ring-violet-400/30",
  },
] as const;

type Testimonial = (typeof TESTIMONIALS)[number];

function TestimonialCard({ quote, name, role, initials, accent, avatar }: Testimonial) {
  return (
    <figure
      data-cursor-hover
      className={`group flex flex-col rounded-2xl border border-white/[0.08] border-l-2 bg-[#121212] p-6 transition-all duration-300 hover:bg-[#141414] sm:p-8 ${accent}`}
    >
      <blockquote className="text-base leading-relaxed text-white/95 sm:text-lg">
        <p className="italic">&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-[box-shadow] duration-300 ${avatar}`}
          aria-hidden
        >
          {initials}
        </div>
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="mt-0.5 text-sm text-gray-400">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-14 xl:gap-16">
        <motion.header
          className="max-w-lg shrink-0 lg:w-[40%] lg:max-w-none lg:pr-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-left text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
            Voices of Success
          </h2>
          <p className="mt-5 text-left text-base leading-relaxed text-gray-400 sm:text-lg">
            Leading enterprises are already experiencing the Gintex advantage.
            Join the elite.
          </p>
        </motion.header>

        <div className="flex min-w-0 flex-1 flex-col gap-6 lg:gap-7">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: "easeOut" }}
            >
              <TestimonialCard {...t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
