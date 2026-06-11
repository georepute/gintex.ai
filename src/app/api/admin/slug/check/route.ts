import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { validateSlugFormat, suggestSlugs } from "@/lib/slug";

type CheckStatus = "available" | "taken" | "reserved" | "invalid";

interface CheckResponse {
  available: boolean;
  status: CheckStatus;
  message: string;
  suggestions?: string[];
}

// Per-content-type table mapping. Blogs and reports each have their own content
// table + redirects table + owner column.
const TABLES = {
  blog:   { content: "blogs", redirects: "blog_redirects", owner: "blog_id" },
  report: { content: "intelligence_reports", redirects: "report_redirects", owner: "report_id" },
} as const;

// POST { slug, excludeId?, type? } -> validation result for the slug field.
// "taken" covers both a live slug and a historical redirect old_slug — reusing an
// old URL would break that redirect, so it's treated as taken. `type` defaults to
// "blog" so existing blog callers are unchanged.
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug, excludeId, type } = await request.json();
  const value = String(slug ?? "").trim();
  const t = TABLES[type === "report" ? "report" : "blog"];

  // 1. Format + reserved (pure, synchronous).
  const format = validateSlugFormat(value);
  if (!format.ok) {
    const status: CheckStatus = format.reason === "reserved" ? "reserved" : "invalid";
    return NextResponse.json<CheckResponse>({ available: false, status, message: format.error });
  }

  // 2. Collision with an existing item (excluding the one being edited).
  let contentQuery = supabase.from(t.content).select("id").eq("slug", value);
  if (excludeId) contentQuery = contentQuery.neq("id", excludeId);
  const { data: contentHit } = await contentQuery.maybeSingle();

  // 3. Collision with a historical redirect (reusing it would break that URL).
  const { data: redirectHit } = await supabase
    .from(t.redirects)
    .select(`id, ${t.owner}`)
    .eq("old_slug", value)
    .maybeSingle();

  // A redirect that belongs to the item being edited is fine (it's their own old
  // URL); one belonging to a different item blocks reuse.
  const redirectOwner = redirectHit ? (redirectHit as Record<string, unknown>)[t.owner] : null;
  const redirectBlocks = redirectHit && (!excludeId || redirectOwner !== excludeId);

  if (contentHit || redirectBlocks) {
    const year = new Date().getFullYear();
    return NextResponse.json<CheckResponse>({
      available: false,
      status: "taken",
      message: "This URL is already in use.",
      suggestions: suggestSlugs(value, year).filter(s => s !== value),
    });
  }

  return NextResponse.json<CheckResponse>({
    available: true,
    status: "available",
    message: "URL is available.",
  });
}
