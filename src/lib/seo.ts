import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./site";

/** Keep <title> inside ~60 chars: drop the brand suffix if the title would be too long. */
export function fitTitle(core: string, brand = SITE.name): string {
  const full = `${core} | ${brand}`;
  return full.length <= 62 ? full : core.length <= 70 ? core : core.slice(0, 67) + "…";
}

type MetaArgs = {
  title: string; // already fitted
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  image = SITE.defaultOg,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  keywords,
}: MetaArgs): Metadata {
  const url = absoluteUrl(path);
  const img = absoluteUrl(image);
  const desc = description.length > 158 ? description.slice(0, 155).trimEnd() + "…" : description;
  return {
    title: { absolute: title },
    description: desc,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: {
      type,
      url,
      title,
      description: desc,
      siteName: SITE.name,
      locale: "en_US",
      images: [{ url: img, width: image === SITE.defaultOg ? 1200 : 1600, height: image === SITE.defaultOg ? 630 : 1067, alt: title }],
      ...(type === "article" && { publishedTime, modifiedTime, authors: [SITE.name] }),
    },
    twitter: { card: "summary_large_image", title, description: desc, images: [img] },
    other: {
      "geo.region": "US-UT",
      "geo.placename": "Lehi",
      "geo.position": `${SITE.geo.lat};${SITE.geo.lng}`,
      ICBM: `${SITE.geo.lat}, ${SITE.geo.lng}`,
    },
  };
}
