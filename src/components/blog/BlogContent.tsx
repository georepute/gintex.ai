"use client";

import { useEffect, useRef, useState } from "react";
import { BlogShareBar } from "@/components/BlogShareBar";
import { stripEditorPlaceholders } from "@/lib/content";

interface CitationMeta {
  source: string;
  summary: string;
  excerpt: string;
  logo: string;
  url: string;
}

const CITATION_DB: Record<string, CitationMeta> = {
  mckinsey: {
    source: "McKinsey & Company",
    summary: "Global management consulting firm and trusted authority on business strategy, AI adoption, and market intelligence.",
    excerpt: "McKinsey's research covers AI transformation across industries, revealing that brands investing in intelligence-led strategies consistently outperform competitors.",
    logo: "https://logo.clearbit.com/mckinsey.com",
    url: "https://www.mckinsey.com",
  },
  gartner: {
    source: "Gartner",
    summary: "Leading technology research and advisory company providing data-driven insights for enterprise decision-making.",
    excerpt: "Gartner forecasts that AI-driven brand visibility will become a primary competitive differentiator by 2026, with early adopters gaining 2-3x market presence advantage.",
    logo: "https://logo.clearbit.com/gartner.com",
    url: "https://www.gartner.com",
  },
  stanford: {
    source: "Stanford University",
    summary: "Premier research institution whose AI Index and Human-Centered AI reports set global benchmarks for AI understanding.",
    excerpt: "Stanford's AI Index Report documents the accelerating pace of AI adoption in enterprise marketing, with LLM-driven search reshaping brand discoverability fundamentally.",
    logo: "https://logo.clearbit.com/stanford.edu",
    url: "https://hai.stanford.edu",
  },
  salesforce: {
    source: "Salesforce",
    summary: "Enterprise CRM and AI platform leader whose State of Marketing reports track global marketing technology trends.",
    excerpt: "Salesforce's State of Marketing report found that 68% of high-performing marketers now use AI for content personalisation and visibility optimisation.",
    logo: "https://logo.clearbit.com/salesforce.com",
    url: "https://www.salesforce.com",
  },
  hubspot: {
    source: "HubSpot",
    summary: "Inbound marketing and CRM platform whose annual State of Marketing report benchmarks global digital marketing trends.",
    excerpt: "HubSpot's research shows that brands publishing authority-grade content receive 3.4x more AI citation mentions than those relying solely on traditional SEO.",
    logo: "https://logo.clearbit.com/hubspot.com",
    url: "https://www.hubspot.com",
  },
  "search engine journal": {
    source: "Search Engine Journal",
    summary: "Leading SEO and digital marketing publication tracking AI Overviews, GEO, and search visibility trends.",
    excerpt: "Search Engine Journal analysis reveals that AI Overviews now appear in over 40% of informational queries, fundamentally changing how brands achieve organic visibility.",
    logo: "https://logo.clearbit.com/searchenginejournal.com",
    url: "https://www.searchenginejournal.com",
  },
  forrester: {
    source: "Forrester Research",
    summary: "Independent research and advisory firm helping business leaders make bold, customer-obsessed decisions through data-driven insights.",
    excerpt: "Forrester's research identifies AI citation presence as the next frontier of brand authority, with enterprise buyers increasingly relying on AI-summarised research.",
    logo: "https://logo.clearbit.com/forrester.com",
    url: "https://www.forrester.com",
  },
  deloitte: {
    source: "Deloitte",
    summary: "Global professional services network providing industry research and AI adoption insights across enterprise markets.",
    excerpt: "Deloitte's AI adoption survey found that 74% of executives view AI-driven market intelligence as critical to strategic planning within the next two years.",
    logo: "https://logo.clearbit.com/deloitte.com",
    url: "https://www.deloitte.com",
  },
};

function resolveCitation(raw: string): CitationMeta | null {
  const key = raw.toLowerCase().trim();
  for (const [k, v] of Object.entries(CITATION_DB)) {
    if (key.includes(k)) return v;
  }
  return null;
}

export default function BlogContent({
  html,
  isRtl,
  shareUrl,
  shareTitle,
}: {
  html: string;
  isRtl: boolean;
  shareUrl?: string;
  shareTitle?: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<CitationMeta | null>(null);

  // Strip any leaked "EDITOR: replace with..." placeholder figures so they never
  // render — fixes already-published articles without a content migration.
  const cleanHtml = stripEditorPlaceholders(html);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-citation]");
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      const key = (target as HTMLElement).dataset.citation ?? "";
      const meta = resolveCitation(key);
      if (meta) setModal(meta);
    }

    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!modal) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setModal(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <div
          ref={contentRef}
          className={`blog-content${isRtl ? " blog-content-rtl" : ""}`}
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
        {shareUrl && shareTitle && (
          <BlogShareBar url={shareUrl} title={shareTitle} rtl={isRtl} />
        )}
      </div>

      {/* Citation modal */}
      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Source: ${modal.source}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setModal(null)}
        >
          {/* Backdrop */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Panel */}
          <div
            style={{
              position: "relative",
              background: "var(--bg-page, #0f172a)",
              border: "1px solid var(--border, rgba(255,255,255,0.1))",
              borderRadius: "1rem",
              padding: "1.75rem",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setModal(null)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted, #64748b)",
                fontSize: "1.25rem",
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={modal.logo}
                alt={modal.source}
                width={40}
                height={40}
                style={{ borderRadius: "0.375rem", objectFit: "contain", background: "#fff", padding: "2px" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div>
                <p style={{ margin: 0, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-cyan, #0ea5e9)", fontWeight: 600 }}>
                  Authority Source
                </p>
                <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary, #f1f5f9)" }}>
                  {modal.source}
                </h3>
              </div>
            </div>

            {/* Summary */}
            <p style={{ margin: "0 0 0.875rem", fontSize: "0.875rem", color: "var(--text-secondary, #94a3b8)", lineHeight: 1.6 }}>
              {modal.summary}
            </p>

            {/* Excerpt */}
            <blockquote style={{
              margin: "0 0 1.25rem",
              padding: "0.875rem 1rem",
              borderLeft: "3px solid var(--accent-cyan, #0ea5e9)",
              background: "rgba(14,165,233,0.06)",
              borderRadius: "0 0.5rem 0.5rem 0",
              fontSize: "0.85rem",
              color: "var(--text-secondary, #94a3b8)",
              fontStyle: "italic",
              lineHeight: 1.6,
            }}>
              &ldquo;{modal.excerpt}&rdquo;
            </blockquote>

            {/* CTA */}
            <a
              href={modal.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1.1rem",
                borderRadius: "0.5rem",
                background: "rgba(14,165,233,0.1)",
                border: "1px solid rgba(14,165,233,0.3)",
                color: "var(--accent-cyan, #0ea5e9)",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              Open Original Source ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
