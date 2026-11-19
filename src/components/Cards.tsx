import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";
import type { Guide } from "@/data/guides";
import type { Location } from "@/data/locations";
import { ArrowIcon, PinIcon } from "./Icons";

export function ServiceCard({ s, priority = false }: { s: Service; priority?: boolean }) {
  return (
    <Link href={`/services/${s.slug}`} className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className="relative aspect-[3/2] overflow-hidden bg-sand">
        <Image
          src={s.image}
          alt={`${s.name} in Lehi, Utah — completed kitchen concept`}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 45vw, 92vw"
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{s.category}</p>
        <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug text-forest">{s.name}</h3>
        <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-stone">{s.summary}</p>
        <p className="mt-4 flex items-center justify-between text-sm font-bold text-forest">
          <span className="font-semibold text-stone">{s.price.startsWith("$") ? `From ${s.price.split(" – ")[0]}` : "Fixed-price proposals"}</span>
          <span className="flex items-center gap-1 text-brass-600 transition group-hover:translate-x-1">Details <ArrowIcon width={16} height={16} /></span>
        </p>
      </div>
    </Link>
  );
}

export function GuideCard({ g }: { g: Guide }) {
  return (
    <Link href={`/guides/${g.slug}`} className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
        <Image src={g.image} alt={g.title} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw" className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{g.readTime}</p>
        <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug text-forest">{g.title}</h3>
        <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-stone">{g.summary}</p>
        <span className="mt-4 flex items-center gap-1 text-sm font-bold text-brass-600">Read guide <ArrowIcon width={16} height={16} /></span>
      </div>
    </Link>
  );
}

export function LocationCard({ l }: { l: Location }) {
  return (
    <Link href={l.path} className="card-hover group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-center gap-2 text-brass-600"><PinIcon width={16} height={16} /> <span className="text-xs font-bold uppercase tracking-wider">{l.drive}</span></div>
      <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-forest">{l.name}</h3>
      <p className="mt-1 text-sm text-stone">{l.era.charAt(0).toUpperCase() + l.era.slice(1)}</p>
      <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-bold text-brass-600 transition group-hover:translate-x-1">Kitchen remodeling <ArrowIcon width={16} height={16} /></span>
    </Link>
  );
}

export function LocationChip({ l, label }: { l: Location; label?: string }) {
  return (
    <Link href={l.path} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-semibold text-forest shadow-sm transition hover:border-brass hover:text-brass-600">
      <PinIcon width={14} height={14} className="text-brass-600" /> {label ?? l.name}
    </Link>
  );
}

export function SectionHead({ eyebrow, title, sub, center = false }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-forest sm:text-4xl lg:text-[2.7rem]">{title}</h2>
      {sub && <p className="mt-4 text-lg leading-relaxed text-stone">{sub}</p>}
    </div>
  );
}
