"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { LEADER_PROFILE } from "@/data/about-leadership";
import founderImg from "@/Gintex-images/ceo.png";
import { useLang } from "@/components/LanguageContext";
import { t, tx, Lang } from "@/lib/translations";

function BioWithEmphasis({ text, name }: { text: string; name: string }) {
  const parts = text.split(name);
  return (
    <p className="text-base leading-[1.75] sm:text-[1.05rem] sm:leading-[1.8] transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? (
            <strong className="font-semibold transition-colors duration-300" style={{ color: "var(--text-primary)" }}>{name}</strong>
          ) : null}
        </Fragment>
      ))}
    </p>
  );
}

const CERTIFICATES = [
  { label: "Generative AI — Technion", src: "/certificates/technion.pdf" },
];

function CertificationsModal({ onClose, lang }: { onClose: () => void; lang: Lang }) {
  const [active, setActive] = useState(0);
  const isHe = lang === "he";
  const title = tx(t.about.leadership.certsTitle, lang);
  const closeLabel = tx(t.about.leadership.certsClose, lang);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-4xl flex-col rounded-2xl shadow-2xl transition-colors duration-300"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 ${isHe ? "flex-row-reverse" : ""}`}
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-cyan-500/10"
            style={{ color: "var(--text-secondary)" }}
            aria-label={closeLabel}
          >
            {closeLabel} ✕
          </button>
        </div>

        {/* Tab bar (shown only if multiple certs) */}
        {CERTIFICATES.length > 1 && (
          <div
            className={`flex gap-2 px-6 py-3 ${isHe ? "flex-row-reverse" : ""}`}
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            {CERTIFICATES.map((cert, i) => (
              <button
                key={cert.src}
                onClick={() => setActive(i)}
                className="rounded-md px-4 py-1.5 text-sm font-medium transition-colors"
                style={{
                  background: active === i ? "rgba(6,182,212,0.15)" : "transparent",
                  color: active === i ? "var(--text-primary)" : "var(--text-secondary)",
                  border: active === i ? "1px solid rgba(6,182,212,0.4)" : "1px solid transparent",
                }}
              >
                {cert.label}
              </button>
            ))}
          </div>
        )}

        {/* PDF viewer */}
        <div className="flex-1 overflow-hidden rounded-b-2xl" style={{ minHeight: "60vh" }}>
          <iframe
            src={`${CERTIFICATES[active].src}#toolbar=1&navpanes=0`}
            title={CERTIFICATES[active].label}
            className="h-full w-full"
            style={{ minHeight: "60vh", border: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

export function AboutLeadershipSection() {
  const { lang } = useLang();
  const { name, role, imageAlt } = LEADER_PROFILE;
  const [showCerts, setShowCerts] = useState(false);

  const sectionHeading = tx(t.about.leadership.sectionHeading, lang);
  const bio            = tx(t.about.leadership.bio, lang);
  const tagline        = tx(t.about.leadership.tagline, lang);
  const viewCerts      = tx(t.about.leadership.viewCerts, lang);

  return (
    <>
      <section
        className="px-6 py-16 sm:px-10 sm:py-20 lg:py-24 transition-colors duration-300"
        style={{ borderTop: "1px solid var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="mx-auto max-w-6xl">
          <h2
            className="text-center text-[1.65rem] font-bold tracking-tight sm:text-3xl md:text-[2.125rem] transition-colors duration-300"
            style={{ color: "var(--text-primary)" }}
          >
            {sectionHeading}
          </h2>

          <div className={`mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20 ${lang === "he" ? "lg:flex lg:flex-row-reverse" : ""}`}>
            <div className={`min-w-0 ${lang === "he" ? "text-right lg:pl-4" : "text-left lg:pr-4"}`}>
              <div className={`mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 ${lang === "he" ? "flex-row-reverse justify-end" : ""}`}>
                <span className="text-2xl font-bold tracking-tight sm:text-3xl transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                  {name}
                </span>
                <span className="font-label text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-500">
                  {role}
                </span>
              </div>
              <BioWithEmphasis text={bio} name={name} />

              {/* View Certifications button */}
              <button
                onClick={() => setShowCerts(true)}
                className={`mt-6 inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-cyan-500/10 hover:border-cyan-500/60 active:scale-[0.97] ${lang === "he" ? "flex-row-reverse" : ""}`}
                style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500" aria-hidden>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="13" y2="17" />
                </svg>
                {viewCerts}
              </button>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:justify-self-end" data-cursor-hover>
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-cyan-500/5 blur-2xl lg:-inset-6" aria-hidden />
              <div
                className="relative overflow-hidden rounded-2xl p-3 shadow-lg sm:p-3.5 transition-colors duration-300"
                style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
              >
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-xl sm:aspect-[3/4] transition-colors duration-300"
                  style={{ background: "var(--bg-subtle)" }}
                >
                  <Image src={founderImg} alt={imageAlt} fill className="object-cover object-[center_8%]" sizes="(max-width: 1024px) 100vw, 45vw" priority={false} />
                  <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" aria-hidden />
                </div>
              </div>
            </div>
          </div>

          <p
            className="font-label mx-auto mt-14 max-w-4xl text-center text-[0.7rem] font-bold uppercase leading-relaxed tracking-[0.14em] sm:mt-16 sm:text-xs sm:tracking-[0.16em] md:text-[0.8rem] md:leading-relaxed transition-colors duration-300"
            style={{ color: "var(--text-primary)" }}
          >
            {tagline}
          </p>
        </div>
      </section>

      {showCerts && (
        <CertificationsModal onClose={() => setShowCerts(false)} lang={lang} />
      )}
    </>
  );
}
