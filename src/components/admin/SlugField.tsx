"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { slugify, validateSlugFormat } from "@/lib/slug";

const DEFAULT_BASE_URL = "https://www.gintex.ai/blog/";

export type SlugStatus = "idle" | "checking" | "available" | "taken" | "reserved" | "invalid";

interface SlugFieldProps {
  /** Current slug value (controlled). */
  value: string;
  onChange: (slug: string) => void;
  /** Article id to exclude from the uniqueness check (edit mode). */
  excludeId?: string;
  /** Report validity upward so the parent can block save/publish. */
  onValidityChange?: (valid: boolean) => void;
  label?: string;
  /** Public base URL for the preview (defaults to the blog base). */
  basePath?: string;
  /** Content type the slug belongs to — picks which tables the check queries. */
  contentType?: "blog" | "report";
}

const STATUS_META: Record<SlugStatus, { icon: string; color: string }> = {
  idle: { icon: "", color: "rgba(255,255,255,0.4)" },
  checking: { icon: "…", color: "rgba(255,255,255,0.4)" },
  available: { icon: "✅", color: "#34d399" },
  taken: { icon: "❌", color: "#f87171" },
  reserved: { icon: "❌", color: "#f87171" },
  invalid: { icon: "⚠", color: "#fb923c" },
};

const inputStyle = {
  background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", color: "#f8fafc",
  borderRadius: "0.5rem", padding: "0.625rem 0.875rem", fontSize: "0.875rem",
  outline: "none", width: "100%",
} as const;

const labelStyle = {
  display: "block", marginBottom: "0.375rem", fontSize: "0.75rem",
  fontWeight: 500, color: "rgba(255,255,255,0.55)",
} as const;

export function SlugField({
  value, onChange, excludeId, onValidityChange, label = "Slug (URL)",
  basePath = DEFAULT_BASE_URL, contentType = "blog",
}: SlugFieldProps) {
  const [status, setStatus] = useState<SlugStatus>("idle");
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track the latest checked value to ignore stale async responses.
  const latestRef = useRef("");

  const report = useCallback((valid: boolean) => {
    onValidityChange?.(valid);
  }, [onValidityChange]);

  const runCheck = useCallback(async (slug: string) => {
    if (!slug) {
      setStatus("invalid");
      setMessage("Slug cannot be empty.");
      setSuggestions([]);
      report(false);
      return;
    }
    // Synchronous format/reserved check first — instant, no network.
    const format = validateSlugFormat(slug);
    if (!format.ok) {
      setStatus(format.reason === "reserved" ? "reserved" : "invalid");
      setMessage(format.error);
      setSuggestions([]);
      report(false);
      return;
    }

    setStatus("checking");
    setMessage("Checking availability…");
    report(false);

    try {
      const res = await fetch("/api/admin/slug/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, excludeId, type: contentType }),
      });
      const data = await res.json();
      // Ignore if the input changed while this request was in flight.
      if (latestRef.current !== slug) return;
      setStatus(data.status as SlugStatus);
      setMessage(data.message ?? "");
      setSuggestions(data.suggestions ?? []);
      report(Boolean(data.available));
    } catch {
      if (latestRef.current !== slug) return;
      setStatus("invalid");
      setMessage("Could not validate the URL. Try again.");
      report(false);
    }
  }, [excludeId, contentType, report]);

  // Debounced validation whenever the slug changes. All setState happens inside
  // the deferred timeout callback (not synchronously in the effect body).
  useEffect(() => {
    const slug = value.trim();
    latestRef.current = slug;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    // Empty resolves fast; a real slug waits for the debounce before the API call.
    debounceRef.current = setTimeout(() => runCheck(slug), slug ? 400 : 0);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    // runCheck is stable via useCallback
  }, [value, runCheck]);

  function handleInput(raw: string) {
    // Normalise as the user types but allow trailing hyphen while mid-word.
    const normalised = raw.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-");
    onChange(normalised);
    setCopied(false);
  }

  function applySuggestion(s: string) {
    onChange(s);
    setCopied(false);
  }

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(`${basePath}${value.trim()}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard may be unavailable; ignore
    }
  }

  const meta = STATUS_META[status];
  const fullUrl = `${basePath}${value.trim()}`;

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={e => handleInput(e.target.value)}
          onBlur={() => onChange(slugify(value))}
          placeholder="my-article-url"
          spellCheck={false}
          style={{ ...inputStyle, borderColor: status === "available" ? "rgba(52,211,153,0.4)" : status === "taken" || status === "reserved" ? "rgba(248,113,113,0.4)" : "rgba(255,255,255,0.1)" }}
        />
      </div>

      {/* Live URL preview */}
      <div className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="truncate text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
          {fullUrl}
        </span>
        <button
          type="button"
          onClick={copyUrl}
          className="ml-auto shrink-0 rounded px-2 py-0.5 text-[11px] font-medium transition-colors"
          style={{ background: "rgba(56,189,248,0.1)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.2)" }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Validation status */}
      {status !== "idle" && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs" style={{ color: meta.color }}>
          {meta.icon && <span>{meta.icon}</span>}
          <span>{message}</span>
        </p>
      )}

      {/* Suggestions when taken */}
      {suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>Try:</span>
          {suggestions.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => applySuggestion(s)}
              className="rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors"
              style={{ background: "rgba(56,189,248,0.08)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.18)" }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
