"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Blog, BlogStatus } from "@/types/blog";
import { RichTextEditor, isRtlLanguage } from "@/components/RichTextEditor";

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // Editable fields
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [language, setLanguage] = useState("en");

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single();
      if (error || !data) { setLoading(false); return; }
      setBlog(data);
      setTitle(data.title ?? "");
      setExcerpt(data.excerpt ?? "");
      setContent(data.content ?? "");
      setSeoTitle(data.seo_title ?? "");
      setSeoDesc(data.seo_description ?? "");
      setTags((data.tags ?? []).join(", "));
      setCoverImage(data.cover_image ?? "");
      setLanguage(data.language ?? "en");
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/admin/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        seo_title: seoTitle.trim(),
        seo_description: seoDesc.trim(),
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        cover_image: coverImage.trim() || null,
        language,
      }),
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error ?? "Save failed", false); }
    else { showToast("Changes saved."); setBlog(data); }
    setSaving(false);
  }

  async function handlePublish() {
    setPublishing(true);
    const res = await fetch("/api/admin/blogs/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error ?? "Publish failed", false); }
    else { showToast("Published on Gintex.ai!"); setBlog(prev => prev ? { ...prev, status: "published" } : prev); }
    setPublishing(false);
  }

  async function handleUnpublish() {
    const supabase = createClient();
    await supabase.from("blogs").update({ status: "draft" }).eq("id", id);
    showToast("Moved back to draft.");
    setBlog(prev => prev ? { ...prev, status: "draft" } : prev);
  }

  async function handleSetReview() {
    const supabase = createClient();
    await supabase.from("blogs").update({ status: "review" }).eq("id", id);
    showToast("Marked for review.");
    setBlog(prev => prev ? { ...prev, status: "review" } : prev);
  }

  const inputStyle = {
    background: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#f8fafc",
    borderRadius: "0.5rem",
    padding: "0.625rem 0.875rem",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.375rem",
    fontSize: "0.75rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.55)" as const,
  };

  const statusColor: Record<string, string> = {
    published: "#34d399", draft: "#94a3b8", review: "#fb923c", failed: "#f87171",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-16 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        Blog not found. <Link href="/admin/blogs" style={{ color: "#38bdf8" }}>Back to list →</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Link href="/admin/blogs" className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>← Posts</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span className="text-sm text-white">Edit</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-white">Edit Blog Post</h1>
          <div className="mt-1.5 flex items-center gap-2">
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{ color: statusColor[blog.status], background: `${statusColor[blog.status]}15` }}
            >
              {blog.status}
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              /blog/{blog.slug}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {blog.status === "published" && (
            <Link
              href={`/blog/${blog.slug}`}
              target="_blank"
              className="rounded-lg px-3.5 py-2 text-xs font-medium"
              style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}
            >
              View Live ↗
            </Link>
          )}
          {blog.status !== "review" && blog.status !== "published" && (
            <button onClick={handleSetReview} className="rounded-lg px-3.5 py-2 text-xs font-medium" style={{ background: "rgba(251,146,60,0.1)", color: "#fb923c", border: "1px solid rgba(251,146,60,0.2)" }}>
              Mark for Review
            </button>
          )}
          {blog.status !== "published" && (
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="rounded-lg px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
            >
              {publishing ? "Publishing…" : "Publish on Gintex.ai"}
            </button>
          )}
          {blog.status === "published" && (
            <button onClick={handleUnpublish} className="rounded-lg px-3.5 py-2 text-xs font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
              Unpublish
            </button>
          )}
        </div>
      </div>

      {/* Edit form */}
      <div className="space-y-5 rounded-xl p-6" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
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
            placeholder="Write or paste blog content..."
          />
        </div>

        <div>
          <label style={labelStyle}>Cover Image URL</label>
          <input type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="https://..." style={inputStyle} />
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
            disabled={saving}
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
