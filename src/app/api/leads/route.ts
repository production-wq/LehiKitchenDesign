import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

// naive in-memory rate limit: 6 submissions / 10 min / IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 6;
}

const clean = (v: unknown, max = 400) => (typeof v === "string" ? v.replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot / bot checks — pretend success so bots do not retry.
  const elapsed = Number(body.elapsedMs ?? 0);
  if (clean(body.company) || elapsed < 1500) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please call us instead." }, { status: 429 });
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    name: clean(body.name, 80),
    phone: clean(body.phone, 25),
    email: clean(body.email, 120),
    zip: clean(body.zip, 5),
    service: clean(body.service, 120),
    timeline: clean(body.timeline, 60),
    budget: clean(body.budget, 60),
    message: clean(body.message, 1500),
    location: clean(body.location, 120),
    page: clean(body.page, 200),
    source: clean(body.source, 80),
    referrer: clean(body.referrer, 300),
    consent: body.consent ? true : false,
    utm: Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].map((k) => [k, clean(body[k], 120)]).filter(([, v]) => v),
    ),
    ip,
    userAgent: clean(req.headers.get("user-agent"), 200),
  };

  if (lead.name.length < 2) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  if (!/^[0-9()+\-.\s]{10,20}$/.test(lead.phone) || lead.phone.replace(/\D/g, "").length < 10)
    return NextResponse.json({ ok: false, error: "Please enter a valid phone number." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email))
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  if (!/^\d{5}$/.test(lead.zip)) return NextResponse.json({ ok: false, error: "Please enter a 5-digit ZIP code." }, { status: 400 });
  if (!lead.consent) return NextResponse.json({ ok: false, error: "Please accept the contact consent to continue." }, { status: 400 });

  let stored = false;

  // 1) Local file store (works on localhost / any Node server with a writable disk)
  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(lead) + "\n", "utf8");
    stored = true;
  } catch (err) {
    console.warn("[leads] could not write data/leads.jsonl:", (err as Error).message);
  }

  // 2) Optional webhook (CRM / Zapier / Make / GoHighLevel / Slack)
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
      if (r.ok) stored = true;
      else console.warn("[leads] webhook responded", r.status);
    } catch (err) {
      console.warn("[leads] webhook failed:", (err as Error).message);
    }
  }

  console.log(`[lead] ${lead.name} | ${lead.phone} | ${lead.service} | ${lead.page}`);

  if (!stored) {
    return NextResponse.json({ ok: false, error: "We could not save your request. Please call us instead." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
