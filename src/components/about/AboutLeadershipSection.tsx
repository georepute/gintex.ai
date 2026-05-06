import Image from "next/image";
import { Fragment } from "react";
import { LEADER_PROFILE } from "@/data/about-leadership";
import founderImg from "@/Gintex-images/ceo.png";

function BioWithEmphasis({ text, name }: { text: string; name: string }) {
  const parts = text.split(name);
  return (
    <p className="text-base leading-[1.75] text-[#b0b0b0] sm:text-[1.05rem] sm:leading-[1.8]">
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? (
            <strong className="font-semibold text-white">{name}</strong>
          ) : null}
        </Fragment>
      ))}
    </p>
  );
}

export function AboutLeadershipSection() {
  const { sectionHeading, name, role, imageAlt, bio, tagline } = LEADER_PROFILE;

  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0a] px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-[1.65rem] font-bold tracking-tight text-white sm:text-3xl md:text-[2.125rem]">
          {sectionHeading}
        </h2>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
          <div className="min-w-0 text-left lg:pr-4">
            <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {name}
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-400/95">
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
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#141414] p-3 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.05] sm:p-3.5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#1a1a1a] sm:aspect-[3/4]">
                <Image
                  src={founderImg}
                  alt={imageAlt}
                  fill
                  className="object-cover object-[center_8%]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07),inset_0_-40px_56px_-16px_rgba(10,10,10,0.5)]"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-4xl text-center text-[0.7rem] font-bold uppercase leading-relaxed tracking-[0.14em] text-white sm:mt-16 sm:text-xs sm:tracking-[0.16em] md:text-[0.8rem] md:leading-relaxed">
          {tagline}
        </p>
      </div>
    </section>
  );
}
