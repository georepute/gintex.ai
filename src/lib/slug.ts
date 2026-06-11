// Shared slug utilities — single source of truth for URL slugs.
//
// The same slugify algorithm previously lived (copy-pasted) in the blog create,
// blog generate, and report generate routes. Centralising it here keeps URL
// normalisation consistent across the platform.

/**
 * Normalise arbitrary text into a URL-safe slug.
 *   "Understanding the GEON Index"            -> "understanding-the-geon-index"
 *   "Top 10 GEO Strategies for 2026"          -> "top-10-geo-strategies-for-2026"
 *   "AI & Search: The Future"                 -> "ai-search-the-future"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // drop anything that isn't a-z, 0-9, space, hyphen
    .replace(/\s+/g, "-")          // spaces -> hyphens
    .replace(/-+/g, "-")           // collapse repeated hyphens
    .replace(/^-+|-+$/g, "")       // trim leading/trailing hyphens
    .slice(0, 80);
}

/**
 * Slugs that would collide with real top-level routes under src/app/, plus a few
 * generic admin words. A blog whose slug matches one of these would be shadowed
 * by a static page (Next.js matches the static route, not /blog/[slug]).
 *
 * Keep in sync with the top-level directories in src/app/.
 */
export const RESERVED_SLUGS: ReadonlySet<string> = new Set([
  "about",
  "admin",
  "api",
  "blog",
  "contact",
  "cookie-policy",
  "global-map",
  "intelligence",
  "intelligence-report",
  "pdca",
  "privacy-policy",
  "services",
  "terms-of-use",
  // generic admin words worth reserving even if no route exists yet
  "login",
  "logout",
  "dashboard",
  "new",
  "edit",
]);

export type SlugFormatResult =
  | { ok: true }
  | { ok: false; error: string; reason: "empty" | "invalid" | "reserved" };

// A valid slug is lowercase alphanumeric words joined by single hyphens.
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Validate slug FORMAT only (no DB / uniqueness check). Pure + synchronous so it
 * can run in the browser for instant feedback and on the server before any query.
 */
export function validateSlugFormat(slug: string): SlugFormatResult {
  const value = slug.trim();
  if (!value) {
    return { ok: false, error: "Slug cannot be empty.", reason: "empty" };
  }
  if (!SLUG_PATTERN.test(value)) {
    return {
      ok: false,
      error: "Use lowercase letters, numbers, and single hyphens only.",
      reason: "invalid",
    };
  }
  if (RESERVED_SLUGS.has(value)) {
    return {
      ok: false,
      error: `"${value}" is a reserved URL and cannot be used.`,
      reason: "reserved",
    };
  }
  return { ok: true };
}

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug.trim().toLowerCase());
}

/**
 * Suggest alternative slugs when the requested one is taken.
 *   "geon-index" -> ["geon-index-2", "geon-index-2026", "geon-index-guide"]
 * `year` is injected (not Date.now) so callers control determinism.
 */
export function suggestSlugs(base: string, year: number): string[] {
  const clean = slugify(base) || "article";
  return [`${clean}-2`, `${clean}-${year}`, `${clean}-guide`];
}
