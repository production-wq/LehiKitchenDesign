export type GuideSection = {
  h2: string;
  paras?: string[];
  bullets?: string[];
  table?: { caption: string; headers: string[]; rows: string[][] };
};

export type Guide = {
  slug: string;
  title: string; // H1
  metaTitle: string;
  description: string;
  keyword: string;
  image: string;
  published: string;
  modified: string;
  readTime: string;
  summary: string;
  intro: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  related: string[]; // service slugs
};

export const GUIDES: Guide[] = [
  {
    slug: "lehi-kitchen-remodel-cost",
    title: "How Much Does a Kitchen Remodel Cost in Lehi, UT? (2026 Pricing Guide)",
    metaTitle: "Kitchen Remodel Cost in Lehi, UT (2026 Pricing Guide)",
    description: "What a kitchen remodel really costs in Lehi, Utah in 2026 — tiered pricing from a $25k refresh to a $65k+ full gut, what drives cost, and where to save.",
    keyword: "how much does a kitchen remodel cost in Lehi UT",
    image: "/images/guide-cost.jpg",
    published: "2026-01-12",
    modified: "2026-11-02",
    readTime: "8 min read",
    summary: "Tiered kitchen remodel pricing for Lehi homeowners, with line-item ranges and cost-control tips.",
    intro: "Most Lehi homeowners spend between $35,000 and $75,000 on a kitchen remodel in 2026. A cosmetic refresh can start around $25,000, while a full gut remodel with layout changes and premium finishes often exceeds $65,000. The ranges below reflect typical Utah County labor, material and permit costs and are meant to help you plan — your fixed price comes from an in-home estimate.",
    sections: [
      {
        h2: "Lehi kitchen remodel cost by project tier",
        paras: ["Price is driven mainly by how much changes: surfaces only, surfaces plus some layout, or everything down to the studs."],
        table: {
          caption: "Typical 2026 kitchen remodel costs in Lehi and Utah County",
          headers: ["Tier", "Typical scope", "Typical cost"],
          rows: [
            ["Refresh", "Paint or reface cabinets, new counters, backsplash, lighting, hardware", "$25,000 – $38,000"],
            ["Mid-range remodel", "New semi-custom cabinets, quartz counters, tile, flooring, lighting", "$38,000 – $65,000"],
            ["Full gut remodel", "New layout, wall removal, electrical/plumbing, custom cabinets, premium surfaces", "$65,000 – $110,000"],
            ["Luxury / custom", "Bespoke cabinetry, book-matched stone, pro appliances, structural work", "$110,000 – $250,000+"],
          ],
        },
      },
      {
        h2: "Where the money goes",
        paras: ["Understanding the budget split helps you decide where to spend and where to save."],
        table: {
          caption: "Typical budget allocation for a mid-range kitchen remodel",
          headers: ["Category", "Share of budget"],
          rows: [
            ["Cabinetry and hardware", "30% – 40%"],
            ["Labor and project management", "15% – 25%"],
            ["Countertops", "10% – 15%"],
            ["Appliances", "10% – 15%"],
            ["Flooring, tile and backsplash", "7% – 10%"],
            ["Lighting and electrical", "5% – 8%"],
            ["Plumbing, permits and contingency", "5% – 10%"],
          ],
        },
      },
      {
        h2: "What makes Lehi kitchens cost more or less",
        bullets: [
          "Layout changes: moving a sink or range adds plumbing, gas and electrical work.",
          "Wall removal: a load-bearing wall needs an engineered beam, permits and finish repair — typically $4,500 to $18,000.",
          "Home age: homes in Historic Downtown Lehi may need new wiring and plumbing; newer builds in Holbrook Farms or Cold Spring Ranch rarely do.",
          "Cabinet choice: stock, semi-custom and custom cabinets can differ by tens of thousands of dollars.",
          "Appliance package: a professional range and paneled refrigerator can exceed the cost of cabinets in a smaller kitchen.",
          "HOA and permit requirements: a few weeks of review time can influence scheduling and cost.",
        ],
      },
      {
        h2: "Smart ways to control cost",
        bullets: [
          "Reface or paint cabinets if the boxes are in good shape — often a 40–60% savings over replacement.",
          "Keep plumbing where it is; sink and range moves add cost fast.",
          "Choose quartz or granite from mid-priced lines instead of exotic slabs.",
          "Order cabinets and appliances early so lead times do not delay the project.",
          "Phase the project: cabinets and counters first, then lighting and flooring.",
          "Ask for a fixed-price proposal with allowances listed so selections do not surprise you.",
        ],
      },
      {
        h2: "Get your Lehi kitchen remodel price",
        paras: ["A written fixed-price proposal after an in-home visit is the only reliable way to know your number. Use the form on this page for a free estimate; we typically schedule visits within a few business days."],
      },
    ],
    faqs: [
      { q: "What is the average kitchen remodel cost in Lehi, UT?", a: "Most Lehi kitchen remodels fall between $35,000 and $75,000 in 2026, depending on size, layout changes and finishes." },
      { q: "How much should I budget for a small kitchen remodel?", a: "Small kitchens typically cost $15,000–$45,000, with more affordable materials and less cabinetry but similar labor costs per fixture." },
      { q: "Does a kitchen remodel need a permit in Lehi?", a: "Structural, electrical and plumbing changes require permits; purely cosmetic work usually does not. We confirm requirements with Lehi City." },
      { q: "Should I include a contingency?", a: "Yes. Set aside 10–15% for surprises in older homes, such as hidden wiring or water damage." },
    ],
    related: ["kitchen-remodeling", "kitchen-renovation", "builder-grade-kitchen-upgrade", "cabinet-refacing"],
  },
  {
    slug: "utah-county-kitchen-remodel-cost-2026",
    title: "Average Kitchen Remodel Cost in Utah County (2026)",
    metaTitle: "Average Kitchen Remodel Cost in Utah County, UT (2026)",
    description: "2026 average kitchen remodel cost in Utah County by city type, home age and scope — with trends affecting labor and materials this year.",
    keyword: "average kitchen remodel cost Utah County 2026",
    image: "/images/guide-finance.jpg",
    published: "2026-02-03",
    modified: "2026-11-02",
    readTime: "7 min read",
    summary: "What kitchen remodels cost across Utah County in 2026, by scope and housing type.",
    intro: "Across Utah County the average kitchen remodel in 2026 lands between $40,000 and $70,000 for a full mid-range project. Costs vary by city, home age and level of finish, and rapid growth keeps contractor demand high, so booking lead time matters as much as price.",
    sections: [
      {
        h2: "Utah County average costs by scope",
        table: {
          caption: "Average kitchen remodel costs, Utah County, 2026",
          headers: ["Scope", "Average range", "Common in"],
          rows: [
            ["Cosmetic refresh", "$22,000 – $38,000", "Newer builds in Saratoga Springs, Vineyard, Eagle Mountain"],
            ["Mid-range remodel", "$38,000 – $65,000", "Lehi, American Fork, Pleasant Grove, Spanish Fork"],
            ["Major / gut remodel", "$65,000 – $110,000", "Orem, Provo, older American Fork ramblers"],
            ["Luxury custom", "$110,000+", "Alpine, Highland, Mapleton, Draper"],
          ],
        },
      },
      {
        h2: "Why costs vary across Utah County",
        bullets: [
          "Home age drives scope: Orem and Provo remodels often involve wiring, plumbing and wall changes.",
          "Lot and view: Alpine and Highland homes frequently include larger kitchens and high-end finishes.",
          "Distance: crews based in Lehi reach most of north and central Utah County in 20–35 minutes, keeping travel costs low.",
          "Material lead times: appliances and custom cabinets can take weeks to arrive, affecting schedules.",
        ],
      },
      {
        h2: "2026 cost trends to know",
        paras: [
          "Labor remains the largest variable because of strong residential and commercial demand across the Wasatch Front. Stone and cabinet prices are more stable than they were during recent supply-chain disruptions, though imported materials can still shift with tariffs and shipping.",
          "Homeowners are increasingly choosing selective upgrades — cabinet extensions, waterfall islands and better lighting — rather than full gut remodels, especially in 2005–2018 subdivisions.",
        ],
      },
      {
        h2: "How to compare contractor bids",
        bullets: [
          "Compare itemized scopes, not totals — make sure each bid includes the same cabinets, counters, flooring and permits.",
          "Check allowances: low allowances can make a bid look cheaper than it is.",
          "Confirm license, insurance and warranty terms in writing.",
          "Ask about project management: who is on site and how updates are provided.",
        ],
      },
    ],
    faqs: [
      { q: "What is the average kitchen remodel cost in Utah County?", a: "Roughly $40,000–$70,000 for a mid-range full remodel in 2026, with refreshes starting near $22,000 and luxury projects exceeding $110,000." },
      { q: "Is it cheaper to remodel in Utah County than in Salt Lake County?", a: "Costs are broadly similar. Differences come from home age, project size and finish level rather than county." },
      { q: "How far in advance should I book a remodel?", a: "Many Utah remodelers book 4–10 weeks out. Starting design early lets you order long-lead items in time." },
    ],
    related: ["kitchen-remodeling", "general-contractor-kitchen-remodel", "kitchen-design-and-build", "kitchen-renovation"],
  },
  {
    slug: "kitchen-renovation-price-per-square-foot-utah",
    title: "Kitchen Renovation Price per Square Foot in Utah",
    metaTitle: "Kitchen Renovation Cost per Square Foot in Utah (2026)",
    description: "Kitchen renovation price per square foot in Utah for 2026, with low, mid and high-end ranges and a worked example for a 200 sq. ft. kitchen.",
    keyword: "kitchen renovation price per square foot Utah",
    image: "/images/guide-cost.jpg",
    published: "2026-02-20",
    modified: "2026-11-02",
    readTime: "5 min read",
    summary: "Per-square-foot kitchen renovation pricing for Utah homes, with examples and caveats.",
    intro: "Most Utah kitchen renovations cost between $150 and $400 per square foot in 2026. Per-square-foot figures are a rough planning tool: cabinetry, appliances and structural changes do not scale neatly with floor area, so a 150 sq. ft. kitchen often costs more per foot than a 300 sq. ft. one.",
    sections: [
      {
        h2: "Utah kitchen renovation cost per square foot",
        table: {
          caption: "Per-square-foot cost ranges, Utah 2026",
          headers: ["Level", "Cost per sq. ft.", "What you get"],
          rows: [
            ["Basic", "$125 – $200", "Refacing or paint, laminate or entry quartz, basic lighting"],
            ["Mid-range", "$200 – $325", "Semi-custom cabinets, quartz, tile, new flooring and lighting"],
            ["High-end", "$325 – $500+", "Custom cabinetry, premium stone, pro appliances, layout changes"],
          ],
        },
      },
      {
        h2: "Example: a 200 sq. ft. Lehi kitchen",
        paras: ["At a mid-range level, a 200 sq. ft. kitchen lands around $40,000–$65,000. A basic refresh would be $25,000–$40,000, and a high-end remodel $65,000–$100,000."],
      },
      {
        h2: "Why per-square-foot pricing can mislead",
        bullets: [
          "Cabinets and appliances are priced by item, not area.",
          "Small kitchens carry more cost per square foot because every fixture and trade is still required.",
          "Structural work and utility moves are fixed costs regardless of size.",
          "Open-concept projects may include flooring and lighting in adjacent rooms.",
        ],
      },
    ],
    faqs: [
      { q: "What is the average cost per square foot for a kitchen remodel in Utah?", a: "Roughly $150–$400, with mid-range projects commonly near $200–$325 per square foot." },
      { q: "Why does my small kitchen cost more per square foot?", a: "Fixed costs such as appliances, plumbing fixtures and labor spread over fewer square feet." },
      { q: "Does per-square-foot pricing include appliances?", a: "It depends. Always confirm whether appliances, permits and design fees are included." },
    ],
    related: ["kitchen-renovation", "small-kitchen-remodel", "kitchen-remodeling", "quartz-countertops"],
  },
  {
    slug: "cabinet-refacing-vs-replacing-cost-utah",
    title: "Cabinet Refacing vs. Replacing: Cost Comparison for Utah Homes",
    metaTitle: "Cabinet Refacing vs. Replacing Cost in Utah (2026)",
    description: "Cabinet refacing vs replacing in Utah: cost, timeline, durability and when each option makes sense, with 2026 price ranges.",
    keyword: "cabinet refacing vs replacing cost Utah",
    image: "/images/cabinet-refacing.jpg",
    published: "2026-03-05",
    modified: "2026-11-02",
    readTime: "6 min read",
    summary: "Compare refacing, painting and full replacement on cost, time and results.",
    intro: "Refacing typically costs $6,000–$18,000 in Utah, while full cabinet replacement runs $15,000–$50,000 or more. Refacing is the best value when your boxes are solid and your layout works; replacement makes sense when you want to change the layout, add storage or the boxes are failing.",
    sections: [
      {
        h2: "Side-by-side comparison",
        table: {
          caption: "Refacing vs. replacing vs. painting",
          headers: ["Option", "Typical cost", "Time on site", "Best for"],
          rows: [
            ["Painting", "$3,500 – $9,000", "5–8 days", "Solid cabinets, color change only"],
            ["Refacing", "$6,000 – $18,000", "1–2 weeks", "Sound boxes, new door style"],
            ["Semi-custom replacement", "$9,000 – $28,000", "1–2 weeks + lead time", "Better storage, new layout"],
            ["Custom replacement", "$15,000 – $50,000", "1–2 weeks + 6–12 week lead", "Precise fit, premium finishes"],
          ],
        },
      },
      {
        h2: "When refacing is the right call",
        bullets: [
          "Cabinet boxes are structurally sound with no water damage.",
          "Your layout works and you are not moving appliances.",
          "You want a new look without removing countertops.",
          "You prefer a faster project with less disruption.",
        ],
      },
      {
        h2: "When to replace cabinets",
        bullets: [
          "You want to change the layout or add an island.",
          "Boxes are particleboard with swelling, sagging shelves or failing hinges.",
          "You need more storage than the existing cabinets can offer.",
          "You are planning to replace countertops and flooring anyway.",
        ],
      },
    ],
    faqs: [
      { q: "Is cabinet refacing worth it?", a: "Yes, when boxes are sound and the layout works. It typically costs 40–60% less than replacement and takes less time." },
      { q: "Can you reface cabinets with a new layout?", a: "Refacing keeps existing boxes in place. A new layout requires replacing or modifying cabinets." },
      { q: "How long does refacing last?", a: "With quality materials and normal use, refaced cabinets can last many years." },
    ],
    related: ["cabinet-refacing", "kitchen-cabinet-painting", "semi-custom-cabinets", "custom-kitchen-cabinets"],
  },
  {
    slug: "quartz-vs-granite-countertops-utah",
    title: "Quartz vs. Granite Countertops for Utah Homes",
    metaTitle: "Quartz vs. Granite Countertops in Utah (2026 Comparison)",
    description: "Quartz vs granite countertops for Utah homes: cost, durability, maintenance, heat resistance and look — with a clear recommendation by lifestyle.",
    keyword: "quartz vs granite countertops Utah homes",
    image: "/images/guide-materials.jpg",
    published: "2026-03-19",
    modified: "2026-11-02",
    readTime: "6 min read",
    summary: "A practical comparison of quartz and granite for Utah kitchens.",
    intro: "Both materials perform well in Utah kitchens. Quartz is engineered, non-porous and uniform, so it needs no sealing; granite is natural, heat-tolerant and unique. In 2026 they cost about the same installed — $60–$125 per square foot — so the choice comes down to look and maintenance preference.",
    sections: [
      {
        h2: "Quartz vs. granite at a glance",
        table: {
          caption: "Quartz and granite compared",
          headers: ["Factor", "Quartz", "Granite"],
          rows: [
            ["Typical installed cost", "$65 – $125 / sq. ft.", "$60 – $115 / sq. ft."],
            ["Maintenance", "No sealing required", "Seal every 1–2 years"],
            ["Heat resistance", "Good; use trivets", "Excellent"],
            ["Stain resistance", "Excellent (non-porous)", "Good when sealed"],
            ["Pattern consistency", "Uniform and predictable", "Unique, varies by slab"],
            ["Best for", "Busy families, low maintenance", "Natural look, heavy cooking"],
          ],
        },
      },
      {
        h2: "Utah considerations",
        bullets: [
          "Utah's hard water can leave mineral spots on any surface; quartz and sealed granite both clean easily with a mild cleaner.",
          "Dry winter air does not affect stone countertops, but dramatic temperature changes near exterior windows can stress seams over time.",
          "Newer homes in Lehi, Saratoga Springs and Eagle Mountain often choose white quartz for brightness and consistency.",
          "Older homes with warmer cabinetry often look best with honed granite or soft-veined quartz.",
        ],
      },
      {
        h2: "Our recommendation",
        paras: ["Choose quartz if you want a consistent look and minimal upkeep. Choose granite if you prefer natural variation, cook with high heat or want a leathered finish. Visit a slab yard — seeing the material in person matters more than any specification sheet."],
      },
    ],
    faqs: [
      { q: "Is quartz or granite better for resale?", a: "Both appeal to buyers. White or soft-gray quartz is currently the most requested in newer Utah homes." },
      { q: "Which is more durable, quartz or granite?", a: "Both are very durable. Granite handles heat better; quartz resists stains and needs no sealing." },
      { q: "Is quartz cheaper than granite?", a: "They overlap in price. Entry-level granite can be less expensive; premium quartz brands may cost more." },
    ],
    related: ["quartz-countertops", "granite-countertops", "waterfall-kitchen-island", "porcelain-slab-backsplash"],
  },
  {
    slug: "kitchen-remodel-roi-utah",
    title: "Kitchen Remodel ROI for Utah Real Estate",
    metaTitle: "Kitchen Remodel ROI in Utah Real Estate (2026)",
    description: "What kitchen remodel return on investment looks like in Utah's housing market in 2026, which upgrades pay back most and how to avoid over-building.",
    keyword: "kitchen remodel ROI Utah real estate",
    image: "/images/guide-roi.jpg",
    published: "2026-04-02",
    modified: "2026-11-02",
    readTime: "6 min read",
    summary: "Which kitchen upgrades return the most value in Utah and how to avoid over-improving.",
    intro: "Kitchen remodels typically recover 50–80% of their cost at resale, with minor and mid-range projects returning more than luxury remodels. In Utah's competitive markets, a well-planned kitchen can shorten days on market even when pure dollar ROI is below 100%.",
    sections: [
      {
        h2: "Typical ROI by project type",
        table: {
          caption: "Estimated resale value recovered",
          headers: ["Project", "Estimated recovery"],
          rows: [
            ["Minor refresh (paint/reface, counters, lighting)", "70% – 90%"],
            ["Mid-range remodel", "60% – 80%"],
            ["Major / luxury remodel", "45% – 65%"],
          ],
        },
        paras: ["These are planning ranges and vary by neighborhood, home price and market conditions."],
      },
      {
        h2: "Upgrades buyers notice most",
        bullets: [
          "Cabinets that reach the ceiling with updated hardware",
          "Quartz or granite counters with a clean backsplash",
          "A functional island with seating",
          "Layered lighting and updated fixtures",
          "A well-organized pantry",
          "Durable, continuous flooring",
        ],
      },
      {
        h2: "Avoid over-improving for your neighborhood",
        paras: ["A $140,000 kitchen in a home where comparable sales are $550,000 rarely pays back. In Alpine or Highland luxury finishes are expected; in Orem or Eagle Mountain buyers value clean, durable, modern updates more than premium materials."],
      },
    ],
    faqs: [
      { q: "Is a kitchen remodel worth it before selling in Utah?", a: "Often yes — focused updates such as paint, counters and lighting usually return the most." },
      { q: "Which kitchen upgrade has the best ROI?", a: "Minor refreshes typically have the best percentage return; layout changes and luxury finishes return less per dollar." },
      { q: "How much value does a kitchen add to a home?", a: "It depends on the home and market; a well-planned remodel can add tens of thousands and improve marketability." },
    ],
    related: ["kitchen-renovation", "builder-grade-kitchen-upgrade", "cabinet-refacing", "quartz-countertops"],
  },
  {
    slug: "best-kitchen-remodeling-contractors-lehi",
    title: "How to Choose the Best Kitchen Remodeling Contractor in Lehi",
    metaTitle: "Best Kitchen Remodeling Contractors in Lehi: How to Choose",
    description: "How to evaluate the best kitchen remodeling contractors in Lehi, UT — licensing, reviews, bids, contracts and red flags to watch for.",
    keyword: "best kitchen remodeling contractors in Lehi reviews",
    image: "/images/guide-contractor.jpg",
    published: "2026-04-16",
    modified: "2026-11-02",
    readTime: "7 min read",
    summary: "A checklist for vetting Lehi kitchen contractors, reading reviews and comparing bids.",
    intro: "The best kitchen remodeling contractor for you is licensed, insured, communicates clearly and has a verifiable local track record. Reviews help, but the decision should rest on references, written scopes and how well the contractor listens.",
    sections: [
      {
        h2: "Vetting checklist",
        bullets: [
          "Verify the contractor's license and insurance with the Utah Division of Professional Licensing.",
          "Read recent Google reviews for patterns — communication, schedule and cleanliness matter as much as the final result.",
          "Ask for local references and photos of finished projects in homes like yours.",
          "Confirm who manages the job daily and how you will receive updates.",
          "Request a written, itemized scope with allowances and exclusions.",
          "Review warranty terms in writing.",
        ],
      },
      {
        h2: "How to read reviews",
        paras: ["Look for detailed reviews that describe the project, timeline and how problems were handled. A few critical reviews with professional responses are normal; a wall of vague five-star posts may deserve a closer look."],
      },
      {
        h2: "Red flags",
        bullets: [
          "Large upfront payments beyond a standard deposit",
          "No written contract or vague scope",
          "Pressure to sign immediately",
          "No license, insurance or permits",
          "Bids far below others without a clear explanation",
        ],
      },
      {
        h2: "Questions to ask on the first call",
        bullets: [
          "Do you handle design in-house?",
          "Who pulls permits and schedules inspections?",
          "What is your typical timeline for a kitchen like mine?",
          "How do you handle change orders?",
          "Can I speak with recent clients in my neighborhood?",
        ],
      },
    ],
    faqs: [
      { q: "How do I find the best kitchen remodelers in Lehi?", a: "Start with licensed local contractors, compare recent reviews and references and request detailed written bids from two or three." },
      { q: "How many bids should I get?", a: "Two to three itemized bids give a good comparison without becoming overwhelming." },
      { q: "What should a contract include?", a: "Scope, price, payment schedule, timeline, allowances, change-order process, warranty and permit responsibilities." },
    ],
    related: ["general-contractor-kitchen-remodel", "kitchen-design-and-build", "kitchen-remodeling", "custom-kitchen-remodel"],
  },
  {
    slug: "kitchen-remodel-financing-utah",
    title: "Kitchen Remodel Financing Options in Utah",
    metaTitle: "Kitchen Remodel Financing in Utah: Options Compared (2026)",
    description: "Kitchen remodel financing in Utah: HELOC, home equity loans, cash-out refinance, personal loans and contractor financing compared.",
    keyword: "kitchen remodel financing Utah",
    image: "/images/guide-finance.jpg",
    published: "2026-05-07",
    modified: "2026-11-02",
    readTime: "6 min read",
    summary: "Compare ways to pay for a kitchen remodel in Utah, with pros and cons of each option.",
    intro: "Utah homeowners typically finance kitchen remodels through a home equity line of credit (HELOC), a home equity loan, a cash-out refinance, a personal loan or paid-in-stages cash. This guide is general information, not financial advice — talk with a licensed lender about your own situation.",
    sections: [
      {
        h2: "Financing options compared",
        table: {
          caption: "Common ways to finance a kitchen remodel",
          headers: ["Option", "Pros", "Considerations"],
          rows: [
            ["HELOC", "Flexible draws; interest on what you use", "Variable rates; secured by your home"],
            ["Home equity loan", "Fixed rate and payment", "Closing costs; lump sum; secured by your home"],
            ["Cash-out refinance", "One payment; potentially lower rate", "Resets your mortgage; closing costs"],
            ["Personal loan", "Fast; unsecured", "Higher rates; shorter terms"],
            ["Cash / phased project", "No interest", "Longer timeline"],
          ],
        },
      },
      {
        h2: "Tips before you borrow",
        bullets: [
          "Get a fixed-price proposal first so you borrow the right amount.",
          "Include a 10–15% contingency in your budget.",
          "Compare at least three lenders on rate, fees and terms.",
          "Consider phasing so you only borrow for the highest-impact work.",
        ],
      },
    ],
    faqs: [
      { q: "What is the best way to finance a kitchen remodel?", a: "It depends on your equity, rate environment and timeline. A HELOC suits staged projects; a fixed home equity loan suits one-time budgets." },
      { q: "Can I finance a kitchen remodel with a personal loan?", a: "Yes, though rates are typically higher than home-equity options." },
      { q: "Do you offer financing?", a: "We can provide fixed-price proposals that lenders can use, and we are happy to talk through phasing options." },
    ],
    related: ["kitchen-remodeling", "kitchen-renovation", "builder-grade-kitchen-upgrade", "kitchen-design-and-build"],
  },
  {
    slug: "how-long-does-a-kitchen-remodel-take-utah",
    title: "How Long Does a Kitchen Remodel Take in Utah?",
    metaTitle: "How Long Does a Kitchen Remodel Take in Utah? (2026 Timeline)",
    description: "Kitchen remodel timelines in Utah: design, permits, lead times and construction for refreshes, full remodels and structural projects.",
    keyword: "how long does a kitchen remodel take in Utah",
    image: "/images/guide-timeline.jpg",
    published: "2026-05-28",
    modified: "2026-11-02",
    readTime: "5 min read",
    summary: "Typical timelines from first call to final walkthrough, with lead times to plan around.",
    intro: "A Utah kitchen remodel typically takes 6–12 weeks of construction, plus 3–8 weeks of design, selections and cabinet lead time. Refreshes can finish in 3–5 weeks, while structural or custom projects may take 4–6 months from first meeting to final walkthrough.",
    sections: [
      {
        h2: "Typical timelines by project type",
        table: {
          caption: "Kitchen remodel timeline estimates",
          headers: ["Project", "Design & ordering", "On-site construction"],
          rows: [
            ["Refresh / refacing", "2–4 weeks", "1–4 weeks"],
            ["Mid-range remodel", "3–6 weeks", "5–8 weeks"],
            ["Full gut remodel", "4–8 weeks", "8–12 weeks"],
            ["Structural / open concept", "6–10 weeks", "10–14 weeks"],
            ["Luxury custom", "8–14 weeks", "12–20 weeks"],
          ],
        },
      },
      {
        h2: "What affects the schedule",
        bullets: [
          "Cabinet lead times: 4–12 weeks depending on type.",
          "Permits and HOA review: days to a few weeks.",
          "Stone fabrication: typically 1–2 weeks after templating.",
          "Appliance delivery dates and special-order items.",
          "Winter weather can affect exterior work such as bump-outs.",
        ],
      },
      {
        h2: "Typical construction sequence",
        bullets: [
          "Week 1: demolition and protection",
          "Weeks 2–3: framing, electrical, plumbing and inspections",
          "Weeks 3–4: insulation, drywall, texture and paint",
          "Weeks 4–6: cabinets, countertops, backsplash and flooring",
          "Weeks 6–8: lighting, appliances, punch list and final walkthrough",
        ],
      },
    ],
    faqs: [
      { q: "How long does a kitchen remodel take in Utah?", a: "Most take 6–12 weeks on site, plus design and ordering time before construction starts." },
      { q: "Can I speed up my remodel?", a: "Decide selections early and order cabinets and appliances as soon as the design is approved." },
      { q: "Will I be without a kitchen the whole time?", a: "You will typically be without full use for 4–8 weeks; we help you set up a temporary kitchen." },
    ],
    related: ["kitchen-remodeling", "general-contractor-kitchen-remodel", "cabinet-refacing", "kitchen-design-and-build"],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
