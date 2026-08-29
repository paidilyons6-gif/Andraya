import type { Portrait, PortraitStyle } from '../data/portraits'
import { portraitSrc } from '../data/portraits'
import { HomeIllustration } from './illustrations/HomeIllustration'

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

export function HomePortrait({
  portrait,
  variant,
  className = '',
  caption,
  showCaption = false,
}: HomePortraitProps) {
  const isPhoto = variant === 'photo'

  return (
    <figure className={`relative overflow-hidden bg-paper ${className}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {isPhoto ? (
          <img
            src={portraitSrc(portrait.photo)}
            alt={`${portrait.label}, ${portrait.location} — reference photo`}
            className="h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
        ) : (
          <HomeIllustration
            architecture={portrait.architecture}
            variant={variant}
            className="h-full w-full"
          />
        )}
        {isPhoto ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/50 to-transparent px-3 py-2">
            <span className="text-[10px] uppercase tracking-wider text-paper/90">
              Reference photo
            </span>
          </div>
        ) : (
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply paper-grain"
            aria-hidden="true"
          />
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
