import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Gintex AI",
  description:
    "Learn how Gintex AI collects, uses, and protects your personal information when you use our perception intelligence platform and services.",
  alternates: { canonical: "https://www.gintex.ai/privacy-policy" },
};

const SECTIONS = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>
          Gintex AI ("Gintex", "we", "us", or "our") operates the website
          located at <strong>www.gintex.ai</strong> (the "Site") and provides
          brand perception intelligence, AI visibility analysis, GeoRepute
          market audits, and related strategic advisory services (collectively,
          the "Services").
        </p>
        <p>
          This Privacy Policy explains what information we collect from visitors
          and clients, why we collect it, how it is used and protected, and
          what rights you have with respect to that information. By accessing
          or using the Site, you agree to the practices described in this
          policy.
        </p>
        <p>
          If you have questions or wish to exercise any of your rights, please
          contact us at the address listed in Section 13.
        </p>
      </>
    ),
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: (
      <>
        <p>We collect information in the following ways:</p>
        <h3>2.1 Information You Provide Directly</h3>
        <ul>
          <li>
            <strong>Contact Form:</strong> When you submit an inquiry through
            our contact page, we collect your name, email address, company
            name (optional), the subject category of your inquiry, and the
            message body.
          </li>
          <li>
            <strong>Newsletter Sign-Up:</strong> When you subscribe to our
            intelligence newsletter, we collect your email address.
          </li>
          <li>
            <strong>Consultation Requests:</strong> When you book a consultation
            via our "Book a Consultation" call-to-action, we collect contact
            details necessary to schedule and conduct that session.
          </li>
          <li>
            <strong>Admin Account Registration:</strong> Authorized staff
            members who access the administrative CMS provide their email
            address and password. This information is used solely for internal
            platform management.
          </li>
        </ul>
        <h3>2.2 Information Collected Automatically</h3>
        <ul>
          <li>
            <strong>Server Logs:</strong> Our hosting infrastructure
            (Vercel) automatically records standard web server log data,
            including your IP address, browser type, operating system, referring
            URL, pages visited, and timestamps. These logs are used for security
            monitoring and infrastructure management.
          </li>
          <li>
            <strong>LocalStorage:</strong> We store a single key
            (<code>gintex-theme</code>) in your browser's local storage to
            remember your light/dark mode preference. This data never leaves
            your device and is not transmitted to our servers.
          </li>
        </ul>
        <h3>2.3 Information We Do Not Collect</h3>
        <p>
          We do not collect payment card numbers, social security numbers,
          government-issued identification, or sensitive health data. We do not
          currently use third-party behavioral analytics or advertising tracking
          pixels.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Information",
    content: (
      <>
        <p>We use the information collected for the following purposes:</p>
        <ul>
          <li>
            <strong>Responding to inquiries:</strong> To review, process, and
            reply to messages submitted via our contact form.
          </li>
          <li>
            <strong>Service delivery:</strong> To schedule and conduct
            consultations, deliver intelligence reports, and fulfill any
            contracted advisory engagement.
          </li>
          <li>
            <strong>Newsletter communications:</strong> To send you intelligence
            updates, industry insights, and product announcements if you have
            opted in. You may unsubscribe at any time.
          </li>
          <li>
            <strong>Platform administration:</strong> To authenticate authorized
            administrators and manage our internal blog CMS powered by Supabase.
          </li>
          <li>
            <strong>AI content generation (internal):</strong> Our admin CMS
            uses the OpenAI GPT-4o and Anthropic Claude APIs to generate draft
            blog articles from editorial prompts provided by our staff. No
            visitor data is passed to these APIs.
          </li>
          <li>
            <strong>Security and fraud prevention:</strong> To monitor for
            abuse, unauthorized access, or other harmful activities.
          </li>
          <li>
            <strong>Legal compliance:</strong> To comply with applicable laws,
            regulations, or enforceable governmental requests.
          </li>
          <li>
            <strong>Improving our Site:</strong> To understand how visitors
            navigate and use the Site so we can improve content and
            user experience.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "accounts-auth",
    title: "4. User Accounts and Authentication",
    content: (
      <>
        <p>
          The Site does not offer public user account registration. Account
          access is restricted to authorized Gintex AI administrators and
          editors only.
        </p>
        <p>
          Admin accounts are authenticated via <strong>Supabase Auth</strong>{" "}
          using email and password credentials. Passwords are hashed and stored
          securely by Supabase and are never accessible to Gintex staff in
          plain text.
        </p>
        <p>
          Authentication sessions are managed server-side using secure HTTP
          cookies issued by Supabase. These cookies are essential for
          maintaining admin sessions and are not used for marketing or tracking
          purposes.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies and Tracking Technologies",
    content: (
      <>
        <p>
          We use a minimal set of cookies and browser storage mechanisms. For
          full details, please see our{" "}
          <a href="/cookie-policy" style={{ color: "var(--accent-cyan)" }}>
            Cookie Policy
          </a>
          .
        </p>
        <h3>Summary</h3>
        <ul>
          <li>
            <strong>LocalStorage — Theme Preference</strong> (
            <code>gintex-theme</code>): Stores your chosen display mode
            (light or dark). Not a cookie; never transmitted to our servers;
            session duration is indefinite until you clear browser storage.
          </li>
          <li>
            <strong>Essential Auth Cookies:</strong> If you are an authorized
            administrator, Supabase sets session cookies required to keep you
            logged in. These are strictly necessary and cannot be disabled while
            using the admin interface.
          </li>
          <li>
            <strong>Consent Cookie</strong> (
            <code>gintex-cookie-consent</code>): Stores your cookie consent
            preference so the banner does not reappear on return visits.
          </li>
        </ul>
        <p>
          We do not use advertising cookies, cross-site tracking, or behavioral
          analytics cookies.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "6. Third-Party Services and Integrations",
    content: (
      <>
        <p>
          We share data with the following categories of third-party service
          providers, each operating under their own privacy policies:
        </p>
        <ul>
          <li>
            <strong>Supabase (database &amp; authentication):</strong> Our
            PostgreSQL database and authentication layer is hosted on Supabase.
            Contact form submissions and admin credentials are stored in
            Supabase-managed infrastructure. Supabase is SOC 2 Type II
            certified. Privacy policy:{" "}
            <a
              href="https://supabase.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-cyan)" }}
            >
              supabase.com/privacy
            </a>
            .
          </li>
          <li>
            <strong>Vercel (hosting &amp; edge network):</strong> Our Site is
            deployed on Vercel's global infrastructure, which processes
            server-side requests and may log IP addresses and request metadata
            for infrastructure purposes. Privacy policy:{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-cyan)" }}
            >
              vercel.com/legal/privacy-policy
            </a>
            .
          </li>
          <li>
            <strong>OpenAI (AI content generation — internal only):</strong>{" "}
            Our staff use OpenAI's GPT-4o model to generate draft editorial
            content within our admin CMS. Only staff-provided text prompts
            are sent to OpenAI; no visitor personal data is included. Privacy
            policy:{" "}
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-cyan)" }}
            >
              openai.com/policies/privacy-policy
            </a>
            .
          </li>
          <li>
            <strong>
              Anthropic (AI content generation — internal only):
            </strong>{" "}
            Similarly, we use Anthropic's Claude model for content drafting in
            our admin CMS. No visitor data is transmitted. Privacy policy:{" "}
            <a
              href="https://www.anthropic.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-cyan)" }}
            >
              anthropic.com/privacy
            </a>
            .
          </li>
          <li>
            <strong>Social sharing networks:</strong> Blog articles include
            share buttons for LinkedIn, Facebook, and X (Twitter). Clicking
            these buttons redirects you to the respective platform, which may
            set its own cookies and collect data per its own privacy policy.
            We do not load tracking scripts from these platforms on page load.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "7. Data Sharing and Disclosure",
    content: (
      <>
        <p>
          We do not sell, rent, or trade your personal information to third
          parties for their marketing purposes.
        </p>
        <p>We may share information in the following limited circumstances:</p>
        <ul>
          <li>
            <strong>Service providers:</strong> With the vetted third parties
            listed in Section 6, strictly to deliver the services they provide
            to us.
          </li>
          <li>
            <strong>Legal obligations:</strong> When required by law, court
            order, or government authority, or when we believe disclosure is
            necessary to protect our rights, your safety, or the safety of
            others.
          </li>
          <li>
            <strong>Business transfers:</strong> In connection with a merger,
            acquisition, or sale of all or a portion of our assets, in which
            case we will provide notice and require the successor entity to
            honor this Privacy Policy.
          </li>
          <li>
            <strong>With your consent:</strong> For any other purpose with your
            explicit prior consent.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "8. Data Retention",
    content: (
      <>
        <p>We retain personal data only as long as necessary:</p>
        <ul>
          <li>
            <strong>Contact form submissions:</strong> Retained in our database
            for up to 24 months to allow follow-up and record-keeping, after
            which they are deleted unless an active client relationship exists.
          </li>
          <li>
            <strong>Newsletter emails:</strong> Retained until you unsubscribe,
            after which your email is removed within 30 days.
          </li>
          <li>
            <strong>Admin session data:</strong> Session tokens expire
            automatically in accordance with Supabase's default session
            management policies.
          </li>
          <li>
            <strong>Server logs:</strong> Retained by Vercel for up to 30 days
            for infrastructure and security purposes.
          </li>
          <li>
            <strong>AI generation logs:</strong> Internal logs recording prompt
            tokens and generation cost metadata are retained for operational
            analytics and are not linked to visitor personal data.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security",
    title: "9. Data Security",
    content: (
      <>
        <p>
          We implement industry-standard security measures to protect your
          information:
        </p>
        <ul>
          <li>All data transmitted between your browser and our servers is encrypted using TLS (HTTPS).</li>
          <li>Database access is restricted via role-based access controls enforced by Supabase Row Level Security (RLS) policies.</li>
          <li>Admin passwords are hashed using bcrypt via Supabase Auth and are never stored in plain text.</li>
          <li>API keys for OpenAI and Anthropic are stored as server-side environment variables and are never exposed to the browser.</li>
          <li>Our Supabase service role key is stored exclusively on the server and never included in client-side code.</li>
        </ul>
        <p>
          Despite these measures, no method of electronic transmission or
          storage is 100% secure. If you believe your information has been
          compromised, please contact us immediately at the address in Section
          13.
        </p>
      </>
    ),
  },
  {
    id: "user-rights",
    title: "10. Your Rights",
    content: (
      <>
        <p>
          Depending on your jurisdiction, you may have the following rights with
          respect to your personal data:
        </p>
        <ul>
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal retention obligations.</li>
          <li><strong>Objection:</strong> Object to certain processing activities, including direct marketing.</li>
          <li><strong>Restriction:</strong> Request that we limit the processing of your data in certain circumstances.</li>
          <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format (where technically feasible).</li>
          <li><strong>Withdraw consent:</strong> Where processing is based on consent (e.g., newsletter), withdraw it at any time without affecting the lawfulness of prior processing.</li>
        </ul>
        <p>
          To exercise any of these rights, please email us at{" "}
          <a href="mailto:Hello@gintex.ai" style={{ color: "var(--accent-cyan)" }}>
            Hello@gintex.ai
          </a>
          . We will respond within 30 days. We may need to verify your identity
          before processing your request.
        </p>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "11. Children's Privacy",
    content: (
      <>
        <p>
          The Site and Services are directed to business professionals and are
          not intended for children under the age of 16. We do not knowingly
          collect personal information from children. If you believe we have
          inadvertently collected information from a child, please contact us
          and we will delete it promptly.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "12. International Data Transfers",
    content: (
      <>
        <p>
          Gintex AI operates globally. Your information may be transferred to,
          stored, and processed in countries outside your country of residence,
          including the United States, where our hosting provider (Vercel) and
          database provider (Supabase) maintain infrastructure.
        </p>
        <p>
          When transferring data from the European Economic Area (EEA) or the
          United Kingdom, we rely on appropriate legal mechanisms including
          Standard Contractual Clauses (SCCs) or the adequacy decisions
          recognized by the relevant supervisory authorities. Our sub-processors
          (Vercel and Supabase) are also subject to applicable transfer
          safeguards.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "13. Contact Information",
    content: (
      <>
        <p>
          For privacy-related inquiries, requests, or complaints, please
          contact:
        </p>
        <address
          className="not-italic"
          style={{ color: "var(--text-secondary)" }}
        >
          <strong style={{ color: "var(--text-primary)" }}>Gintex AI</strong>
          <br />
          Privacy Team
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
      </>
    ),
  },
  {
    id: "policy-updates",
    title: "14. Policy Updates",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, technology, legal requirements, or other factors. The
          "Last Updated" date at the top of this page will always reflect the
          most recent revision.
        </p>
        <p>
          For material changes, we will provide a prominent notice on the Site
          or contact you directly if we hold your email address. Your continued
          use of the Site after changes take effect constitutes acceptance of
          the revised policy.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Last Updated: June 2, 2026
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Gintex AI is committed to protecting your privacy. This policy
            describes how we handle personal information collected through our
            website and services.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="border-b px-6 py-8 sm:px-10" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Table of Contents
          </h2>
          <ol className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm transition-colors duration-150"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-14">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="mb-5 text-xl font-bold sm:text-2xl">{s.title}</h2>
              <div
                className="legal-prose space-y-4 text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {s.content}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="border-t px-6 py-12 sm:px-10"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-base" style={{ color: "var(--text-secondary)" }}>
            Have questions about this policy or how we handle your data?
          </p>
          <a
            href="/contact"
            className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Contact Us
          </a>
        </div>
      </section>

      <style>{`
        .legal-prose h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        .legal-prose ul, .legal-prose ol {
          padding-left: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          list-style: disc;
        }
        .legal-prose address {
          margin-top: 0.5rem;
          line-height: 1.8;
        }
      `}</style>
    </main>
  );
}
