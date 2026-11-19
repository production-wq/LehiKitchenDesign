// Generates site imagery with the Gemini image API.
// Usage: node scripts/generate-images.mjs [--only=slug1,slug2] [--force]
// Reads GEMINI_API_KEY from the environment or .env.local. Skips images that already exist.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "images");
fs.mkdirSync(outDir, { recursive: true });

function loadEnv() {
  const f = path.join(root, ".env.local");
  if (!fs.existsSync(f)) return;
  for (const line of fs.readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
loadEnv();
const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("GEMINI_API_KEY missing (set it in .env.local)");
  process.exit(1);
}

const MODELS = ["gemini-2.5-flash-image", "gemini-3.1-flash-image"];
const STYLE =
  "Photorealistic professional architectural interior photography, natural daylight, wide-angle lens, crisp detail, magazine quality, realistic Utah home. No text, no logos, no watermarks, no people.";

const kitchen = (desc) => `${desc} ${STYLE}`;

// file (without extension) -> prompt
const MANIFEST = {
  // ---- general ----
  "hero-home": kitchen("A stunning luxury modern kitchen with a large quartz waterfall island, white shaker cabinets with brass hardware, a big window showing snow-capped Wasatch mountains in the distance, warm pendant lights."),
  "about-team": kitchen("A bright design consultation scene in a kitchen: a quartz countertop covered with cabinet door samples, tile swatches, rolled blueprints and a tablet showing a 3D kitchen layout."),
  "process-build": kitchen("A kitchen mid-remodel with new cabinets installed, a half-finished quartz countertop, clean orderly job site, tools neatly placed, natural light."),
  "cta-banner": kitchen("A warm inviting finished transitional kitchen at dusk with glowing under-cabinet lighting, a large island with stools and a deep farmhouse sink."),
  // ---- services ----
  "kitchen-remodeling": kitchen("A complete kitchen remodel result: two-tone white and navy cabinets, quartz counters, tile backsplash, stainless appliances, wood floors, open island."),
  "kitchen-renovation": kitchen("A freshly renovated family kitchen with light oak floors, white cabinets, a gas range with a custom hood, bright subway tile backsplash."),
  "custom-kitchen-remodel": kitchen("A fully custom designed kitchen with bespoke walnut and painted cabinetry, integrated appliances, a built-in coffee bar and a sculptural island."),
  "luxury-kitchen-remodeling": kitchen("An ultra-luxury kitchen with book-matched marble slab island and backsplash, panel-ready professional appliances, inset custom cabinetry, brass details, chandeliers."),
  "kitchen-design-and-build": kitchen("A designer kitchen showing a cohesive design: matching cabinetry, stone, lighting and hardware in a soft neutral palette, with a design drawing visible on the island."),
  "general-contractor-kitchen-remodel": kitchen("A well-organized kitchen construction scene: framing complete, new electrical boxes and plumbing rough-in visible, cabinets staged, clean professional job site."),
  "custom-kitchen-cabinets": kitchen("Close view of custom kitchen cabinetry with inset doors, dovetail drawers open to show organizers, soft-close, painted sage green with brushed brass pulls."),
  "cabinet-refacing": kitchen("A kitchen whose existing cabinet boxes have been refaced with new white shaker doors and drawer fronts, fresh hardware, original layout preserved, bright and clean."),
  "kitchen-cabinet-painting": kitchen("Kitchen cabinets freshly painted a deep navy blue with a smooth factory-like finish, brass hardware, white quartz counters, light-filled."),
  "semi-custom-cabinets": kitchen("A kitchen with semi-custom cabinets in a warm greige color, crown molding, glass-front upper cabinets, organized pull-out storage, granite counters."),
  "shaker-kitchen-cabinets": kitchen("A classic kitchen with white Shaker style cabinets, black hardware, marble-look countertop, farmhouse sink, wood open shelving."),
  "pantry-remodel": kitchen("A beautiful walk-in butler's pantry with floor-to-ceiling custom shelving, a marble counter, glass-front cabinets, pull-out baskets, a small prep sink, warm lighting."),
  "quartz-countertops": kitchen("A kitchen with a seamless white quartz countertop with soft gray veining, undermount sink, and a coordinating full-height quartz backsplash."),
  "granite-countertops": kitchen("A kitchen with polished natural granite countertops in a dramatic dark pattern with gold veining, warm walnut cabinets, undermount sink."),
  "waterfall-kitchen-island": kitchen("A large kitchen island with a quartz waterfall edge running down both sides to the floor, three modern pendant lights above, counter stools."),
  "porcelain-slab-backsplash": kitchen("A kitchen with a seamless large-format porcelain slab backsplash with marble veining running from counter to ceiling behind a range hood."),
  "kitchen-tile-installation": kitchen("A kitchen with a handcrafted zellige tile backsplash in a soft green color and a herringbone pattern, plus a clean grout, wooden shelves."),
  "open-concept-kitchen-remodel": kitchen("An open-concept kitchen flowing into a living and dining area, big island as the centerpiece, vaulted ceiling with wood beams, wide windows."),
  "load-bearing-wall-removal": kitchen("A kitchen where a wall was removed, showing a clean structural exposed wood beam spanning the opening between kitchen and living room, wide open sightlines."),
  "kitchen-expansion-bump-out": kitchen("An expanded kitchen with a bump-out bay featuring a large breakfast nook with built-in bench seating and a wall of windows overlooking a backyard."),
  "custom-kitchen-island": kitchen("A custom kitchen island with a different finish from the perimeter cabinets, butcher block end, seating for four, built-in microwave drawer and wine fridge."),
  "kitchen-flooring-installation": kitchen("A kitchen with wide-plank luxury vinyl plank flooring in a natural oak look, laid cleanly along the island and cabinets, showing the floor in focus."),
  "under-cabinet-lighting": kitchen("A kitchen at evening with warm LED under-cabinet lighting washing across the quartz countertop and backsplash, cabinets dimly lit above."),
  "recessed-kitchen-lighting": kitchen("A bright kitchen ceiling with evenly spaced recessed LED can lights illuminating a white island, white cabinets and wood floor, no glare."),
  "kitchen-plumbing-sink-relocation": kitchen("A kitchen with a new island-mounted sink and pull-down faucet, a dishwasher beside it, relocated sink centered under a window view, clean plumbing finish."),
  "modern-farmhouse-kitchen-remodel": kitchen("A modern farmhouse kitchen with white cabinets, black iron pendants, a large apron-front sink, shiplap accents, reclaimed wood beams and black hardware."),
  "contemporary-kitchen-renovation": kitchen("A sleek contemporary kitchen with flat-panel handleless cabinets in matte gray and walnut, a long island, integrated appliances, linear lighting."),
  "small-kitchen-remodel": kitchen("A small but smart galley kitchen remodel with light cabinets to the ceiling, a compact peninsula, light counters, mirrored backsplash tile and good lighting."),
  "builder-grade-kitchen-upgrade": kitchen("A kitchen upgraded from builder-grade: new taller white cabinets with crown, a quartz waterfall island added, new hardware, pendant lights and backsplash, in a new-build home."),
  // ---- location archetypes ----
  "loc-new-build": kitchen("A kitchen in a newer subdivision home, upgraded with a large quartz island, white shaker cabinets, a walk-in pantry door in view and modern pendant lighting."),
  "loc-luxury-view": kitchen("A high-end hillside home kitchen with huge windows framing a mountain and valley view, custom cabinetry, a long marble island and designer lighting."),
  "loc-historic": kitchen("A kitchen remodel in a historic brick home, exposed brick wall accent, new white cabinets, butcher block counters, vintage-inspired pendant lights, charming and modern."),
  "loc-ranch-update": kitchen("A fully updated 1980s ranch-style home kitchen with an open layout after a wall removal, new cabinets, new floors, and a large peninsula with seating."),
  "loc-townhome": kitchen("A compact, efficient modern townhome kitchen with a slim island, white cabinets, light countertops, smart storage and warm lighting."),
  "loc-farmhouse": kitchen("A spacious farmhouse kitchen in a rural custom home with a big apron sink, reclaimed beams, a large island, French doors to a porch with mountain views."),
  "loc-regional": "A beautiful Utah suburban home exterior at golden hour with the Wasatch Mountains behind it, landscaped front yard, clean modern craftsman architecture, no text, no people, photorealistic.",
  "loc-valley": "A wide view of a suburban Salt Lake Valley neighborhood at sunrise with homes and the Oquirrh and Wasatch mountains in the background, photorealistic, no text, no people.",
  // ---- guides ----
  "guide-cost": kitchen("A kitchen planning scene: a clean white countertop with kitchen floor plan drawings, a calculator, color swatches and a laptop with a budget sheet."),
  "guide-materials": kitchen("Two countertop slab samples side by side on a counter, one white quartz and one speckled natural granite, with a kitchen blurred in the background."),
  "guide-timeline": kitchen("A kitchen mid-installation: base cabinets installed, uppers being hung, countertop templates in place, tidy construction site in a Utah home."),
  "guide-finance": "An elegant modern Utah home exterior at golden hour with a warm welcoming front porch and mountain backdrop, photorealistic, no text, no people.",
  "guide-contractor": kitchen("A pair of hands pointing at a detailed kitchen remodel blueprint on a counter, with a hard hat, measuring tape and cabinet samples nearby."),
  "guide-roi": kitchen("A beautifully finished high-end kitchen staged for sale with fresh flowers, bowl of lemons, clean counters, bright natural light."),
};

const args = process.argv.slice(2);
const force = args.includes("--force");
const onlyArg = args.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.slice(7).split(",") : null;
const jobs = Object.entries(MANIFEST).filter(
  ([name]) => (!only || only.includes(name)) && (force || !fs.existsSync(path.join(outDir, name + ".jpg"))),
);
console.log(`${jobs.length} images to generate`);

async function generate(prompt) {
  let lastErr;
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "3:2" } },
            }),
          },
        );
        if (res.status === 429 || res.status >= 500) {
          lastErr = new Error(`${model} HTTP ${res.status}`);
          await new Promise((r) => setTimeout(r, 4000 * (attempt + 1)));
          continue;
        }
        const json = await res.json();
        if (!res.ok) {
          lastErr = new Error(`${model} ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
          break; // try next model
        }
        const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
        if (!part) {
          lastErr = new Error(`${model}: no image in response ${JSON.stringify(json).slice(0, 200)}`);
          continue;
        }
        return Buffer.from(part.inlineData.data, "base64");
      } catch (e) {
        lastErr = e;
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
  }
  throw lastErr;
}

let ok = 0;
let fail = 0;
async function worker(queue) {
  while (queue.length) {
    const [name, prompt] = queue.shift();
    try {
      const buf = await generate(prompt);
      await sharp(buf)
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(path.join(outDir, name + ".jpg"));
      ok++;
      console.log(`âœ“ ${name}  (${ok + fail}/${jobs.length})`);
    } catch (e) {
      fail++;
      console.error(`âœ— ${name}: ${e.message}`);
    }
  }
}
const queue = [...jobs];
await Promise.all([worker(queue), worker(queue), worker(queue)]);
console.log(`done: ${ok} ok, ${fail} failed`);

