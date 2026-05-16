"use client";

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative flex w-full max-w-sm"
    >
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        autoComplete="email"
        className="w-full py-2.5 pl-3.5 pr-11 text-sm outline-none transition-colors duration-300"
        style={{
          background: "var(--footer-input-bg)",
          border: "1px solid var(--footer-border)",
          color: "var(--footer-heading)",
        }}
      />
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        className="absolute right-0 top-0 flex h-full w-10 items-center justify-center transition-opacity hover:opacity-70"
        style={{ color: "var(--footer-heading)" }}
      >
        <ArrowIcon />
      </button>
    </form>
  );
}
