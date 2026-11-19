import type { Location, LocationInput } from "./location-types";
import { LOCATIONS_A } from "./locations-a";
import { LOCATIONS_B } from "./locations-b";
import { LOCATIONS_C } from "./locations-c";

export type { Location } from "./location-types";

const RAW: LocationInput[] = [...LOCATIONS_A, ...LOCATIONS_B, ...LOCATIONS_C];

function pathFor(l: LocationInput): string {
  if (l.parent) {
    // Lehi neighborhoods live at /locations/lehi/<hood>; other cities keep their full slug.
    const parentSeg = l.parent === "lehi-ut" ? "lehi" : l.parent;
    return `/locations/${parentSeg}/${l.slug}`;
  }
  return `/locations/${l.slug}`;
}

export const LOCATIONS: Location[] = RAW.map((l) => ({
  ...l,
  path: pathFor(l),
  image: `/images/loc-${l.archetype}.jpg`,
}));

export const getLocationBySlug = (slug: string) => LOCATIONS.find((l) => l.slug === slug);
export const getLocationByPath = (path: string) => LOCATIONS.find((l) => l.path === path);
export const getParent = (l: Location) => (l.parent ? getLocationBySlug(l.parent) : undefined);

export const TIERS: { tier: 1 | 2 | 3 | 4 | 5; title: string; blurb: string }[] = [
  { tier: 1, title: "Lehi & Lehi Neighborhoods", blurb: "Our home market — from Traverse Mountain to Historic Downtown." },
  { tier: 2, title: "North Utah County", blurb: "Cities bordering Lehi: American Fork, Highland, Alpine, Saratoga Springs and more." },
  { tier: 3, title: "Southern Salt Lake County", blurb: "Across Point of the Mountain: Draper, Bluffdale, Riverton, Daybreak and more." },
  { tier: 4, title: "Central & South Utah County", blurb: "Orem, Provo, Spanish Fork, Payson and the I-15 commuter corridor." },
  { tier: 5, title: "Regional Hubs", blurb: "County-wide and corridor pages linking every community we serve." },
];

export const locationsByTier = (tier: number) => LOCATIONS.filter((l) => l.tier === tier);

/** Cities & towns (not neighborhoods / hubs) — used for areaServed schema and footer links. */
export const CITIES = LOCATIONS.filter((l) => l.type === "city");
export const NEIGHBORHOODS = LOCATIONS.filter((l) => l.type === "neighborhood");
export const HUBS = LOCATIONS.filter((l) => l.type === "hub" || l.type === "zip");

export const childrenOf = (slug: string) => LOCATIONS.filter((l) => l.parent === slug);

/** Display name with state for headings / titles. */
export const fullName = (l: Location) =>
  l.type === "hub" || l.type === "zip" ? l.name : `${l.name}, UT`;
