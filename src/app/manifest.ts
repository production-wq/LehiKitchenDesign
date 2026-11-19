import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Lehi Kitchens",
    description: SITE.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ee",
    theme_color: "#1b3830",
    icons: [{ src: "/logo.png", sizes: "512x512", type: "image/png" }],
  };
}
