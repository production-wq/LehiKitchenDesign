import Link from "next/link";

export default function Breadcrumbs({ items, light = false }: { items: { name: string; path: string }[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[13px] ${light ? "text-white/75" : "text-stone"}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="opacity-50">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className={light ? "font-semibold text-white" : "font-semibold text-ink"}>{it.name}</span>
            ) : (
              <Link href={it.path} className="hover:underline">{it.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
