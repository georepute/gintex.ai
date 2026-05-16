export type BlogStatus = "draft" | "review" | "published" | "failed";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[] | null;
  status: BlogStatus;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  reading_time: number | null;
  language: string;
}

export interface AdminProfile {
  id: string;
  role: "admin" | "editor";
  full_name: string | null;
  email: string | null;
  created_at: string;
}

export interface AiGenerationLog {
  id: string;
  prompt: string;
  tokens: number | null;
  cost: number | null;
  generated_at: string;
  user_id: string | null;
  blog_id: string | null;
}

export interface BlogGenerationInput {
  topic: string;
  tone?: "professional" | "conversational" | "authoritative" | "educational";
  keywords?: string[];
  language?: string;
}

export interface BlogGenerationResult {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seo_title: string;
  seo_description: string;
  tags: string[];
  reading_time: number;
  cover_image?: string | null;
}
