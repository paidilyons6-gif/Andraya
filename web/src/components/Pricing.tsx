import { useGSAP } from '@gsap/react'
import { useCallback, useRef, useState } from 'react'
import { AnimatedText } from './AnimatedText'
import { DrawingReveal } from './DrawingReveal'
import { HomePortrait } from './HomePortrait'
import { HERO_PORTRAIT } from '../data/portraits'
import type { PortraitStyle } from '../data/portraits'
import { gsap } from '../lib/gsap'
import { MOTION } from '../lib/motion'
import { usePinnedTimeline } from '../hooks/usePinnedTimeline'
import { useCountUp } from '../hooks/useScrollReveal'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

type Tier = 'line' | 'shaded' | 'color'

const tiers = [
  {
    id: 'line' as Tier,
    name: 'Classic Line',
    tagline: 'Clean & timeless',
    price: 89,
    description:
      'Precise pen-and-ink line work capturing every architectural detail — windows, siding, roofline, and landscaping.',
    features: [
      'Front facade illustration',
      'Fine ink line work',
      '8×10" archival print',
      'Digital file included',
      '7–10 day delivery',
    ],
    popular: false,
    colClass: 'lg:col-span-4 lg:col-start-1 lg:row-start-1',
    variant: 'line' as PortraitStyle,
  },
  {
    id: 'shaded' as Tier,
    name: 'Line + Shading',
    tagline: 'Depth & dimension',
    price: 149,
    description:
      'Everything in Classic Line, plus cross-hatching and tonal shading that brings depth, texture, and warmth to your home.',
    features: [
      'All Classic Line features',
      'Cross-hatch & tonal shading',
      'Enhanced landscaping detail',
      '11×14" archival print',
      'Priority 5–7 day delivery',
    ],
    popular: true,
    colClass: 'lg:col-span-5 lg:col-start-5 lg:row-start-1 lg:-mt-4',
    variant: 'shaded' as PortraitStyle,
  },
  {
    id: 'color' as Tier,
    name: 'Full Color',
    tagline: 'Vibrant & lifelike',
    price: 249,
    description:
      'Hand-painted watercolor tones that capture the true character of your home — brick, siding, gardens, and sky.',
    features: [
      'All Shaded features',
      'Watercolor color wash',
      'True-to-life palette',
      '16×20" archival print',
      'Premium gift packaging',
    ],
    popular: false,
    optional: true,
    colClass: 'lg:col-span-3 lg:col-start-10 lg:row-start-1',
    variant: 'color' as PortraitStyle,
  },
]

const sizes = [
  { label: '8×10"', addon: 0 },
  { label: '11×14"', addon: 25 },
  { label: '16×20"', addon: 55 },
  { label: '18×24"', addon: 85 },
]

function LayeredPreview({
  tier,
  redrawKey,
  scrollProgressRef,
  pinRef,
}: {
  tier: Tier
  redrawKey: number
  scrollProgressRef?: React.RefObject<number>
  pinRef?: React.RefObject<HTMLDivElement | null>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !ref.current) return
      const layers = ref.current.querySelectorAll<HTMLElement>('[data-tier-layer]')
      gsap.to(layers, {
        opacity: (_i, el) => (el.getAttribute('data-tier-layer') === tier ? 1 : 0),
        duration: 0.5,
        ease: 'power2.inOut',
      })
    },
    { scope: ref, dependencies: [tier, motionEnabled] },
  )

  useGSAP(
    () => {
      if (!motionEnabled || !ref.current || !scrollProgressRef) return

      const layers = ref.current.querySelectorAll<HTMLElement>('[data-tier-layer]')
      const update = (p: number) => {
        const lineOp = p < 0.33 ? 1 : Math.max(0, 1 - (p - 0.33) / 0.15)
        const shadeOp = p < 0.33 ? p / 0.33 : p < 0.66 ? 1 : Math.max(0, 1 - (p - 0.66) / 0.15)
        const colorOp = p < 0.66 ? Math.max(0, (p - 0.5) / 0.16) : 1
        layers.forEach((el) => {
          const t = el.getAttribute('data-tier-layer')
          const op = t === 'line' ? lineOp : t === 'shaded' ? shadeOp : colorOp
          gsap.set(el, { opacity: op })
        })
      }

      const st = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef?.current ?? ref.current,
          start: 'top top',
          end: MOTION.pricingPinLength,
          scrub: 0.5,
          onUpdate: (self) => {
            if (scrollProgressRef) scrollProgressRef.current = self.progress
            update(self.progress)
          },
        },
      })
      return () => st.scrollTrigger?.kill()
    },
    { scope: ref, dependencies: [motionEnabled, scrollProgressRef, pinRef] },
  )

  return (
    <div ref={ref} className="relative aspect-[4/3] overflow-hidden border border-border bg-paper">
      {(['line', 'shaded', 'color'] as Tier[]).map((t) => (
        <div
          key={`${t}-${redrawKey}`}
          data-tier-layer={t}
          className="absolute inset-0"
          style={{ opacity: tier === t ? 1 : 0 }}
        >
          <DrawingReveal trigger="load" duration={0.9} delay={0}>
            <HomePortrait portrait={HERO_PORTRAIT} variant={t} />
          </DrawingReveal>
        </div>
      ))}
    </div>
  )
}

