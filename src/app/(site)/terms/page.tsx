import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { breadcrumbs, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use | Lehi Kitchen Design",
  description: "Terms of use for the Lehi Kitchen Design website, including estimates, cost information and image disclosures.",
  path: "/terms",
});

export default function TermsPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Terms of Use", path: "/terms" }];
  return (
    <>
      <JsonLd graph={[webPage({ path: "/terms", name: "Terms of Use", description: "Terms of use" }), breadcrumbs(crumbs)]} />
      <div className="container-x max-w-3xl py-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 font-display text-4xl font-semibold text-forest">Terms of Use</h1>
        <div className="prose-lk mt-6">
          <p>By using this website you agree to these terms. {SITE.legalName} may update them at any time.</p>
          <h2 className="mt-8 font-display text-2xl font-semibold text-forest">Estimates and cost information</h2>
          <p>Cost ranges, calculators and guides are planning tools based on typical Utah projects. They are not quotes or offers. A written proposal is required for any project.</p>
          <h2 className="mt-8 font-display text-2xl font-semibold text-forest">Images</h2>
          <p>Imagery on this website is illustrative concept artwork and is not a photograph of a specific completed project unless stated otherwise.</p>
          <h2 className="mt-8 font-display text-2xl font-semibold text-forest">Limitation of liability</h2>
          <p>The website is provided &quot;as is.&quot; To the extent permitted by law we are not liable for damages arising from its use.</p>
          <h2 className="mt-8 font-display text-2xl font-semibold text-forest">Contact</h2>
          <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a> · {SITE.phone}</p>
        </div>
      </div>
    </>
  );
}
