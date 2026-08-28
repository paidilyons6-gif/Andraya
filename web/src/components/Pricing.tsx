import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import { AnimatedText } from './AnimatedText'
import { DrawOnSvg } from './DrawOnSvg'
import { HouseColorDrawing, HouseLineDrawing, HouseShadedDrawing } from './HouseDrawings'
import { useTiltCard } from '../hooks/useScrollReveal'
import { useMotionEnabled } from '../hooks/useMotionEnabled'
import { gsap } from '../lib/gsap'

type Tier = 'line' | 'shaded' | 'color'

const tiers = [
  {
    id: 'line' as Tier,
    name: 'Classic Line',
    tagline: 'Clean & timeless',
    price: 89,
    description:
      'Precise pen-and-ink line work capturing every architectural detail. Minimal, elegant, and perfect for modern interiors.',
    features: [
      'Front facade illustration',
      'Fine ink line work',
      '8×10" archival print',
      'Digital file included',
      '7–10 day delivery',
    ],
    popular: false,
    Drawing: HouseLineDrawing,
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
    Drawing: HouseShadedDrawing,
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
    Drawing: HouseColorDrawing,
  },
]

const sizes = [
  { label: '8×10"', addon: 0 },
  { label: '11×14"', addon: 25 },
  { label: '16×20"', addon: 55 },
  { label: '18×24"', addon: 85 },
]

function PricingCard({
  tier,
  isSelected,
  onSelect,
}: {
  tier: (typeof tiers)[0]
  isSelected: boolean
  onSelect: () => void
}) {
  const cardRef = useRef<HTMLButtonElement>(null)
  useTiltCard(cardRef)
  const Drawing = tier.Drawing

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onSelect}
      data-magnetic
      style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
      className={`relative flex flex-col rounded-2xl p-6 text-left transition-all will-change-transform ${
        isSelected
          ? 'gold-border-gradient gold-glow scale-[1.02]'
          : 'glass-light hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10'
      }`}
    >
      {tier.popular && (
        <span className="popular-badge absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-copper to-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-midnight shadow-lg">
          Most Popular
        </span>
      )}
      {'optional' in tier && tier.optional && (
        <span className="absolute -top-3 right-4 rounded-full border border-gold/30 bg-midnight/80 px-3 py-1 text-xs font-medium text-gold">
          Optional upgrade
        </span>
      )}

      <div className="mb-4 overflow-hidden rounded-xl border border-gold/20 bg-paper/95">
        {isSelected ? (
          <DrawOnSvg key={tier.id} trigger="load" stagger={0.05} duration={0.8}>
            <Drawing className="w-full" />
          </DrawOnSvg>
        ) : (
          <Drawing className="w-full" />
        )}
      </div>

      <p className="text-xs font-bold uppercase tracking-wider text-gold">{tier.tagline}</p>
      <h3 className="mt-1 font-serif text-2xl font-semibold text-parchment">{tier.name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-serif text-4xl font-semibold text-gradient-gold">${tier.price}</span>
        <span className="text-sm text-parchment-muted">USD</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-parchment-muted">{tier.description}</p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-parchment-muted">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <span
        className={`mt-6 block rounded-full py-3 text-center text-sm font-bold uppercase tracking-wider transition-all ${
          isSelected
            ? 'bg-gradient-to-r from-copper to-gold text-midnight shadow-lg shadow-gold/30'
            : 'border border-gold/40 text-gold hover:bg-gold/10'
        }`}
      >
        {isSelected ? 'Selected' : 'Select Style'}
      </span>
    </button>
  )
}

export function Pricing() {
  const [selected, setSelected] = useState<Tier>('shaded')
  const sectionRef = useRef<HTMLElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled) return
      gsap.to('.popular-badge', {
        y: -4,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  return (
    <section id="styles" ref={sectionRef} className="relative overflow-hidden py-20 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212,168,83,0.12) 0%, transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Styles & pricing</p>
          <AnimatedText
            as="h2"
            mode="words"
            className="mt-3 font-serif text-4xl font-medium tracking-tight text-parchment sm:text-5xl"
          >
            Choose your illustration style
          </AnimatedText>
          <p className="mt-4 text-lg text-parchment-muted text-balance">
            Start with our signature line drawings. Add shading for depth, or upgrade to full color
            when you are ready.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              isSelected={selected === tier.id}
              onSelect={() => setSelected(tier.id)}
            />
          ))}
        </div>

        <div className="mt-12 glass-light rounded-2xl p-8">
          <h3 className="font-serif text-xl font-semibold text-gold-bright">Print sizes & add-ons</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sizes.map((size) => (
              <div
                key={size.label}
                className="flex items-center justify-between rounded-xl border border-gold/20 bg-midnight/40 px-4 py-3"
              >
                <span className="font-medium text-parchment">{size.label}</span>
                <span className="text-sm text-gold">
                  {size.addon === 0 ? 'Included' : `+$${size.addon}`}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-gold/25 bg-gold/5 px-4 py-2 text-parchment-muted">Extra print copy +$35</span>
            <span className="rounded-full border border-gold/25 bg-gold/5 px-4 py-2 text-parchment-muted">Rush delivery (3 days) +$50</span>
            <span className="rounded-full border border-gold/25 bg-gold/5 px-4 py-2 text-parchment-muted">Gift note included free</span>
          </div>
        </div>
      </div>
    </section>
  )
}
