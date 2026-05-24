"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLang } from "./LanguageContext";

const NAV_LINKS = [
  { href: "/", en: "Home", he: "בית" },
  { href: "/services", en: "Services", he: "שירותים" },
  { href: "/intelligence", en: "Intelligence", he: "מודיעין" },
  { href: "/pdca", en: "PDCA", he: "PDCA" },
  { href: "/global-map", en: "Global Map", he: "מפה גלובלית" },
  { href: "/about", en: "About", he: "אודות" },
  { href: "/contact", en: "Contact", he: "צור קשר" },
] as const;

function LangToggle() {
  const { lang, toggleLang } = useLang();
  const isHe = lang === "he";

  return (
    <button
      onClick={toggleLang}
      aria-label="Switch language"
      className="relative flex h-7 w-16 shrink-0 cursor-pointer items-center rounded-full p-[3px] focus:outline-none"
      style={{
        background: "var(--header-bg)",
        border: "1px solid rgba(150,150,150,0.25)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12)",
      }}
    >
      {/* sliding pill */}
      <span
        className="absolute top-[3px] h-[22px] w-[26px] rounded-full transition-all duration-300 ease-in-out"
        style={{
          left: isHe ? "calc(100% - 29px)" : "3px",
          background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
          boxShadow: "0 1px 4px rgba(99,102,241,0.5)",
        }}
      />
      {/* EN label */}
      <span
        className="z-10 flex-1 select-none text-center text-[11px] font-semibold tracking-wide transition-colors duration-300"
        style={{ color: isHe ? "var(--text-secondary)" : "#fff" }}
      >
        EN
      </span>
      {/* HE label */}
      <span
        className="z-10 flex-1 select-none text-center text-[11px] font-semibold tracking-wide transition-colors duration-300"
        style={{ color: isHe ? "#fff" : "var(--text-secondary)" }}
      >
        עב
      </span>
    </button>
  );
}

function ConsultationLink({ className }: { className?: string }) {
  const { lang } = useLang();
  return (
    <Link
      href="/contact"
      className={
        "rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-center text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 sm:px-6 " +
        (className ?? "")
      }
    >
      {lang === "he" ? "קבע ייעוץ" : "Book a Consultation"}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const { lang } = useLang();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md transition-colors duration-300"
      style={{
        background: "var(--header-bg)",
        borderBottom: "1px solid var(--header-border)",
      }}
    >
      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between xl:gap-6 xl:px-10">
        <div className="flex flex-col items-center gap-3 xl:flex-row xl:justify-between xl:gap-4">
          <Link href="/" className="flex shrink-0 items-center xl:self-auto">
            <Image
              src="/logo.png"
              alt="Gintex AI"
              width={260}
              height={88}
              className="h-14 w-auto object-contain sm:h-16 xl:h-20"
              priority
            />
          </Link>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 xl:hidden">
            <ConsultationLink />
            <Link
              href="/admin/login"
              className="rounded-full border border-gray-400/40 px-3 py-2 text-center text-sm font-medium transition-colors duration-200 hover:border-gray-400/70"
              style={{ color: "var(--text-secondary)" }}
            >
              Admin
            </Link>
            <LangToggle />
          </div>
        </div>

        <nav
          className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm sm:gap-x-6 xl:min-w-0 xl:flex-1 xl:flex-nowrap xl:justify-center xl:gap-x-5 2xl:gap-x-7"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ href, en, he }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className="whitespace-nowrap border-b-2 pb-1 transition-colors duration-200"
                style={{
                  borderColor: isActive ? "var(--text-primary)" : "transparent",
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {lang === "he" ? he : en}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <ConsultationLink />
          <Link
            href="/admin/login"
            className="rounded-full border border-gray-400/40 px-4 py-2 text-center text-sm font-medium transition-colors duration-200 hover:border-gray-400/70"
            style={{ color: "var(--text-secondary)" }}
          >
            Admin
          </Link>
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
