import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import { AnimatedText } from './AnimatedText'
import { gsap } from '../lib/gsap'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

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
  const sectionRef = useRef<HTMLElement>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])
  const motionEnabled = useMotionEnabled()

  useScrollReveal(sectionRef, '.faq-item')

  useGSAP(
    () => {
      faqs.forEach((_, i) => {
        const el = answerRefs.current[i]
        const answerText = el?.querySelector('.faq-answer-text')
        if (!el) return
        if (openIndex === i) {
          gsap.to(el, { height: 'auto', duration: 0.4, ease: 'power2.out' })
          if (answerText) {
            gsap.fromTo(answerText, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, delay: 0.05 })
          }
        } else {
          gsap.to(el, { height: 0, duration: 0.3, ease: 'power2.in' })
        }
      })
    },
    { dependencies: [openIndex] },
  )

  useGSAP(
    () => {
      if (!motionEnabled) return
      const firstChevron = sectionRef.current?.querySelector('.faq-chevron-0')
      if (firstChevron) {
        gsap.from(firstChevron, { rotation: -90, duration: 0.5, ease: 'power2.out', delay: 0.3 })
      }
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  return (
    <section id="faq" ref={sectionRef} className="section-studio py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-ink-faint">FAQ</p>
          <AnimatedText as="h2" className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl">
            Common questions
          </AnimatedText>
        </div>

        <div className="mt-12 divide-y divide-border border border-border bg-paper">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={faq.q} className="faq-item">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-ink">{faq.q}</span>
                  <svg
                    className={`faq-chevron-${i} h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <div
                  ref={(el) => {
                    answerRefs.current[i] = el
                  }}
                  className="overflow-hidden px-6"
                  style={{ height: i === 0 ? 'auto' : 0 }}
                >
                  <p className="faq-answer-text pb-5 text-sm leading-relaxed text-ink-muted">{faq.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
