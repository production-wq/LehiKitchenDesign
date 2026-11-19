import type { Archetype, Location } from "@/data/location-types";
import { fullName, getParent, LOCATIONS } from "@/data/locations";
import { SITE } from "./site";

/** Cost snapshot rows tuned to the typical home type for a location. */
export function costRows(archetype: Archetype): { scope: string; price: string; fit: string }[] {
  switch (archetype) {
    case "new-build":
      return [
        { scope: "Builder-grade upgrade", price: "$12,000 – $45,000", fit: "Taller cabinets, waterfall island, lighting, backsplash, pantry" },
        { scope: "Mid-range remodel", price: "$40,000 – $70,000", fit: "New cabinets, quartz counters, flooring, layered lighting" },
        { scope: "Full custom remodel", price: "$70,000 – $110,000", fit: "Custom cabinetry, layout tweaks, premium surfaces" },
      ];
    case "luxury-view":
      return [
        { scope: "Refresh with new surfaces", price: "$35,000 – $60,000", fit: "Refaced or painted cabinets, new stone, lighting" },
        { scope: "Custom remodel", price: "$70,000 – $130,000", fit: "Custom cabinets, large island, pro appliances" },
        { scope: "Luxury remodel", price: "$130,000 – $250,000+", fit: "Book-matched stone, inset cabinetry, butler's pantry" },
      ];
    case "historic":
      return [
        { scope: "Cosmetic update", price: "$28,000 – $45,000", fit: "New cabinets and counters where layout and wiring allow" },
        { scope: "Full gut remodel", price: "$60,000 – $110,000", fit: "Wall removal, new electrical and plumbing, new layout" },
        { scope: "Systems upgrades (add-on)", price: "$8,000 – $20,000", fit: "Panel upgrade, rewiring, supply and drain replacement" },
      ];
    case "ranch-update":
      return [
        { scope: "Refresh", price: "$25,000 – $40,000", fit: "Reface or paint, counters, backsplash, lighting, flooring" },
        { scope: "Mid-range remodel", price: "$40,000 – $65,000", fit: "New cabinets, quartz counters, soffit removal, island" },
        { scope: "Open-concept gut remodel", price: "$65,000 – $100,000", fit: "Wall removal, beam, new layout and utilities" },
      ];
    case "townhome":
      return [
        { scope: "Small-kitchen refresh", price: "$15,000 – $30,000", fit: "Cabinets to ceiling, new counters, lighting" },
        { scope: "Mid-range remodel", price: "$30,000 – $50,000", fit: "New cabinets, slab backsplash, flooring, appliances" },
        { scope: "Full remodel", price: "$45,000 – $70,000", fit: "Layout changes, peninsula, upgraded storage and surfaces" },
      ];
    case "farmhouse":
      return [
        { scope: "Farmhouse refresh", price: "$25,000 – $45,000", fit: "Shaker doors, apron sink, counters, lighting" },
        { scope: "Full farmhouse remodel", price: "$45,000 – $80,000", fit: "New cabinets, island, pantry, flooring, beams" },
        { scope: "Custom remodel + expansion", price: "$80,000 – $150,000", fit: "Bump-out, custom cabinetry, large pantry and island" },
      ];
    default:
      return [
        { scope: "Kitchen refresh", price: "$25,000 – $40,000", fit: "Cabinet refacing or paint, counters, backsplash, lighting" },
        { scope: "Mid-range remodel", price: "$40,000 – $70,000", fit: "New cabinets, quartz counters, flooring, lighting" },
        { scope: "Full gut remodel", price: "$70,000 – $120,000", fit: "Layout changes, wall removal, custom cabinets, premium finishes" },
      ];
  }
}

export function locationH1(l: Location): string {
  if (l.type === "neighborhood") {
    const p = getParent(l);
    return `Kitchen Remodeling in ${l.name}, ${p?.name ?? "Lehi"} UT`;
  }
  if (l.type === "hub") return `${l.name} Kitchen Remodeling`;
  if (l.type === "zip") return `${l.name} Kitchen Contractors`;
  return `Kitchen Remodeling in ${l.name}, UT`;
}

export function locationTitle(l: Location): string {
  if (l.type === "neighborhood") return `Kitchen Remodel ${l.name}, ${getParent(l)?.name ?? "Lehi"} UT`;
  if (l.type === "hub") return `${l.name} Kitchen Remodeling`;
  if (l.type === "zip") return `Kitchen Contractors in Lehi 84043 & Nearby ZIPs`;
  return `Kitchen Remodeling ${l.name} UT`;
}

