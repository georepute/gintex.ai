"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Blog, BlogStatus } from "@/types/blog";

const STATUS_OPTIONS: { value: BlogStatus | "all"; label: string; color: string }[] = [
  { value: "all", label: "All", color: "#94a3b8" },
  { value: "published", label: "Published", color: "#34d399" },
  { value: "draft", label: "Draft", color: "#94a3b8" },
  { value: "review", label: "Review", color: "#fb923c" },
  { value: "failed", label: "Failed", color: "#f87171" },
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<BlogStatus | "all">("all");
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
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    if (statusFilter !== "all") query = query.eq("status", statusFilter);
    if (search.trim()) query = query.ilike("title", `%${search.trim()}%`);
    const { data } = await query;
    setBlogs(data ?? []);
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post permanently?")) return;
    setDeleting(id);
    const supabase = createClient();
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) { showToast("Failed to delete: " + error.message, false); }
    else { showToast("Blog deleted."); load(); }
    setDeleting(null);
  }

  async function handlePublish(id: string) {
    setPublishing(id);
    const res = await fetch("/api/admin/blogs/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error ?? "Failed to publish", false); }
    else { showToast("Blog published on Gintex.ai!"); load(); }
    setPublishing(null);
  }

  async function handleUnpublish(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("blogs").update({ status: "draft" }).eq("id", id);
    if (error) { showToast("Failed to unpublish: " + error.message, false); }
    else { showToast("Blog moved back to draft."); load(); }
  }

  const statusColor: Record<string, string> = {
    published: "#34d399", draft: "#94a3b8", review: "#fb923c", failed: "#f87171",
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className="fixed right-4 top-4 z-50 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg"
          style={{ background: toast.ok ? "#166534" : "#7f1d1d", border: `1px solid ${toast.ok ? "#34d399" : "#f87171"}40` }}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            {blogs.length} post{blogs.length !== 1 ? "s" : ""}
            {statusFilter !== "all" ? ` — ${statusFilter}` : ""}
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
        >
          + New Blog Post
        </Link>
      </div>

      {/* Filters */}
      <div
        className="flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center"
        style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title…"
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

      {/* Table */}
      <div
        className="overflow-hidden rounded-xl"
        style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            No blogs found.{" "}
            <Link href="/admin/blogs/new" style={{ color: "#38bdf8" }}>
              Generate your first blog →
            </Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {blogs.map((blog) => (
              <div key={blog.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white">{blog.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{
                        color: statusColor[blog.status] ?? "#94a3b8",
                        background: `${statusColor[blog.status] ?? "#94a3b8"}15`,
                      }}
                    >
                      {blog.status}
                    </span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    {blog.reading_time && (
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                        {blog.reading_time} min read
                      </span>
                    )}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: "rgba(56,189,248,0.08)", color: "#38bdf8" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {blog.status === "published" && (
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                      style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}
                    >
                      View Live ↗
                    </Link>
                  )}

                  {blog.status !== "published" && (
                    <button
                      onClick={() => handlePublish(blog.id)}
                      disabled={publishing === blog.id}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
                      style={{ background: "rgba(56,189,248,0.1)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.2)" }}
                    >
                      {publishing === blog.id ? "Publishing…" : "Publish"}
                    </button>
                  )}

                  {blog.status === "published" && (
                    <button
                      onClick={() => handleUnpublish(blog.id)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                      style={{ background: "rgba(251,146,60,0.1)", color: "#fb923c", border: "1px solid rgba(251,146,60,0.2)" }}
                    >
                      Unpublish
                    </button>
                  )}

                  <Link
                    href={`/admin/blogs/edit/${blog.id}`}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(blog.id)}
                    disabled={deleting === blog.id}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
                    style={{ background: "rgba(248,113,113,0.08)", color: "#f87171", border: "1px solid rgba(248,113,113,0.15)" }}
                  >
                    {deleting === blog.id ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
