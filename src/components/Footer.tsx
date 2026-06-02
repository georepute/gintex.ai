"use client";

import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SocialIcons } from "@/components/SocialIcons";
import { useLang } from "@/components/LanguageContext";
import { t, tx } from "@/lib/translations";

export function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLang();

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
              {tx(t.footer.tagline, lang)}
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-label text-xs font-bold uppercase tracking-wider" style={{ color: "var(--footer-muted)" }}>
              {tx(t.footer.quickLinks, lang)}
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/services",     label: tx(t.footer.links.services, lang) },
                { href: "/intelligence", label: tx(t.footer.links.intelligence, lang) },
                { href: "/pdca",         label: tx(t.footer.links.pdca, lang) },
                { href: "/global-map",   label: tx(t.footer.links.globalMap, lang) },
                { href: "/about",        label: tx(t.footer.links.about, lang) },
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
              {tx(t.footer.resources, lang)}
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/contact",        label: tx(t.footer.links.contact, lang) },
                { href: "/privacy-policy", label: tx(t.footer.links.privacy, lang) },
                { href: "/cookie-policy",  label: tx(t.footer.links.cookies, lang) },
                { href: "/terms-of-use",   label: tx(t.footer.links.terms, lang) },
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
              {tx(t.footer.newsletter, lang)}
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
          <p>© {year} GINTEX AI. {tx(t.footer.copyright, lang)}</p>
          <p className="normal-case text-sm tracking-normal sm:text-right" style={{ color: "var(--footer-muted)" }}>
            {tx(t.footer.developedBy, lang)}{" "}
            <span className="font-medium" style={{ color: "var(--footer-heading)" }}>
              Gintex
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
