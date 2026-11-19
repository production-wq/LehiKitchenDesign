import Link from "next/link";
import Image from "next/image";
import { buildMetadata, fitTitle } from "@/lib/seo";
import { breadcrumbs, faqPage, locationAreaServed, serviceNode, webPage } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { costRows, locationFaqs, locationH1, locationMeta, locationTitle } from "@/lib/content";
import { LOCATIONS, childrenOf, getLocationBySlug, getParent, type Location } from "@/data/locations";
import { SERVICES, getService } from "@/data/services";
import type { Archetype } from "@/data/location-types";
import { JsonLd } from "./JsonLd";
import PageHero from "./PageHero";
import LeadForm from "./LeadForm";
import FAQ from "./FAQ";
import { LocationCard, LocationChip, SectionHead, ServiceCard } from "./Cards";
import { CheckIcon, PinIcon } from "./Icons";

export function locationMetadata(l: Location) {
  return buildMetadata({
    title: fitTitle(locationTitle(l)),
    description: locationMeta(l),
    path: l.path,
    image: l.image,
    keywords: [
      `kitchen remodeling ${l.name}`,
      `kitchen remodel ${l.name} UT`,
      `kitchen renovation ${l.name}`,
      `kitchen remodelers ${l.name}`,
      `kitchen contractors near ${l.name}`,
    ],
  });
}

const APPROACH: Record<Archetype, { title: string; points: string[] }> = {
  "new-build": {
    title: "How we approach newer homes",
    points: [
      "Prioritize visible upgrades — taller cabinets, a statement island, layered lighting — because the structure and layout are usually already sound.",
      "Document every change so builder warranties stay intact.",
      "Phase the work so you can upgrade cabinets and counters now and finish lighting or flooring later.",
    ],
  },
  "luxury-view": {
    title: "How we approach view and luxury homes",
    points: [
      "Design around sightlines, daylight and the way the kitchen connects to outdoor living.",
      "Plan electrical, venting and make-up air for professional-grade appliances before cabinets are drawn.",
      "Run a longer selections phase so slabs, metals and millwork are chosen in person.",
    ],
  },
  historic: {
    title: "How we approach older and historic homes",
    points: [
      "Start with a discovery phase: test for lead and asbestos, trace wiring and plumbing and confirm which walls are load-bearing.",
      "Budget for panel, wiring and plumbing upgrades so the new kitchen is safe and code-compliant.",
      "Blend modern function with the home's character instead of erasing it.",
    ],
  },
  "ranch-update": {
    title: "How we approach established family homes",
    points: [
      "Remove soffits and open sightlines where the structure allows, with engineered beams where needed.",
      "Replace aging cabinets, counters and flooring with durable, easy-care materials.",
      "Upgrade lighting and electrical so the kitchen works for modern appliances.",
    ],
  },
  townhome: {
    title: "How we approach compact kitchens",
    points: [
      "Make every inch work: cabinets to the ceiling, deep drawers, slim pull-outs and smart corners.",
      "Use light surfaces and layered lighting so the room feels larger.",
      "Coordinate work hours, elevators and parking with your HOA or association.",
    ],
  },
  farmhouse: {
    title: "How we approach rural and farmhouse-style homes",
    points: [
      "Take advantage of larger lots with bump-outs, big pantries and generous islands.",
      "Choose durable finishes that handle dust, kids and daily family life.",
      "Plan plumbing around private well and septic systems where they apply.",
    ],
  },
  regional: {
    title: "How we approach every home in the region",
    points: [
      "Match the scope to the home's age — structural and utility work for older homes, finish upgrades for newer ones.",
      "Handle permits and inspections with whichever city office has jurisdiction.",
      "Keep one project manager, one schedule and one price from first visit to final walkthrough.",
    ],
  },
  valley: {
    title: "How we approach homes across the valley",
    points: [
      "Plan around each city's permit process and HOA rules before ordering materials.",
      "Pair finish upgrades in newer homes with structural and utility updates in older ones.",
      "Keep schedules tight — our Lehi crews reach most of the south valley in 15–35 minutes.",
    ],
  },
};

