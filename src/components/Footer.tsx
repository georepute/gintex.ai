import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SocialIcons } from "@/components/SocialIcons";

const linkClass =
  "text-sm text-gray-400 transition-colors hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="space-y-4">
            <p className="text-2xl font-bold tracking-tight">GINTEX AI</p>
            <p className="text-sm leading-relaxed text-gray-400">
              Intelligence Redefined. Harnessing the power of advanced neural
              systems for tomorrow&apos;s market leaders.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Quick links
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/services" className={linkClass}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pdca" className={linkClass}>
                  PDCA Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className={linkClass}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Resources
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/intelligence-report" className={linkClass}>
                  Intelligence Report
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Newsletter
            </h3>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <SocialIcons />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-[11px] font-medium uppercase tracking-wider text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} GINTEX AI. Intelligence Redefined.
          </p>
          <p className="normal-case text-sm tracking-normal text-gray-400 sm:text-right">
            Developed by{" "}
            <a
              href="https://skal.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white underline-offset-4 transition-colors hover:text-gray-200 hover:underline"
            >
              skal.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
