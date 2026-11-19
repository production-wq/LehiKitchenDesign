import { SITE, absoluteUrl } from "@/lib/site";
import { SERVICES } from "@/data/services";
import { LOCATIONS } from "@/data/locations";
import { GUIDES } from "@/data/guides";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${SITE.name}`,
    `> ${SITE.tagline}. Design-build kitchen remodeling in Lehi, Utah, serving Utah County and southern Salt Lake County.`,
    "",
    "## Services",
    ...SERVICES.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`),
    "",
    "## Service areas",
    ...LOCATIONS.map((l) => `- [${l.name}](${absoluteUrl(l.path)})`),
    "",
    "## Guides",
    ...GUIDES.map((g) => `- [${g.title}](${absoluteUrl(`/guides/${g.slug}`)}): ${g.summary}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
