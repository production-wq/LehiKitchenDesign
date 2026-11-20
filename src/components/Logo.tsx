export function LogoMark({ light = false, size = 40 }: { light?: boolean; size?: number }) {
  const bg = light ? "#fbf8f3" : "#1d2b3a";
  const fg = light ? "#1d2b3a" : "#fbf8f3";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
      <rect width="64" height="64" rx="16" fill={bg} />
      <rect x="5" y="5" width="54" height="54" rx="12" fill="none" stroke="#c49a5a" strokeOpacity="0.45" strokeWidth="1.2" />
      <path d="M19 47V30a13 13 0 0 1 26 0v17" fill="none" stroke="#c49a5a" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M32 30v15" stroke={fg} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="28.5" cy="38" r="1.6" fill={fg} />
      <circle cx="35.5" cy="38" r="1.6" fill={fg} />
      <path d="M14 47h36" stroke="#c49a5a" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark light={light} />
      <span className="flex flex-col leading-none">
        <span className={`flex items-center gap-2 font-sans text-[10.5px] font-bold uppercase tracking-[0.34em] ${light ? "text-brass" : "text-brass-600"}`}>
          Lehi
          <span aria-hidden="true" className={`h-px w-8 ${light ? "bg-brass/60" : "bg-brass/70"}`} />
        </span>
        <span className={`mt-1 font-display text-[1.32rem] font-semibold tracking-[-0.005em] ${light ? "text-white" : "text-forest"}`}>
          Kitchen Design
        </span>
      </span>
    </span>
  );
}
