"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, PhoneIcon, ShieldIcon } from "./Icons";

export type ServiceOption = { slug: string; name: string; category: string };

type Props = {
  options: ServiceOption[];
  heading: string;
  subheading?: string;
  defaultService?: string;
  location?: string;
  source: string;
  phone: string;
  phoneHref: string;
  variant?: "card" | "plain";
  compact?: boolean;
  id?: string;
  extraMessage?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function LeadFormClient({
  options,
  heading,
  subheading,
  defaultService,
  location,
  source,
  phone,
  phoneHref,
  variant = "card",
  compact = false,
  id,
  extraMessage,
}: Props) {
  const uid = useId();
  const router = useRouter();
  const startedAt = useRef<number>(Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  const categories = Array.from(new Set(options.map((o) => o.category)));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    payload.page = window.location.pathname;
    payload.source = source;
    payload.referrer = document.referrer || "";
    payload.elapsedMs = Date.now() - startedAt.current;
    const qs = new URLSearchParams(window.location.search);
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"]) {
      const v = qs.get(k);
      if (v) payload[k] = v;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please call us instead.");
      window.dataLayer?.push({ event: "generate_lead", lead_source: source, lead_service: payload.service || "", lead_location: location || "" });
      router.push("/thank-you");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please call us instead.");
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-stone/60 shadow-sm focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/30";
  const label = "mb-1 block text-xs font-semibold uppercase tracking-wide text-stone";

  const wrapper =
    variant === "card"
      ? "rounded-3xl bg-white p-5 shadow-lift ring-1 ring-black/5 sm:p-7"
      : "";

  return (
    <div id={id} className={wrapper}>
      <h2 className="font-display text-2xl font-semibold leading-tight text-forest sm:text-[1.7rem]">{heading}</h2>
      {subheading && <p className="mt-1.5 text-sm text-stone">{subheading}</p>}

      <form onSubmit={onSubmit} className="mt-5 space-y-3.5" noValidate={false}>
        {/* honeypot */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor={`${uid}-company`}>Company</label>
          <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="location" value={location || ""} />

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor={`${uid}-name`}>Full name</label>
            <input id={`${uid}-name`} name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Jane Smith" className={field} />
          </div>
          <div>
            <label className={label} htmlFor={`${uid}-phone`}>Mobile phone</label>
            <input id={`${uid}-phone`} name="phone" type="tel" required inputMode="tel" autoComplete="tel" minLength={10} maxLength={20} title="Enter a 10-digit phone number" placeholder="(801) 555-0123" className={field} />
          </div>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor={`${uid}-email`}>Email</label>
            <input id={`${uid}-email`} name="email" type="email" required maxLength={120} autoComplete="email" placeholder="you@email.com" className={field} />
          </div>
          <div>
            <label className={label} htmlFor={`${uid}-zip`}>ZIP code</label>
            <input id={`${uid}-zip`} name="zip" required inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" placeholder="84043" className={field} />
          </div>
        </div>
        <div>
          <label className={label} htmlFor={`${uid}-service`}>What are you planning?</label>
          <select id={`${uid}-service`} name="service" defaultValue={defaultService || ""} required className={field}>
            <option value="" disabled>Select your project…</option>
            {categories.map((c) => (
              <optgroup key={c} label={c}>
                {options.filter((o) => o.category === c).map((o) => (
                  <option key={o.slug} value={o.name}>{o.name}</option>
                ))}
              </optgroup>
            ))}
            <option value="Not sure yet">Not sure yet — need advice</option>
          </select>
        </div>
        <div className={compact ? "grid gap-3.5" : "grid gap-3.5 sm:grid-cols-2"}>
          <div>
            <label className={label} htmlFor={`${uid}-timeline`}>Timeline</label>
            <select id={`${uid}-timeline`} name="timeline" defaultValue="" className={field}>
              <option value="" disabled>When do you want to start?</option>
              <option>As soon as possible</option>
              <option>Within 1–3 months</option>
              <option>3–6 months</option>
              <option>Just researching</option>
            </select>
          </div>
          {!compact && <div>
            <label className={label} htmlFor={`${uid}-budget`}>Budget (optional)</label>
            <select id={`${uid}-budget`} name="budget" defaultValue="" className={field}>
              <option value="" disabled>Select a range…</option>
              <option>Under $25,000</option>
              <option>$25,000 – $50,000</option>
              <option>$50,000 – $90,000</option>
              <option>$90,000+</option>
              <option>Not sure</option>
            </select>
          </div>}
        </div>
        {!compact && (
          <div>
            <label className={label} htmlFor={`${uid}-msg`}>Project details (optional)</label>
            <textarea id={`${uid}-msg`} name="message" rows={3} maxLength={1500} defaultValue={extraMessage} placeholder="Tell us about your kitchen, goals and any must-haves…" className={field} />
          </div>
        )}
        {compact && extraMessage && <input type="hidden" name="message" value={extraMessage} />}

        <label className="flex items-start gap-2.5 text-[12px] leading-snug text-stone">
          <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#b98a3e]" />
          <span>
            I agree to be contacted by Lehi Kitchen Design by phone, text or email about my project. Message and data rates may apply; consent is not a condition of purchase. See our{" "}
            <a href="/privacy" className="underline">Privacy Policy</a>.
          </span>
        </label>

        {status === "error" && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full !py-4 text-base disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Get My Free Estimate"}
        </button>

        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-stone">
          <li className="flex items-center gap-1"><CheckIcon width={14} height={14} className="text-brass-600" /> Free, no obligation</li>
          <li className="flex items-center gap-1"><ShieldIcon width={14} height={14} className="text-brass-600" /> Your info is never sold</li>
        </ul>
        <p className="flex items-center justify-center gap-2 border-t border-line pt-3 text-sm text-stone">
          <PhoneIcon width={16} height={16} /> Prefer to talk? <a href={`tel:${phoneHref}`} className="font-bold text-forest underline-offset-2 hover:underline">{phone}</a>
        </p>
      </form>
    </div>
  );
}
