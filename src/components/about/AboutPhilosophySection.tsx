import Image from "next/image";
import circleImg from "@/Gintex-images/circle.png";

export function AboutPhilosophySection() {
  return (
    <section className="border-t border-white/[0.06] bg-black px-6 py-20 sm:px-10 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
        <div className="min-w-0 lg:pr-4">
          <p className="font-label text-[10px] font-semibold uppercase tracking-[0.38em] text-cyan-400 sm:text-[11px] sm:tracking-[0.4em]">
            Philosophy
          </p>
          <h2 className="mt-5 max-w-xl text-[2rem] font-bold leading-[1.15] tracking-tight text-white sm:mt-6 sm:text-4xl sm:leading-[1.12] md:text-[2.75rem] md:leading-[1.1]">
            The Neural Symphony
          </h2>
          <div className="mt-8 max-w-lg space-y-6 text-[0.9375rem] leading-[1.75] text-[#9ca3af] sm:mt-9 sm:text-base sm:leading-[1.8]">
            <p>
              At Gintex AI, we believe data is not static numbers, but a
              living, breathing narrative. Our philosophy centers on{" "}
              <strong className="font-semibold text-white">
                &quot;The Neural Symphony&quot;
              </strong>
              —the harmonious integration of algorithmic precision and human
              intuition.
            </p>
            <p>
              We don&apos;t just build models; we architect ecosystems where
              intelligence evolves. Every line of code we write is a bridge
              toward a future where decision-making is frictionless and
              infinitely scalable.
            </p>
          </div>
        </div>

        <div
          className="relative mx-auto flex w-full max-w-[min(100%,380px)] justify-center sm:max-w-[420px] lg:mx-0 lg:max-w-none lg:justify-end"
          data-cursor-hover
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[64px]"
            aria-hidden
          />
          <div className="relative aspect-square w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[min(100%,440px)]">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/25 via-transparent to-transparent opacity-80"
              aria-hidden
            />
            <div className="relative h-full w-full overflow-hidden rounded-full border border-cyan-500/25 bg-[#030708] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_60px_-8px_rgba(34,211,238,0.45),0_0_120px_-24px_rgba(34,211,238,0.2)]">
              <Image
                src={circleImg}
                alt="Abstract neural network visualization in glowing cyan"
                fill
                className="scale-[1.06] object-cover object-center"
                sizes="(max-width: 1024px) 380px, 440px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
