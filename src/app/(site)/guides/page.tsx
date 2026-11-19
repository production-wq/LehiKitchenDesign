import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbs, itemList, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { GuideCard } from "@/components/Cards";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = buildMetadata({
  title: "Kitchen Remodel Cost & Planning Guides | Lehi Kitchen Design",
  description: "Utah kitchen remodel cost guides: pricing by tier, per-square-foot costs, timelines, ROI, financing and how to choose a contractor.",
  path: "/guides",
  image: "/images/guide-cost.jpg",
  keywords: ["kitchen remodel cost Utah", "kitchen remodel guide", "kitchen remodel financing Utah"],
});

export default function GuidesPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }];
  const graph = [
    webPage({ path: "/guides", name: "Kitchen remodel cost & planning guides", description: "Utah kitchen remodel guides.", type: "CollectionPage", image: "/images/guide-cost.jpg" }),
    breadcrumbs(crumbs),
    itemList("/guides", "Kitchen remodeling guides", GUIDES.map((g) => ({ name: g.title, path: `/guides/${g.slug}` }))),
  ];
  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="Cost & planning guides"
        h1="Kitchen Remodel Cost & Planning Guides for Utah Homeowners"
        sub="Honest pricing ranges, timelines and comparisons so you can plan a Lehi-area kitchen remodel with confidence."
        image="/images/guide-cost.jpg"
        imageAlt="Kitchen floor plans, calculator and material samples on a countertop"
        crumbs={crumbs}
        form={<LeadForm source="guides-hero" compact />}
      />
      <div className="container-x pt-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => <GuideCard key={g.slug} g={g} />)}
        </div>
      </div>
    </>
  );
}
