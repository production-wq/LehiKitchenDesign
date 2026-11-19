import { SERVICES } from "@/data/services";
import { SITE } from "@/lib/site";
import LeadFormClient from "./LeadFormClient";

const OPTIONS = SERVICES.map((s) => ({ slug: s.slug, name: s.name, category: s.category }));

type Props = {
  heading?: string;
  subheading?: string;
  defaultService?: string;
  location?: string;
  source: string;
  variant?: "card" | "plain";
  compact?: boolean;
  id?: string;
  extraMessage?: string;
};

/** Server wrapper: builds the service list once and renders the client form. */
export default function LeadForm({
  heading = "Get Your Free Kitchen Estimate",
  subheading = "Tell us about your project — we respond the same business day.",
  ...rest
}: Props) {
  return (
    <LeadFormClient
      options={OPTIONS}
      heading={heading}
      subheading={subheading}
      phone={SITE.phone}
      phoneHref={SITE.phoneHref}
      {...rest}
    />
  );
}
