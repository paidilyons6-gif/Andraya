import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { AnimatedText } from './AnimatedText'
import { DrawOnSvg } from './DrawOnSvg'
import { HouseLineDrawing } from './HouseDrawings'
import { MagneticButton } from './MagneticButton'
import { SectionGlow } from './AmbientBackground'
import { gsap } from '../lib/gsap'
import { useCountUp } from '../hooks/useScrollReveal'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useCountUp(ref, value, suffix)

  return (
    <div className="glass-light rounded-xl px-4 py-3 text-center">
      <dt ref={ref} className="font-serif text-3xl font-semibold text-gradient-gold">
        {value}
        {suffix}
      </dt>
      <dd className="mt-1 text-xs uppercase tracking-wider text-parchment-muted">{label}</dd>
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !frameRef.current) return

      gsap.to(frameRef.current, {
        y: -60,
        rotation: -2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.2,
          opacity: 0.7,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
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
        y: 32,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.6,
      })
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden">
      <SectionGlow color="gold" className="opacity-80" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        <div className="order-2 lg:order-1">
          <p className="hero-fade mb-5 inline-flex items-center gap-2 rounded-full border border-border-strong bg-accent-light px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-bright" />
            Hand-drawn home portraits
          </p>
          <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem]">
            <AnimatedText as="span" mode="lines" trigger="load" delay={0.2} className="block text-parchment">
              Your home,
            </AnimatedText>
            <AnimatedText
              as="span"
              mode="lines"
              trigger="load"
              delay={0.45}
              className="block italic text-gradient-gold"
            >
              beautifully drawn.
            </AnimatedText>
          </h1>
          <p className="hero-fade mt-7 max-w-lg text-lg leading-relaxed text-parchment-muted">
            Send us a photo of your house and receive a custom illustration of its facade — from
            elegant line drawings to richly shaded artwork. A timeless keepsake of the place you
            love.
          </p>
          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#order"
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-copper to-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-midnight shadow-lg transition-all hover:shadow-[0_0_40px_rgba(212,168,83,0.5)]"
            >
              <span className="relative z-10">Start Your Commission</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </MagneticButton>
            <a
              href="#styles"
              className="inline-flex items-center gap-2 border-b border-gold/40 pb-0.5 text-sm font-medium text-gold transition-colors hover:border-gold-bright hover:text-gold-bright"
            >
              View styles & pricing
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
          <dl className="hero-fade mt-12 grid grid-cols-3 gap-3">
            <Stat value={500} suffix="+" label="Homes illustrated" />
            <Stat value={7} suffix="–10" label="Days turnaround" />
            <Stat value={100} suffix="%" label="Hand-drawn" />
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <div ref={frameRef} className="relative will-change-transform">
            {/* Glow behind frame */}
            <div
              ref={glowRef}
              className="absolute -inset-8 rounded-3xl opacity-50 blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(212,168,83,0.4) 0%, rgba(184,101,58,0.2) 40%, transparent 70%)',
              }}
            />
            <div className="animate-float relative">
              <div className="gold-border-gradient gold-glow relative rotate-2 rounded-2xl p-1 transition-transform duration-700 hover:rotate-0">
                <div className="rounded-xl bg-paper p-4">
                  <DrawOnSvg trigger="load" stagger={0.06} duration={0.9} delay={0.5}>
                    <HouseLineDrawing className="w-full" />
                  </DrawOnSvg>
                  <p className="mt-3 text-center font-serif text-sm italic text-ink-dark/60">
                    Classic line — Victorian cottage
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-6 hidden rounded-xl glass-dark px-5 py-4 sm:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">From</p>
                <p className="font-serif text-3xl font-semibold text-gradient-gold">$89</p>
              </div>
              {/* Decorative corner marks */}
              <svg className="absolute -right-3 -top-3 h-8 w-8 text-gold/60" viewBox="0 0 32 32" fill="none" stroke="currentColor">
                <path d="M4 4 L4 16 M4 4 L16 4" strokeWidth="1.5" />
              </svg>
              <svg className="absolute -bottom-3 -right-3 h-8 w-8 rotate-180 text-gold/60" viewBox="0 0 32 32" fill="none" stroke="currentColor">
                <path d="M4 4 L4 16 M4 4 L16 4" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
