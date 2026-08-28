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
      <dd className="mt-1 text-xs text-ink-faint">{label}</dd>
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
        y: -40,
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
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.8,
      })
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-light/40 via-transparent to-transparent" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="hero-fade mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent">
            Hand-drawn home portraits
          </p>
          <h1 className="font-serif text-5xl font-medium leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
            <AnimatedText as="span" mode="lines" trigger="load" delay={0.2} className="block">
              Your home,
            </AnimatedText>
            <AnimatedText
              as="span"
              mode="lines"
              trigger="load"
              delay={0.45}
              className="block italic text-ink-muted"
            >
              beautifully drawn.
            </AnimatedText>
          </h1>
          <p className="hero-fade mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            Send us a photo of your house and receive a custom illustration of its facade — from
            elegant line drawings to richly shaded artwork. A timeless keepsake of the place you
            love.
          </p>
          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#order"
              className="inline-flex items-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent-hover hover:shadow-accent/30"
            >
              Start Your Commission
            </MagneticButton>
            <a
              href="#styles"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              View styles & pricing
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
          <dl className="hero-fade mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <Stat value={500} suffix="+" label="Homes illustrated" />
            <Stat value={7} suffix="–10" label="Days turnaround" />
            <Stat value={100} suffix="%" label="Hand-drawn" />
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <div ref={frameRef} className="relative will-change-transform">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-cream-dark to-transparent opacity-60" />
            <div className="relative rotate-1 rounded-xl border border-border bg-paper p-3 shadow-2xl shadow-ink/5">
              <DrawOnSvg trigger="load" stagger={0.06} duration={0.9} delay={0.5}>
                <HouseLineDrawing className="w-full" />
              </DrawOnSvg>
              <p className="mt-2 text-center font-serif text-sm italic text-ink-faint">
                Classic line — Victorian cottage
              </p>
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-lg border border-border bg-paper px-4 py-3 shadow-lg sm:block">
              <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">From</p>
              <p className="font-serif text-xl font-semibold text-ink">$89</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
