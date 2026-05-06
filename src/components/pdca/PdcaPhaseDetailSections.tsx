import Image from "next/image";
import { PDCA_PHASE_DETAILS } from "@/data/pdca";

function PhaseIcon({ slug }: { slug: string }) {
  const cls = "h-5 w-5 sm:h-6 sm:w-6";
  switch (slug) {
    case "plan":
      return (
        <svg className={`${cls} text-sky-400`} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3a7 7 0 0 0-7 7c0 3.2 2.2 5.9 5.2 6.7L12 21l1.8-4.3c3-.8 5.2-3.5 5.2-6.7a7 7 0 0 0-7-7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 10.5h.01M12.5 10.5h.01M10 14c.8.6 1.7.9 2.7.9s1.9-.3 2.7-.9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "do":
      return (
        <svg className={`${cls} text-[#a78bfa]`} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 11V7a5 5 0 0 1 10 0v4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M5 11h14v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M12 15v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "check":
      return (
        <svg className={`${cls} text-[#20c997]`} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 12.5 10.5 15 16 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg className={`${cls} text-[#60a5fa]`} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 4v6h6M20 20v-6h-6M20 9a9 9 0 0 0-14.32-4.906L4 10M4 15a9 9 0 0 0 14.32 4.906L20 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

const topAccent: Record<string, string> = {
  plan: "from-sky-500/90 via-sky-400/50 to-transparent",
  do: "from-[#a78bfa]/90 via-[#a78bfa]/40 to-transparent",
  check: "from-[#20c997]/90 via-[#20c997]/45 to-transparent",
  act: "from-[#3b82f6]/90 via-[#60a5fa]/45 to-transparent",
};

function BulletList({
  items,
  accentClass,
}: {
  items: { emphasis: string; text: string }[];
  accentClass: string;
}) {
  return (
    <ul className="mt-8 space-y-3 sm:mt-9">
      {items.map((item) => (
        <li
          key={item.emphasis}
          className="flex gap-3.5 rounded-xl border border-white/[0.06] bg-[#101010] px-4 py-3.5 sm:px-5 sm:py-4"
        >
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${accentClass}`}
            aria-hidden
          >
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6 5 8.5 9.5 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="text-sm leading-relaxed text-[#b8b8b8] sm:text-[0.9375rem] sm:leading-relaxed">
            <span className="font-semibold text-white">{item.emphasis}</span>{" "}
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

const accentRing: Record<string, string> = {
  plan: "border-sky-400/55 bg-sky-400/12 text-sky-200",
  do: "border-[#a78bfa]/55 bg-[#a78bfa]/12 text-[#ddd6fe]",
  check: "border-[#20c997]/55 bg-[#20c997]/12 text-[#5eead4]",
  act: "border-[#60a5fa]/55 bg-[#60a5fa]/12 text-[#93c5fd]",
};

function PhaseColumn({
  num,
  title,
  slug,
  body,
  bullets,
}: Pick<
  (typeof PDCA_PHASE_DETAILS)[number],
  "num" | "title" | "slug" | "body" | "bullets"
>) {
  return (
    <div data-cursor-hover className="flex min-w-0 flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1a1a1a] ring-1 ring-white/[0.08] sm:h-12 sm:w-12">
          <PhaseIcon slug={slug} />
        </div>
        <h2 className="min-w-0 pt-0.5 text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-[2.15rem]">
          <span className="text-white/75">{num}.</span> {title}
        </h2>
      </div>
      <p className="mt-6 text-base leading-[1.7] text-[#b0b0b0] sm:mt-7 sm:text-lg">
        {body}
      </p>
      <BulletList items={bullets} accentClass={accentRing[slug] ?? accentRing.plan} />
    </div>
  );
}

function PhaseImage({
  image,
  imageAlt,
}: Pick<(typeof PDCA_PHASE_DETAILS)[number], "image" | "imageAlt">) {
  return (
    <div className="relative min-h-[200px] w-full sm:min-h-[260px] lg:absolute lg:inset-0 lg:min-h-0">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#141414]/25 lg:via-transparent lg:to-transparent"
        aria-hidden
      />
    </div>
  );
}

export function PdcaPhaseDetailSections() {
  return (
    <div className="border-t border-white/[0.06] bg-[#0a0a0a]">
      {PDCA_PHASE_DETAILS.map((phase) => {
        const isTextFirst = phase.layout === "text-image";
        const accent = topAccent[phase.slug] ?? topAccent.plan;

        return (
          <section key={phase.slug} className="px-6 py-8 sm:px-10 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-6xl">
              <article
                data-cursor-hover
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141414] shadow-[0_28px_90px_-40px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.04]"
              >
                <div
                  className={`pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r ${accent}`}
                  aria-hidden
                />
                <div className="grid lg:grid-cols-2 lg:items-stretch">
                  {isTextFirst ? (
                    <>
                      <PhaseColumn
                        num={phase.num}
                        title={phase.title}
                        slug={phase.slug}
                        body={phase.body}
                        bullets={phase.bullets}
                      />
                      <div className="relative min-h-[220px] lg:min-h-[380px]">
                        <PhaseImage image={phase.image} imageAlt={phase.imageAlt} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative min-h-[220px] lg:min-h-[380px] lg:order-1">
                        <PhaseImage image={phase.image} imageAlt={phase.imageAlt} />
                      </div>
                      <div className="lg:order-2">
                        <PhaseColumn
                          num={phase.num}
                          title={phase.title}
                          slug={phase.slug}
                          body={phase.body}
                          bullets={phase.bullets}
                        />
                      </div>
                    </>
                  )}
                </div>
              </article>
            </div>
          </section>
        );
      })}
    </div>
  );
}
