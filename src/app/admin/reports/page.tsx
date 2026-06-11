"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { IntelligenceReport, ReportStatus } from "@/types/report";

const STATUS_OPTIONS: { value: ReportStatus | "all"; label: string; color: string }[] = [
  { value: "all", label: "All", color: "#94a3b8" },
  { value: "published", label: "Published", color: "#34d399" },
  { value: "done", label: "Ready", color: "#38bdf8" },
  { value: "researching", label: "Researching", color: "#a78bfa" },
  { value: "writing", label: "Writing", color: "#fb923c" },
  { value: "failed", label: "Failed", color: "#f87171" },
];

const STATUS_COLOR: Record<string, string> = {
  published: "#34d399", done: "#38bdf8", queued: "#94a3b8",
  researching: "#a78bfa", writing: "#fb923c", failed: "#f87171",
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<IntelligenceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    let query = supabase
      .from("intelligence_reports")
      .select("*")
      .order("created_at", { ascending: false });
    if (statusFilter !== "all") query = query.eq("status", statusFilter);
    if (search.trim()) query = query.ilike("topic", `%${search.trim()}%`);
    const { data } = await query;
    setReports((data as IntelligenceReport[]) ?? []);
    setLoading(false);
  }, [statusFilter, search]);

  // Re-fetch when filters change. `load` sets loading state; this is a
  // legitimate React<->external (Supabase) synchronization effect.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  // Auto-refresh while any report is mid-generation so the list updates live.
  useEffect(() => {
    const inFlight = reports.some(r => ["queued", "researching", "writing"].includes(r.status));
    if (!inFlight) return;
    const t = setInterval(load, 4000);
    return () => clearInterval(t);
  }, [reports, load]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this report permanently?")) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/reports/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) showToast("Failed to delete: " + (data.error ?? ""), false);
    else { showToast("Report deleted."); load(); }
    setDeleting(null);
  }

  async function handlePublish(id: string) {
    setPublishing(id);
    const res = await fetch("/api/admin/reports/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) showToast(data.error ?? "Failed to publish", false);
    else { showToast("Report published!"); load(); }
    setPublishing(null);
  }

  async function handleUnpublish(id: string) {
    const res = await fetch(`/api/admin/reports/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "done" }),
    });
    if (!res.ok) showToast("Failed to unpublish", false);
    else { showToast("Report moved back to draft."); load(); }
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className="fixed right-4 top-4 z-50 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg"
          style={{ background: toast.ok ? "#166534" : "#7f1d1d", border: `1px solid ${toast.ok ? "#34d399" : "#f87171"}40` }}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Intelligence Reports</h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Decision-grade, research-driven reports with verified, cited evidence.
          </p>
        </div>
        <Link
          href="/admin/reports/new"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
        >
          + New Report
        </Link>
      </div>

      <div
        className="flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center"
        style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by topic…"
          className="flex-1 rounded-lg px-3.5 py-2 text-sm outline-none"
          style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", color: "#f8fafc" }}
        />
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => setStatusFilter(value)}
              className="rounded-full px-3 py-1 text-xs font-medium transition-all"
              style={{
                background: statusFilter === value ? `${color}20` : "transparent",
                border: `1px solid ${statusFilter === value ? color : "rgba(255,255,255,0.1)"}`,
                color: statusFilter === value ? color : "rgba(255,255,255,0.4)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="overflow-hidden rounded-xl"
        style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
          </div>
        ) : reports.length === 0 ? (
          <div className="py-16 text-center text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            No reports yet.{" "}
            <Link href="/admin/reports/new" style={{ color: "#38bdf8" }}>
              Generate your first intelligence report →
            </Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {reports.map((report) => {
              const busy = ["queued", "researching", "writing"].includes(report.status);
              return (
                <div key={report.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">{report.title || report.topic}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          color: STATUS_COLOR[report.status] ?? "#94a3b8",
                          background: `${STATUS_COLOR[report.status] ?? "#94a3b8"}15`,
                        }}
                      >
                        {report.status}
                      </span>
                      <span className="rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)" }}>
                        {report.report_type}
                      </span>
                      {busy && report.stage_detail && (
                        <span className="text-xs" style={{ color: "#a78bfa" }}>
                          {report.stage_detail}…
                        </span>
                      )}
                      {report.status === "failed" && report.error && (
                        <span className="truncate text-xs" style={{ color: "#f87171", maxWidth: 280 }}>
                          {report.error}
                        </span>
                      )}
                      {report.word_count ? (
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {report.word_count.toLocaleString()} words
                        </span>
                      ) : null}
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                        {new Date(report.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {busy && (
                      <span className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                        <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                        Generating
                      </span>
                    )}

                    {report.status === "published" && (
                      <Link
                        href={`/intelligence-report/${report.slug}`}
                        target="_blank"
                        className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                        style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}
                      >
                        View Live ↗
                      </Link>
                    )}

                    {report.status === "done" && (
                      <button
                        onClick={() => handlePublish(report.id)}
                        disabled={publishing === report.id}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
                        style={{ background: "rgba(56,189,248,0.1)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.2)" }}
                      >
                        {publishing === report.id ? "Publishing…" : "Publish"}
                      </button>
                    )}

                    {report.status === "published" && (
                      <button
                        onClick={() => handleUnpublish(report.id)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                        style={{ background: "rgba(251,146,60,0.1)", color: "#fb923c", border: "1px solid rgba(251,146,60,0.2)" }}
                      >
                        Unpublish
                      </button>
                    )}

                    {(report.status === "done" || report.status === "published") && (
                      <Link
                        href={`/admin/reports/edit/${report.id}`}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        Edit
                      </Link>
                    )}

                    <button
                      onClick={() => handleDelete(report.id)}
                      disabled={deleting === report.id}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
                      style={{ background: "rgba(248,113,113,0.08)", color: "#f87171", border: "1px solid rgba(248,113,113,0.15)" }}
                    >
                      {deleting === report.id ? "…" : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