function PriceDisplay({ price }: { price: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useCountUp(ref, price)
  return <span ref={ref} className="font-serif text-4xl font-medium text-ink" />
}

function PricingCard({
  tier,
  isSelected,
  onSelect,
}: {
  tier: (typeof tiers)[0]
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex flex-col rounded-sm border p-6 text-left transition-all ${tier.colClass} ${
        isSelected
          ? 'border-accent bg-paper shadow-md'
          : 'border-border bg-paper-warm hover:border-border-dark hover:shadow-sm'
      } ${tier.popular ? 'lg:scale-[1.02]' : ''}`}
    >
      {tier.popular && (
        <span className="absolute -top-3 left-6 rounded-sm bg-accent px-3 py-1 text-xs font-medium text-paper">
          Most popular
        </span>
      )}
      {'optional' in tier && tier.optional && (
        <span className="absolute -top-3 right-4 rounded-sm border border-border-dark bg-paper px-3 py-1 text-xs text-ink-muted">
          Optional upgrade
        </span>
      )}

      <div className="mb-4 overflow-hidden lg:hidden">
        <HomePortrait portrait={HERO_PORTRAIT} variant={tier.variant} />
      </div>

      <p className="text-xs uppercase tracking-wider text-ink-faint">{tier.tagline}</p>
      <h3 className="mt-1 font-serif text-2xl font-medium text-ink">{tier.name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <PriceDisplay price={tier.price} />
        <span className="text-sm text-ink-muted">USD</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{tier.description}</p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-ink-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <span
        className={`mt-6 block rounded-sm py-3 text-center text-sm font-medium transition-colors ${
          isSelected
            ? 'bg-accent text-paper'
            : 'border border-border-dark text-ink hover:border-accent hover:text-accent'
        }`}
      >
        {isSelected ? 'Selected' : 'Select style'}
      </span>
    </button>
  )
}

export function Pricing() {
  const [selected, setSelected] = useState<Tier>('shaded')
  const [redrawKey, setRedrawKey] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const previewSectionRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef(0)
  const motionEnabled = useMotionEnabled()

  const buildTimeline = useCallback((tl: gsap.core.Timeline) => {
    tl.to({}, { duration: 1 })
  }, [])

  usePinnedTimeline(
    previewSectionRef,
    { end: MOTION.pricingPinLength, onTimeline: buildTimeline },
    motionEnabled,
  )

  const handleSelect = (tier: Tier) => {
    setSelected(tier)
    setRedrawKey((k) => k + 1)
  }

  return (
    <section id="styles" ref={sectionRef} className="border-b border-border py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm text-ink-faint">Styles & pricing</p>
            <AnimatedText
              as="h2"
              className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl lg:text-5xl"
            >
              Choose your illustration style
            </AnimatedText>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-muted lg:pb-2">
            Same home, three ways — from precise ink lines to full watercolor. Every style is drawn
            from your photo by hand.
          </p>
        </div>

        <div ref={previewSectionRef} className="pricing-preview-pin mt-12 hidden lg:block">
          <div className="mat-board mx-auto max-w-lg p-6">
            <LayeredPreview
              tier={selected}
              redrawKey={redrawKey}
              scrollProgressRef={scrollProgressRef}
              pinRef={previewSectionRef}
            />
            <p className="mt-4 text-center font-serif text-sm italic text-ink-faint">
              {HERO_PORTRAIT.label}, {HERO_PORTRAIT.location} —{' '}
              {tiers.find((t) => t.id === selected)?.name}
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              isSelected={selected === tier.id}
              onSelect={() => handleSelect(tier.id)}
            />
          ))}
        </div>

        <div className="mt-16 border border-border bg-paper-warm p-8">
          <h3 className="font-serif text-xl font-medium text-ink">Print sizes & add-ons</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sizes.map((size) => (
              <div
                key={size.label}
                className="flex items-center justify-between border border-border bg-paper px-4 py-3"
              >
                <span className="font-medium text-ink">{size.label}</span>
                <span className="text-sm text-ink-muted">
                  {size.addon === 0 ? 'Included' : `+$${size.addon}`}
                </span>
              </div>
            ))}
          </div>
          <ul className="mt-6 space-y-2 text-sm text-ink-muted">
            <li>Extra print copy — +$35</li>
            <li>Rush delivery (3 days) — +$50</li>
            <li>Gift note included free</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
