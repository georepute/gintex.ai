import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 80);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const {
    title, slug, excerpt, content,
    seo_title, seo_description, tags,
    reading_time, language, status, cover_image,
  } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  // Ensure unique slug
  let baseSlug = slugify(slug || title);
  let finalSlug = baseSlug;
  let counter = 0;
  while (true) {
    const { data: existing } = await supabase
      .from("blogs")
      .select("id")
      .eq("slug", finalSlug)
      .single();
    if (!existing) break;
    counter++;
    finalSlug = `${baseSlug}-${counter}`;
  }

  const { data, error } = await supabase
    .from("blogs")
    .insert({
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt?.trim() ?? null,
      content: content?.trim() ?? null,
      seo_title: seo_title?.trim() ?? null,
      seo_description: seo_description?.trim() ?? null,
      tags: Array.isArray(tags) ? tags : [],
      reading_time: reading_time ?? null,
      language: language ?? "en",
      cover_image: cover_image?.trim() ?? null,
      status: status ?? "draft",
      author_id: user.id,
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
