import { useRef, useState } from 'react'
import { AnimatedText } from './AnimatedText'
import { DrawOnSvg } from './DrawOnSvg'
import { HouseColorDrawing, HouseLineDrawing, HouseShadedDrawing } from './HouseDrawings'

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
  const Drawing = tier.Drawing

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onSelect}
      className={`relative flex flex-col rounded-sm border p-6 text-left transition-all ${
        isSelected
          ? 'border-accent bg-paper shadow-md'
          : 'border-border bg-paper-warm hover:border-border-dark hover:shadow-sm'
      }`}
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

      <div className="mb-4 overflow-hidden border border-border bg-paper p-3">
        {isSelected ? (
          <DrawOnSvg key={tier.id} trigger="load" stagger={0.05} duration={0.8}>
            <Drawing className="w-full" />
          </DrawOnSvg>
        ) : (
          <Drawing className="w-full" />
        )}
      </div>

      <p className="text-xs uppercase tracking-wider text-ink-faint">{tier.tagline}</p>
      <h3 className="mt-1 font-serif text-2xl font-medium text-ink">{tier.name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-serif text-4xl font-medium text-ink">${tier.price}</span>
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
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="styles" ref={sectionRef} className="border-b border-border py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-lg">
          <p className="text-sm text-ink-faint">Styles & pricing</p>
          <AnimatedText
            as="h2"
            className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl"
          >
            Choose your illustration style
          </AnimatedText>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Start with our signature line drawings. Add shading for depth, or upgrade to full color
            when you are ready.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              isSelected={selected === tier.id}
              onSelect={() => setSelected(tier.id)}
            />
          ))}
        </div>

        <div className="mt-12 border border-border bg-paper-warm p-8">
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
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-ink-muted">
            <span className="border border-border bg-paper px-4 py-2">Extra print copy +$35</span>
            <span className="border border-border bg-paper px-4 py-2">Rush delivery (3 days) +$50</span>
            <span className="border border-border bg-paper px-4 py-2">Gift note included free</span>
          </div>
        </div>
      </div>
    </section>
  )
}
