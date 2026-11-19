import Link from "next/link";
import { SITE } from "@/lib/site";
import { servicesByCategory } from "@/data/services";
import { featuredLocations } from "@/lib/content";
import { PhoneIcon, ChevronIcon } from "./Icons";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";

export default function Header() {
  const cats = servicesByCategory().map((c) => ({
    name: c.name,
    items: c.services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  }));
  const locs = featuredLocations().map((l) => ({ label: l.name, href: l.path }));

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-cream/90 backdrop-blur-md">
      <div className="hidden bg-forest text-[13px] text-white/90 lg:block">
        <div className="container-x flex h-9 items-center justify-between">
          <p>Licensed &amp; insured Utah kitchen remodelers · Free in-home estimates · Serving Lehi &amp; all of Utah County</p>
          <a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-2 font-semibold hover:text-brass">
            <PhoneIcon width={14} height={14} /> {SITE.phone}
          </a>
        </div>
      </div>

      <div className="container-x flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="shrink-0" aria-label={`${SITE.name} home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {/* Services mega menu */}
          <div className="group relative">
            <Link href="/services" className="flex items-center gap-1 rounded-lg px-3 py-2 whitespace-nowrap text-[15px] font-semibold text-ink hover:text-brass-600">
              Services <ChevronIcon width={14} height={14} />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-[860px] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid grid-cols-3 gap-x-6 gap-y-5 rounded-2xl border border-line bg-white p-6 shadow-lift">
                {cats.map((c) => (
                  <div key={c.name}>
                    <p className="eyebrow mb-2">{c.name}</p>
                    <ul className="space-y-1">
                      {c.items.map((i) => (
                        <li key={i.href}>
                          <Link href={i.href} className="block text-[14px] text-ink/80 hover:text-brass-600 hover:underline">{i.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Locations menu */}
          <div className="group relative">
            <Link href="/locations" className="flex items-center gap-1 rounded-lg px-3 py-2 whitespace-nowrap text-[15px] font-semibold text-ink hover:text-brass-600">
              Service Areas <ChevronIcon width={14} height={14} />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-line bg-white p-6 shadow-lift">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                  {locs.map((l) => (
                    <li key={l.href}><Link href={l.href} className="block text-[14px] text-ink/80 hover:text-brass-600 hover:underline">Kitchen Remodeling {l.label}</Link></li>
                  ))}
                </ul>
                <Link href="/locations" className="mt-4 inline-block text-sm font-bold text-forest underline underline-offset-4 decoration-brass">View all 59 service areas →</Link>
              </div>
            </div>
          </div>

          <Link href="/gallery" className="rounded-lg px-3 py-2 whitespace-nowrap text-[15px] font-semibold text-ink hover:text-brass-600">Gallery</Link>
          <Link href="/guides" className="rounded-lg px-3 py-2 whitespace-nowrap text-[15px] font-semibold text-ink hover:text-brass-600">Cost Guides</Link>
          <Link href="/about" className="rounded-lg px-3 py-2 whitespace-nowrap text-[15px] font-semibold text-ink hover:text-brass-600">About</Link>
        </nav>

        <div className="flex items-center gap-2">
          <a href={`tel:${SITE.phoneHref}`} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-forest xl:flex">
            <PhoneIcon width={16} height={16} /> {SITE.phone}
          </a>
          <Link href="/free-estimate" className="btn btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">Free Estimate</Link>
          <MobileMenu categories={cats} locations={locs} phone={SITE.phone} phoneHref={SITE.phoneHref} />
        </div>
      </div>
    </header>
  );
}
