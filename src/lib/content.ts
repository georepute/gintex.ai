// Shared blog/report HTML content sanitisers.
//
// Earlier generation prompts asked the model to emit a placeholder <figure>
// whose <figcaption> began with an internal "EDITOR: replace with ..." note.
// That note leaked into published articles. This strips any such editorial
// placeholder so it never shows to readers — applied both on save (new content)
// and at render time (fixes already-published content without a migration).

// Block-level elements an editorial placeholder might be wrapped in.
const PLACEHOLDER_BLOCKS = ["figure", "figcaption", "p", "div", "span", "em", "strong"];

/**
 * Remove leaked editorial placeholders from article HTML. The AI was previously
 * prompted to emit an "EDITOR: replace with ..." note describing a chart for a
 * human to swap in; it leaked into published content. The note shows up in
 * several shapes — inside a <figure>, as a bare <p>, or as plain text — so we
 * strip all of them.
 */
export function stripEditorPlaceholders(html: string): string {
  if (!html) return html;
  let out = html;

  // 1. Whole <figure>...</figure> blocks that are editorial placeholders.
  out = out.replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi, (block) => {
    if (/EDITOR\s*:/i.test(block) || /seed\/replaceme/i.test(block) || /replace with/i.test(block)) {
      return "";
    }
    return block;
  });

  // 2. Any block-level element whose text begins with "EDITOR:" or "replace with"
  //    (covers <p>EDITOR: replace with ...</p>, <figcaption>, <div>, etc.).
  for (const tag of PLACEHOLDER_BLOCKS) {
    const re = new RegExp(
      `<${tag}\\b[^>]*>\\s*(?:EDITOR\\s*:|replace with)[\\s\\S]*?<\\/${tag}>`,
      "gi",
    );
    out = out.replace(re, "");
  }

  // 3. A placeholder <img> with the literal "replaceme" seed (no real image).
  out = out.replace(/<img\b[^>]*seed\/replaceme[^>]*>/gi, "");

  // 4. Bare placeholder text not wrapped in a tag (defensive).
  out = out.replace(/EDITOR\s*:\s*replace with[^<\n]*/gi, "");

  // 5. Tidy up empty paragraphs left behind by the removals.
  out = out.replace(/<p>\s*<\/p>/gi, "");

  return out;
}
