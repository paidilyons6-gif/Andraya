import { useRef } from 'react'
import { AnimatedText } from './AnimatedText'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-stone-400">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl font-semibold text-cream">Andraya</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              Hand-drawn portraits of the homes people love. Every illustration is crafted with care
              by our studio artists.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#how-it-works" className="transition-colors hover:text-cream">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#styles" className="transition-colors hover:text-cream">
                  Styles & Pricing
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition-colors hover:text-cream">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#order" className="transition-colors hover:text-cream">
                  Order
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="mailto:hello@andraya.studio" className="transition-colors hover:text-cream">
                  hello@andraya.studio
                </a>
              </li>
              <li>Mon–Fri, 9am–6pm ET</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 sm:flex-row">
          <p className="text-xs">© {new Date().getFullYear()} Andraya Studio. All rights reserved.</p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="transition-colors hover:text-cream">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-cream">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollReveal(sectionRef, '.testimonial-card')

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
