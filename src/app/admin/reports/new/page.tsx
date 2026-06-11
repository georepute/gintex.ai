"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor, isRtlLanguage } from "@/components/RichTextEditor";
import type { IntelligenceReport, ReportType, EvidenceItem } from "@/types/report";

const TYPE_OPTIONS: { value: ReportType; label: string; desc: string }[] = [
  { value: "short", label: "Short Analysis", desc: "1,500-2,500 words" },
  { value: "standard", label: "Standard Intelligence Article", desc: "3,000-5,000 words" },
  { value: "research", label: "Research Report", desc: "5,000-9,000 words" },
];

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" }, { value: "he", label: "Hebrew" },
  { value: "fr", label: "French" }, { value: "es", label: "Spanish" },
  { value: "de", label: "German" }, { value: "ar", label: "Arabic" },
  { value: "am", label: "Amharic" }, { value: "ru", label: "Russian" },
];

const STAGE_LABEL: Record<string, string> = {
  queued: "Queued",
  researching: "Researching — searching the web & gathering evidence",
  writing: "Writing — composing the 9-section report",
  done: "Ready for review",
  failed: "Generation failed",
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

export default function NewReportPage() {
  const router = useRouter();

  // form
  const [topic, setTopic] = useState("");
  const [reportType, setReportType] = useState<ReportType>("standard");
  const [language, setLanguage] = useState("en");
  const [keywords, setKeywords] = useState("");

  // generation lifecycle
  const [reportId, setReportId] = useState<string | null>(null);
  const [report, setReport] = useState<IntelligenceReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // editable fields once done
  const [editTitle, setEditTitle] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editSeoTitle, setEditSeoTitle] = useState("");
  const [editSeoDesc, setEditSeoDesc] = useState("");
  const [editTags, setEditTags] = useState("");

  const status = report?.status ?? (reportId ? "queued" : null);
  const generating = status === "queued" || status === "researching" || status === "writing";

  // Poll the report row while generating.
  useEffect(() => {
    if (!reportId) return;
    async function poll() {
      const res = await fetch(`/api/admin/reports/${reportId}`);
      if (!res.ok) return;
      const data = (await res.json()) as IntelligenceReport;
      setReport(data);
      if (data.status === "done") {
        setEditTitle(data.title ?? "");
        setEditExcerpt(data.excerpt ?? "");
        setEditContent(data.content ?? "");
        setEditSeoTitle(data.seo_title ?? "");
        setEditSeoDesc(data.seo_description ?? "");
        setEditTags((data.tags ?? []).join(", "));
      }
      if (data.status === "done" || data.status === "failed") {
        if (pollRef.current) clearInterval(pollRef.current);
      }
    }
    poll();
    pollRef.current = setInterval(poll, 4000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [reportId]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    setError(null);
    setReport(null);
    const res = await fetch("/api/admin/reports/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: topic.trim(),
        report_type: reportType,
        language,
        keywords: keywords.split(",").map(k => k.trim()).filter(Boolean),
      }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Failed to start generation"); return; }
    setReportId(data.id);
  }

  async function handleSave(publish: boolean) {
    if (!reportId) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.trim() || report?.title,
          excerpt: editExcerpt.trim(),
          content: editContent.trim(),
          seo_title: editSeoTitle.trim(),
          seo_description: editSeoDesc.trim(),
          tags: editTags.split(",").map(t => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Failed to save");

      if (publish) {
        const pub = await fetch("/api/admin/reports/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: reportId }),
        });
        if (!pub.ok) throw new Error((await pub.json()).error ?? "Failed to publish");
      }
      router.push(`/admin/reports/edit/${reportId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const evidence = (report?.evidence ?? []) as EvidenceItem[];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Generate Intelligence Report</h1>
        <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Live web research, verified evidence, and a decision-grade 9-section report.
        </p>
      </div>

      {/* Generation form (hidden once a job is running) */}
      {!reportId && (
        <form
          onSubmit={handleGenerate}
          className="space-y-5 rounded-xl p-6"
          style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h2 className="text-sm font-semibold text-white">Report Parameters</h2>

          <div>
            <label style={labelStyle}>Topic / Question *</label>
            <textarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              required
              rows={2}
              placeholder="e.g. How AI search is reshaping B2B SaaS brand visibility in 2026"
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <div>
            <label style={labelStyle}>Report Depth</label>
            <div className="grid gap-2 sm:grid-cols-3">
              {TYPE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setReportType(opt.value)}
                  className="flex flex-col items-start rounded-lg px-3 py-3 text-left transition-all"
                  style={{
                    background: reportType === opt.value ? "rgba(14,165,233,0.12)" : "rgba(255,255,255,0.03)",
                    border: reportType === opt.value ? "1px solid rgba(14,165,233,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-xs font-semibold" style={{ color: reportType === opt.value ? "#38bdf8" : "#f8fafc" }}>
                    {opt.label}
                  </span>
                  <span className="mt-0.5 text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label style={labelStyle}>Language</label>
              <select value={language} onChange={e => setLanguage(e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
                {LANGUAGE_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Focus keywords (optional)</label>
              <input
                type="text"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                placeholder="AI search, GEO, B2B buyers"
                style={inputStyle}
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg px-3.5 py-2.5 text-sm" style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!topic.trim()}
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
          >
            Start Research & Generate
          </button>
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
            Generation runs live web research and can take 1-3 minutes. You can leave this page; the report appears in the list.
          </p>
        </form>
      )}

      {/* Progress panel */}
      {reportId && generating && (
        <div
          className="space-y-4 rounded-xl p-6"
          style={{ background: "#141414", border: "1px solid rgba(167,139,250,0.25)" }}
        >
          <div className="flex items-center gap-3">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-400" />
            <h2 className="text-sm font-semibold text-white">{STAGE_LABEL[status ?? "queued"]}</h2>
          </div>
          {report?.stage_detail && (
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{report.stage_detail}…</p>
          )}
          {/* Stepper */}
          <div className="flex items-center gap-2 text-xs">
            {["researching", "writing", "done"].map((s, i) => {
              const order = ["queued", "researching", "writing", "done"];
              const reached = order.indexOf(status ?? "queued") >= order.indexOf(s);
              return (
                <div key={s} className="flex items-center gap-2">
                  <span
                    className="rounded-full px-2.5 py-1"
                    style={{
                      background: reached ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.04)",
                      color: reached ? "#a78bfa" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {s === "researching" ? "Research" : s === "writing" ? "Write" : "Ready"}
                  </span>
                  {i < 2 && <span style={{ color: "rgba(255,255,255,0.2)" }}>→</span>}
                </div>
              );
            })}
          </div>
          {evidence.length > 0 && (
            <p className="text-xs" style={{ color: "#34d399" }}>
              {evidence.length} sourced findings gathered so far.
            </p>
          )}
        </div>
      )}

      {/* Failure */}
      {status === "failed" && (
        <div className="rounded-xl p-6 space-y-3" style={{ background: "#141414", border: "1px solid rgba(248,113,113,0.3)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "#f87171" }}>Generation failed</h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{report?.error}</p>
          <button
            onClick={() => { setReportId(null); setReport(null); }}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Try again
          </button>
        </div>
      )}

      {/* Review & edit once done */}
      {status === "done" && (
        <div className="space-y-6">
          <div className="rounded-xl p-6 space-y-5" style={{ background: "#141414", border: "1px solid rgba(52,211,153,0.2)" }}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <h2 className="text-sm font-semibold text-white">Report Ready — Review & Edit</h2>
              <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: "rgba(56,189,248,0.1)", color: "#38bdf8" }}>
                {report?.word_count?.toLocaleString()} words · {report?.reading_time} min
              </span>
            </div>

            <div>
              <label style={labelStyle}>Title</label>
              <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Executive Summary / Excerpt</label>
              <textarea value={editExcerpt} onChange={e => setEditExcerpt(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            {/* Evidence summary */}
            {evidence.length > 0 && (
              <div className="rounded-lg p-4" style={{ background: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.12)" }}>
                <p className="text-xs font-semibold" style={{ color: "#38bdf8" }}>
                  Evidence base: {evidence.length} sourced findings
                </p>
                <ul className="mt-2 space-y-1 text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {evidence.slice(0, 5).map((ev, i) => (
                    <li key={i} className="truncate">
                      • {ev.source || ev.publisher} <span style={{ color: "rgba(255,255,255,0.3)" }}>({ev.verification}, {ev.confidence})</span>
                    </li>
                  ))}
                  {evidence.length > 5 && <li style={{ color: "rgba(255,255,255,0.3)" }}>…and {evidence.length - 5} more</li>}
                </ul>
              </div>
            )}

            <div>
              <label style={labelStyle}>Content</label>
              <RichTextEditor
                value={editContent}
                onChange={setEditContent}
                rtl={isRtlLanguage(language)}
                placeholder="The generated report will appear here."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label style={labelStyle}>SEO Title</label>
                <input type="text" value={editSeoTitle} onChange={e => setEditSeoTitle(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>SEO Description</label>
                <input type="text" value={editSeoDesc} onChange={e => setEditSeoDesc(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Tags (comma-separated)</label>
              <input type="text" value={editTags} onChange={e => setEditTags(e.target.value)} style={inputStyle} />
            </div>

            {error && (
              <p className="rounded-lg px-3.5 py-2.5 text-sm" style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-3 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity disabled:opacity-50"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {saving ? "Saving…" : "Save Draft"}
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
              >
                {saving ? "Publishing…" : "Publish Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
