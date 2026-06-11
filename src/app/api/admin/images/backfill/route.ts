import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { allocateUniqueSeeds, coverUrl } from "@/lib/images";

// POST — one-time (idempotent) backfill: assign a globally-unique Picsum cover to
// every existing BLOG that doesn't already have one recorded in `used_images`.
// Reports are intentionally image-free and are not touched. Re-running is a no-op.
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Which owners already have a recorded cover seed → skip (idempotency).
  const { data: existingCovers } = await supabase
    .from("used_images")
    .select("owner_type, owner_id")
    .eq("slot", "cover");
  const done = new Set(
    (existingCovers ?? []).map(r => `${r.owner_type}:${r.owner_id}`),
  );

  let blogsUpdated = 0;

  // ── Blogs only (reports are intentionally image-free) ──
  const { data: blogs } = await supabase.from("blogs").select("id, cover_image");
  for (const b of blogs ?? []) {
    if (done.has(`blog:${b.id}`)) continue;
    try {
      const [coverSeed] = await allocateUniqueSeeds(supabase, "blog", b.id, 1);
      await supabase.from("blogs").update({ cover_image: coverUrl(coverSeed) }).eq("id", b.id);
      blogsUpdated++;
    } catch { /* skip on error, continue */ }
  }

  return NextResponse.json({
    success: true,
    blogsUpdated,
    message: `Backfilled ${blogsUpdated} blog cover(s).`,
  });
}
