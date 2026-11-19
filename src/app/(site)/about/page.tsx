import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbs, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { SectionHead } from "@/components/Cards";
import { CheckIcon } from "@/components/Icons";

export const metadata: Metadata = buildMetadata({
  title: "About Lehi Kitchen Design | Kitchen Remodelers",
  description: "Meet Lehi Kitchen Design: a Lehi, Utah design-build kitchen remodeling team focused on clear pricing, clean job sites and kitchens built for real life.",
  path: "/about",
  image: "/images/about-team.jpg",
});

const VALUES = [
  ["Honest numbers", "Itemized, fixed-price proposals with allowances spelled out. If something changes, you approve it in writing first."],
  ["Design that fits your life", "We start with how you cook, entertain and store things — then draw the kitchen around it."],
  ["Respect for your home", "Floor protection, dust control and daily cleanup, because you are living there while we work."],
  ["Local accountability", "We live and work in the same communities we serve. Our reputation in Utah County matters to us."],
];

export default function AboutPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];
  const graph = [
    webPage({ path: "/about", name: "About Lehi Kitchen Design", description: "Design-build kitchen remodelers in Lehi, Utah.", type: "AboutPage", image: "/images/about-team.jpg" }),
    breadcrumbs(crumbs),
  ];
  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="About us"
        h1="Lehi's Design-Build Kitchen Remodeling Team"
        sub="We are a Lehi-based remodeling company that designs, permits and builds kitchens for homeowners across Utah County and southern Salt Lake County."
        image="/images/about-team.jpg"
        imageAlt="Kitchen design consultation with cabinet samples and a 3D layout"
        crumbs={crumbs}
        form={<LeadForm source="about-hero" compact />}
      />
      <div className="container-x grid gap-12 pt-16 lg:grid-cols-2">
        <div className="prose-lk text-[1.05rem]">
          <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">Why we focus on kitchens</h2>
          <p className="mt-4">The kitchen is the hardest room in the house to remodel well. It combines structure, plumbing, electrical, ventilation, cabinetry, stone and finishes in a space you use every day. Specializing lets us build better systems, relationships with the right suppliers and a process that keeps projects predictable.</p>
          <p>Lehi is a fascinating place to remodel: historic brick homes near Main Street, 1990s and early-2000s family neighborhoods, Traverse Mountain&apos;s hillside homes and brand-new subdivisions all within a few miles. Each needs a different approach, and that variety is why we publish <Link href="/locations">dedicated pages for every community we serve</Link>.</p>
          <p>We are a licensed and insured Utah contractor. We handle <Link href="/guides/lehi-kitchen-remodel-cost">pricing</Link>, permits, scheduling and inspections so you only need to make selections and enjoy the result.</p>
        </div>
        <ul className="space-y-4">
          {VALUES.map(([t, d]) => (
            <li key={t} className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
              <CheckIcon className="mt-1 shrink-0 text-brass-600" />
              <div><h3 className="font-display text-xl font-semibold text-forest">{t}</h3><p className="mt-1 text-[15px] leading-relaxed text-stone">{d}</p></div>
            </li>
          ))}
        </ul>
      </div>

      <section className="container-x pt-20">
        <SectionHead eyebrow="Our process" title="From first call to final walkthrough" center />
        <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-3xl shadow-lift">
          <Image src="/images/process-build.jpg" alt="Clean, organized kitchen remodel job site with new cabinets installed" fill sizes="76rem" className="object-cover" />
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-stone">Free consultation → measured design and 3D layouts → fixed-price proposal → permitted construction with one project manager → punch-list walkthrough and warranty.</p>
      </section>
    </>
  );
}
