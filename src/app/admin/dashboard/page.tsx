import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  const supabase = await createClient();
  const [total, published, draft, review, failed, logs] = await Promise.all([
    supabase.from("blogs").select("id", { count: "exact", head: true }),
    supabase.from("blogs").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("blogs").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("blogs").select("id", { count: "exact", head: true }).eq("status", "review"),
    supabase.from("blogs").select("id", { count: "exact", head: true }).eq("status", "failed"),
    supabase.from("ai_generation_logs").select("id", { count: "exact", head: true }),
  ]);
  return {
    total: total.count ?? 0,
    published: published.count ?? 0,
    draft: draft.count ?? 0,
    review: review.count ?? 0,
    failed: failed.count ?? 0,
    generations: logs.count ?? 0,
  };
}

async function getRecentBlogs() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blogs")
    .select("id, title, status, created_at, slug")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [stats, recent] = await Promise.all([getStats(), getRecentBlogs()]);

  const statCards = [
    { label: "Total Blogs", value: stats.total, color: "#38bdf8" },
    { label: "Published", value: stats.published, color: "#34d399" },
    { label: "Drafts", value: stats.draft, color: "#94a3b8" },
    { label: "In Review", value: stats.review, color: "#fb923c" },
    { label: "Failed", value: stats.failed, color: "#f87171" },
    { label: "AI Generations", value: stats.generations, color: "#818cf8" },
  ];

  const statusColor: Record<string, string> = {
    published: "#34d399",
    draft: "#94a3b8",
    review: "#fb923c",
    failed: "#f87171",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Gintex.ai Blog CMS overview
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #818cf8)" }}
        >
          <span>+</span> New Blog Post
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl p-4"
            style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
            <p className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { href: "/admin/blogs/new", label: "Generate AI Blog", desc: "Create a new blog with AI", accent: "#38bdf8" },
          { href: "/admin/blogs", label: "Manage Posts", desc: "View, edit and publish blogs", accent: "#818cf8" },
          { href: "/admin/analytics", label: "View Analytics", desc: "AI usage and performance stats", accent: "#34d399" },
        ].map(({ href, label, desc, accent }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl p-5 transition-colors"
            style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="font-semibold text-white group-hover:opacity-80 transition-opacity">{label}</p>
            <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{desc}</p>
            <span className="mt-3 inline-block text-xs font-medium" style={{ color: accent }}>
              Open →
            </span>
          </Link>
        ))}
      </div>

      {/* Recent blogs */}
      <div
        className="rounded-xl"
        style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <h2 className="text-sm font-semibold text-white">Recent Blog Posts</h2>
          <Link href="/admin/blogs" className="text-xs" style={{ color: "#38bdf8" }}>
            View all →
          </Link>
        </div>
        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {recent.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
              No blog posts yet.{" "}
              <Link href="/admin/blogs/new" style={{ color: "#38bdf8" }}>Generate your first →</Link>
            </div>
          ) : (
            recent.map((blog) => (
              <div key={blog.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{blog.title}</p>
                  <p className="mt-0.5 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="ml-4 flex items-center gap-3">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{
                      color: statusColor[blog.status] ?? "#94a3b8",
                      background: `${statusColor[blog.status] ?? "#94a3b8"}15`,
                    }}
                  >
                    {blog.status}
                  </span>
                  <Link
                    href={`/admin/blogs/edit/${blog.id}`}
                    className="text-xs transition-opacity hover:opacity-80"
                    style={{ color: "#38bdf8" }}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
