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
          x: i % 2 === 0 ? -56 : 56,
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
          delay: i * 0.12,
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background: 'linear-gradient(135deg, #f4e8d8 0%, #e8c4a8 40%, #d4957a 100%)',
      }}
    >
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-copper-deep">Kind words</p>
          <AnimatedText
            as="h2"
            className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink-dark sm:text-5xl"
          >
            What our clients say
          </AnimatedText>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((quote, i) => (
            <blockquote
              key={quote.author}
              className="testimonial-card rounded-2xl border border-white/40 bg-white/50 p-8 shadow-xl shadow-copper/10 backdrop-blur-md"
              style={{ transform: i === 1 ? 'translateY(1rem)' : undefined }}
            >
              <svg className="h-10 w-10 text-copper/40" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14H22c0-1.1.9-2 2-2V8z" />
              </svg>
              <p className="mt-4 font-serif text-lg italic leading-relaxed text-ink-dark/80">
                "{quote.text}"
              </p>
              <footer className="mt-6 border-t border-copper/20 pt-4">
                <cite className="not-italic">
                  <span className="font-semibold text-ink-dark">{quote.author}</span>
                  <span className="block text-sm text-ink-dark/55">{quote.location}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
