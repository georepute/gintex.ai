import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Blog ID required" }, { status: 400 });

  // Verify blog exists and belongs to this system
  const { data: blog, error: fetchError } = await supabase
    .from("blogs")
    .select("id, title, status, slug")
    .eq("id", id)
    .single();

  if (fetchError || !blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  if (blog.status === "published") {
    return NextResponse.json({ error: "Blog is already published" }, { status: 400 });
  }

  // Publish: set status + published_at
  const { data, error } = await supabase
    .from("blogs")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    success: true,
    blog: data,
    publicUrl: `/blog/${data.slug}`,
  });
}
