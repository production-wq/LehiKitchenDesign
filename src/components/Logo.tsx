export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
        <rect width="64" height="64" rx="14" fill={light ? "#faf6ee" : "#1b3830"} />
        <path d="M14 46V26l18-12 18 12v20" fill="none" stroke="#b98a3e" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
        <rect x="22" y="30" width="20" height="16" rx="1.5" fill="none" stroke={light ? "#1b3830" : "#faf6ee"} strokeWidth="3" />
        <path d="M22 38h20M32 30v16" stroke={light ? "#1b3830" : "#faf6ee"} strokeWidth="2.5" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-[1.2rem] font-semibold tracking-tight ${light ? "text-white" : "text-forest"}`}>Lehi Kitchen Design</span>
        <span className={`mt-0.5 block text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-brass" : "text-brass-600"}`}>Remodeling · Design · Build</span>
      </span>
    </span>
  );
}
