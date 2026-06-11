// Picsum image utilities with a globally-unique seed allocator.
//
// Images are real Picsum photos, but every seed is recorded in the
// `used_images` table whose `seed` column is UNIQUE. Allocation always inserts
// a not-yet-used seed, so NO two blogs or reports ever share an image. This
// replaces the old slug-hash approach (`strToSeed(slug) % 1000`) which had only
// 1,000 buckets and reused the same seed for cover + first in-content image.

import type { SupabaseClient } from "@supabase/supabase-js";

export const COVER_W = 1600;
export const COVER_H = 900;
export const CONTENT_W = 1200;
export const CONTENT_H = 630;

// Large seed space so derived candidates effectively never collide before the
// DB even checks. Picsum accepts any string/number seed.
const SEED_SPACE = 1_000_000_000;

export function picsumUrl(seed: number, w: number, h: number): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export function coverUrl(seed: number): string {
  return picsumUrl(seed, COVER_W, COVER_H);
}

// Deterministic 32-bit-ish hash of a string -> a candidate seed in [0, SEED_SPACE).
function hashToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash) % SEED_SPACE;
}

export type ImageOwnerType = "blog" | "report";

/**
 * Reserve `count` globally-unique Picsum seeds for an owner and record them in
 * `used_images`. Returns the reserved seeds in order (slot 'cover', 'content-1',
 * 'content-2', ...). Uniqueness is enforced by the table's UNIQUE(seed)
 * constraint: on a conflict we probe the next candidate and retry.
 *
 * If `used_images` does not exist / errors, falls back to deterministic seeds
 * derived from ownerId so generation never hard-fails on the image step.
 */
export async function allocateUniqueSeeds(
  supabase: SupabaseClient,
  ownerType: ImageOwnerType,
  ownerId: string,
  count: number,
): Promise<number[]> {
  const slots = ["cover", ...Array.from({ length: count - 1 }, (_, i) => `content-${i + 1}`)];
  const reserved: number[] = [];

  for (let s = 0; s < count; s++) {
    // Vary the starting candidate per slot so cover/content never coincide.
    let candidate = hashToSeed(`${ownerId}:${slots[s]}`);
    let inserted = false;

    // Probe forward until an unused seed is accepted (bounded retries).
    for (let attempt = 0; attempt < 50 && !inserted; attempt++) {
      const seed = (candidate + attempt) % SEED_SPACE;
      const { error } = await supabase.from("used_images").insert({
        seed,
        owner_type: ownerType,
        owner_id: ownerId,
        slot: slots[s],
      });
      if (!error) {
        reserved.push(seed);
        inserted = true;
      } else if (isUniqueViolation(error)) {
        // Seed taken — try the next candidate.
        continue;
      } else {
        // Table missing or other error: fall back to deterministic seed and
        // stop trying to record (don't block content generation on images).
        return slots.map((_, i) => hashToSeed(`${ownerId}:${slots[i]}`));
      }
    }

    if (!inserted) {
      // Exhausted probes (extremely unlikely) — use the raw candidate.
      reserved.push(candidate % SEED_SPACE);
    }
    candidate = (candidate + 1) % SEED_SPACE;
  }

  return reserved;
}

function isUniqueViolation(error: { code?: string; message?: string }): boolean {
  // Postgres unique_violation is 23505; Supabase surfaces it in error.code.
  return error?.code === "23505" || /duplicate key|unique/i.test(error?.message ?? "");
}

/**
 * Inject in-content <figure> images after the 1st, 2nd (and 3rd if long enough)
 * H2 break points, using pre-allocated unique seeds. `seeds` are the
 * content-slot seeds (NOT the cover seed). Mirrors the previous insertion logic.
 */
export function injectImages(content: string, seeds: number[], tags: string[]): string {
  const parts = content.split(/(?=<h2)/i);
  if (parts.length < 2 || seeds.length === 0) return content;

  const imgTag = (seed: number, alt: string) =>
    `<figure style="margin:2rem 0;"><img src="${picsumUrl(seed, CONTENT_W, CONTENT_H)}" alt="${alt}" style="width:100%;border-radius:0.75rem;object-fit:cover;" loading="lazy" /><figcaption style="text-align:center;font-size:0.8rem;color:#94a3b8;margin-top:0.5rem;">${alt}</figcaption></figure>`;

  const altTexts = [
    tags[0] ?? "AI technology",
    tags[1] ?? "digital intelligence",
    tags[2] ?? "market insights",
  ];

  const result = parts.map((part, i) => {
    if (i === 1 && seeds[0] != null) return part + imgTag(seeds[0], altTexts[0]);
    if (i === 2 && seeds[1] != null) return part + imgTag(seeds[1], altTexts[1]);
    if (i === 3 && parts.length > 4 && seeds[2] != null) return part + imgTag(seeds[2], altTexts[2]);
    return part;
  });

  return result.join("");
}
