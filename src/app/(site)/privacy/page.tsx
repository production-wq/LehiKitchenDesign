import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { breadcrumbs, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Lehi Kitchen Design",
  description: "How Lehi Kitchen Design collects, uses and protects information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }];
  return (
    <>
      <JsonLd graph={[webPage({ path: "/privacy", name: "Privacy Policy", description: "Privacy policy" }), breadcrumbs(crumbs)]} />
      <div className="container-x max-w-3xl py-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 font-display text-4xl font-semibold text-forest">Privacy Policy</h1>
        <div className="prose-lk mt-6">
          <p>Last updated: November 2026. This policy explains how {SITE.legalName} (&quot;we&quot;) handles information you share on this website.</p>
          <h2 className="mt-8 font-display text-2xl font-semibold text-forest">Information we collect</h2>
          <p>When you submit a form we collect your name, phone number, email address, ZIP code, project details and the page you submitted from. We also receive basic technical data such as browser type and referring page.</p>
          <h2 className="mt-8 font-display text-2xl font-semibold text-forest">How we use it</h2>
          <p>We use your information to respond to your request, schedule estimates, prepare proposals and follow up about your project. If you consented, we may contact you by phone, text or email. Message and data rates may apply; you can opt out at any time by replying STOP or telling us directly.</p>
          <h2 className="mt-8 font-display text-2xl font-semibold text-forest">Sharing</h2>
          <p>We do not sell your personal information. We share it only with service providers that help us run our business (for example scheduling or CRM software) and when required by law.</p>
          <h2 className="mt-8 font-display text-2xl font-semibold text-forest">Your choices</h2>
          <p>You may ask us to access, correct or delete your information by emailing <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          <h2 className="mt-8 font-display text-2xl font-semibold text-forest">Contact</h2>
          <p>{SITE.legalName}, Lehi, UT 84043 · {SITE.phone} · {SITE.email}</p>
        </div>
      </div>
    </>
  );
}
