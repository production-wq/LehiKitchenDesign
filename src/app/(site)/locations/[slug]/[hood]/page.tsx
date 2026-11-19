import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATIONS, getLocationByPath } from "@/data/locations";
import LocationView, { locationMetadata } from "@/components/LocationView";

export function generateStaticParams() {
  return LOCATIONS.filter((l) => l.parent).map((l) => {
    const [, , slug, hood] = l.path.split("/");
    return { slug, hood };
  });
}

type P = { params: Promise<{ slug: string; hood: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug, hood } = await params;
  const l = getLocationByPath(`/locations/${slug}/${hood}`);
  return l ? locationMetadata(l) : {};
}

export default async function NeighborhoodPage({ params }: P) {
  const { slug, hood } = await params;
  const l = getLocationByPath(`/locations/${slug}/${hood}`);
  if (!l) notFound();
  return <LocationView l={l} />;
}
