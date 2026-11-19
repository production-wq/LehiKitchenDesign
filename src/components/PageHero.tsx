import Image from "next/image";
import Breadcrumbs from "./Breadcrumbs";
import { CheckIcon } from "./Icons";

type Props = {
  eyebrow?: string;
  h1: string;
  sub: string;
  image: string;
  imageAlt: string;
  crumbs?: { name: string; path: string }[];
  bullets?: string[];
  form?: React.ReactNode;
  priority?: boolean;
  children?: React.ReactNode;
};

export default function PageHero({ eyebrow, h1, sub, image, imageAlt, crumbs, bullets, form, priority = true, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-forest text-white">
      <Image src={image} alt={imageAlt} fill priority={priority} sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/55 to-forest/5" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
      <div className={`container-x grid gap-10 py-10 sm:py-14 ${form ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20" : "lg:py-24"}`}>
        <div>
          {crumbs && <div className="mb-6"><Breadcrumbs items={crumbs} light /></div>}
          {eyebrow && <p className="eyebrow !text-brass">{eyebrow}</p>}
          <h1 className="mt-2 font-display [text-shadow:0_2px_28px_rgb(0_0_0/0.35)] text-[2.35rem] font-semibold leading-[1.05] sm:text-5xl lg:text-[3.6rem]">{h1}</h1>
          <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-white/85 sm:text-lg">{sub}</p>
          {bullets && (
            <ul className="mt-6 grid gap-2.5 text-[15px] text-white/90 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5"><CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-brass" /> {b}</li>
              ))}
            </ul>
          )}
          {children}
        </div>
        {form && <div className="lg:justify-self-end lg:w-full lg:max-w-[30rem]" id="quote">{form}</div>}
      </div>
    </section>
  );
}
