import Link from "next/link";
import { SITE } from "@/lib/site";
import { servicesByCategory } from "@/data/services";
import { CITIES, HUBS, LOCATIONS } from "@/data/locations";
import { GUIDES } from "@/data/guides";
import { PhoneIcon, PinIcon } from "./Icons";
import Logo from "./Logo";

export default function Footer() {
  const cats = servicesByCategory();
  const lehiHoods = LOCATIONS.filter((l) => l.parent === "lehi-ut");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-ink text-white/80">
      <div className="container-x grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Licensed, insured design-build kitchen remodeling for homeowners in Lehi and across Utah County and southern Salt Lake County.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            <li><a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-2 font-semibold text-white hover:text-brass"><PhoneIcon width={16} height={16} /> {SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="hover:text-brass">{SITE.email}</a></li>
            <li className="flex items-start gap-2"><PinIcon width={16} height={16} className="mt-0.5 shrink-0" /> Lehi, UT 84043 · Service area: Utah County &amp; south Salt Lake County</li>
            <li className="text-white/60">{SITE.hours}</li>
          </ul>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.16em] text-brass">Services</h3>
            <ul className="space-y-1.5 text-sm">
              {cats.map((c) => (
                <li key={c.name}><Link href={`/services#${c.name.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="hover:text-brass">{c.name}</Link></li>
              ))}
              <li><Link href="/services" className="font-semibold text-white hover:text-brass">All 29 services →</Link></li>
            </ul>
            <h3 className="mb-3 mt-7 font-sans text-xs font-bold uppercase tracking-[0.16em] text-brass">Cost Guides</h3>
            <ul className="space-y-1.5 text-sm">
              {GUIDES.slice(0, 5).map((g) => (
                <li key={g.slug}><Link href={`/guides/${g.slug}`} className="hover:text-brass">{g.metaTitle.replace(/ \(.*\)$/, "").replace(/:.*$/, "")}</Link></li>
              ))}
              <li><Link href="/guides" className="font-semibold text-white hover:text-brass">All guides →</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.16em] text-brass">Lehi Neighborhoods</h3>
            <ul className="space-y-1.5 text-sm">
              {lehiHoods.map((l) => (
                <li key={l.slug}><Link href={l.path} className="hover:text-brass">{l.name.replace(/ \(.*\)/, "")}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.16em] text-brass">Cities We Serve</h3>
            <ul className="space-y-1.5 text-sm">
              {CITIES.map((l) => (
                <li key={l.slug}><Link href={l.path} className="hover:text-brass">{l.name}, UT</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.16em] text-brass">Regions</h3>
            <ul className="space-y-1.5 text-sm">
              {HUBS.map((l) => (
                <li key={l.slug}><Link href={l.path} className="hover:text-brass">{l.name}</Link></li>
              ))}
              <li><Link href="/locations" className="font-semibold text-white hover:text-brass">All service areas →</Link></li>
            </ul>
            <h3 className="mb-3 mt-7 font-sans text-xs font-bold uppercase tracking-[0.16em] text-brass">Company</h3>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/about" className="hover:text-brass">About</Link></li>
              <li><Link href="/gallery" className="hover:text-brass">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-brass">Contact</Link></li>
              <li><Link href="/free-estimate" className="hover:text-brass">Free Estimate</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 sm:flex-row">
          <p>© {year} {SITE.legalName}. All rights reserved. {SITE.license}.</p>
          <p className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
