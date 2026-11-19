import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { breadcrumbs, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Contact Lehi Kitchen Design | Free Kitchen Estimate",
  description: "Contact Lehi Kitchen Design for a free in-home kitchen remodeling estimate in Lehi, American Fork, Draper, Orem and across Utah County.",
  path: "/contact",
  image: "/images/cta-banner.jpg",
});

export default function ContactPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];
  return (
    <>
      <JsonLd graph={[webPage({ path: "/contact", name: "Contact Lehi Kitchen Design", description: "Contact us for a free kitchen remodeling estimate.", type: "ContactPage" }), breadcrumbs(crumbs)]} />
      <section className="container-x grid gap-12 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-6">Contact</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-forest sm:text-5xl">Contact Your Lehi Kitchen Remodelers</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone">Tell us about your kitchen and we will schedule a free in-home visit. Most requests get a reply the same business day.</p>
          <ul className="mt-8 space-y-5">
            <li className="flex gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-brass"><PhoneIcon /></span><div><p className="font-semibold text-forest">Call or text</p><a href={`tel:${SITE.phoneHref}`} className="text-lg font-bold text-ink hover:text-brass-600">{SITE.phone}</a></div></li>
            <li className="flex gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-brass"><PinIcon /></span><div><p className="font-semibold text-forest">Based in Lehi, UT 84043</p><p className="text-stone">Serving Utah County &amp; south Salt Lake County · <Link href="/locations" className="underline decoration-brass underline-offset-4">all service areas</Link></p></div></li>
            <li className="flex gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-brass"><ClockIcon /></span><div><p className="font-semibold text-forest">Hours</p><p className="text-stone">{SITE.hours}</p></div></li>
          </ul>
          <p className="mt-8 text-stone">Email: <a href={`mailto:${SITE.email}`} className="font-semibold text-forest underline decoration-brass underline-offset-4">{SITE.email}</a></p>
        </div>
        <LeadForm id="estimate" source="contact-page" heading="Request a Free Estimate" />
      </section>
    </>
  );
}
