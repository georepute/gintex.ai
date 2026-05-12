import Image from "next/image";
import { Fragment } from "react";
import { LEADER_PROFILE } from "@/data/about-leadership";
import founderImg from "@/Gintex-images/ceo.png";

function BioWithEmphasis({ text, name }: { text: string; name: string }) {
  const parts = text.split(name);
  return (
    <p className="text-base leading-[1.75] sm:text-[1.05rem] sm:leading-[1.8] transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? (
            <strong className="font-semibold transition-colors duration-300" style={{ color: "var(--text-primary)" }}>{name}</strong>
          ) : null}
        </Fragment>
      ))}
    </p>
  );
}

export function AboutLeadershipSection() {
  const { sectionHeading, name, role, imageAlt, bio, tagline } = LEADER_PROFILE;

  return (
    <section
      className="px-6 py-16 sm:px-10 sm:py-20 lg:py-24 transition-colors duration-300"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg-subtle)" }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-center text-[1.65rem] font-bold tracking-tight sm:text-3xl md:text-[2.125rem] transition-colors duration-300"
          style={{ color: "var(--text-primary)" }}
        >
          {sectionHeading}
        </h2>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
          <div className="min-w-0 text-left lg:pr-4">
            <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className="text-2xl font-bold tracking-tight sm:text-3xl transition-colors duration-300"
                style={{ color: "var(--text-primary)" }}
              >
                {name}
              </span>
              <span className="font-label text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-500">
                {role}
              </span>
            </div>
            <BioWithEmphasis text={bio} name={name} />
          </div>

          <div
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:justify-self-end"
            data-cursor-hover
          >
            <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-cyan-500/5 blur-2xl lg:-inset-6" aria-hidden />
            <div
              className="relative overflow-hidden rounded-2xl p-3 shadow-lg sm:p-3.5 transition-colors duration-300"
              style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
            >
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-xl sm:aspect-[3/4] transition-colors duration-300"
                style={{ background: "var(--bg-subtle)" }}
              >
                <Image
                  src={founderImg}
                  alt={imageAlt}
                  fill
                  className="object-cover object-[center_8%]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>

        <p
          className="font-label mx-auto mt-14 max-w-4xl text-center text-[0.7rem] font-bold uppercase leading-relaxed tracking-[0.14em] sm:mt-16 sm:text-xs sm:tracking-[0.16em] md:text-[0.8rem] md:leading-relaxed transition-colors duration-300"
          style={{ color: "var(--text-primary)" }}
        >
          {tagline}
        </p>
      </div>
    </section>
  );
}
