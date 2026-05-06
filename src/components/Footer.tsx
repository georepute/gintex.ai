import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SocialIcons } from "@/components/SocialIcons";

const linkClass =
  "text-sm text-gray-400 transition-colors hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-11">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-6">
          <div className="space-y-2.5">
            <p className="text-xl font-bold tracking-tight sm:text-2xl">GINTEX AI</p>
            <p className="text-sm leading-snug text-gray-400">
              Intelligence Redefined. Harnessing the power of advanced neural
              systems for tomorrow&apos;s market leaders.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Quick links
            </h3>
            <ul className="flex flex-col gap-2">
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

          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Resources
            </h3>
            <ul className="flex flex-col gap-2">
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

          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Newsletter
            </h3>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-7 border-t border-white/10 pt-6 sm:mt-8 sm:pt-6">
          <SocialIcons />
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 text-[11px] font-medium uppercase tracking-wider text-gray-400 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-5">
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
