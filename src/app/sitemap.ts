import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { SERVICES } from "@/data/services";
import { LOCATIONS } from "@/data/locations";
import { GUIDES } from "@/data/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastModified: Date | string = now,
  ) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority });

  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9, "weekly"),
    entry("/locations", 0.9, "weekly"),
    entry("/guides", 0.8, "weekly"),
    entry("/gallery", 0.6),
    entry("/free-estimate", 0.8),
    entry("/about", 0.5),
    entry("/contact", 0.6),
    ...SERVICES.map((s) => entry(`/services/${s.slug}`, 0.85)),
    ...LOCATIONS.map((l) => entry(l.path, l.slug === "lehi-ut" ? 0.95 : l.type === "hub" || l.type === "zip" ? 0.8 : l.tier <= 2 ? 0.8 : 0.7)),
    ...GUIDES.map((g) => entry(`/guides/${g.slug}`, 0.75, "monthly", g.modified)),
    entry("/privacy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];
}
