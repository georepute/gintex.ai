"use client";

import { useState } from "react";

type Props = {
  url: string;
  title: string;
  rtl?: boolean;
};

const iconBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  height: 36,
  padding: "0 14px",
  borderRadius: 999,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "var(--border)",
  background: "var(--bg-card)",
  color: "var(--text-secondary)",
  fontSize: "0.82rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "transform 120ms ease, border-color 120ms ease, color 120ms ease",
};

export function BlogShareBar({ url, title, rtl = false }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const openShare = (href: string) => {
    const w = 600;
    const h = 540;
    const left = typeof window !== "undefined" ? window.innerWidth / 2 - w / 2 : 0;
    const top = typeof window !== "undefined" ? window.innerHeight / 2 - h / 2 : 0;
    window.open(
      href,
      "share-dialog",
      `width=${w},height=${h},left=${left},top=${top},toolbar=0,menubar=0,location=0`,
    );
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (e.g. http context) — fall back to share dialog
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <div
      className="blog-share-bar"
      dir={rtl ? "rtl" : "ltr"}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "center",
        justifyContent: rtl ? "flex-end" : "flex-start",
        margin: "2.5rem 0 0.5rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <span
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginInlineEnd: 4,
        }}
      >
        Share
      </span>

      <button
        type="button"
        onClick={() => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)}
        style={iconBtn}
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
        LinkedIn
      </button>

      <button
        type="button"
        onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)}
        style={iconBtn}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82V14.706h-3.13v-3.62h3.13V8.41c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.62h-3.12V24h6.116c.733 0 1.325-.592 1.325-1.324V1.325C24 .593 23.408 0 22.675 0z" />
        </svg>
        Facebook
      </button>

      <button
        type="button"
        onClick={() => openShare(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`)}
        style={iconBtn}
        title="Share on X"
        aria-label="Share on X"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2H21.5l-7.514 8.59L23 22h-6.93l-5.43-7.094L4.4 22H1.14l8.034-9.187L1 2h7.106l4.91 6.49L18.244 2zm-1.215 18h1.84L7.05 4H5.1l11.93 16z" />
        </svg>
        X
      </button>

      <button
        type="button"
        onClick={onCopy}
        style={iconBtn}
        title="Copy link"
        aria-label="Copy link"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        {copied ? "Copied" : "Copy link"}
      </button>

      <button
        type="button"
        onClick={() => window.print()}
        style={{ ...iconBtn, marginInlineStart: "auto" }}
        title="Download as PDF (uses browser's print dialog — choose 'Save as PDF')"
        aria-label="Download as PDF"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9V2h12v7" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        Download PDF
      </button>
    </div>
  );
}
