import type { Portrait, PortraitStyle } from '../data/portraits'
import { portraitSrc } from '../data/portraits'

type HomePortraitProps = {
  portrait: Portrait
  variant: PortraitStyle
  className?: string
  caption?: string
  showCaption?: boolean
}

const VARIANT_LABELS: Record<PortraitStyle, string> = {
  photo: 'Client reference photo',
  line: 'Classic line drawing',
  shaded: 'Line + shading',
  color: 'Full color wash',
}

/** CSS filters that suggest pen-and-ink / shaded / watercolor styles */
const VARIANT_FILTERS: Record<Exclude<PortraitStyle, 'photo'>, string> = {
  line: 'grayscale(1) contrast(1.55) brightness(1.08)',
  shaded: 'sepia(0.35) contrast(1.15) saturate(0.75) brightness(1.05)',
  color: 'saturate(1.2) contrast(1.05) brightness(1.03) hue-rotate(-4deg)',
}

export function HomePortrait({
  portrait,
  variant,
  className = '',
  caption,
  showCaption = false,
}: HomePortraitProps) {
  const src = portraitSrc(portrait.photo)

  return (
    <figure className={`relative overflow-hidden bg-paper ${className}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={src}
          alt={`${portrait.label}, ${portrait.location} — ${VARIANT_LABELS[variant]}`}
          className="h-full w-full object-cover object-center"
          style={
            variant === 'photo'
              ? undefined
              : { filter: VARIANT_FILTERS[variant], transform: 'scale(1.02)' }
          }
          loading={variant === 'photo' ? 'eager' : 'lazy'}
          decoding="async"
        />
        {variant !== 'photo' && (
          <>
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply paper-grain"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 border border-ink/10"
              aria-hidden="true"
            />
          </>
        )}
        {variant === 'photo' && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/50 to-transparent px-3 py-2">
            <span className="text-[10px] uppercase tracking-wider text-paper/90">
              Reference photo
            </span>
          </div>
        )}
      </div>
      {showCaption && (
        <figcaption className="mt-2 text-center font-serif text-sm italic text-ink-faint">
          {caption ?? `${portrait.label}, ${portrait.location}`}
        </figcaption>
      )}
    </figure>
  )
}

export { VARIANT_LABELS }
