import Link from "next/link";

/* Always a dark strip — the final CTA before the footer */
export function CtaSection() {
  return (
    <section className="bg-[#080c12] px-6 pt-16 pb-20 sm:px-10 sm:pt-20 sm:pb-28">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] px-8 py-12 sm:px-10 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-14 lg:px-14 lg:py-16">
        <div className="max-w-2xl lg:flex-1">
          <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl md:leading-snug">
            If you don&apos;t understand how the market perceives you, every
            strategic decision becomes a guess.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-400 sm:text-lg">
            Every engagement begins with intelligence. Tell us about your organization and we&apos;ll map your current market position — and the strategic path forward.
          </p>
        </div>
        <div className="mt-10 flex shrink-0 flex-col items-center gap-3 lg:mt-0 lg:items-end">
          <Link
            href="/contact"
            className="inline-flex h-12 min-w-[11rem] items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition-opacity hover:opacity-90 sm:min-w-[12.5rem] sm:text-base"
          >
            Request an Intelligence Audit
          </Link>
          <p className="text-[11px] text-gray-500">No commitment. Intelligence report delivered in 48 hours.</p>
        </div>
      </div>
    </section>
  );
}
