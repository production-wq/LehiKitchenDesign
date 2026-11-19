"use client";

import { useMemo, useState } from "react";
import LeadFormClient, { type ServiceOption } from "./LeadFormClient";

const SCOPES = [
  { id: "refresh", label: "Refresh", note: "Keep layout. New surfaces, lighting, hardware.", lo: 110, hi: 190 },
  { id: "mid", label: "Mid-range remodel", note: "New cabinets, quartz, flooring, lighting.", lo: 190, hi: 310 },
  { id: "full", label: "Full gut remodel", note: "Layout changes, custom details, new utilities.", lo: 300, hi: 470 },
  { id: "luxury", label: "Luxury custom", note: "Bespoke cabinetry, premium stone & appliances.", lo: 480, hi: 750 },
] as const;

const CABINETS = [
  { id: "reface", label: "Reface / paint existing", adj: -0.1 },
  { id: "semi", label: "Semi-custom new", adj: 0 },
  { id: "custom", label: "Fully custom", adj: 0.12 },
] as const;

const COUNTERS = [
  { id: "quartz", label: "Quartz", adj: 0 },
  { id: "granite", label: "Granite", adj: -0.03 },
  { id: "porcelain", label: "Porcelain slab", adj: 0.07 },
  { id: "marble", label: "Quartzite / marble", adj: 0.14 },
] as const;

const LAYOUTS = [
  { id: "none", label: "Keep layout", lo: 0, hi: 0 },
  { id: "minor", label: "Move sink or appliances", lo: 2500, hi: 8000 },
  { id: "wall", label: "Remove a wall (beam)", lo: 6000, hi: 16000 },
  { id: "bump", label: "Bump-out / expansion", lo: 30000, hi: 80000 },
] as const;

const EXTRAS = [
  { id: "waterfall", label: "Waterfall island", lo: 3000, hi: 8000 },
  { id: "pantry", label: "Walk-in pantry build-out", lo: 4000, hi: 14000 },
  { id: "floor", label: "New flooring", lo: 4000, hi: 10000 },
  { id: "lighting", label: "Full lighting package", lo: 2000, hi: 6000 },
] as const;

const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const round = (n: number) => Math.round(n / 500) * 500;

export default function CostEstimatorClient({
  options,
  phone,
  phoneHref,
}: {
  options: ServiceOption[];
  phone: string;
  phoneHref: string;
}) {
  const [size, setSize] = useState(180);
  const [scope, setScope] = useState<(typeof SCOPES)[number]["id"]>("mid");
  const [cab, setCab] = useState<(typeof CABINETS)[number]["id"]>("semi");
  const [ctr, setCtr] = useState<(typeof COUNTERS)[number]["id"]>("quartz");
  const [layout, setLayout] = useState<(typeof LAYOUTS)[number]["id"]>("none");
  const [extras, setExtras] = useState<string[]>([]);

  const result = useMemo(() => {
    const s = SCOPES.find((x) => x.id === scope)!;
    const c = CABINETS.find((x) => x.id === cab)!;
    const t = COUNTERS.find((x) => x.id === ctr)!;
    const l = LAYOUTS.find((x) => x.id === layout)!;
    const mult = 1 + c.adj + t.adj;
    let lo = size * s.lo * mult + l.lo;
    let hi = size * s.hi * mult + l.hi;
    for (const e of EXTRAS.filter((x) => extras.includes(x.id))) {
      lo += e.lo;
      hi += e.hi;
    }
    return { lo: round(lo), hi: round(hi) };
  }, [size, scope, cab, ctr, layout, extras]);

  const summary = `Estimator: ${size} sq ft, ${SCOPES.find((x) => x.id === scope)!.label}, cabinets: ${CABINETS.find((x) => x.id === cab)!.label}, counters: ${COUNTERS.find((x) => x.id === ctr)!.label}, layout: ${LAYOUTS.find((x) => x.id === layout)!.label}, extras: ${extras.length ? extras.join(", ") : "none"}. Estimated range ${fmt(result.lo)} – ${fmt(result.hi)}.`;

  const chip = (active: boolean) =>
    `cursor-pointer rounded-xl border px-3.5 py-2.5 text-left text-sm font-semibold transition ${active ? "border-brass bg-brass-100 text-forest ring-1 ring-brass" : "border-line bg-white text-ink/80 hover:border-brass/60"}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-7 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
        <div>
          <label htmlFor="est-size" className="flex items-baseline justify-between font-semibold text-forest">
            Kitchen size <span className="font-display text-2xl">{size} sq ft</span>
          </label>
          <input id="est-size" type="range" min={80} max={450} step={10} value={size} onChange={(e) => setSize(+e.target.value)} className="mt-3 w-full accent-[#b98a3e]" />
          <div className="flex justify-between text-xs text-stone"><span>Small (80)</span><span>Average (180)</span><span>Large (450)</span></div>
        </div>

        <fieldset>
          <legend className="mb-2 font-semibold text-forest">Project scope</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {SCOPES.map((s) => (
              <button key={s.id} type="button" aria-pressed={scope === s.id} onClick={() => setScope(s.id)} className={chip(scope === s.id)}>
                <span className="block">{s.label}</span>
                <span className="mt-0.5 block text-xs font-normal text-stone">{s.note}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <fieldset>
            <legend className="mb-2 font-semibold text-forest">Cabinets</legend>
            <div className="grid gap-2">
              {CABINETS.map((o) => (
                <button key={o.id} type="button" aria-pressed={cab === o.id} onClick={() => setCab(o.id)} className={chip(cab === o.id)}>{o.label}</button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 font-semibold text-forest">Countertops</legend>
            <div className="grid gap-2">
              {COUNTERS.map((o) => (
                <button key={o.id} type="button" aria-pressed={ctr === o.id} onClick={() => setCtr(o.id)} className={chip(ctr === o.id)}>{o.label}</button>
              ))}
            </div>
          </fieldset>
        </div>

        <fieldset>
          <legend className="mb-2 font-semibold text-forest">Layout changes</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {LAYOUTS.map((o) => (
              <button key={o.id} type="button" aria-pressed={layout === o.id} onClick={() => setLayout(o.id)} className={chip(layout === o.id)}>{o.label}</button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-semibold text-forest">Add-ons</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {EXTRAS.map((o) => {
              const on = extras.includes(o.id);
              return (
                <button key={o.id} type="button" aria-pressed={on} onClick={() => setExtras(on ? extras.filter((x) => x !== o.id) : [...extras, o.id])} className={chip(on)}>
                  {on ? "✓ " : "+ "}{o.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl bg-forest p-6 text-white shadow-lift sm:p-8">
          <p className="eyebrow !text-brass">Your estimated range</p>
          <p className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-[2.6rem]" aria-live="polite">
            {fmt(result.lo)} – {fmt(result.hi)}
          </p>
          <p className="mt-2 text-sm text-white/70">
            Planning estimate for Utah County kitchens in 2026. Your fixed price comes after a free in-home visit.
          </p>
          <div className="mt-6 rounded-2xl bg-white p-5 text-ink">
            <LeadFormClient
              options={options}
              heading="Email me this estimate"
              subheading="We'll send a detailed breakdown and a free in-home quote."
              source="cost-estimator"
              phone={phone}
              phoneHref={phoneHref}
              variant="plain"
              compact
              extraMessage={summary}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
