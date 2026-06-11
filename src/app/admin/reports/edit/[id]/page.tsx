"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { IntelligenceReport, ReportRedirect } from "@/types/report";
import { RichTextEditor, isRtlLanguage } from "@/components/RichTextEditor";
import { SlugField } from "@/components/admin/SlugField";

const STATUS_COLOR: Record<string, string> = {
  published: "#34d399", done: "#38bdf8", queued: "#94a3b8",
  researching: "#a78bfa", writing: "#fb923c", failed: "#f87171",
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

export default function EditReportPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<IntelligenceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [tags, setTags] = useState("");
  const [language, setLanguage] = useState("en");
  const [slug, setSlug] = useState("");
  const [originalSlug, setOriginalSlug] = useState("");
  const [slugValid, setSlugValid] = useState(true);
  const [redirects, setRedirects] = useState<ReportRedirect[]>([]);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("intelligence_reports").select("*").eq("id", id).single();
      if (error || !data) { setLoading(false); return; }
      const r = data as IntelligenceReport;
      setReport(r);
      setTitle(r.title ?? "");
      setExcerpt(r.excerpt ?? "");
      setContent(r.content ?? "");
      setSeoTitle(r.seo_title ?? "");
      setSeoDesc(r.seo_description ?? "");
      setTags((r.tags ?? []).join(", "));
      setLanguage(r.language ?? "en");
      setSlug(r.slug ?? "");
      setOriginalSlug(r.slug ?? "");
      setLoading(false);

      // Load redirect history for this report.
      try {
        const res = await fetch(`/api/admin/reports/${id}/redirects`);
        if (res.ok) setRedirects((await res.json()).redirects ?? []);
      } catch { /* non-fatal */ }
    }
    load();
  }, [id]);

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/admin/reports/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        seo_title: seoTitle.trim(),
        seo_description: seoDesc.trim(),
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        language,
        slug: slug.trim(),
      }),
    });
    const data = await res.json();
    if (!res.ok) showToast(data.error ?? "Save failed", false);
    else {
      showToast("Changes saved.");
      setReport(data);
      // A published slug change creates a redirect — refresh history + baseline.
      if (slug.trim() !== originalSlug) {
        setOriginalSlug(slug.trim());
        try {
          const r = await fetch(`/api/admin/reports/${id}/redirects`);
          if (r.ok) setRedirects((await r.json()).redirects ?? []);
        } catch { /* non-fatal */ }
      }
    }
    setSaving(false);
  }

  async function handlePublish() {
    setPublishing(true);
    const res = await fetch("/api/admin/reports/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) showToast(data.error ?? "Publish failed", false);
    else { showToast("Report published!"); setReport(prev => prev ? { ...prev, status: "published" } : prev); }
    setPublishing(false);
  }

  async function handleUnpublish() {
    const res = await fetch(`/api/admin/reports/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "done" }),
    });
    if (res.ok) { showToast("Moved back to draft."); setReport(prev => prev ? { ...prev, status: "done" } : prev); }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="py-16 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        Report not found. <Link href="/admin/reports" style={{ color: "#38bdf8" }}>Back to list →</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {toast && (
        <div
          className="fixed right-4 top-4 z-50 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg"
          style={{ background: toast.ok ? "#166534" : "#7f1d1d", border: `1px solid ${toast.ok ? "#34d399" : "#f87171"}40` }}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Link href="/admin/reports" className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>← Reports</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span className="text-sm text-white">Edit</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-white">Edit Intelligence Report</h1>
          <div className="mt-1.5 flex items-center gap-2">
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{ color: STATUS_COLOR[report.status], background: `${STATUS_COLOR[report.status]}15` }}
            >
              {report.status}
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              /intelligence-report/{report.slug}
            </span>
            {report.word_count ? (
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                · {report.word_count.toLocaleString()} words
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {report.status === "published" && (
            <Link
              href={`/intelligence-report/${report.slug}`}
              target="_blank"
              className="rounded-lg px-3.5 py-2 text-xs font-medium"
              style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}
            >
              View Live ↗
            </Link>
          )}
          {report.status !== "published" && (
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="rounded-lg px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
            >
              {publishing ? "Publishing…" : "Publish Report"}
            </button>
          )}
          {report.status === "published" && (
            <button onClick={handleUnpublish} className="rounded-lg px-3.5 py-2 text-xs font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
              Unpublish
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5 rounded-xl p-6" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <SlugField
            value={slug}
            onChange={setSlug}
            excludeId={id}
            onValidityChange={setSlugValid}
            basePath="https://www.gintex.ai/intelligence-report/"
            contentType="report"
          />
          {report.status === "published" && slug.trim() !== originalSlug && slug.trim() && (
            <p className="mt-2 rounded-lg px-3 py-2 text-xs" style={{ background: "rgba(251,146,60,0.08)", color: "#fb923c", border: "1px solid rgba(251,146,60,0.2)" }}>
              Changing this published URL will create a permanent (301) redirect from <strong>/intelligence-report/{originalSlug}</strong> so existing links and SEO are preserved.
            </p>
          )}
          {redirects.length > 0 && (
            <div className="mt-3 rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
                Redirect History
              </p>
              <ul className="mt-2 space-y-1">
                {redirects.map(r => (
                  <li key={r.id} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>/intelligence-report/{r.old_slug}</span>
                    <span style={{ color: "#34d399" }}>→ /{r.new_slug}</span>
                    <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: "rgba(56,189,248,0.1)", color: "#38bdf8" }}>{r.redirect_type}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <label style={labelStyle}>Excerpt</label>
          <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div>
          <label style={labelStyle}>Content</label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            rtl={isRtlLanguage(language)}
            placeholder="Report content..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label style={labelStyle}>SEO Title</label>
            <input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Language</label>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
              <option value="en">English</option>
              <option value="he">Hebrew</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
              <option value="ar">Arabic</option>
              <option value="am">Amharic</option>
              <option value="ru">Russian</option>
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>SEO Description</label>
          <textarea value={seoDesc} onChange={e => setSeoDesc(e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div>
          <label style={labelStyle}>Tags (comma-separated)</label>
          <input type="text" value={tags} onChange={e => setTags(e.target.value)} style={inputStyle} />
        </div>

        <div className="flex justify-end border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <button
            onClick={handleSave}
            disabled={saving || !slugValid}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
