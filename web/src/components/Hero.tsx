import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { AnimatedText } from './AnimatedText'
import { HomePortrait } from './HomePortrait'
import { HERO_PORTRAIT } from '../data/portraits'
import { MagneticButton } from './MagneticButton'
import { gsap } from '../lib/gsap'
import { useDrawHandoff } from '../context/DrawHandoffContext'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

function HeroDust() {
  return (
    <svg
      className="hero-dust pointer-events-none absolute inset-0 h-full w-full opacity-30"
      aria-hidden="true"
    >
      {[
        { cx: '18%', cy: '22%', r: 1.2 },
        { cx: '72%', cy: '15%', r: 0.9 },
        { cx: '85%', cy: '68%', r: 1.4 },
        { cx: '12%', cy: '78%', r: 1 },
        { cx: '48%', cy: '8%', r: 0.8 },
      ].map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="#9c4a32" opacity="0.35" />
      ))}
    </svg>
  )
}

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
        className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, #e8ddd4 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <HeroDust />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p className="hero-fade mb-3 font-serif text-sm italic text-ink-muted">
            Andraya Studio · Est. 2019
          </p>
          <h1 className="font-serif text-5xl font-medium leading-[1.06] tracking-tight text-ink sm:text-6xl lg:text-[4rem]">
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
              className="block italic text-ink-muted"
            >
              beautifully drawn.
            </AnimatedText>
          </h1>
          <p className="hero-fade mt-6 max-w-[36ch] text-base leading-relaxed text-ink-muted">
            Send us a photo of your house — we draw the front facade by hand, pen and ink. A keepsake
            portrait of the home you love, ready to frame.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-5">
            <MagneticButton
              href="#order"
              strength={0.15}
              className="rounded-sm bg-accent px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
            >
              Commission a drawing
            </MagneticButton>
            <a
              href="#styles"
              className="text-sm text-ink-muted underline decoration-border-dark underline-offset-4 transition-colors hover:text-ink"
            >
              See styles & pricing
            </a>
          </div>
          <p className="hero-fade mt-10 border-t border-border pt-6 text-xs text-ink-faint">
            500+ homes drawn · 7–10 day turnaround · 100% by hand
          </p>
        </div>

        <div>
          <div ref={frameRef} className="relative mx-auto max-w-md will-change-transform lg:ml-auto">
            <div ref={heroTargetRef} className="mat-board relative min-h-[280px] p-5 sm:p-6">
              <div
                className="hero-tape tape-corner absolute -left-2 top-8 h-8 w-5 -rotate-45 opacity-0"
                aria-hidden="true"
              />
              <div
                className="hero-tape tape-corner absolute -right-2 top-12 h-8 w-5 rotate-45 opacity-0"
                aria-hidden="true"
              />
              {(!motionEnabled || skippedHandoff) && (
                <HomePortrait portrait={HERO_PORTRAIT} variant="line" />
              )}
            </div>
            <p
              ref={captionRef}
              className="mt-3 text-center text-xs text-ink-faint will-change-transform"
            >
              From $89 · includes archival print
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
