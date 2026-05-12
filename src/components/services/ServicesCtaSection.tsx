import Link from "next/link";

/* Dark strip CTA — always dark like the home page CTA */
export function ServicesCtaSection() {
  return (
    <section className="bg-[#080c12] px-6 pb-20 pt-4 sm:px-10 sm:pb-24 sm:pt-6">
      <div className="mx-auto max-w-6xl">
        <div
          data-cursor-hover
          className="mx-auto max-w-3xl rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] px-8 py-12 text-center shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7)] sm:px-12 sm:py-14 md:px-14 md:py-16"
        >
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl md:text-[1.75rem] md:leading-tight">
            Ready to redefine your intelligence?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-400 sm:mt-6 sm:text-lg sm:leading-relaxed">
            Partner with Gintex AI to turn positioning, content, and execution
            into systems that scale—with GeoReput-grade insight and automation
            built for real markets.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="font-label inline-flex h-12 w-full min-w-[12rem] items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg transition-opacity hover:opacity-90 sm:w-auto sm:px-8 sm:text-[0.7rem]"
            >
              Get in touch
            </Link>
            <Link
              href="/about"
              className="font-label inline-flex h-12 w-full min-w-[12rem] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-white/35 hover:bg-white/10 sm:w-auto sm:px-8 sm:text-[0.7rem]"
            >
              About us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
