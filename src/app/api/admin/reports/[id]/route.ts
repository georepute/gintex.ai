import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { validateSlugFormat } from "@/lib/slug";

type Params = Promise<{ id: string }>;

// GET — used by the admin UI to poll generation status and fetch the result.
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("intelligence_reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return NextResponse.json({ error: "Report not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const allowed = [
    "title", "excerpt", "content", "seo_title", "seo_description",
    "tags", "cover_image", "language", "status", "slug", "canonical_url",
  ];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  // ── Slug change handling (mirrors the blog PUT route) ─────────────────────
  // Validate, guard against duplicates, and for a published report create a 301
  // redirect so the old URL keeps resolving. Earlier redirects chain forward.
  if (typeof updates.slug === "string") {
    const newSlug = (updates.slug as string).trim();

    const { data: current, error: currentErr } = await supabase
      .from("intelligence_reports")
      .select("id, slug, status, slug_history")
      .eq("id", id)
      .single();
    if (currentErr || !current) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const oldSlug = current.slug as string | null;
    const slugChanged = !!oldSlug && newSlug !== oldSlug;

    if (slugChanged) {
      const format = validateSlugFormat(newSlug);
      if (!format.ok) {
        return NextResponse.json({ error: format.error }, { status: 400 });
      }

      const { data: clash } = await supabase
        .from("intelligence_reports").select("id").eq("slug", newSlug).neq("id", id).maybeSingle();
      const { data: redirectClash } = await supabase
        .from("report_redirects").select("id, report_id").eq("old_slug", newSlug).maybeSingle();
      if (clash || (redirectClash && redirectClash.report_id !== id)) {
        return NextResponse.json({ error: "This URL is already in use." }, { status: 409 });
      }

      // Only published reports have live URLs worth preserving.
      const isPublished = current.status === "published" || body.status === "published";
      if (isPublished) {
        const history: string[] = Array.isArray(current.slug_history) ? current.slug_history : [];
        if (oldSlug && !history.includes(oldSlug)) history.push(oldSlug);
        updates.slug_history = history;

        await supabase.from("report_redirects").upsert(
          { report_id: id, old_slug: oldSlug, new_slug: newSlug, redirect_type: 301 },
          { onConflict: "old_slug" },
        );

        // Chain: any earlier redirect pointing AT the old slug now points at new.
        await supabase.from("report_redirects").update({ new_slug: newSlug }).eq("new_slug", oldSlug);

        // If a redirect existed FROM the new slug, drop it — the slug is live again.
        await supabase.from("report_redirects").delete().eq("old_slug", newSlug);
      }
    }
  }

  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("intelligence_reports")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Only admins can delete
  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden — admin only" }, { status: 403 });
  }

  const { error } = await supabase.from("intelligence_reports").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
