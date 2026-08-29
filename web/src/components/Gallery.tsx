import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { AnimatedText } from './AnimatedText'
import { HomePortrait } from './HomePortrait'
import { GALLERY_PORTRAITS } from '../data/portraits'
import { gsap } from '../lib/gsap'
import { MOTION } from '../lib/motion'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !sectionRef.current) return

      gsap.from('.gallery-card', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: MOTION.stagger.card,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  return (
    <section id="gallery" ref={sectionRef} className="border-b border-border bg-paper-warm py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">Portfolio</p>
        <AnimatedText
          as="h2"
          className="mt-3 font-serif text-3xl font-medium text-ink sm:text-4xl lg:text-5xl"
        >
          Recent commissions
        </AnimatedText>
        <p className="mt-4 max-w-lg text-base text-ink-muted">
          Real homes, real clients — each portrait drawn by hand from a front-facing photo.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_PORTRAITS.map((item) => (
            <article key={item.title} className="gallery-card">
              <div className="mat-board p-4">
                <HomePortrait portrait={item.portrait} variant={item.styleVariant} />
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg font-medium text-ink">{item.title}</h3>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider text-ink-faint">
                      {item.style}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">{item.portrait.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <a
          href="#order"
          className="mt-12 inline-block border border-border-dark px-6 py-3 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Commission yours →
        </a>
      </div>
    </section>
  )
}
