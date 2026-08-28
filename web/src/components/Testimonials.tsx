import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { AnimatedText } from './AnimatedText'
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
          x: i % 2 === 0 ? -48 : 48,
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
          delay: i * 0.1,
        })
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
    <section ref={sectionRef} className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Kind words</p>
          <AnimatedText
            as="h2"
            className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink"
          >
            What our clients say
          </AnimatedText>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((quote) => (
            <blockquote
              key={quote.author}
              className="testimonial-card rounded-2xl border border-border bg-paper p-8"
            >
              <svg className="h-8 w-8 text-accent/30" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14H22c0-1.1.9-2 2-2V8z" />
              </svg>
              <p className="mt-4 font-serif text-lg italic leading-relaxed text-ink-muted">
                "{quote.text}"
              </p>
              <footer className="mt-6">
                <cite className="not-italic">
                  <span className="font-medium text-ink">{quote.author}</span>
                  <span className="block text-sm text-ink-faint">{quote.location}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