export default function LocationView({ l }: { l: Location }) {
  const parent = getParent(l);
  const kids = childrenOf(l.slug);
  const siblings = parent ? LOCATIONS.filter((x) => x.parent === parent.slug && x.slug !== l.slug) : [];
  const covers = (l.covers ?? []).map((s) => getLocationBySlug(s)!).filter(Boolean);
  const nearby = l.nearby.map((s) => getLocationBySlug(s)!).filter(Boolean);
  const projects = l.projects.map((s) => getService(s)!).filter(Boolean);
  const faqs = locationFaqs(l);
  const rows = costRows(l.archetype);
  const approach = APPROACH[l.archetype];
  const h1 = locationH1(l);
  const place = l.type === "neighborhood" ? `${l.name} in ${parent?.name ?? "Lehi"}` : l.name;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/locations" },
    ...(parent ? [{ name: parent.name, path: parent.path }] : []),
    { name: l.name, path: l.path },
  ];

  const graph = [
    webPage({ path: l.path, name: locationTitle(l), description: locationMeta(l), image: l.image, about: { "@id": `${SITE.url}${l.path}#service` } }),
    breadcrumbs(crumbs),
    serviceNode({
      path: l.path,
      name: `Kitchen remodeling in ${place}, UT`,
      description: l.hook,
      serviceType: "Kitchen remodeling",
      image: l.image,
      areaServed: locationAreaServed(l, parent),
    }),
    faqPage(l.path, faqs),
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow={`${l.county} · ${l.drive}`}
        h1={h1}
        sub={l.hook}
        image={l.image}
        imageAlt={`Kitchen remodeling in ${place}, Utah — ${l.era}`}
        crumbs={crumbs}
        bullets={[`Serving ZIP ${l.zips.join(", ")}`, "Free in-home estimate", "Licensed & insured Utah contractor", "Permits & HOA submittals handled"]}
        form={<LeadForm source={`location-${l.slug}`} location={place} compact heading={`Free Kitchen Estimate in ${l.name}`} subheading="Tell us about your kitchen — we reply the same business day." />}
      />

      <div className="container-x grid gap-12 pt-16 lg:grid-cols-[1fr_20rem]">
        <article className="prose-lk min-w-0 text-[1.05rem]">
          <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">Kitchen remodelers for {place} homes</h2>
          <p className="mt-5">{l.housing}</p>
          <p>
            {l.type === "hub" || l.type === "zip"
              ? `Whether you live in a historic neighborhood or a new subdivision, our Lehi design-build team handles ${place.toLowerCase()} projects start to finish: design, permits, construction and cleanup. Explore the community pages below for local details, or `
              : `Homes in ${l.name} are typically ${l.era}. That shapes everything from how we protect floors to whether walls can come down, so we tailor each plan to your house rather than reuse a template. See our `}
            <Link href="/services/kitchen-remodeling">kitchen remodeling services</Link>
            {l.type === "hub" || l.type === "zip" ? " for scope and pricing." : ` or request a free estimate for your ${l.name} kitchen.`}
          </p>

          <h2 className="mt-12 font-display text-3xl font-semibold text-forest">{approach.title}</h2>
          <ul className="mt-5 space-y-3">
            {approach.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-ink/85"><CheckIcon className="mt-1 shrink-0 text-brass-600" width={18} height={18} /> {p}</li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-3xl font-semibold text-forest">Local notes for {l.name} homeowners</h2>
          <ul className="mt-5 space-y-3">
            {l.notes.map((n) => (
              <li key={n} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-[15px] leading-relaxed text-ink/85"><PinIcon className="mt-0.5 shrink-0 text-brass-600" width={18} height={18} /> {n}</li>
            ))}
          </ul>
          {l.landmarks.length > 0 && (
            <p className="mt-6 text-[15px] text-stone">
              <strong className="text-ink">Area reference points:</strong> {l.landmarks.join(" · ")}.
            </p>
          )}
        </article>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-forest p-6 text-white shadow-card">
            <p className="eyebrow !text-brass">Serving {l.name}</p>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li><strong className="text-white">ZIP codes:</strong> {l.zips.join(", ")}</li>
              <li><strong className="text-white">Region:</strong> {l.county}</li>
              <li><strong className="text-white">From our shop:</strong> {l.drive}</li>
            </ul>
            <a href={`tel:${SITE.phoneHref}`} className="btn btn-primary mt-5 w-full">Call {SITE.phone}</a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
            <Image src="/images/process-build.jpg" alt="Kitchen remodel in progress with cabinets being installed" fill sizes="20rem" className="object-cover" loading="lazy" />
          </div>
        </aside>
      </div>

      {/* projects */}
      <section className="container-x pt-16">
        <SectionHead eyebrow={`Popular in ${l.name}`} title={`Kitchen projects we do most in ${l.name}`} sub="Based on the age and style of homes here, these are the services homeowners ask for first." />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </section>

      {/* cost */}
      <section className="container-x pt-16">
        <SectionHead eyebrow="Pricing snapshot" title={`What a kitchen remodel costs in ${l.name}`} sub="Planning ranges for 2026. Your fixed price comes from a free in-home estimate." />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
          <table className="w-full min-w-[34rem] text-left text-[15px]">
            <caption className="sr-only">Typical kitchen remodel costs in {l.name}, UT</caption>
            <thead className="bg-forest text-white">
              <tr><th scope="col" className="px-5 py-3.5 font-semibold">Scope</th><th scope="col" className="px-5 py-3.5 font-semibold">Typical cost</th><th scope="col" className="px-5 py-3.5 font-semibold">Common for</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.scope}><th scope="row" className="px-5 py-3.5 font-semibold text-forest">{r.scope}</th><td className="px-5 py-3.5 font-semibold">{r.price}</td><td className="px-5 py-3.5 text-stone">{r.fit}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-stone">See the full breakdown in our <Link href="/guides/lehi-kitchen-remodel-cost" className="font-semibold text-forest underline decoration-brass underline-offset-4">Lehi kitchen remodel cost guide</Link>.</p>
      </section>

      {/* community lists */}
      {(covers.length > 0 || kids.length > 0 || siblings.length > 0 || parent) && (
        <section className="mt-16 bg-white py-16">
          <div className="container-x">
            {covers.length > 0 && (
              <>
                <SectionHead eyebrow="Communities covered" title={`Where we work in ${l.name}`} />
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{covers.map((c) => <LocationCard key={c.slug} l={c} />)}</div>
              </>
            )}
            {kids.length > 0 && (
              <>
                <SectionHead eyebrow="Neighborhoods" title={`${l.name} neighborhoods we remodel in`} />
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{kids.map((c) => <LocationCard key={c.slug} l={c} />)}</div>
              </>
            )}
            {parent && (
              <div>
                <SectionHead eyebrow="Part of" title={`More kitchen remodeling in ${parent.name}`} />
                <div className="mt-6 flex flex-wrap gap-2">
                  <LocationChip l={parent} label={`${parent.name}, UT — city overview`} />
                  {siblings.map((s) => <LocationChip key={s.slug} l={s} />)}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* all services */}
      <section className="container-x pt-16">
        <SectionHead eyebrow="Every service" title={`All kitchen services available in ${l.name}`} />
        <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="text-[15px] font-semibold text-forest underline decoration-brass/60 underline-offset-4 hover:text-brass-600">
                {s.name} in {l.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="container-x space-y-16 pt-16">
        <FAQ faqs={faqs} heading={`Kitchen remodeling in ${l.name} — FAQs`} />
        {nearby.length > 0 && (
          <section>
            <SectionHead eyebrow="Nearby" title="Also serving nearby communities" />
            <div className="mt-6 flex flex-wrap gap-2">{nearby.map((n) => <LocationChip key={n.slug} l={n} />)}</div>
          </section>
        )}
      </div>
    </>
  );
}
