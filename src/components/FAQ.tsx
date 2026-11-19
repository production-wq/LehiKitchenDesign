export default function FAQ({ faqs, heading = "Frequently asked questions" }: { faqs: { q: string; a: string }[]; heading?: string }) {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display text-3xl font-semibold text-forest sm:text-4xl">{heading}</h2>
      <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
        {faqs.map((f, i) => (
          <details key={f.q} className="group px-5 py-1 sm:px-6" open={i === 0}>
            <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-left font-semibold text-ink">
              <h3 className="font-sans text-[1.02rem] font-semibold leading-snug tracking-normal">{f.q}</h3>
              <span className="faq-plus flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brass-100 text-xl leading-none text-brass-600 transition-transform">+</span>
            </summary>
            <p className="pb-5 pr-8 leading-relaxed text-stone">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
