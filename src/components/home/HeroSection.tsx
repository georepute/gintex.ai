import Image from "next/image";
import Link from "next/link";
import heroImage from "@/Gintex-images/Main img 1.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:px-10 sm:pt-24 lg:pb-24 lg:pt-28 xl:pt-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_75%_-10%,rgba(34,211,238,0.12),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.4))]" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-y-12 lg:gap-x-28 xl:gap-x-40">
        <div className="flex max-w-xl flex-col gap-8 lg:max-w-none">
          <div className="font-label inline-flex w-fit items-center rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white sm:text-xs">
            Marketing Evolution
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Intelligence{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Redefined
            </span>{" "}
            for Modern Marketing.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Gintex AI leverages advanced neural architectures to automate
            workflows, predict consumer behavior, and scale your brand&apos;s
            reach with surgical precision.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-opacity hover:opacity-90"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-transparent px-8 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Book Consultation
            </Link>
          </div>
        </div>

        <div className="relative w-full lg:justify-self-end">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-cyan-500/20 ring-1 ring-white/10 shadow-[0_0_80px_-12px_rgba(34,211,238,0.45),0_25px_50px_-12px_rgba(0,0,0,0.6)]">
            <Image
              src={heroImage}
              alt="Futuristic analytics dashboard with neural network visualizations"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
