import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — Gintex AI",
  description:
    "Understand how Gintex AI uses cookies and browser storage, what data they contain, how long they last, and how you can manage your preferences.",
  alternates: { canonical: "https://www.gintex.ai/cookie-policy" },
};

interface CookieRow {
  name: string;
  category: string;
  purpose: string;
  retention: string;
  provider: string;
}

const COOKIE_TABLE: CookieRow[] = [
  {
    name: "gintex-theme",
    category: "Functional (LocalStorage)",
    purpose: "Remembers your light or dark display mode preference.",
    retention: "Persistent — until you clear browser storage",
    provider: "Gintex AI (first-party, client-side only)",
  },
  {
    name: "sb-* (Supabase session)",
    category: "Strictly Necessary",
    purpose:
      "Maintains an authenticated session for authorized admin users. Only set when an admin logs in; not present for regular visitors.",
    retention: "Session / expires per Supabase token lifetime (~1 hour, refreshed automatically)",
    provider: "Supabase (supabase.com)",
  },
  {
    name: "gintex-cookie-consent",
    category: "Strictly Necessary",
    purpose:
      "Records your cookie consent choice so the consent banner does not reappear on subsequent visits.",
    retention: "12 months",
    provider: "Gintex AI (first-party)",
  },
];

export default function CookiePolicyPage() {
  return (
    <main
      className="flex flex-1 flex-col transition-colors duration-300"
      style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      {/* Hero */}
      <section
        className="border-b px-6 py-16 sm:px-10 sm:py-20"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="mx-auto max-w-3xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent-cyan)" }}
          >
            Legal
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Last Updated: June 2, 2026
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            This policy explains what cookies and browser storage we use on
            the Gintex AI website, why we use them, and how you can control
            them.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-14">

          {/* What are cookies */}
          <div id="what-are-cookies" className="scroll-mt-24">
            <h2 className="mb-5 text-xl font-bold sm:text-2xl">1. What Are Cookies?</h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>
                Cookies are small text files that a website places on your
                device when you visit. They are widely used to make websites
                work more efficiently and to provide information to website
                owners. Cookies can be "session" cookies (deleted when you
                close your browser) or "persistent" cookies (remaining on your
                device for a set period).
              </p>
              <p>
                In addition to cookies, we also use <strong>browser
                LocalStorage</strong> — a mechanism that lets websites store
                data directly in your browser. Unlike cookies, LocalStorage
                data is not sent to our servers with every request; it stays
                entirely on your device.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div id="cookie-categories" className="scroll-mt-24">
            <h2 className="mb-5 text-xl font-bold sm:text-2xl">2. Categories of Cookies We Use</h2>
            <div className="space-y-8" style={{ color: "var(--text-secondary)" }}>

              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <h3 className="mb-2 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                  Strictly Necessary Cookies
                </h3>
                <p className="text-sm leading-relaxed">
                  These cookies are essential for the website to function and
                  cannot be switched off without breaking core functionality.
                  They are typically set in response to actions you take, such
                  as logging in to the admin panel.
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  <strong>Current use:</strong> Supabase authentication session
                  cookies (<code>sb-*</code>) are set when an authorized
                  administrator logs in. These are not present for regular
                  public visitors. The <code>gintex-cookie-consent</code> cookie
                  that records your consent choice also falls into this category.
                </p>
                <p
                  className="mt-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  Consent required: No (strictly necessary)
                </p>
              </div>

              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <h3 className="mb-2 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                  Functional Cookies / LocalStorage
                </h3>
                <p className="text-sm leading-relaxed">
                  These enable enhanced functionality and personalization. On
                  our site, this consists of a single LocalStorage entry that
                  saves your theme preference (light or dark mode). This
                  data never leaves your device.
                </p>
                <p
                  className="mt-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  Consent required: No (device-only, no personal data)
                </p>
              </div>

              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <h3 className="mb-2 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                  Analytics Cookies
                </h3>
                <p className="text-sm leading-relaxed">
                  Analytics cookies help us understand how visitors interact
                  with our website. <strong>We do not currently use any
                  third-party analytics cookies</strong> (e.g., Google
                  Analytics, Mixpanel, or similar). If we introduce analytics
                  in the future, this policy will be updated and consent will
                  be requested where required by law.
                </p>
                <p
                  className="mt-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  Status: Not currently in use
                </p>
              </div>

              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <h3 className="mb-2 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                  Advertising &amp; Targeting Cookies
                </h3>
                <p className="text-sm leading-relaxed">
                  We do not use advertising or retargeting cookies. We do not
                  run behavioral advertising campaigns or share your browsing
                  data with advertising networks.
                </p>
                <p
                  className="mt-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  Status: Not in use
                </p>
              </div>

              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <h3 className="mb-2 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                  Third-Party Cookies
                </h3>
                <p className="text-sm leading-relaxed">
                  Our site includes social sharing buttons for LinkedIn,
                  Facebook, and X (Twitter). These buttons do{" "}
                  <strong>not</strong> load third-party scripts on page load —
                  they are simple HTML links. Only when you actively click a
                  share button and are redirected to the third-party platform
                  may that platform set its own cookies, governed by its own
                  privacy and cookie policies.
                </p>
              </div>
            </div>
          </div>

          {/* Full cookie table */}
          <div id="cookie-table" className="scroll-mt-24">
            <h2 className="mb-5 text-xl font-bold sm:text-2xl">3. Cookie Inventory</h2>
            <p className="mb-6 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The table below lists every cookie and storage entry currently
              set by the Gintex AI website.
            </p>
            <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
              <table className="w-full text-sm" style={{ background: "var(--bg-card)" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
                    {["Name", "Category", "Purpose", "Retention", "Provider"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COOKIE_TABLE.map((row, i) => (
                    <tr
                      key={row.name}
                      style={{
                        borderBottom: i < COOKIE_TABLE.length - 1 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--accent-cyan)" }}>
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>
                        {row.category}
                      </td>
                      <td className="px-4 py-3 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {row.purpose}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>
                        {row.retention}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>
                        {row.provider}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Managing cookies */}
          <div id="managing-cookies" className="scroll-mt-24">
            <h2 className="mb-5 text-xl font-bold sm:text-2xl">4. How to Manage Cookies</h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>You can control and delete cookies through several methods:</p>

              <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Browser Settings
              </h3>
              <p>
                Most browsers allow you to view, block, or delete cookies via
                their settings. The steps vary by browser:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-sm">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
              </ul>
              <p className="text-sm">
                Note: Blocking strictly necessary cookies may prevent the admin
                login from functioning. For public visitors, blocking cookies
                will have no impact on Site functionality.
              </p>

              <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Clearing LocalStorage
              </h3>
              <p>
                To clear the theme preference stored in LocalStorage, open your
                browser's developer tools (F12 → Application → Local Storage →
                www.gintex.ai) and delete the <code>gintex-theme</code> entry.
                The Site will revert to the default light theme.
              </p>

              <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Resetting Your Consent Choice
              </h3>
              <p>
                To see the cookie consent banner again and change your
                preferences, clear the <code>gintex-cookie-consent</code>{" "}
                cookie from your browser storage or use the "Manage
                Preferences" option in the consent banner.
              </p>
            </div>
          </div>

          {/* Updates */}
          <div id="policy-updates" className="scroll-mt-24">
            <h2 className="mb-5 text-xl font-bold sm:text-2xl">5. Updates to This Policy</h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>
                We will update this Cookie Policy when we make changes to our
                cookie practices. The "Last Updated" date at the top reflects
                the current version. Continued use of the Site after changes
                are posted constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div id="contact" className="scroll-mt-24">
            <h2 className="mb-5 text-xl font-bold sm:text-2xl">6. Contact</h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>
                For questions about this Cookie Policy or our use of browser
                storage, please contact:
              </p>
              <address className="not-italic leading-loose">
                <strong style={{ color: "var(--text-primary)" }}>Gintex AI — Privacy Team</strong>
                <br />
                Email:{" "}
                <a href="mailto:Hello@gintex.ai" style={{ color: "var(--accent-cyan)" }}>
                  Hello@gintex.ai
                </a>
                <br />
                Website:{" "}
                <a href="https://www.gintex.ai" style={{ color: "var(--accent-cyan)" }}>
                  www.gintex.ai
                </a>
              </address>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section
        className="border-t px-6 py-12 sm:px-10"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="mx-auto max-w-3xl flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="/privacy-policy"
            className="rounded-full border px-6 py-3 text-sm font-semibold transition-colors duration-200"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-use"
            className="rounded-full border px-6 py-3 text-sm font-semibold transition-colors duration-200"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          >
            Terms of Use
          </a>
          <a
            href="/contact"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
