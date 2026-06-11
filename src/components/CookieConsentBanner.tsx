"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ConsentValue = "all" | "essential" | null;
const STORAGE_KEY = "gintex-cookie-consent";

export function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentValue | "loading">("loading");
  const [showPrefs, setShowPrefs] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ConsentValue;
      setConsent(stored ?? null);
    } catch {
      setConsent(null);
    }
  }, []);

  function save(value: "all" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      // Also persist as a cookie so server can read it (1 year)
      document.cookie = `${STORAGE_KEY}=${value};path=/;max-age=31536000;SameSite=Lax`;
    } catch {
      // ignore storage errors
    }
    setConsent(value);
    setShowPrefs(false);
  }

  // Still loading or already consented → render nothing
  if (consent === "loading" || consent !== null) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-[998] bg-black/20 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      {/* Banner */}
      <div
        role="dialog"
        aria-label="Cookie consent"
        aria-modal="true"
        className="fixed bottom-0 left-0 right-0 z-[999] px-4 pb-4 sm:bottom-4 sm:left-auto sm:right-4 sm:w-[420px] sm:pb-0"
      >
        <div
          className="rounded-2xl border shadow-2xl overflow-hidden"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          {!showPrefs ? (
            /* ── Default view ── */
            <div className="p-5 sm:p-6">
              {/* Header */}
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg" aria-hidden>🍪</span>
                <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                  We use cookies
                </h2>
              </div>

              <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Gintex AI uses essential cookies to keep the site working and
                functional cookies to remember your display preferences. We
                currently use{" "}
                <strong style={{ color: "var(--text-primary)" }}>no tracking or advertising cookies</strong>.{" "}
                <Link
                  href="/cookie-policy"
                  className="underline underline-offset-2 transition-opacity hover:opacity-80"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  Learn more
                </Link>
              </p>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => save("all")}
                  className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Accept All
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => save("essential")}
                    className="flex-1 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                      background: "transparent",
                    }}
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    onClick={() => setShowPrefs(true)}
                    className="flex-1 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                      background: "transparent",
                    }}
                  >
                    Manage Preferences
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── Preferences view ── */
            <div className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                  Cookie Preferences
                </h2>
                <button
                  onClick={() => setShowPrefs(false)}
                  aria-label="Back"
                  className="text-sm transition-opacity hover:opacity-70"
                  style={{ color: "var(--text-muted)" }}
                >
                  ← Back
                </button>
              </div>

              <div className="mb-5 space-y-4">
                {/* Strictly necessary */}
                <PreferenceRow
                  title="Strictly Necessary"
                  description="Required for the site to function — authentication sessions and consent storage. Cannot be disabled."
                  locked
                  defaultOn
                />
                {/* Functional */}
                <PreferenceRow
                  title="Functional"
                  description="Stores your light/dark theme preference in your browser's local storage. No data leaves your device."
                  locked
                  defaultOn
                />
                {/* Analytics */}
                <PreferenceRow
                  title="Analytics"
                  description="We currently use no analytics cookies. If we add them in the future, your preference will be respected."
                  locked={false}
                  defaultOn={false}
                  disabled
                />
                {/* Advertising */}
                <PreferenceRow
                  title="Advertising"
                  description="We do not use advertising or retargeting cookies."
                  locked={false}
                  defaultOn={false}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => save("all")}
                  className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                >
                  Accept All
                </button>
                <button
                  onClick={() => save("essential")}
                  className="w-full rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-secondary)",
                    background: "transparent",
                  }}
                >
                  Save Preferences (Essential Only)
                </button>
              </div>

              <p className="mt-4 text-center text-xs" style={{ color: "var(--text-muted)" }}>
                <Link href="/cookie-policy" style={{ color: "var(--accent-cyan)" }}>
                  Full Cookie Policy
                </Link>
                {" · "}
                <Link href="/privacy-policy" style={{ color: "var(--accent-cyan)" }}>
                  Privacy Policy
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function PreferenceRow({
  title,
  description,
  locked,
  defaultOn,
  disabled,
}: {
  title: string;
  description: string;
  locked: boolean;
  defaultOn: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border p-3"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg-subtle)",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {title}
          {locked && (
            <span
              className="ml-2 text-[10px] font-medium uppercase tracking-wide"
              style={{ color: "var(--text-muted)" }}
            >
              Always on
            </span>
          )}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      </div>
      {/* Toggle indicator */}
      <div
        className="mt-0.5 shrink-0 flex h-5 w-9 items-center rounded-full px-0.5 transition-colors"
        style={{
          background: defaultOn && !disabled
            ? "linear-gradient(135deg, #3b82f6, #7c3aed)"
            : "var(--border)",
        }}
        aria-hidden="true"
      >
        <span
          className="h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
          style={{
            transform: defaultOn && !disabled ? "translateX(16px)" : "translateX(0)",
          }}
        />
      </div>
    </div>
  );
}
