import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { validateSlugFormat } from "@/lib/slug";

type Params = Promise<{ id: string }>;

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const allowed = ["title", "excerpt", "content", "seo_title", "seo_description", "tags", "cover_image", "language", "status", "slug", "canonical_url"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  // ── Slug change handling ──────────────────────────────────────────────────
  // If the slug is being changed we must: validate it, guard against duplicates,
  // and (for a published article) create a 301 redirect so the old URL keeps
  // resolving. We also chain any prior redirects forward to the new slug.
  if (typeof updates.slug === "string") {
    const newSlug = (updates.slug as string).trim();

    // Load the current row to detect an actual change and know the old slug/status.
    const { data: current, error: currentErr } = await supabase
      .from("blogs")
      .select("id, slug, status, slug_history")
      .eq("id", id)
      .single();
    if (currentErr || !current) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const oldSlug = current.slug as string;
    const slugChanged = newSlug !== oldSlug;

    if (slugChanged) {
      // Format + reserved validation.
      const format = validateSlugFormat(newSlug);
      if (!format.ok) {
        return NextResponse.json({ error: format.error }, { status: 400 });
      }

      // Uniqueness: not used by another blog, and not an active redirect owned by
      // a different article.
      const { data: clash } = await supabase
        .from("blogs").select("id").eq("slug", newSlug).neq("id", id).maybeSingle();
      const { data: redirectClash } = await supabase
        .from("blog_redirects").select("id, blog_id").eq("old_slug", newSlug).maybeSingle();
      if (clash || (redirectClash && redirectClash.blog_id !== id)) {
        return NextResponse.json({ error: "This URL is already in use." }, { status: 409 });
      }

      // Only published articles have live URLs worth preserving. (Drafts have
      // never been indexed, so no redirect is needed.)
      const isPublished = current.status === "published" || body.status === "published";
      if (isPublished) {
        // Record the old slug in history (dedup).
        const history: string[] = Array.isArray(current.slug_history) ? current.slug_history : [];
        if (!history.includes(oldSlug)) history.push(oldSlug);
        updates.slug_history = history;

        // Create the redirect oldSlug -> newSlug (upsert on the unique old_slug).
        await supabase.from("blog_redirects").upsert(
          {
            blog_id: id,
            old_slug: oldSlug,
            new_slug: newSlug,
            redirect_type: 301,
          },
          { onConflict: "old_slug" },
        );

        // Chain: any earlier redirect that pointed AT the old slug must now point
        // at the new slug, so a->b->c all resolve to c (no broken hops).
        await supabase
          .from("blog_redirects")
          .update({ new_slug: newSlug })
          .eq("new_slug", oldSlug);

        // If a redirect existed FROM the new slug (article being moved back to a
        // previously-used URL), remove it — the slug is live again.
        await supabase.from("blog_redirects").delete().eq("old_slug", newSlug);
      }
    }
  }

  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("blogs")
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

  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
