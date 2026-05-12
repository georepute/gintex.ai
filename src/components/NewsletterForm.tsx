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
        className="w-full border border-white/15 bg-[#111] py-2.5 pl-3.5 pr-11 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-white/30"
      />
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-white transition-colors hover:text-gray-200"
      >
        <ArrowIcon />
      </button>
    </form>
  );
}
