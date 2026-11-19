import { SERVICES } from "@/data/services";
import { SITE } from "@/lib/site";
import CostEstimatorClient from "./CostEstimatorClient";

const OPTIONS = SERVICES.map((s) => ({ slug: s.slug, name: s.name, category: s.category }));

export default function CostEstimator() {
  return <CostEstimatorClient options={OPTIONS} phone={SITE.phone} phoneHref={SITE.phoneHref} />;
}
