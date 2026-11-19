import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATIONS, getLocationByPath } from "@/data/locations";
import LocationView, { locationMetadata } from "@/components/LocationView";

export function generateStaticParams() {
  return LOCATIONS.filter((l) => !l.parent).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLocationByPath(`/locations/${slug}`);
  return l ? locationMetadata(l) : {};
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLocationByPath(`/locations/${slug}`);
  if (!l) notFound();
  return <LocationView l={l} />;
}
