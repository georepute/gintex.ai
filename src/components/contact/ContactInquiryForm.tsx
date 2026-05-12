"use client";

import { FormEvent } from "react";

const SUBJECTS = [
  { value: "",           label: "Select a subject"  },
  { value: "general",   label: "General inquiry"    },
  { value: "services",  label: "Services & pricing" },
  { value: "partnership", label: "Partnership"      },
  { value: "press",     label: "Press & media"      },
  { value: "other",     label: "Other"              },
] as const;

export function ContactInquiryForm() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const inputStyle = {
    background: "var(--bg-subtle)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  const inputClass =
    "mt-1.5 w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-300 placeholder:opacity-40 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30";

  return (
    <div
      id="inquiry"
      data-cursor-hover
      className="scroll-mt-24 rounded-2xl p-6 shadow-sm sm:p-8 lg:p-10 transition-colors duration-300"
      style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
    >
      <h2
        className="text-xl font-bold sm:text-2xl transition-colors duration-300"
        style={{ color: "var(--text-primary)" }}
      >
        Inquiry form
      </h2>
      <p
        className="mt-2 text-xs sm:text-sm transition-colors duration-300"
        style={{ color: "var(--text-muted)" }}
      >
        Fields marked with an asterisk (*) are mandatory.
      </p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
              Full name <span className="text-sky-500">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="John Doe"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="contact-company" className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
              Company
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Your company"
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
            Email address <span className="text-sky-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
            Subject <span className="text-sky-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <select
              id="contact-subject"
              name="subject"
              required
              defaultValue=""
              className={`${inputClass} mt-0 appearance-none pr-10`}
              style={inputStyle}
            >
              {SUBJECTS.map((s) => (
                <option key={s.value || "placeholder"} value={s.value} disabled={s.value === ""}>
                  {s.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-300" style={{ color: "var(--text-muted)" }}>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
            Message <span className="text-sky-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="How can we help you reach your goals?"
            className={`${inputClass} min-h-[140px] resize-y`}
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-violet-400 via-purple-500 to-purple-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition-opacity hover:opacity-95 sm:py-4 sm:text-base"
        >
          Initialize inquiry
        </button>
      </form>
    </div>
  );
}
