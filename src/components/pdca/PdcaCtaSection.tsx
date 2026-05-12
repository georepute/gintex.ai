import Link from "next/link";

export function PdcaCtaSection() {
  return (
    <section className="bg-[#080c12] px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-[2rem] md:leading-tight">
          Ready to optimize your cycle?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-400 sm:mt-6 sm:text-lg sm:leading-relaxed">
          Schedule a deep dive with Gintex AI to see how the PDCA framework
          fits your marketing stack, GeoReput intelligence, and day-to-day
          operations.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/contact"
            data-cursor-hover
            className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-opacity hover:opacity-90 sm:min-w-[14rem]"
          >
            Start the transformation
          </Link>
          <Link
            href="/services"
            data-cursor-hover
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/10 sm:min-w-[14rem]"
          >
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}
