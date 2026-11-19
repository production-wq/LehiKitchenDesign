import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbs, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CostEstimator from "@/components/CostEstimator";

export const metadata: Metadata = buildMetadata({
  title: "Kitchen Remodel Cost Calculator & Free Estimate | Lehi UT",
  description: "Use our kitchen remodel cost calculator for Utah homes, then request a free in-home estimate and fixed-price proposal from Lehi Kitchen Design.",
  path: "/free-estimate",
  image: "/images/guide-cost.jpg",
  keywords: ["kitchen remodel cost calculator Utah", "free kitchen remodel estimate Lehi"],
});

export default function FreeEstimatePage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Free Estimate", path: "/free-estimate" }];
  return (
    <>
      <JsonLd graph={[webPage({ path: "/free-estimate", name: "Kitchen remodel cost calculator & free estimate", description: "Kitchen remodel cost calculator for Utah homes.", image: "/images/guide-cost.jpg" }), breadcrumbs(crumbs)]} />
      <section className="container-x py-12 lg:py-16" id="estimate">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-6">Free estimate</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-tight text-forest sm:text-5xl">Kitchen Remodel Cost Calculator &amp; Free Estimate</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone">Build your kitchen below to see a planning range for Lehi and Utah County homes, then email the breakdown to yourself and request a free in-home quote.</p>
        <div className="mt-10"><CostEstimator /></div>
      </section>
    </>
  );
}
