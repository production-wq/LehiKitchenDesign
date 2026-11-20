"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

type Cat = { name: string; items: { label: string; href: string }[] };

export default function MobileMenu({
  categories,
  locations,
  phone,
  phoneHref,
}: {
  categories: Cat[];
  locations: { label: string; href: string }[];
  phone: string;
  phoneHref: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation (adjust state during render instead of in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-forest"
      >
        <MenuIcon />
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-cream" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="container-x flex h-[68px] items-center justify-between">
            <span className="font-display text-xl font-semibold text-forest">Menu</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-forest">
              <CloseIcon />
            </button>
          </div>
          <div className="container-x pb-28 pt-2">
            <ul className="divide-y divide-line text-lg font-semibold">
              <li><Link href="/free-estimate" className="block py-3.5 text-brass-600">Free Estimate</Link></li>
              <li><Link href="/services" className="block py-3.5">All Services</Link></li>
              <li><Link href="/locations" className="block py-3.5">All Service Areas</Link></li>
              <li><Link href="/gallery" className="block py-3.5">Gallery</Link></li>
              <li><Link href="/guides" className="block py-3.5">Cost Guides</Link></li>
              <li><Link href="/about" className="block py-3.5">About</Link></li>
              <li><Link href="/contact" className="block py-3.5">Contact</Link></li>
            </ul>

            <p className="eyebrow mb-1 mt-8">Services</p>
            {categories.map((c) => (
              <details key={c.name} className="border-b border-line py-2">
                <summary className="flex cursor-pointer items-center justify-between py-2 font-semibold">{c.name}<span className="faq-plus text-brass-600 transition">+</span></summary>
                <ul className="pb-2 pl-2">
                  {c.items.map((i) => (
                    <li key={i.href}><Link href={i.href} className="block py-1.5 text-[15px] text-ink/80">{i.label}</Link></li>
                  ))}
                </ul>
              </details>
            ))}

            <p className="eyebrow mb-1 mt-8">Popular areas</p>
            <ul className="grid grid-cols-2 gap-x-4">
              {locations.map((l) => (
                <li key={l.href}><Link href={l.href} className="block py-1.5 text-[15px] text-ink/80">{l.label}</Link></li>
              ))}
            </ul>

            <a href={`tel:${phoneHref}`} className="btn btn-dark mt-8 w-full"><PhoneIcon width={18} height={18} /> Call {phone}</a>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
