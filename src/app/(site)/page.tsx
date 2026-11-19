import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, itemList, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import CostEstimator from "@/components/CostEstimator";
import FAQ from "@/components/FAQ";
import { GuideCard, LocationChip, SectionHead, ServiceCard } from "@/components/Cards";
import { ClipboardIcon, HammerIcon, RulerIcon, ShieldIcon, SparkleIcon, ClockIcon, CheckIcon } from "@/components/Icons";
import { NAV_FEATURED_SERVICES, HOME_FAQS } from "@/lib/content";
import { SERVICES, getService } from "@/data/services";
import { GUIDES } from "@/data/guides";
import { LOCATIONS, TIERS, locationsByTier } from "@/data/locations";

export const metadata: Metadata = buildMetadata({
  title: "Kitchen Remodeling Lehi, UT | Lehi Kitchen Design",
  description:
    "Licensed Lehi kitchen remodelers: design-build remodels, custom cabinets, quartz counters and open-concept layouts across Utah County. Fixed-price proposals. Free estimate.",
  path: "/",
  image: "/images/og-default.jpg",
  keywords: ["kitchen remodeling Lehi UT", "kitchen remodelers Lehi", "kitchen renovation Lehi", "kitchen contractors near me", "licensed kitchen remodelers Utah"],
});

const PROCESS = [
  { icon: ClipboardIcon, t: "Free in-home consultation", d: "We visit, measure, listen to how you cook and live, and talk budget honestly before any design work begins." },
  { icon: RulerIcon, t: "Design & fixed-price proposal", d: "Layout options, 3D views and material selections — priced line by line so there are no surprise change orders." },
  { icon: HammerIcon, t: "Build with one project manager", d: "Permits, trades, deliveries and inspections coordinated by one team, with weekly updates and a clean job site." },
  { icon: SparkleIcon, t: "Walkthrough & warranty", d: "We finish with a detailed punch-list walkthrough, care guide for your new surfaces and written workmanship warranty." },
];

const WHY = [
  { t: "One accountable team", d: "Design, permits, demolition, cabinets, stone, tile, electrical and finish carpentry managed under a single contract." },
  { t: "Fixed-price proposals", d: "Itemized scopes with allowances spelled out, so the number we quote is the number you plan around." },
  { t: "Built for Utah homes", d: "From 1900s brick homes in Historic Lehi to new builds in Holbrook Farms — we know the structure, codes and HOAs." },
  { t: "Permit-ready, licensed & insured", d: "We handle permit submittals and inspections with Lehi City and every city we serve." },
  { t: "Clean, protected job sites", d: "Dust containment, floor protection and daily cleanup, because you are living in the house." },
  { t: "Clear communication", d: "A dedicated project manager and a weekly written update — you always know what happens next." },
];

