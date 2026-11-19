import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbs, itemList, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { LocationCard, SectionHead } from "@/components/Cards";
import { LOCATIONS, TIERS, locationsByTier } from "@/data/locations";

export const metadata: Metadata = buildMetadata({
  title: "Kitchen Remodeling Service Areas | Lehi Kitchen Design",
  description: `Kitchen remodeling in ${LOCATIONS.length} Utah communities: Lehi neighborhoods, American Fork, Highland, Alpine, Draper, Orem, Provo and more. Free estimate.`,
  path: "/locations",
  image: "/images/loc-regional.jpg",
  keywords: ["kitchen remodeling near me", "kitchen remodel Utah County", "kitchen contractors Salt Lake County"],
});

export default function LocationsPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Service Areas", path: "/locations" }];
  const graph = [
    webPage({ path: "/locations", name: "Kitchen remodeling service areas", description: "Every Utah community we serve.", type: "CollectionPage", image: "/images/loc-regional.jpg" }),
    breadcrumbs(crumbs),
    itemList("/locations", "Kitchen remodeling service areas", LOCATIONS.map((l) => ({ name: l.name, path: l.path }))),
  ];
  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow={`${LOCATIONS.length} service-area pages`}
        h1="Kitchen Remodeling Across Lehi, Utah County & South Salt Lake County"
        sub="Our Lehi crew drives 20–35 minutes in every direction. Choose your neighborhood or city for local housing notes, permit tips and project ideas."
        image="/images/loc-regional.jpg"
        imageAlt="Utah suburban home with the Wasatch Mountains behind it at golden hour"
        crumbs={crumbs}
        form={<LeadForm source="locations-hero" compact />}
      />
      <div className="container-x space-y-20 pt-16">
        {TIERS.map((t) => (
          <section key={t.tier}>
            <SectionHead eyebrow={`${locationsByTier(t.tier).length} pages`} title={t.title} sub={t.blurb} />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {locationsByTier(t.tier).map((l) => <LocationCard key={l.slug} l={l} />)}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
