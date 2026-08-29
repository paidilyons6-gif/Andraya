import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { SectionHeader } from './SectionHeader'
import { gsap } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !sectionRef.current) return

      const cards = sectionRef.current.querySelectorAll('.testimonial-card')
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 24,
          opacity: 0,
          rotationY: 8,
          transformPerspective: 800,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
          delay: i * 0.1,
        })
      })

      const quotes = sectionRef.current.querySelectorAll('[data-quote-mark]')
      gsap.from(quotes, {
        drawSVG: '0%',
        duration: 1,
        stagger: 0.15,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  const quotes = [
    {
      text: 'We gave this to my parents for their 40th anniversary in the home they raised us in. They cried.',
      author: 'Sarah M.',
      location: 'Denver, CO',
    },
    {
      text: 'The line drawing captured every detail of our 1920s bungalow — even the wisteria by the porch.',
      author: 'James & Priya K.',
      location: 'Chicago, IL',
    },
    {
      text: 'Perfect closing gift for our clients. We order one for every sale now.',
      author: 'Lincoln Realty Group',
      location: 'Nashville, TN',
    },
  ]

  return (
    <section ref={sectionRef} className="border-b border-border py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader eyebrow="Kind words" title="What our clients say" />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {quotes.map((quote, i) => (
            <blockquote
              key={quote.author}
              className="testimonial-card border border-border bg-paper-warm p-8"
              style={i === 1 ? { transform: 'translateY(1rem)' } : undefined}
            >
              <svg
                className="mb-3 h-6 w-6 text-accent/60"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  data-quote-mark
                  d="M4 4h6v8H6c0 2 2 3 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <p className="font-serif text-lg italic leading-relaxed text-ink">
                "{quote.text}"
              </p>
              <footer className="mt-6 border-t border-border pt-4">
                <cite className="not-italic">
                  <span className="font-medium text-ink">{quote.author}</span>
                  <span className="block text-sm text-ink-muted">{quote.location}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
