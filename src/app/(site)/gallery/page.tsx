import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbs, itemList, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { SectionHead } from "@/components/Cards";
import { SERVICES, servicesByCategory } from "@/data/services";

export const metadata: Metadata = buildMetadata({
  title: "Kitchen Remodel Gallery & Design Ideas | Lehi, UT",
  description: "Kitchen remodel design ideas for Lehi, Utah: waterfall islands, shaker cabinets, modern farmhouse, open-concept and luxury styles. Get a free estimate.",
  path: "/gallery",
  image: "/images/waterfall-kitchen-island.jpg",
  keywords: ["kitchen remodel ideas Utah", "kitchen design gallery Lehi"],
});

export default function GalleryPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }];
  const graph = [
    webPage({ path: "/gallery", name: "Kitchen remodel gallery", description: "Kitchen design inspiration for Utah homes.", type: "CollectionPage", image: "/images/waterfall-kitchen-island.jpg" }),
    breadcrumbs(crumbs),
    itemList("/gallery", "Kitchen design ideas", SERVICES.map((s) => ({ name: s.name, path: `/services/${s.slug}` }))),
  ];
  return (
    <>
      <JsonLd graph={graph} />
      <PageHero
        eyebrow="Design inspiration"
        h1="Kitchen Remodel Gallery & Design Ideas"
        sub="Browse the styles, layouts and finishes our Lehi clients ask for most. Tap any image to see what is involved, typical costs and timelines."
        image="/images/waterfall-kitchen-island.jpg"
        imageAlt="Kitchen island with a quartz waterfall edge and pendant lights"
        crumbs={crumbs}
        form={<LeadForm source="gallery-hero" compact />}
      />
      <div className="container-x pt-14">
        <p className="rounded-xl bg-brass-100 px-4 py-3 text-sm text-ink/80">Images on this page are illustrative concept renderings that show the looks and materials we build; they are not photographs of specific completed projects.</p>
        {servicesByCategory().map((c) => (
          <section key={c.name} className="pt-14">
            <SectionHead eyebrow={c.name} title={`${c.name} ideas`} />
            <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
              {c.services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group relative block break-inside-avoid overflow-hidden rounded-2xl shadow-card">
                  <Image src={s.image} alt={`${s.name} idea for a Lehi, Utah kitchen`} width={1600} height={1067} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw" className="h-auto w-full transition duration-500 group-hover:scale-105" loading="lazy" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-12 font-display text-lg font-semibold text-white">{s.name}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
