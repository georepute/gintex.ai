import type { ReactNode } from "react";
import Link from "next/link";
import { ContactInquiryForm } from "@/components/contact/ContactInquiryForm";
import { ContactChannelsSection } from "@/components/contact/ContactChannelsSection";

function IconBox({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 transition-colors duration-300"
      style={{ border: "1px solid var(--border)", background: "var(--bg-subtle)" }}
    >
      {children}
    </div>
  );
}

const CONTACT = {
  email: "hello@gintex.ai",
  phone: "972-55-6-800-600",
  phoneHref: "tel:+972556800600",
  hq: "Global · Remote-first",
} as const;

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "X",
    href: "https://twitter.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
] as const;

export function ContactView() {
  return (
    <main
      className="relative flex flex-1 flex-col overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,rgba(59,130,246,0.07),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">

          {/* Left: info */}
          <div className="min-w-0">
            <p className="font-label text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-500 sm:text-xs">
              Connectivity
            </p>
            <h1
              className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-[3.25rem] transition-colors duration-300"
              style={{ color: "var(--text-primary)" }}
            >
              Get in{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p
              className="mt-6 max-w-lg text-base leading-relaxed sm:text-lg transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
            >
              Partner with Gintex AI on GeoReput intelligence, execution, and
              systems that tie perception to outcomes. Tell us what you&apos;re
              building—we&apos;ll help you architect the next step.
            </p>

            <ul className="mt-10 space-y-8 sm:mt-12">
              {/* Email */}
              <li className="flex gap-4">
                <IconBox>
                  <svg className="h-5 w-5 transition-colors duration-300" style={{ color: "var(--text-primary)" }} viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="m4 7 8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </IconBox>
                <div>
                  <p className="font-label text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{ color: "var(--text-muted)" }}>Email us</p>
                  <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-lg font-semibold transition-colors hover:text-sky-500 sm:text-xl" style={{ color: "var(--text-primary)" }}>
                    {CONTACT.email}
                  </a>
                </div>
              </li>
              {/* Phone */}
              <li className="flex gap-4">
                <IconBox>
                  <svg className="h-5 w-5 transition-colors duration-300" style={{ color: "var(--text-primary)" }} viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.59a1 1 0 0 1-.25 1l-2.2 2.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </IconBox>
                <div>
                  <p className="font-label text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{ color: "var(--text-muted)" }}>Phone</p>
                  <a href={CONTACT.phoneHref} className="mt-1 block text-lg font-semibold transition-colors hover:text-sky-500 sm:text-xl" style={{ color: "var(--text-primary)" }}>
                    {CONTACT.phone}
                  </a>
                </div>
              </li>
              {/* HQ */}
              <li className="flex gap-4">
                <IconBox>
                  <svg className="h-5 w-5 transition-colors duration-300" style={{ color: "var(--text-primary)" }} viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </IconBox>
                <div>
                  <p className="font-label text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{ color: "var(--text-muted)" }}>Headquarters</p>
                  <p className="mt-1 text-lg font-semibold sm:text-xl transition-colors duration-300" style={{ color: "var(--text-primary)" }}>{CONTACT.hq}</p>
                </div>
              </li>
            </ul>

            {/* Social links */}
            <div className="mt-12 sm:mt-14">
              <p className="font-label text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300" style={{ color: "var(--text-muted)" }}>
                Digital presence
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {SOCIALS.map(({ label, href, path }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200"
                    style={{ border: "1px solid var(--border)", background: "var(--bg-subtle)", color: "var(--text-secondary)" }}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                      <path d={path} fill="currentColor" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <ContactInquiryForm />
        </div>
      </div>

      <ContactChannelsSection />
    </main>
  );
}
