# Lehi Kitchen Design

Next.js 16 (App Router, TypeScript, Tailwind v4) lead-generation site for a Lehi, Utah kitchen remodeler.

**107 indexable pages**: home, 29 service pages, 59 location pages (Lehi neighborhoods, cities, regional hubs, ZIP page), 9 cost guides, plus index, about, contact, gallery, estimator, legal pages. Every page has a lead form.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Before launch — replace placeholders

Edit `src/lib/site.ts`:

- `phone` / `phoneHref` — currently a fictional 555 number
- `email`, `address`, `hours`, `social`, `license`
- Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the production domain so canonicals, sitemap and JSON-LD use it.

Also review location/neighborhood copy (`src/data/locations-*.ts`) for local accuracy, and add real reviews / project photos when available (no fake ratings are published in the schema).

## Leads

`POST /api/leads` validates, rate-limits (honeypot + time check), and:

1. appends to `data/leads.jsonl` (git-ignored; works on any Node host with a writable disk), and
2. forwards to `LEAD_WEBHOOK_URL` if set (Zapier / Make / GoHighLevel / CRM).

On serverless hosts (e.g. Vercel) the disk is read-only — set `LEAD_WEBHOOK_URL` there.
Submitting fires `dataLayer` event `generate_lead` and redirects to `/thank-you` (noindex) for conversion tracking.

## Structure

| Path | Purpose |
| --- | --- |
| `src/data/services.ts` | 29 services (content, FAQs, pricing, related) |
| `src/data/locations-*.ts` | 59 location pages across 5 tiers |
| `src/data/guides.ts` | 9 cost / planning guides |
| `src/lib/schema.ts` | JSON-LD builders (Organization, GeneralContractor, WebSite, WebPage, Service, Article, FAQPage, BreadcrumbList, ItemList) |
| `src/lib/seo.ts` | Metadata helper (title/description/canonical/OG/Twitter/geo) |
| `src/components/LeadFormClient.tsx` | Lead form |
| `src/components/CostEstimatorClient.tsx` | Interactive cost calculator with lead capture |

URL structure: `/services/[slug]`, `/locations/[city-ut]`, `/locations/lehi/[neighborhood]`, `/locations/[city-ut]/[neighborhood]`, `/guides/[slug]`.

## Images

AI-generated with the Gemini image API (`scripts/generate-images.mjs`, reads `GEMINI_API_KEY` from `.env.local`).
Images are labelled as illustrative concept imagery on the site. Re-run for missing images with `node scripts/generate-images.mjs`; `--force` regenerates, `--only=name1,name2` targets specific files.

## Audit

With a production server running (`npm start -- -p 3100`): `node scripts/audit.mjs http://localhost:3100` checks every sitemap URL for one H1, title/description length and uniqueness, canonical, form presence, JSON-LD validity and image alt text.
