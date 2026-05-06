import Link from "next/link";

export function AboutCtaSection() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0a] px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div
          data-cursor-hover
          className="rounded-[1.75rem] border border-white/[0.08] bg-[#121212] px-8 py-12 text-center shadow-[0_28px_90px_-40px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04] sm:px-12 sm:py-14 md:px-16 md:py-16"
        >
          <h2 className="mx-auto max-w-3xl text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl md:text-[2.125rem] md:leading-tight">
            Ready to join the intelligence revolution?
          </h2>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-purple-600 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-900/35 transition-opacity hover:opacity-90 sm:min-w-[11.5rem]"
            >
              Join the Team
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-8 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/[0.08] sm:min-w-[11.5rem]"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
