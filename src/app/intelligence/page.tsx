import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intelligence — Insights, Research & Frameworks",
  description:
    "Perspectives on AI visibility, brand perception, GEO, SEO, and market intelligence. Research and frameworks from the Gintex AI team.",
  alternates: { canonical: "https://gintex-ai.vercel.app/intelligence" },
};

export default function IntelligencePage() {
  return (
    <main className="flex flex-1 flex-col bg-[#0a0a0a] text-white">

      {/* Hero */}
      <section className="border-b border-white/[0.06] px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-label text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-400 sm:text-xs">
            Intelligence
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.5rem] md:leading-[1.08]">
            Insights & Research
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Frameworks, research, and perspectives on AI visibility, brand
            perception, market intelligence, and the systems that drive
            measurable growth.
          </p>
        </div>
      </section>

      {/* Coming soon / placeholder grid */}
      <section className="flex flex-1 items-center justify-center px-6 py-32 sm:px-10">
        <div className="mx-auto max-w-xl text-center">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08]"
            style={{
              background: "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(139,92,246,0.08))",
            }}
          >
            <svg
              className="h-7 w-7 text-sky-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 20h9" />
              <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Articles coming soon
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-500 sm:text-base">
            We&apos;re publishing research on AI visibility, brand perception,
            GEO frameworks, and market intelligence. Check back shortly.
          </p>
        </div>
      </section>

    </main>
  );
}
