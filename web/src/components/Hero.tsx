import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { AnimatedText } from './AnimatedText'
import { HomePortrait } from './HomePortrait'
import { LogoMark } from './Logo'
import { HERO_PORTRAIT } from '../data/portraits'
import { MagneticButton } from './MagneticButton'
import { gsap } from '../lib/gsap'
import { useDrawHandoff } from '../context/DrawHandoffContext'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)
  const washRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()
  const { flipComplete, skippedHandoff, heroTargetRef } = useDrawHandoff()

  useGSAP(
    () => {
      if (!motionEnabled || !frameRef.current) return

      gsap.to(frameRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      if (captionRef.current) {
        gsap.to(captionRef.current, {
          y: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }

      if (washRef.current) {
        gsap.to(washRef.current, {
          y: 24,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  useGSAP(
    () => {
      if (!motionEnabled) return
      gsap.from('.hero-fade', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        delay: flipComplete ? 0.15 : 0.5,
      })
    },
    { scope: sectionRef, dependencies: [motionEnabled, flipComplete] },
  )

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-b border-border">
      <div
        ref={washRef}
        className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, #e8ddd4 0%, transparent 68%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #dde5da 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        <div>
          <div className="hero-fade brand-badge mb-8 w-fit">
            <LogoMark className="h-7 w-7" />
            <div className="flex flex-col">
              <span className="font-serif text-sm font-semibold leading-none text-ink">Andraya Studio</span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                Est. 2019 · Portland, OR
              </span>
            </div>
          </div>

          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
            <AnimatedText
              as="span"
              mode="chars"
              trigger="load"
              delay={flipComplete ? 0.05 : 0.2}
              className="block"
            >
              Your home,
            </AnimatedText>
            <AnimatedText
              as="span"
              mode="chars"
              trigger="load"
              delay={flipComplete ? 0.15 : 0.4}
              className="block text-ink-muted"
            >
              beautifully drawn.
            </AnimatedText>
          </h1>

          <p className="hero-fade mt-7 max-w-[38ch] text-lg leading-relaxed text-ink-muted">
            Commission a hand-drawn portrait of your home from a single photo. Pen-and-ink artistry,
            museum-quality prints, delivered to your door.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#order" strength={0.15} className="btn-accent">
              Commission a drawing
            </MagneticButton>
            <a
              href="#styles"
              className="text-sm font-medium text-ink-muted underline decoration-border-dark underline-offset-[6px] transition-colors hover:text-ink"
            >
              View styles & pricing
            </a>
          </div>

          <div className="hero-fade mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { stat: '500+', label: 'Homes drawn' },
              { stat: '7–10', label: 'Day turnaround' },
              { stat: '100%', label: 'Hand-drawn' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-serif text-2xl font-medium text-ink">{item.stat}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-faint">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div ref={frameRef} className="relative mx-auto max-w-md will-change-transform lg:ml-auto">
            <div ref={heroTargetRef} className="mat-board relative min-h-[300px] p-6 sm:p-7">
              <div
                className="hero-tape tape-corner absolute -left-2 top-10 h-8 w-5 -rotate-45 opacity-0"
                aria-hidden="true"
              />
              <div
                className="hero-tape tape-corner absolute -right-2 top-14 h-8 w-5 rotate-45 opacity-0"
                aria-hidden="true"
              />
              {(!motionEnabled || skippedHandoff) && (
                <HomePortrait portrait={HERO_PORTRAIT} variant="line" />
              )}
            </div>
            <p className="mt-4 text-center font-serif text-sm italic text-ink-muted">
              Fig. 1 — {HERO_PORTRAIT.label}, {HERO_PORTRAIT.location}
            </p>
            <p
              ref={captionRef}
              className="mt-1 text-center text-xs text-ink-faint will-change-transform"
            >
              From $89 · archival print included
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
