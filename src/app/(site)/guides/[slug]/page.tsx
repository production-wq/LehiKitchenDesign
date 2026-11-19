import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, fitTitle } from "@/lib/seo";
import { articleNode, breadcrumbs, faqPage, webPage } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import { GuideCard, SectionHead, ServiceCard } from "@/components/Cards";
import { GUIDES, getGuide } from "@/data/guides";
import { getService } from "@/data/services";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return buildMetadata({
    title: fitTitle(g.metaTitle),
    description: g.description,
    path: `/guides/${g.slug}`,
    image: g.image,
    type: "article",
    publishedTime: g.published,
    modifiedTime: g.modified,
    keywords: [g.keyword, `${g.keyword} 2026`],
  });
}

const fmtDate = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
const idOf = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const path = `/guides/${g.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: g.title.replace(/\s*\(.*\)$/, ""), path },
  ];
  const related = g.related.map((r) => getService(r)!).filter(Boolean);
  const moreGuides = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 3);

  const graph = [
    webPage({ path, name: g.metaTitle, description: g.description, image: g.image, modified: g.modified, about: { "@id": `${SITE.url}${path}#article` } }),
    breadcrumbs(crumbs),
    articleNode(g, path),
    faqPage(path, g.faqs),
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <section className="border-b border-line bg-white">
        <div className="container-x grid gap-10 py-10 lg:grid-cols-2 lg:items-center lg:py-14">
          <div>
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow mt-6">{g.readTime} · Updated <time dateTime={g.modified}>{fmtDate(g.modified)}</time></p>
            <h1 className="mt-2 font-display text-[2.1rem] font-semibold leading-[1.08] text-forest sm:text-5xl">{g.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-stone">{g.summary}</p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-lift">
            <Image src={g.image} alt={g.title} fill priority sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
          </div>
        </div>
      </section>

      <div className="container-x grid gap-12 pt-12 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0">
        <article className="prose-lk min-w-0 text-[1.05rem]">
          <p className="rounded-2xl border-l-4 border-brass bg-brass-100 p-5 text-[1.05rem] font-medium text-ink">{g.intro}</p>

          <nav aria-label="Table of contents" className="my-8 rounded-2xl border border-line bg-white p-5">
            <p className="eyebrow mb-2">In this guide</p>
            <ol className="list-decimal space-y-1 pl-5 text-[15px]">
              {g.sections.map((s) => <li key={s.h2}><a href={`#${idOf(s.h2)}`}>{s.h2}</a></li>)}
              <li><a href="#faq-heading">Frequently asked questions</a></li>
            </ol>
          </nav>

          {g.sections.map((s) => (
            <section key={s.h2} id={idOf(s.h2)} className="mt-10">
              <h2 className="font-display text-3xl font-semibold text-forest">{s.h2}</h2>
              {s.paras?.map((p) => <p key={p} className="mt-4">{p}</p>)}
              {s.table && (
                <div className="my-6 overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
                  <table className="w-full min-w-[30rem] text-left text-[15px]">
                    <caption className="border-b border-line bg-sand/50 px-5 py-3 text-left text-sm font-semibold text-forest">{s.table.caption}</caption>
                    <thead className="bg-forest text-white">
                      <tr>{s.table.headers.map((h) => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {s.table.rows.map((r) => (
                        <tr key={r[0]}>
                          {r.map((c, i) => i === 0 ? <th key={i} scope="row" className="px-4 py-3 font-semibold text-forest">{c}</th> : <td key={i} className="px-4 py-3">{c}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-brass">
                  {s.bullets.map((b) => <li key={b} className="leading-relaxed text-ink/85">{b}</li>)}
                </ul>
              )}
            </section>
          ))}

          <p className="mt-10 text-sm text-stone">Figures are planning estimates based on typical Utah County projects in 2026 and are not a quote. Your price depends on your home, selections and scope.</p>
        </article>
        <div className="mt-12"><FAQ faqs={g.faqs} /></div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <LeadForm source={`guide-${g.slug}`} compact heading="Get your exact number" subheading="Free in-home estimate with a fixed-price proposal." />
          <p className="mt-4 text-center text-sm text-stone">Or try the <Link href="/free-estimate" className="font-semibold text-forest underline decoration-brass underline-offset-4">instant cost calculator</Link>.</p>
        </aside>
      </div>

      <div className="container-x space-y-16 pt-16">
        <section>
          <SectionHead eyebrow="Related services" title="Services mentioned in this guide" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
        </section>
        <section>
          <SectionHead eyebrow="Keep reading" title="More Utah kitchen remodeling guides" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">{moreGuides.map((x) => <GuideCard key={x.slug} g={x} />)}</div>
        </section>
      </div>
    </>
  );
}
