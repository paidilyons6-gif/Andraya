import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { AnimatedText } from './AnimatedText'
import { DrawOnSvg } from './DrawOnSvg'
import { HouseLineDrawing } from './HouseDrawings'
import { MagneticButton } from './MagneticButton'
import { gsap } from '../lib/gsap'
import { useCountUp } from '../hooks/useScrollReveal'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useCountUp(ref, value, suffix)

  return (
    <div>
      <dt ref={ref} className="font-serif text-2xl font-semibold text-ink">
        {value}
        {suffix}
      </dt>
      <dd className="mt-0.5 text-xs text-ink-faint">{label}</dd>
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !frameRef.current) return
      gsap.to(frameRef.current, {
        y: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
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
        delay: 0.5,
      })
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-b border-border">
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="hero-fade mb-3 font-serif text-sm italic text-ink-muted">
            Andraya Studio · Est. 2019
          </p>
          <h1 className="font-serif text-5xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[3.75rem]">
            <AnimatedText as="span" mode="lines" trigger="load" delay={0.15} className="block">
              Your home,
            </AnimatedText>
            <AnimatedText
              as="span"
              mode="lines"
              trigger="load"
              delay={0.35}
              className="block italic text-ink-muted"
            >
              beautifully drawn.
            </AnimatedText>
          </h1>
          <p className="hero-fade mt-6 max-w-md text-base leading-relaxed text-ink-muted">
            We draw the front of your house by hand — pen and ink, from your photo. A keepsake
            worth framing, made by real artists in our studio.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#order"
              strength={0.2}
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
          <dl className="hero-fade mt-10 flex gap-10 border-t border-border pt-8">
            <Stat value={500} suffix="+" label="Homes drawn" />
            <Stat value={7} suffix="–10 days" label="Turnaround" />
            <Stat value={100} suffix="%" label="By hand" />
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <div ref={frameRef} className="relative mx-auto max-w-md will-change-transform">
            {/* Mat board with tape corners — feels like a real studio proof */}
            <div className="mat-board relative p-5 sm:p-6">
              <div className="tape-corner absolute -left-2 top-8 h-8 w-5 -rotate-45" aria-hidden="true" />
              <div className="tape-corner absolute -right-2 top-12 h-8 w-5 rotate-45" aria-hidden="true" />
              <DrawOnSvg trigger="load" stagger={0.06} duration={1} delay={0.4}>
                <HouseLineDrawing className="w-full" />
              </DrawOnSvg>
              <p className="mt-4 text-center font-serif text-sm italic text-ink-faint">
                Fig. 1 — Classic line, Portland OR
              </p>
            </div>
            <p className="mt-3 text-center text-xs text-ink-faint">From $89 · includes archival print</p>
          </div>
        </div>
      </div>
    </section>
  )
}
