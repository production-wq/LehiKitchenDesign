// SEO / lead-form audit over every URL in the sitemap.
// Usage: node scripts/audit.mjs [baseUrl]
const base = process.argv[2] || "http://localhost:3100";
const sm = await (await fetch(base + "/sitemap.xml")).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));
console.log(`${urls.length} URLs in sitemap`);

const problems = [];
const titles = new Map();
const descs = new Map();
let withForm = 0;
const types = new Map();

for (const u of urls) {
  const res = await fetch(base + u);
  const html = await res.text();
  const p = (msg) => problems.push(`${u}: ${msg}`);
  if (res.status !== 200) { p(`status ${res.status}`); continue; }
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) p(`${h1} <h1>`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  if (!title) p("no title"); else if (title.length > 70) p(`title ${title.length} chars`);
  if (!desc) p("no meta description"); else if (desc.length > 165 || desc.length < 70) p(`description ${desc.length} chars`);
  if (!canon) p("no canonical");
  titles.set(title, [...(titles.get(title) || []), u]);
  descs.set(desc, [...(descs.get(desc) || []), u]);
  const hasForm = /<form[\s>]/.test(html);
  if (hasForm) withForm++; else p("NO FORM");
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (ld.length < 2) p(`only ${ld.length} JSON-LD blocks`);
  const kinds = [];
  for (const m of ld) {
    try {
      const j = JSON.parse(m[1]);
      for (const n of j["@graph"] || [j]) kinds.push([].concat(n["@type"]).join("/"));
    } catch (e) { p("invalid JSON-LD: " + e.message); }
  }
  types.set(u.split("/")[1] || "home", new Set([...(types.get(u.split("/")[1] || "home") || []), ...kinds]));
  const imgsNoAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length;
  if (imgsNoAlt) p(`${imgsNoAlt} <img> without alt`);
}

for (const [t, list] of titles) if (list.length > 1) problems.push(`duplicate title "${t}": ${list.join(", ")}`);
for (const [t, list] of descs) if (list.length > 1) problems.push(`duplicate description: ${list.join(", ")}`);

console.log(`pages with a form: ${withForm}/${urls.length}`);
for (const [k, v] of types) console.log(`schema [${k}]: ${[...v].join(", ")}`);
console.log(problems.length ? `\n${problems.length} problems:\n` + problems.join("\n") : "\nNo problems found");
