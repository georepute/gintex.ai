"use client";

import { FormEvent } from "react";

const SUBJECTS = [
  { value: "", label: "Select a subject" },
  { value: "general", label: "General inquiry" },
  { value: "services", label: "Services & pricing" },
  { value: "partnership", label: "Partnership" },
  { value: "press", label: "Press & media" },
  { value: "other", label: "Other" },
] as const;

const inputClass =
  "mt-1.5 w-full rounded-lg border border-white/15 bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#666] focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30";

export function ContactInquiryForm() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire to API or email service when ready
  }

  return (
    <div
      id="inquiry"
      data-cursor-hover
      className="scroll-mt-24 rounded-2xl border border-white/[0.1] bg-[#141414] p-6 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.05] sm:p-8 lg:p-10"
    >
      <h2 className="text-xl font-bold text-white sm:text-2xl">Inquiry form</h2>
      <p className="mt-2 text-xs text-[#888] sm:text-sm">
        Fields marked with an asterisk (*) are mandatory.
      </p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium text-white">
              Full name <span className="text-sky-400">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="John Doe"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-company" className="text-sm font-medium text-white">
              Company
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Your company"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-white">
            Email address <span className="text-sky-400">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className="text-sm font-medium text-white">
            Subject <span className="text-sky-400">*</span>
          </label>
          <div className="relative mt-1.5">
            <select
              id="contact-subject"
              name="subject"
              required
              defaultValue=""
              className={`${inputClass} appearance-none pr-10`}
            >
              {SUBJECTS.map((s) => (
                <option
                  key={s.value || "placeholder"}
                  value={s.value}
                  disabled={s.value === ""}
                  className="bg-[#141414]"
                >
                  {s.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="text-sm font-medium text-white">
            Message <span className="text-sky-400">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="How can we help you reach your goals?"
            className={`${inputClass} min-h-[140px] resize-y`}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-violet-400 via-purple-500 to-purple-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/35 transition-opacity hover:opacity-95 sm:py-4 sm:text-base"
        >
          Initialize inquiry
        </button>
      </form>
    </div>
  );
}