export function locationMeta(l: Location): string {
  const place = l.type === "neighborhood" ? `${l.name} in ${getParent(l)?.name ?? "Lehi"}` : l.name;
  if (l.type === "hub") {
    return `${l.name} kitchen remodeling by a licensed Lehi contractor: design-build remodels, custom cabinets, countertops and layout changes. ${l.hook.split(". ")[0]}. Free estimate.`;
  }
  if (l.type === "zip") {
    return `Local kitchen contractors in Lehi 84043 and nearby 84005, 84045 and 84020 ZIP codes. Fixed-price kitchen remodels, cabinets, counters and lighting. Free in-home estimate.`;
  }
  return `Kitchen remodeling in ${place}, UT: ${l.era} need the right plan. Licensed design-build team, fixed-price proposals and a free in-home estimate.`;
}

export function locationFaqs(l: Location): { q: string; a: string }[] {
  const n = l.type === "neighborhood" ? `${l.name} (${getParent(l)?.name ?? "Lehi"})` : l.name;
  const faqs: { q: string; a: string }[] = [
    {
      q: `How much does a kitchen remodel cost in ${n}?`,
      a: `Kitchen remodels in ${n} typically range from ${costRows(l.archetype)[0].price} for ${costRows(l.archetype)[0].scope.toLowerCase()} up to ${costRows(l.archetype)[2].price} for ${costRows(l.archetype)[2].scope.toLowerCase()}. Your exact price depends on size, layout changes, cabinet choice and finishes. We provide a fixed-price written proposal after a free in-home estimate.`,
    },
    {
      q: `What kitchen projects are most common in ${n}?`,
      a: `Homeowners in ${n} most often ask for ${l.projects
        .slice(0, 3)
        .map((s) => s.replace(/-/g, " "))
        .join(", ")}. Housing here is typically ${l.era}, which shapes the structural, electrical and finish work involved.`,
    },
    {
      q: `Do you handle permits for kitchen remodels in ${n}?`,
      a: `Yes. We prepare and submit permit applications and schedule inspections with the local building department for any structural, electrical or plumbing work. ${l.notes[0]}`,
    },
    {
      q: `Do you serve ${l.zips.length > 1 ? "ZIP codes " + l.zips.join(", ") : "ZIP code " + l.zips[0]}?`,
      a: `Yes. We are based in Lehi and serve ${n} (${l.zips.join(", ")}) ${l.drive.toLowerCase().includes("lehi") ? "- " + l.drive.toLowerCase() : "from our Lehi base"}. There are no extra travel fees within our service area.`,
    },
    {
      q: `How do I get a free kitchen remodel estimate in ${n}?`,
      a: `Fill out the form on this page or call ${SITE.phone}. We schedule a free in-home visit to measure your kitchen, discuss your goals and review options, then follow up with a written fixed-price proposal.`,
    },
  ];
  return faqs;
}

export const HOME_FAQS = [
  {
    q: "How much does a kitchen remodel cost in Lehi, UT?",
    a: "Most Lehi kitchen remodels cost between $35,000 and $75,000. A cosmetic refresh can start near $25,000, while full gut remodels with layout changes and premium finishes can exceed $90,000. We provide a fixed-price written proposal after a free in-home estimate.",
  },
  {
    q: "How long does a kitchen remodel take?",
    a: "Most kitchen remodels take 6–12 weeks of on-site construction, plus 3–8 weeks of design and cabinet lead time before work begins. Refacing and refresh projects can finish in 1–4 weeks on site.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. We operate as a licensed, insured Utah general contractor and handle permits, inspections and subcontractor coordination for every project.",
  },
  {
    q: "Which cities and neighborhoods do you serve?",
    a: "We serve Lehi and its neighborhoods — Traverse Mountain, Holbrook Farms, Cold Spring Ranch, Historic Downtown and more — plus American Fork, Highland, Alpine, Saratoga Springs, Eagle Mountain, Draper, Orem, Provo and communities across Utah County and southern Salt Lake County.",
  },
  {
    q: "Do you offer design services?",
    a: "Yes. Our design-and-build process includes measured drawings, 3D layouts, material selections and an itemized proposal, so design and budget stay aligned.",
  },
  {
    q: "Can you work with my HOA?",
    a: "Yes. Many of the neighborhoods we serve have HOA or architectural review. We prepare drawings and finish selections for submittal when exterior changes are involved.",
  },
];

export const NAV_FEATURED_SERVICES = [
  "kitchen-remodeling",
  "custom-kitchen-cabinets",
  "cabinet-refacing",
  "quartz-countertops",
  "waterfall-kitchen-island",
  "open-concept-kitchen-remodel",
  "load-bearing-wall-removal",
  "builder-grade-kitchen-upgrade",
];

export const FEATURED_LOCATION_SLUGS = [
  "lehi-ut",
  "traverse-mountain",
  "american-fork-ut",
  "highland-ut",
  "alpine-ut",
  "saratoga-springs-ut",
  "eagle-mountain-ut",
  "draper-ut",
  "orem-ut",
  "provo-ut",
];

export const featuredLocations = () =>
  FEATURED_LOCATION_SLUGS.map((s) => LOCATIONS.find((l) => l.slug === s)!).filter(Boolean);

export { fullName };
