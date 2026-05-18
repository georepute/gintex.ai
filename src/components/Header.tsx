"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n/LocaleContext";

function ConsultationLink({ label, className }: { label: string; className?: string }) {
  return (
    <Link
      href="/contact"
      className={
        "rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-center text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 sm:px-6 " +
        (className ?? "")
      }
    >
      {label}
    </Link>
  );
}

function LangToggle() {
  const { locale, setLocale } = useLocale();
  const next = locale === "en" ? "he" : "en";

  return (
    <button
      onClick={() => setLocale(next)}
      className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:opacity-80"
      style={{
        borderColor: "var(--border)",
        color: "var(--text-secondary)",
        background: "var(--bg-subtle)",
      }}
      aria-label={`Switch to ${next === "he" ? "Hebrew" : "English"}`}
    >
      <span className="text-sm">{locale === "en" ? "🇮🇱" : "🇬🇧"}</span>
      {locale === "en" ? "עב" : "EN"}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const { t } = useLocale();

  const NAV_LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/intelligence", label: t.nav.intelligence },
    { href: "/pdca", label: t.nav.pdca },
    { href: "/global-map", label: t.nav.globalMap },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md transition-colors duration-300"
      style={{
        background: "var(--header-bg)",
        borderBottom: "1px solid var(--header-border)",
      }}
    >
      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Gintex AI"
              width={260}
              height={88}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <LangToggle />
            <ConsultationLink label={t.nav.bookConsultation} />
            <Link
              href="/admin/login"
              className="rounded-full border border-gray-400/40 px-3 py-2 text-center text-sm font-medium transition-colors duration-200 hover:border-gray-400/70"
              style={{ color: "var(--text-secondary)" }}
            >
              {t.nav.admin}
            </Link>
          </div>
        </div>

        <nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:gap-8 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:flex-nowrap lg:justify-start"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className="border-b-2 pb-1 transition-colors duration-200"
                style={{
                  borderColor: isActive ? "var(--text-primary)" : "transparent",
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LangToggle />
          <ConsultationLink label={t.nav.bookConsultation} />
          <Link
            href="/admin/login"
            className="rounded-full border border-gray-400/40 px-4 py-2 text-center text-sm font-medium transition-colors duration-200 hover:border-gray-400/70"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.nav.admin}
          </Link>
        </div>
      </div>
    </header>
  );
}
