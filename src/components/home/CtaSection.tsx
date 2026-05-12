import Link from "next/link";

export function CtaSection() {
  return (
    <section className="border-t border-white/10 bg-black px-6 pt-16 pb-20 sm:px-10 sm:pt-20 sm:pb-28">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-white/[0.08] bg-[#141414] px-8 py-12 sm:px-10 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-14 lg:px-14 lg:py-16">
        <div className="max-w-2xl lg:flex-1">
          <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl md:leading-snug">
            If you don&apos;t understand your starting point, every marketing
            decision becomes a guess.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-400 sm:text-lg">
            Every engagement starts with understanding. Tell us about your
            challenge, and we&apos;ll help you determine the right path forward
            starting with intelligence.
          </p>
        </div>
        <div className="mt-10 flex shrink-0 flex-col items-center gap-3 lg:mt-0 lg:items-end">
          <Link
            href="/contact"
            className="inline-flex h-12 min-w-[11rem] items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition-opacity hover:opacity-90 sm:min-w-[12.5rem] sm:text-base"
          >
            Get Your Audit
          </Link>
          <p className="text-[11px] text-gray-500">No commitment. Results in 48 hours.</p>
        </div>
      </div>
    </section>
  );
}
