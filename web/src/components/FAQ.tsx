import { useState } from 'react'

const faqs = [
  {
    q: 'What kind of photo should I send?',
    a: 'A clear, front-facing photo taken during daylight works best. Include the full facade from ground to roofline. Try to avoid cars, trash bins, or people blocking the view. If you do not have a perfect shot, send your best — we can often work with it.',
  },
  {
    q: 'How long does it take?',
    a: 'Classic Line commissions take 7–10 business days. Line + Shading takes 5–7 days with priority handling. Rush delivery (3 days) is available for an additional fee. Shipping adds 3–5 days for physical prints.',
  },
  {
    q: 'Can I request changes?',
    a: 'Absolutely. One round of revisions is included with every order. Want a window adjusted, a tree removed, or snow instead of summer greenery? Just let us know.',
  },
  {
    q: 'Do you only draw the front of the house?',
    a: 'Front facade is our specialty and most popular request. We can also illustrate side angles, backyard views, or specific architectural details — just mention it in your order notes and we will provide a custom quote.',
  },
  {
    q: 'What about full color — is it available now?',
    a: 'Yes, Full Color is available as an optional upgrade. If you prefer to start with line art only, you can always order a color version later using the same reference drawing.',
  },
  {
    q: 'What do I receive?',
    a: 'Every order includes a high-resolution digital file (PNG + PDF) and a physical archival print on premium matte paper. Larger sizes and extra copies are available as add-ons.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="border-t border-border bg-cream-dark/30 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">FAQ</p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink">
            Common questions
          </h2>
        </div>

        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-paper">
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-ink">{faq.q}</span>
                <svg
                  className={`h-5 w-5 shrink-0 text-ink-faint transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-ink-muted">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
