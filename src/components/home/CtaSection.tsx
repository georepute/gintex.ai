import Link from "next/link";

export function CtaSection() {
  return (
    <section className="border-t border-white/10 bg-black px-6 pt-16 pb-20 sm:px-10 sm:pt-20 sm:pb-28">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-white/[0.08] bg-[#141414] px-8 py-12 sm:px-10 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-14 lg:px-14 lg:py-16">
        <div className="max-w-2xl lg:flex-1">
          <h2 className="text-lg font-bold uppercase leading-snug tracking-[0.08em] text-white sm:text-xl md:text-2xl md:leading-snug">
            Ready to talk? Start with intelligence.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-400 sm:text-lg">
            Every engagement starts with understanding. Tell us about your
            challenge, and we&apos;ll help you determine the right path forward
            starting with intelligence.
          </p>
        </div>
        <div className="mt-10 shrink-0 lg:mt-0">
          <Link
            href="/contact"
            className="inline-flex h-12 min-w-[11rem] items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition-opacity hover:opacity-90 sm:min-w-[12.5rem] sm:text-base"
          >
            Talk to Us
          </Link>
        </div>
      </div>
    </section>
  );
}
