import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { CheckIcon } from "@/components/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Thank You | Lehi Kitchen Design",
  description: "Thanks for contacting Lehi Kitchen Design. We will reach out shortly to schedule your free estimate.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest text-brass"><CheckIcon width={32} height={32} /></span>
      <h1 className="mt-6 font-display text-4xl font-semibold text-forest sm:text-5xl">Thank you — we&apos;ve got your request</h1>
      <p className="mt-4 max-w-xl text-lg text-stone">A member of our team will contact you within one business day to schedule your free in-home estimate. Need us sooner? Call <a href={`tel:${SITE.phoneHref}`} className="font-bold text-forest underline decoration-brass underline-offset-4">{SITE.phone}</a>.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/guides/lehi-kitchen-remodel-cost" className="btn btn-primary">Read the Lehi cost guide</Link>
        <Link href="/gallery" className="btn btn-dark">Browse design ideas</Link>
      </div>
    </section>
  );
}
