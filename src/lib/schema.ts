import { SITE, absoluteUrl, BUSINESS_ID, ORG_ID, WEBSITE_ID } from "./site";
import { SERVICES } from "@/data/services";
import { CITIES, type Location } from "@/data/locations";
import type { Guide } from "@/data/guides";

type Json = Record<string, unknown>;

const state = { "@type": "State", name: "Utah" };

export function cityNode(l: Pick<Location, "name">): Json {
  return {
    "@type": "City",
    name: l.name,
    containedInPlace: state,
  };
}

/** Sitewide Organization + LocalBusiness + WebSite nodes (rendered once in the root layout). */
export function siteGraph(): Json[] {
  const address: Json = {
    "@type": "PostalAddress",
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
    ...(SITE.address.streetAddress ? { streetAddress: SITE.address.streetAddress } : {}),
  };
  return [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      legalName: SITE.legalName,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png"), width: 512, height: 512 },
      email: SITE.email,
      telephone: SITE.phoneHref,
      address,
      ...(SITE.social.length ? { sameAs: SITE.social } : {}),
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: SITE.phoneHref,
          contactType: "customer service",
          areaServed: "US-UT",
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
      "@id": BUSINESS_ID,
      name: SITE.name,
      description:
        "Lehi, Utah kitchen remodeling contractor offering design-build kitchen remodels, custom cabinets, countertops, layout changes and lighting across Utah County and southern Salt Lake County.",
      url: absoluteUrl("/"),
      image: absoluteUrl("/images/hero-home.jpg"),
      logo: absoluteUrl("/logo.png"),
      telephone: SITE.phoneHref,
      email: SITE.email,
      priceRange: SITE.priceRange,
      address,
      geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
      openingHoursSpecification: SITE.openingHours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      areaServed: CITIES.map(cityNode),
      parentOrganization: { "@id": ORG_ID },
      knowsAbout: SERVICES.map((s) => s.name),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Kitchen remodeling services",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, url: absoluteUrl(`/services/${s.slug}`) },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: absoluteUrl("/"),
      name: SITE.name,
      inLanguage: "en-US",
      publisher: { "@id": ORG_ID },
    },
  ];
}

export function breadcrumbs(items: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": absoluteUrl(items[items.length - 1].path) + "#breadcrumb",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function webPage(args: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  image?: string;
  about?: Json;
  modified?: string;
}): Json {
  const url = absoluteUrl(args.path);
  return {
    "@type": args.type ?? "WebPage",
    "@id": url + "#webpage",
    url,
    name: args.name,
    description: args.description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    about: args.about ?? { "@id": BUSINESS_ID },
    breadcrumb: { "@id": url + "#breadcrumb" },
    primaryImageOfPage: args.image ? { "@type": "ImageObject", url: absoluteUrl(args.image) } : undefined,
    ...(args.modified ? { dateModified: args.modified } : {}),
  };
}

export function faqPage(path: string, faqs: { q: string; a: string }[]): Json {
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl(path) + "#faq",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceNode(args: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  image?: string;
  areaServed?: Json[];
}): Json {
  return {
    "@type": "Service",
    "@id": absoluteUrl(args.path) + "#service",
    name: args.name,
    description: args.description,
    serviceType: args.serviceType,
    url: absoluteUrl(args.path),
    provider: { "@id": BUSINESS_ID },
    areaServed: args.areaServed ?? CITIES.slice(0, 12).map(cityNode),
    ...(args.image ? { image: absoluteUrl(args.image) } : {}),
  };
}

export function itemList(path: string, name: string, items: { name: string; path: string }[]): Json {
  return {
    "@type": "ItemList",
    "@id": absoluteUrl(path) + "#list",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}

export function articleNode(g: Guide, path: string): Json {
  const url = absoluteUrl(path);
  return {
    "@type": "Article",
    "@id": url + "#article",
    headline: g.title.slice(0, 110),
    description: g.description,
    image: [absoluteUrl(g.image)],
    datePublished: g.published,
    dateModified: g.modified,
    mainEntityOfPage: { "@id": url + "#webpage" },
    author: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    about: g.keyword,
  };
}

/** Place served by a location page (city, neighborhood, hub). */
export function locationAreaServed(l: Location, parent?: Location): Json[] {
  if (l.type === "city") return [cityNode(l)];
  if (l.type === "neighborhood") {
    return [
      {
        "@type": "Place",
        name: `${l.name}, ${parent?.name ?? "Lehi"}, UT`,
        containedInPlace: parent ? cityNode(parent) : cityNode({ name: "Lehi" }),
      },
    ];
  }
  if (l.type === "zip") {
    return [
      cityNode({ name: "Lehi" }),
      ...l.zips.map(
        (z): Json => ({
          "@type": "Place",
          name: `ZIP code ${z}, Utah`,
          address: { "@type": "PostalAddress", postalCode: z, addressRegion: "UT", addressCountry: "US" },
        }),
      ),
    ];
  }
  return [{ "@type": "AdministrativeArea", name: l.name, containedInPlace: state }];
}
