// Central business configuration. Replace the placeholder phone / email / license
// values before launch — they feed the header, footer, forms and JSON-LD schema.
export const SITE = {
  name: "Lehi Kitchen Design",
  legalName: "Lehi Kitchen Design LLC",
  tagline: "Kitchen Remodeling Contractors in Lehi, Utah",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  // TODO: replace with the real business phone and email before launch.
  phone: "(801) 555-0142",
  phoneHref: "+18015550142",
  email: "hello@lehikitchendesign.com",
  address: {
    streetAddress: "",
    locality: "Lehi",
    region: "UT",
    postalCode: "84043",
    country: "US",
  },
  geo: { lat: 40.3916, lng: -111.8508 },
  hours: "Mon–Fri 7:30am–6:00pm, Sat by appointment",
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:30", closes: "18:00" },
  ],
  priceRange: "$$-$$$$",
  license: "Utah licensed & insured general contractor",
  social: [] as string[],
  defaultOg: "/images/og-default.jpg",
};

export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

export const BUSINESS_ID = `${SITE.url}/#business`;
export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
