import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";
import { allocateUniqueSeeds, coverUrl, injectImages } from "@/lib/images";

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
  const baseSlug = slugify(slug || title);
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

  const tagArray = Array.isArray(tags) ? tags : [];

  // Insert first so we have the real id to key globally-unique image seeds on.
  const { data, error } = await supabase
    .from("blogs")
    .insert({
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt?.trim() ?? null,
      content: content?.trim() ?? null,
      seo_title: seo_title?.trim() ?? null,
      seo_description: seo_description?.trim() ?? null,
      tags: tagArray,
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

  // Assign globally-unique Picsum images keyed on the real blog id. Reserve a
  // cover seed + 3 content seeds; respect a user-supplied custom cover.
  try {
    const seeds = await allocateUniqueSeeds(supabase, "blog", data.id, 4);
    const [coverSeed, ...contentSeeds] = seeds;
    const finalCover = cover_image?.trim() || coverUrl(coverSeed);
    const finalContent = injectImages(data.content ?? "", contentSeeds, tagArray);

    const { data: updated } = await supabase
      .from("blogs")
      .update({ cover_image: finalCover, content: finalContent })
      .eq("id", data.id)
      .select()
      .single();
    if (updated) return NextResponse.json(updated, { status: 201 });
  } catch {
    // Image assignment is best-effort; never block creation on it.
  }

  return NextResponse.json(data, { status: 201 });
}
