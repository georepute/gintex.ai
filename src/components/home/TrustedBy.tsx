const iconClass =
  "h-7 w-7 shrink-0 text-gray-300 md:h-8 md:w-8";

function TechnoIcon() {
  return (
    <svg
      className={iconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function FluxIcon() {
  return (
    <svg
      className={iconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="m12 2 9 5v10l-9 5-9-5V7l9-5z" />
      <path d="m12 22-9-5V7l9 5v10Z" opacity="0.5" />
      <path d="M12 2v10l9 5" opacity="0.5" />
    </svg>
  );
}

function SynapseIcon() {
  return (
    <span
      className="shrink-0 font-mono text-lg font-semibold text-gray-300 md:text-xl"
      aria-hidden
    >
      {"[>]"}
    </span>
  );
}

function OrbitIcon() {
  return (
    <svg
      className={iconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <ellipse cx="12" cy="12" rx="8" ry="3" />
      <ellipse cx="12" cy="18" rx="8" ry="3" />
    </svg>
  );
}

const BRANDS = [
  { name: "TECHNO", Icon: TechnoIcon },
  { name: "FLUX", Icon: FluxIcon },
  { name: "SYNAPSE", Icon: SynapseIcon },
  { name: "ORBIT", Icon: OrbitIcon },
] as const;

export function TrustedBy() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-10 sm:px-10 sm:py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <p className="font-label mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:mb-9 sm:text-sm">
          Trusted by global innovators
        </p>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-12 md:gap-x-14">
          {BRANDS.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex items-center gap-3 text-white/90 transition-opacity hover:opacity-100"
            >
              <Icon />
              <span className="font-label text-base font-semibold uppercase tracking-[0.12em] md:text-lg">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
