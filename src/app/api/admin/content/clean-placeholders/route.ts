import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripEditorPlaceholders } from "@/lib/content";

// POST — one-time (idempotent) cleanup: remove leaked "EDITOR: replace with..."
// editorial placeholders from the stored content of every blog and report.
// Run once while logged in as an admin. Re-running is a no-op.
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let blogsCleaned = 0;
  let reportsCleaned = 0;

  // ── Blogs ──
  const { data: blogs } = await supabase.from("blogs").select("id, content");
  for (const b of blogs ?? []) {
    if (!b.content) continue;
    const cleaned = stripEditorPlaceholders(b.content);
    if (cleaned !== b.content) {
      await supabase.from("blogs").update({ content: cleaned }).eq("id", b.id);
      blogsCleaned++;
    }
  }

  // ── Reports ──
  const { data: reports } = await supabase.from("intelligence_reports").select("id, content");
  for (const r of reports ?? []) {
    if (!r.content) continue;
    const cleaned = stripEditorPlaceholders(r.content);
    if (cleaned !== r.content) {
      await supabase.from("intelligence_reports").update({ content: cleaned }).eq("id", r.id);
      reportsCleaned++;
    }
  }

  return NextResponse.json({
    success: true,
    blogsCleaned,
    reportsCleaned,
    message: `Cleaned ${blogsCleaned} blog(s) and ${reportsCleaned} report(s).`,
  });
}
