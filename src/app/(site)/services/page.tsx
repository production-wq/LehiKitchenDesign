import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbs, itemList, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { SectionHead, ServiceCard } from "@/components/Cards";
import { SERVICES, servicesByCategory } from "@/data/services";

export const metadata: Metadata = buildMetadata({
  title: "Kitchen Remodeling Services in Lehi, UT | Lehi Kitchen Design",
  description:
    "29 kitchen remodeling services in Lehi, Utah: full remodels, custom cabinets, countertops, open-concept layouts, lighting and flooring. Free estimates.",
  path: "/services",
  image: "/images/kitchen-remodeling.jpg",
  keywords: ["kitchen remodeling services Lehi", "kitchen remodel contractors Utah", "kitchen renovation services"],
});

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

export default function ServicesPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }];
  const graph = [
    webPage({ path: "/services", name: "Kitchen remodeling services in Lehi, UT", description: "Every kitchen remodeling service we offer in Lehi and Utah County.", type: "CollectionPage", image: "/images/kitchen-remodeling.jpg" }),
    breadcrumbs(crumbs),
    itemList("/services", "Kitchen remodeling services", SERVICES.map((s) => ({ name: s.name, path: `/services/${s.slug}` }))),
  ];
  const groups = servicesByCategory();

  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="Kitchen remodeling services"
        h1="Kitchen Remodeling Services in Lehi, Utah"
        sub="Pick a single upgrade or plan a full design-build remodel. Every service is delivered by the same licensed Lehi team, with permits, scheduling and cleanup handled for you."
        image="/images/kitchen-remodeling.jpg"
        imageAlt="Completed kitchen remodel with white and navy cabinets and quartz counters in Lehi, Utah"
        crumbs={crumbs}
        form={<LeadForm source="services-hero" compact />}
      />

      <div className="container-x pt-14">
        <nav aria-label="Service categories" className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <a key={g.name} href={`#${slugify(g.name)}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-forest shadow-sm hover:border-brass hover:text-brass-600">{g.name}</a>
          ))}
        </nav>

        {groups.map((g) => (
          <section key={g.name} id={slugify(g.name)} className="pt-16">
            <SectionHead eyebrow={`${g.services.length} services`} title={g.name} sub={g.blurb} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.services.map((s) => <ServiceCard key={s.slug} s={s} />)}
            </div>
          </section>
        ))}

        <section className="mt-20 rounded-3xl bg-white p-8 shadow-card sm:p-12">
          <h2 className="font-display text-3xl font-semibold text-forest">Not sure which service you need?</h2>
          <p className="mt-3 max-w-2xl text-stone">Most projects combine several services. Tell us what bothers you about your kitchen and we will recommend the most cost-effective path — whether that is <Link href="/services/cabinet-refacing" className="font-semibold text-forest underline decoration-brass underline-offset-4">cabinet refacing</Link>, a <Link href="/services/kitchen-remodeling" className="font-semibold text-forest underline decoration-brass underline-offset-4">full remodel</Link> or an <Link href="/services/open-concept-kitchen-remodel" className="font-semibold text-forest underline decoration-brass underline-offset-4">open-concept redesign</Link>.</p>
        </section>
      </div>
    </>
  );
}
