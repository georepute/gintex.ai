"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pdca", label: "PDCA" },
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
    <header className="sticky top-0 z-50 bg-[#0a0a0a]">
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
          <ConsultationLink className="shrink-0 lg:hidden" />
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
                className={
                  isActive
                    ? "border-b-2 border-white pb-1 font-medium text-white"
                    : "border-b-2 border-transparent pb-1 text-gray-300 transition-colors hover:text-white"
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <ConsultationLink className="hidden shrink-0 lg:inline-flex" />
      </div>
    </header>
  );
}
