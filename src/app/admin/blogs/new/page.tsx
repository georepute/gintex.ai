"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogGenerationInput } from "@/types/blog";

const TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "conversational", label: "Conversational" },
  { value: "authoritative", label: "Authoritative" },
  { value: "educational", label: "Educational" },
] as const;

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "he", label: "Hebrew" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "de", label: "German" },
  { value: "ar", label: "Arabic" },
];

const MODEL_OPTIONS = [
  { value: "openai", label: "GPT-4o (OpenAI)", desc: "Fast, well-rounded" },
  { value: "claude", label: "Claude Sonnet (Anthropic)", desc: "Nuanced, long-form" },
] as const;

export default function NewBlogPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<BlogGenerationInput["tone"]>("professional");
  const [keywords, setKeywords] = useState("");
  const [language, setLanguage] = useState("en");
  const [model, setModel] = useState<"openai" | "claude">("openai");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [coverImageError, setCoverImageError] = useState<string | null>(null);

  // Generated result state
  const [generated, setGenerated] = useState<{
    title: string; excerpt: string; content: string;
    seo_title: string; seo_description: string; tags: string[]; reading_time: number; slug: string;
    cover_image?: string | null;
  } | null>(null);

  // Editable fields after generation
  const [editTitle, setEditTitle] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editSeoTitle, setEditSeoTitle] = useState("");
  const [editSeoDesc, setEditSeoDesc] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editCoverImage, setEditCoverImage] = useState("");

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    setGenerating(true);
    setError(null);
    setGenerated(null);

    try {
      const res = await fetch("/api/admin/blogs/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          tone,
          keywords: keywords.split(",").map(k => k.trim()).filter(Boolean),
          language,
          model,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed");

      setGenerated(data);
      setCoverImageError(data._cover_error ?? null);
      setEditTitle(data.title);
      setEditExcerpt(data.excerpt);
      setEditContent(data.content);
      setEditSeoTitle(data.seo_title);
      setEditSeoDesc(data.seo_description);
      setEditTags(data.tags.join(", "));
      setEditCoverImage(data.cover_image ?? "");
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave(status: "draft" | "published") {
    if (!generated) return;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/blogs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.trim() || generated.title,
          slug: generated.slug,
          excerpt: editExcerpt.trim() || generated.excerpt,
          content: editContent.trim() || generated.content,
          seo_title: editSeoTitle.trim() || generated.seo_title,
          seo_description: editSeoDesc.trim() || generated.seo_description,
          tags: editTags.split(",").map(t => t.trim()).filter(Boolean),
          reading_time: generated.reading_time,
          language,
          status,
          cover_image: editCoverImage.trim() || generated.cover_image || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");
      router.push(`/admin/blogs/edit/${data.id}`);
    } catch (err: any) {
      setError(err.message ?? "Failed to save blog");
    } finally {
      setSaving(false);
    }
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
    color: "rgba(255,255,255,0.55)",
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Generate New Blog Post</h1>
        <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          AI will generate a complete article for Gintex.ai
        </p>
      </div>

      {/* Generation form */}
      <form
        onSubmit={handleGenerate}
        className="space-y-5 rounded-xl p-6"
        style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <h2 className="text-sm font-semibold text-white">Blog Parameters</h2>

        <div>
          <label style={labelStyle}>Topic *</label>
          <input
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            required
            placeholder="e.g. How AI is transforming brand perception in 2025"
            style={inputStyle}
          />
        </div>

        {/* Model picker */}
        <div>
          <label style={labelStyle}>AI Model</label>
          <div className="grid gap-2 sm:grid-cols-2">
            {MODEL_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setModel(opt.value)}
                className="flex flex-col items-start rounded-lg px-4 py-3 text-left transition-all"
                style={{
                  background: model === opt.value ? "rgba(14,165,233,0.12)" : "rgba(255,255,255,0.03)",
                  border: model === opt.value ? "1px solid rgba(14,165,233,0.4)" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-xs font-semibold" style={{ color: model === opt.value ? "#38bdf8" : "#f8fafc" }}>
                  {opt.label}
                </span>
                <span className="mt-0.5 text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label style={labelStyle}>Tone</label>
            <select
              value={tone}
              onChange={e => setTone(e.target.value as BlogGenerationInput["tone"])}
              style={{ ...inputStyle, appearance: "none" }}
            >
              {TONE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Language</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              style={{ ...inputStyle, appearance: "none" }}
            >
              {LANGUAGE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Keywords (comma-separated, optional)</label>
          <input
            type="text"
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
            placeholder="AI visibility, brand perception, GEO"
            style={inputStyle}
          />
        </div>

        {error && !generating && (
          <p className="rounded-lg px-3.5 py-2.5 text-sm" style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={generating || !topic.trim()}
          className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
        >
          {generating ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Generating article & cover image…
            </>
          ) : (
            "Generate with AI"
          )}
        </button>
      </form>

      {/* Generated result */}
      {generated && (
        <div className="space-y-6">
          <div
            className="rounded-xl p-6 space-y-5"
            style={{ background: "#141414", border: "1px solid rgba(52,211,153,0.2)" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <h2 className="text-sm font-semibold text-white">Generated Content — Review & Edit</h2>
              <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: "rgba(56,189,248,0.1)", color: "#38bdf8" }}>
                {model === "claude" ? "Claude Sonnet" : "GPT-4o"}
              </span>
            </div>

            {/* Cover image preview */}
            <div>
              <label style={labelStyle}>Cover Image</label>
              {editCoverImage ? (
                <div className="overflow-hidden rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editCoverImage} alt="Cover" className="aspect-[16/9] w-full object-cover" />
                </div>
              ) : (
                <div
                  className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-lg text-xs"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}
                >
                  <span>No cover image generated</span>
                  {coverImageError && (
                    <span className="max-w-sm text-center text-[10px]" style={{ color: "#f87171" }}>
                      Error: {coverImageError}
                    </span>
                  )}
                </div>
              )}
              <input
                type="url"
                value={editCoverImage}
                onChange={e => setEditCoverImage(e.target.value)}
                placeholder="Or paste an image URL"
                style={{ ...inputStyle, marginTop: "0.5rem" }}
              />
            </div>

            <div>
              <label style={labelStyle}>Title</label>
              <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Excerpt / Summary</label>
              <textarea
                value={editExcerpt}
                onChange={e => setEditExcerpt(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            <div>
              <label style={labelStyle}>Content (HTML)</label>
              <textarea
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                rows={20}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "0.8rem" }}
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

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                <span>~{generated.reading_time} min read</span>
                <span>·</span>
                <span>Slug: {generated.slug}</span>
              </div>
            </div>

            {error && (
              <p className="rounded-lg px-3.5 py-2.5 text-sm" style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-3 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <button
                onClick={() => handleSave("draft")}
                disabled={saving}
                className="rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity disabled:opacity-50"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {saving ? "Saving…" : "Save as Draft"}
              </button>
              <button
                onClick={() => handleSave("published")}
                disabled={saving}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
              >
                {saving ? "Publishing…" : "Publish on Gintex.ai"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
