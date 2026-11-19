import Link from "next/link";
import { SITE } from "@/lib/site";
import { PhoneIcon } from "./Icons";

/** Sticky call / estimate bar for phones. */
export default function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-2.5 shadow-[0_-8px_24px_-12px_rgb(0_0_0/0.25)] backdrop-blur sm:hidden">
      <div className="grid grid-cols-2 gap-2.5">
        <a href={`tel:${SITE.phoneHref}`} className="btn btn-dark !py-3 text-sm"><PhoneIcon width={16} height={16} /> Call Now</a>
        <Link href="#estimate" className="btn btn-primary !py-3 text-sm">Free Estimate</Link>
      </div>
    </div>
  );
}
