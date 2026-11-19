import Image from "next/image";
import LeadForm from "./LeadForm";
import { CheckIcon } from "./Icons";

/** Sitewide lead-capture band rendered above the footer on every page. */
export default function FooterCTA({ source = "footer-cta" }: { source?: string }) {
  return (
    <section id="estimate" aria-labelledby="estimate-heading" className="relative mt-20 overflow-hidden bg-forest">
      <Image
        src="/images/cta-banner.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
        loading="lazy"
      />
      <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
        <div className="text-white">
          <p className="eyebrow !text-brass">Free estimate</p>
          <h2 id="estimate-heading" className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Ready for the kitchen you&apos;ve been picturing?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Tell us about your Lehi-area kitchen and we&apos;ll schedule a free in-home visit, measure your space and follow up with a clear, fixed-price proposal.
          </p>
          <ul className="mt-7 space-y-3 text-white/90">
            {[
              "Free in-home consultation and measure",
              "Fixed-price written proposal — no surprise change orders",
              "Licensed, insured and permit-ready",
              "Same-business-day response",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3"><CheckIcon className="mt-0.5 shrink-0 text-brass" /> {t}</li>
            ))}
          </ul>
        </div>
        <LeadForm source={source} heading="Request Your Free Estimate" />
      </div>
    </section>
  );
}
