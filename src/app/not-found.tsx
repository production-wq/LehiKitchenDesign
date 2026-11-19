import Link from "next/link";
import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = { title: { absolute: "Page Not Found | Lehi Kitchen Design" }, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="container-x grid gap-10 py-16 lg:grid-cols-2">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-2 font-display text-5xl font-semibold text-forest">We couldn&apos;t find that page</h1>
        <p className="mt-4 text-lg text-stone">The page may have moved. Try one of these, or request a free kitchen estimate.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-dark">Home</Link>
          <Link href="/services" className="btn btn-primary">Services</Link>
          <Link href="/locations" className="btn btn-dark">Service areas</Link>
        </div>
      </div>
      <LeadForm source="404" compact />
    </section>
  );
}