export default function HomePage() {
  const featured = NAV_FEATURED_SERVICES.map((s) => getService(s)!).filter(Boolean);
  const gallery = SERVICES.filter((s) =>
    ["waterfall-kitchen-island", "modern-farmhouse-kitchen-remodel", "luxury-kitchen-remodeling", "pantry-remodel", "contemporary-kitchen-renovation", "porcelain-slab-backsplash", "shaker-kitchen-cabinets", "open-concept-kitchen-remodel"].includes(s.slug),
  );
  const tier1 = locationsByTier(1);

  const graph = [
    webPage({
      path: "/",
      name: "Kitchen Remodeling in Lehi, UT | Lehi Kitchen Design",
      description: "Licensed Lehi kitchen remodelers offering design-build remodels, custom cabinets, countertops and layout changes across Utah County.",
      image: "/images/hero-home.jpg",
    }),
    breadcrumbs([{ name: "Home", path: "/" }]),
    faqPage("/", HOME_FAQS),
    itemList("/", "Kitchen remodeling services in Lehi, UT", SERVICES.map((s) => ({ name: s.name, path: `/services/${s.slug}` }))),
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="Lehi, Utah · Design-Build Kitchen Remodelers"
        h1="Kitchen Remodeling in Lehi, UT — Designed & Built by One Team"
        sub="From Traverse Mountain luxury remodels to Historic Lehi gut renovations, we design, permit and build kitchens that look great, work harder and finish on schedule. Free in-home estimates across Utah County."
        image="/images/hero-home.jpg"
        imageAlt="Luxury modern kitchen remodel with white shaker cabinets, quartz island and mountain view in Lehi, Utah"
        bullets={["Licensed & insured Utah contractor", "Fixed-price written proposals", "Design studio + build crew in one team", "Free in-home estimate, same-day reply"]}
        form={<LeadForm source="home-hero" compact heading="Get a Free Kitchen Estimate" subheading="No obligation. We respond the same business day." />}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/free-estimate" className="btn btn-primary">Try the Cost Estimator</Link>
          <Link href="/services" className="btn btn-ghost text-white">Explore Services</Link>
        </div>
      </PageHero>

      {/* trust strip */}
      <section aria-label="Why homeowners choose us" className="border-b border-line bg-white">
        <div className="container-x grid grid-cols-2 gap-4 py-6 text-center text-sm font-semibold text-forest sm:grid-cols-4">
          {[["Licensed & insured", ShieldIcon], ["Free in-home estimates", ClipboardIcon], ["Fixed-price proposals", CheckIcon], ["Permits & inspections handled", ClockIcon]].map(([t, Icon]) => {
            const I = Icon as typeof ShieldIcon;
            return <p key={t as string} className="flex items-center justify-center gap-2"><I className="text-brass-600" /> {t as string}</p>;
          })}
        </div>
      </section>

      {/* services */}
      <section className="container-x pt-20">
        <SectionHead eyebrow="Kitchen remodeling services" title="Everything your kitchen needs, from one Lehi team" sub="Full remodels, custom cabinetry, stone, layout changes and lighting — plan one project or the whole kitchen." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s, i) => <ServiceCard key={s.slug} s={s} priority={i < 2} />)}
        </div>
        <p className="mt-8 text-center"><Link href="/services" className="btn btn-dark">See all 29 kitchen services</Link></p>
      </section>

      {/* process */}
      <section className="mt-20 bg-sand/60 py-20">
        <div className="container-x">
          <SectionHead eyebrow="How it works" title="A calm, predictable remodeling process" sub="Most remodeling stress comes from not knowing what happens next. Ours is built around clear steps and clear numbers." center />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p.t} className="relative rounded-2xl bg-white p-6 shadow-card">
                <span className="absolute right-5 top-4 font-display text-5xl font-semibold text-brass/25">{i + 1}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-brass"><p.icon /></span>
                <h3 className="mt-4 font-display text-xl font-semibold text-forest">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-stone">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* why us + image */}
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
          <Image src="/images/about-team.jpg" alt="Kitchen design consultation with cabinet samples, tile swatches and a 3D layout in Lehi, Utah" fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
        </div>
        <div>
          <p className="eyebrow">Why Lehi homeowners choose us</p>
          <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-forest sm:text-4xl">A local kitchen remodeler that treats your home like its own</h2>
          <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {WHY.map((w) => (
              <div key={w.t}>
                <dt className="flex items-center gap-2 font-semibold text-forest"><CheckIcon className="text-brass-600" width={18} height={18} /> {w.t}</dt>
                <dd className="mt-1 pl-7 text-[14.5px] leading-relaxed text-stone">{w.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* estimator */}
      <section className="bg-forest-100 py-20" id="cost-calculator">
        <div className="container-x">
          <SectionHead eyebrow="Kitchen remodel cost calculator" title="What will your Lehi kitchen remodel cost?" sub="Adjust size, scope and finishes to see an instant planning range — then request a free fixed-price proposal." />
          <div className="mt-10"><CostEstimator /></div>
        </div>
      </section>

      {/* gallery */}
      <section className="container-x py-20">
        <SectionHead eyebrow="Design inspiration" title="Kitchen styles our clients ask for most" sub="Concept imagery illustrating the looks, layouts and materials we build — from modern farmhouse to contemporary luxury." />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {gallery.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className={`group relative overflow-hidden rounded-2xl ${i === 0 || i === 5 ? "lg:col-span-2 lg:row-span-2" : ""}`}>
              <div className={`relative ${i === 0 || i === 5 ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[22rem]" : "aspect-[4/3]"}`}>
                <Image src={s.image} alt={`${s.name} design inspiration — Lehi kitchen remodeling`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 pt-10 text-sm font-semibold text-white">{s.name}</span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-stone">Imagery is illustrative concept artwork, not photographs of completed projects.</p>
        <p className="mt-4 text-center"><Link href="/gallery" className="btn btn-dark">View the full gallery</Link></p>
      </section>

      {/* service area */}
      <section className="bg-white py-20">
        <div className="container-x">
          <SectionHead eyebrow="Service area" title="Kitchen remodeling across Lehi, Utah County & south Salt Lake County" sub="We work from our Lehi base within about 20–35 minutes in every direction, with dedicated pages for the neighborhoods and cities we know best." />
          <div className="mt-10 space-y-8">
            {TIERS.slice(0, 4).map((t) => (
              <div key={t.tier}>
                <h3 className="font-display text-xl font-semibold text-forest">{t.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {locationsByTier(t.tier).filter((l) => l.type !== "hub").map((l) => <LocationChip key={l.slug} l={l} />)}
                </div>
              </div>
            ))}
            <div>
              <h3 className="font-display text-xl font-semibold text-forest">Regional hubs</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {locationsByTier(5).map((l) => <LocationChip key={l.slug} l={l} />)}
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm text-stone">{LOCATIONS.length} dedicated service-area pages · {tier1.length - 1} Lehi neighborhoods.</p>
        </div>
      </section>

      {/* guides */}
      <section className="container-x py-20">
        <SectionHead eyebrow="Utah cost & planning guides" title="Real numbers for planning your remodel" sub="Straight-talking guides on cost, timelines, materials and financing for Utah homeowners." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {GUIDES.slice(0, 3).map((g) => <GuideCard key={g.slug} g={g} />)}
        </div>
        <p className="mt-8 text-center"><Link href="/guides" className="btn btn-dark">Browse all 9 guides</Link></p>
      </section>

      <section className="container-x pb-4"><FAQ faqs={HOME_FAQS} heading="Kitchen remodeling in Lehi — common questions" /></section>
    </>
  );
}
