import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Analytics" };

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // Stats
  const [totalBlogs, publishedBlogs, genLogs] = await Promise.all([
    supabase.from("blogs").select("id, status, created_at, reading_time, language", { count: "exact" }),
    supabase.from("blogs").select("id, published_at").eq("status", "published").order("published_at", { ascending: false }).limit(10),
    supabase.from("ai_generation_logs").select("id, tokens, cost, generated_at").order("generated_at", { ascending: false }).limit(20),
  ]);

  const blogs = totalBlogs.data ?? [];
  const byStatus = blogs.reduce((acc: Record<string, number>, b) => {
    acc[b.status] = (acc[b.status] ?? 0) + 1;
    return acc;
  }, {});

  const byLanguage = blogs.reduce((acc: Record<string, number>, b) => {
    acc[b.language ?? "en"] = (acc[b.language ?? "en"] ?? 0) + 1;
    return acc;
  }, {});

  const totalTokens = (genLogs.data ?? []).reduce((sum, l) => sum + (l.tokens ?? 0), 0);
  const totalCost = (genLogs.data ?? []).reduce((sum, l) => sum + (l.cost ?? 0), 0);

  const statusColor: Record<string, string> = {
    published: "#34d399", draft: "#94a3b8", review: "#fb923c", failed: "#f87171",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>AI usage stats and blog performance</p>
      </div>

      {/* AI Usage */}
      <section>
        <h2 className="mb-4 text-sm font-semibold text-white">AI Generation Usage</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            { label: "Total Generations", value: genLogs.data?.length ?? 0, color: "#818cf8" },
            { label: "Total Tokens Used", value: totalTokens.toLocaleString(), color: "#38bdf8" },
            { label: "Est. Cost (USD)", value: `$${totalCost.toFixed(4)}`, color: "#34d399" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl p-5" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-2xl font-bold" style={{ color }}>{value}</p>
              <p className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog stats by status */}
      <section>
        <h2 className="mb-4 text-sm font-semibold text-white">Blogs by Status</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {["published", "draft", "review", "failed"].map(status => (
            <div key={status} className="rounded-xl p-5" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-2xl font-bold" style={{ color: statusColor[status] }}>{byStatus[status] ?? 0}</p>
              <p className="mt-1 text-xs capitalize" style={{ color: "rgba(255,255,255,0.4)" }}>{status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* By language */}
      <section>
        <h2 className="mb-4 text-sm font-semibold text-white">Blogs by Language</h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(byLanguage).map(([lang, count]) => (
            <div key={lang} className="rounded-xl px-4 py-3" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-lg font-bold text-white">{count}</p>
              <p className="text-xs uppercase" style={{ color: "#38bdf8" }}>{lang}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent generation logs */}
      <section>
        <h2 className="mb-4 text-sm font-semibold text-white">Recent AI Generations</h2>
        <div className="overflow-hidden rounded-xl" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}>
          {(genLogs.data ?? []).length === 0 ? (
            <p className="px-5 py-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>No generation logs yet.</p>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {(genLogs.data ?? []).map(log => (
                <div key={log.id} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {new Date(log.generated_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <div className="flex gap-4">
                    <span className="text-xs" style={{ color: "#38bdf8" }}>{(log.tokens ?? 0).toLocaleString()} tokens</span>
                    <span className="text-xs" style={{ color: "#34d399" }}>${(log.cost ?? 0).toFixed(4)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
