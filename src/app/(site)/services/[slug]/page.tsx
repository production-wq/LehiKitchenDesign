import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, fitTitle } from "@/lib/seo";
import { breadcrumbs, faqPage, serviceNode, webPage, cityNode } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import { GuideCard, LocationChip, SectionHead, ServiceCard } from "@/components/Cards";
import { CheckIcon, ClockIcon, SparkleIcon } from "@/components/Icons";
import { SERVICES, getService } from "@/data/services";
import { GUIDES } from "@/data/guides";
import { CITIES, LOCATIONS, TIERS, locationsByTier } from "@/data/locations";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({
    title: fitTitle(`${s.name} in Lehi, UT`),
    description: s.meta,
    path: `/services/${s.slug}`,
    image: s.image,
    keywords: [`${s.keyword} Lehi UT`, `${s.keyword} near me`, `${s.keyword} Utah County`, `best ${s.keyword} Lehi`],
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const path = `/services/${s.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.name, path },
  ];
  const related = s.related.map((r) => getService(r)!).filter(Boolean);
  const guides = GUIDES.filter((g) => g.related.includes(s.slug)).slice(0, 3);
  const lehiHoods = LOCATIONS.filter((l) => l.parent === "lehi-ut");
  const faqs = [
    ...s.faqs,
    {
      q: `Do you offer ${s.keyword} near me in Lehi and Utah County?`,
      a: `Yes. We are based in Lehi and provide ${s.keyword} throughout Utah County and southern Salt Lake County, including American Fork, Highland, Alpine, Saratoga Springs, Eagle Mountain, Draper, Orem and Provo. Request a free in-home estimate using the form on this page or call ${SITE.phone}.`,
    },
  ];

  const graph = [
    webPage({ path, name: `${s.name} in Lehi, UT`, description: s.meta, image: s.image, about: { "@id": `${SITE.url}${path}#service` } }),
    breadcrumbs(crumbs),
    serviceNode({
      path,
      name: `${s.name} in Lehi, UT`,
      description: s.meta,
      serviceType: s.name,
      image: s.image,
      areaServed: CITIES.map(cityNode),
    }),
    faqPage(path, faqs),
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow={s.category}
        h1={`${s.name} in Lehi, UT`}
        sub={s.summary + " Serving Lehi and communities across Utah County."}
        image={s.image}
        imageAlt={`${s.name} in Lehi, Utah — finished kitchen concept`}
        crumbs={crumbs}
        bullets={["Free in-home estimate", "Licensed & insured Utah contractor", `Typical cost: ${s.price}`, `Typical timeline: ${s.timeline}`]}
        form={<LeadForm source={`service-${s.slug}`} defaultService={s.name} compact heading={`Free ${s.name} Estimate`} subheading="Tell us about your kitchen — we reply the same business day." />}
      />

      <div className="container-x grid gap-12 pt-16 lg:grid-cols-[1fr_20rem]">
        <article className="prose-lk min-w-0">
          <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">{s.name} for Lehi-area homes</h2>
          <div className="mt-5 text-[1.05rem]">
            {s.intro.map((p) => <p key={p}>{p}</p>)}
            <p>
              Searching for <strong>{s.keyword} near me</strong>? We are a Lehi-based crew, so estimates, material pickups and punch-list visits are fast. See{" "}
              <Link href="/locations/lehi-ut">our Lehi page</Link>, the <Link href="/locations/utah-county-kitchen-remodeling">Utah County hub</Link> or browse every community we serve below.
            </p>
          </div>

          <h2 className="mt-12 font-display text-3xl font-semibold text-forest">What&apos;s included</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {s.includes.map((i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-[15px] leading-snug text-ink/85">
                <CheckIcon className="mt-0.5 shrink-0 text-brass-600" width={18} height={18} /> {i}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-3xl font-semibold text-forest">Options &amp; materials to consider</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {s.options.map((o) => (
              <div key={o.label} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                <dt className="font-display text-lg font-semibold text-forest">{o.label}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-stone">{o.detail}</dd>
              </div>
            ))}
          </dl>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-forest p-6 text-white shadow-card">
            <p className="eyebrow !text-brass flex items-center gap-2"><SparkleIcon width={14} height={14} /> Typical cost in Utah</p>
            <p className="mt-2 font-display text-2xl font-semibold leading-snug">{s.price}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{s.priceNote}</p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
            <p className="eyebrow flex items-center gap-2"><ClockIcon width={14} height={14} /> Typical timeline</p>
            <p className="mt-2 font-display text-xl font-semibold text-forest">{s.timeline}</p>
            <Link href="/guides/how-long-does-a-kitchen-remodel-take-utah" className="mt-3 inline-block text-sm font-bold text-brass-600 underline underline-offset-4">Full remodel timeline guide →</Link>
          </div>
          <Link href="/free-estimate" className="btn btn-primary w-full">Try our cost calculator</Link>
        </aside>
      </div>

      {/* locations */}
      <section className="mt-20 bg-white py-16">
        <div className="container-x">
          <SectionHead eyebrow={`${s.name} by location`} title={`Where we install ${s.keyword}`} sub={`Our crew provides ${s.keyword} across Lehi, Utah County and southern Salt Lake County. Choose your community to see local housing notes, permit tips and project ideas.`} />
          <div className="mt-8 space-y-7">
            <div>
              <h3 className="font-display text-xl font-semibold text-forest">Lehi neighborhoods</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <LocationChip l={LOCATIONS.find((l) => l.slug === "lehi-ut")!} label={`${s.name} Lehi`} />
                {lehiHoods.map((l) => <LocationChip key={l.slug} l={l} label={l.name.replace(/ \(.*\)/, "")} />)}
              </div>
            </div>
            {TIERS.slice(1, 4).map((t) => (
              <div key={t.tier}>
                <h3 className="font-display text-xl font-semibold text-forest">{t.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {locationsByTier(t.tier).filter((l) => l.type === "city").map((l) => <LocationChip key={l.slug} l={l} label={`${l.name}, UT`} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-x space-y-16 pt-16">
        <FAQ faqs={faqs} heading={`${s.name} — frequently asked questions`} />

        <section>
          <SectionHead eyebrow="Related services" title="Often planned together" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => <ServiceCard key={r.slug} s={r} />)}
          </div>
        </section>

        {guides.length > 0 && (
          <section>
            <SectionHead eyebrow="Planning guides" title="Costs & timelines for Utah homeowners" />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {guides.map((g) => <GuideCard key={g.slug} g={g} />)}
            </div>
          </section>
        )}

        <div className="relative hidden aspect-[21/8] overflow-hidden rounded-3xl lg:block">
          <Image src="/images/process-build.jpg" alt="Kitchen remodel in progress with new cabinets installed" fill sizes="76rem" className="object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-forest/55" />
          <p className="absolute inset-0 flex items-center justify-center px-10 text-center font-display text-3xl font-semibold text-white">Design, permits and construction — managed by one Lehi team.</p>
        </div>
      </div>
    </>
  );
}
