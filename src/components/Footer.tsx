"use client";

import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SocialIcons } from "@/components/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto transition-colors duration-300"
      style={{
        background: "var(--bg-strip-footer)",
        color: "var(--footer-text)",
        borderTop: "1px solid var(--footer-border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-11">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-6">

          <div className="space-y-2.5">
            <p className="text-xl font-bold tracking-tight sm:text-2xl" style={{ color: "var(--footer-heading)" }}>
              GINTEX AI
            </p>
            <p className="text-sm leading-snug" style={{ color: "var(--footer-muted)" }}>
              AI visibility, reputation intelligence, and market positioning
              systems for brands that take perception seriously.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-label text-xs font-bold uppercase tracking-wider" style={{ color: "var(--footer-muted)" }}>
              Quick links
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/services", label: "Services" },
                { href: "/intelligence", label: "Intelligence" },
                { href: "/pdca", label: "PDCA Framework" },
                { href: "/global-map", label: "Global Intelligence Map" },
                { href: "/about", label: "About Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200 hover:opacity-100"
                    style={{ color: "var(--footer-link)", opacity: 0.75 }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--footer-heading)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--footer-link)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-label text-xs font-bold uppercase tracking-wider" style={{ color: "var(--footer-muted)" }}>
              Resources
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/contact", label: "Contact" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/intelligence-report", label: "Intelligence Report" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--footer-link)", opacity: 0.75 }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--footer-heading)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--footer-link)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-label text-xs font-bold uppercase tracking-wider" style={{ color: "var(--footer-muted)" }}>
              Newsletter
            </h3>
            <NewsletterForm />
          </div>
        </div>

        <div
          className="mt-7 pt-6 sm:mt-8 sm:pt-6"
          style={{ borderTop: "1px solid var(--footer-border)" }}
        >
          <SocialIcons />
        </div>

        <div
          className="font-label mt-5 flex flex-col gap-3 pt-5 text-[11px] font-medium uppercase tracking-wider sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-5"
          style={{ borderTop: "1px solid var(--footer-border)", color: "var(--footer-muted)" }}
        >
          <p>© {year} GINTEX AI. Perception Intelligence.</p>
          <p className="normal-case text-sm tracking-normal sm:text-right" style={{ color: "var(--footer-muted)" }}>
            Developed by{" "}
            <a
              href="https://skal.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline-offset-4 transition-colors hover:underline"
              style={{ color: "var(--footer-heading)" }}
            >
              skal.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
