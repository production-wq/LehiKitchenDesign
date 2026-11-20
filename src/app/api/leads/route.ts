import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";

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

const LEAD_TO = process.env.LEAD_TO_EMAIL || "ppl@builtrightdigital.com";

const esc = (v: string) => v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Send the lead via Google Workspace SMTP. Needs SMTP_USER + SMTP_PASS (a Google app password).
async function emailLead(lead: Record<string, unknown> & { name: string; email: string; service: string; location: string }) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.warn("[leads] SMTP_USER / SMTP_PASS not set — skipping email");
    return false;
  }
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });
  const rows: [string, unknown][] = [
    ["Name", lead.name], ["Phone", lead.phone], ["Email", lead.email], ["ZIP", lead.zip],
    ["Project", lead.service], ["Timeline", lead.timeline], ["Budget", lead.budget], ["Location", lead.location],
    ["Message", lead.message], ["Page", lead.page], ["Source", lead.source], ["Referrer", lead.referrer],
    ...Object.entries((lead.utm as Record<string, string>) ?? {}),
    ["Received", lead.receivedAt], ["IP", lead.ip],
  ];
  const filled = rows.filter(([, v]) => v !== "" && v != null).map(([k, v]) => [k, String(v)] as const);
  const subjectBits = [lead.service, lead.location].filter(Boolean).join(" · ");
  await transport.sendMail({
    from: { name: "Lehi Kitchen Design Website", address: process.env.SMTP_FROM || user },
    to: LEAD_TO,
    replyTo: { name: lead.name, address: lead.email },
    subject: `New lead: ${lead.name}${subjectBits ? ` — ${subjectBits}` : ""}`,
    text: filled.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<h2 style="font-family:Georgia,serif;color:#1d2b3a">New website lead</h2><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${filled
      .map(([k, v]) => `<tr><td style="color:#5c6672;vertical-align:top;white-space:nowrap"><b>${esc(k)}</b></td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
      .join("")}</table>`,
  });
  return true;
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

  // 3) Email to the production inbox (Google Workspace)
  try {
    if (await emailLead(lead)) stored = true;
  } catch (err) {
    console.error("[leads] email failed:", (err as Error).message);
  }

  console.log(`[lead] ${lead.name} | ${lead.phone} | ${lead.service} | ${lead.page}`);

  if (!stored) {
    return NextResponse.json({ ok: false, error: "We could not save your request. Please call us instead." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
