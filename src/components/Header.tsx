"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/pdca", label: "PDCA" },
  { href: "/global-map", label: "Global Map" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function ConsultationLink({ className }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={
        "rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-center text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 sm:px-6 " +
        (className ?? "")
      }
    >
      Book a Consultation
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();

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
            <ConsultationLink />
            <Link
              href="/admin/login"
              className="rounded-full border border-gray-400/40 px-3 py-2 text-center text-sm font-medium transition-colors duration-200 hover:border-gray-400/70"
              style={{ color: "var(--text-secondary)" }}
            >
              Admin
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
          <ConsultationLink />
          <Link
            href="/admin/login"
            className="rounded-full border border-gray-400/40 px-4 py-2 text-center text-sm font-medium transition-colors duration-200 hover:border-gray-400/70"
            style={{ color: "var(--text-secondary)" }}
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
