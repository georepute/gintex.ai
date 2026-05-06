import Image from "next/image";
import Link from "next/link";
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
    orb: "bg-sky-500/25 group-hover:bg-sky-400/35",
    line: "from-transparent via-sky-400/90 to-transparent",
    shadow:
      "hover:shadow-[0_28px_64px_-14px_rgba(14,165,233,0.35),0_0_0_1px_rgba(14,165,233,0.12)_inset]",
    imageTint: "from-sky-500/10 via-transparent to-transparent",
  },
  {
    kicker: "Diagnostics",
    title: "Marketing Audit",
    description:
      "Rigorous review of your campaigns, data, and tech stack—surfacing inefficiencies, risks, and high-impact opportunities with clear next steps.",
    image: auditImg,
    alt: "Abstract 3D render representing marketing analysis and insight",
    orb: "bg-fuchsia-500/20 group-hover:bg-violet-400/30",
    line: "from-transparent via-fuchsia-400/85 to-transparent",
    shadow:
      "hover:shadow-[0_28px_64px_-14px_rgba(217,70,239,0.28),0_0_0_1px_rgba(167,139,250,0.12)_inset]",
    imageTint: "from-fuchsia-500/12 via-transparent to-transparent",
  },
] as const;

export function CoreCapabilitiesSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-24 sm:px-10 sm:py-32">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[520px] rounded-full bg-sky-500/12 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-[380px] w-[480px] rounded-full bg-violet-600/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_28%,transparent_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20 xl:gap-24">
          <header className="max-w-lg shrink-0 lg:sticky lg:top-28">
            <p className="font-label text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-400/90">
              Services
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              Core{" "}
              <span className="bg-gradient-to-r from-white via-sky-100 to-sky-400/90 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-gray-400 sm:text-lg">
              Our multi-disciplinary team merges creative excellence with
              algorithmic rigor.
            </p>
            <Link
              href="/services"
              className="group/cta font-label mt-10 inline-flex items-center gap-3 rounded-full border border-sky-500/35 bg-sky-500/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300 shadow-[0_0_24px_-8px_rgba(14,165,233,0.45)] backdrop-blur-sm transition-all duration-300 hover:border-sky-400/55 hover:bg-sky-500/15 hover:text-white hover:shadow-[0_0_32px_-6px_rgba(56,189,248,0.5)] sm:text-sm"
            >
              View all services
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm transition-transform duration-300 group-hover/cta:translate-x-0.5"
                aria-hidden
              >
                →
              </span>
            </Link>
          </header>

          <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-7">
            {SERVICES.map(
              (
                {
                  kicker,
                  title,
                  description,
                  image,
                  alt,
                  orb,
                  line,
                  shadow,
                  imageTint,
                },
                index,
              ) => (
                <article
                  key={title}
                  data-cursor-hover
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.06] via-[#111] to-[#080808] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-white/[0.14] ${shadow}`}
                >
                  <div
                    className={`pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl transition-all duration-500 ${orb}`}
                    aria-hidden
                  />
                  <div
                    className={`pointer-events-none absolute inset-x-8 top-0 h-[2px] rounded-full bg-gradient-to-r opacity-0 shadow-[0_0_16px_rgba(255,255,255,0.25)] transition-opacity duration-300 group-hover:opacity-100 ${line}`}
                    aria-hidden
                  />

                  <div className="relative shrink-0 overflow-hidden border-b border-white/[0.08]">
                    <div className="relative aspect-[16/11] w-full sm:aspect-[5/3]">
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                      />
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${imageTint} to-black/50`}
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90"
                        aria-hidden
                      />
                    </div>
                    <span className="font-label absolute left-5 top-5 rounded-md border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                      {kicker}
                    </span>
                    <span className="absolute bottom-4 right-5 font-mono text-[10px] font-medium text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
                      {title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300 sm:text-[0.9375rem]">
                      {description}
                    </p>
                    <span className="font-label mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-400/80 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      Explore
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
