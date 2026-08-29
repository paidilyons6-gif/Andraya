import { useId } from 'react'
import type { Portrait, PortraitStyle } from '../data/portraits'

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

/** SVG filters that turn a real home photo into pen-and-ink style previews */
function PortraitFilters({ prefix }: { prefix: string }) {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true">
      <defs>
        {/* Pen line — high-contrast ink edges on paper */}
        <filter id={`${prefix}-line`} colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" result="gray" />
          <feConvolveMatrix
            in="gray"
            order="3"
            kernelMatrix="-1 -1 -1 -1 9 -1 -1 -1 -1"
            result="edges"
          />
          <feComponentTransfer in="edges" result="ink">
            <feFuncR type="linear" slope="2.2" intercept="-0.35" />
            <feFuncG type="linear" slope="2.2" intercept="-0.35" />
            <feFuncB type="linear" slope="2.2" intercept="-0.35" />
          </feComponentTransfer>
          <feFlood floodColor="#faf8f4" result="paper" />
          <feBlend in="paper" in2="ink" mode="multiply" />
        </filter>

        {/* Shaded — warm tonal wash + soft depth */}
        <filter id={`${prefix}-shaded`} colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0.15" result="desat" />
          <feComponentTransfer in="desat" result="tone">
            <feFuncR type="linear" slope="1.1" intercept="0.05" />
            <feFuncG type="linear" slope="1.05" intercept="0.02" />
            <feFuncB type="linear" slope="0.95" intercept="0.08" />
          </feComponentTransfer>
          <feConvolveMatrix
            in="tone"
            order="3"
            kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1"
            result="edges"
          />
          <feBlend in="tone" in2="edges" mode="multiply" result="mixed" />
          <feColorMatrix
            in="mixed"
            type="matrix"
            values="1.05 0.05 0   0 0
                    0.02 1    0   0 0
                    0    0.02 0.9 0 0
                    0    0    0   1 0"
          />
        </filter>

        {/* Color — gentle watercolor over realistic tones */}
        <filter id={`${prefix}-color`} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1.08 0.02 0   0 0.02
                    0.02 1.04 0   0 0.01
                    0    0.02 0.96 0 0
                    0    0    0    1 0"
            result="warm"
          />
          <feGaussianBlur in="warm" stdDeviation="0.4" result="soft" />
          <feBlend in="warm" in2="soft" mode="normal" />
        </filter>
      </defs>
    </svg>
  )
}

export function HomePortrait({
  portrait,
  variant,
  className = '',
  caption,
  showCaption = false,
}: HomePortraitProps) {
  const uid = useId().replace(/:/g, '')
  const filterId = variant === 'photo' ? undefined : `${uid}-${variant}`

  return (
    <figure className={`relative overflow-hidden bg-paper ${className}`}>
      <PortraitFilters prefix={uid} />
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={portrait.photo}
          alt={`${portrait.label}, ${portrait.location} — ${VARIANT_LABELS[variant]}`}
          className="h-full w-full object-cover object-center"
          style={
            filterId
              ? { filter: `url(#${filterId})`, transform: 'scale(1.02)' }
              : undefined
          }
          loading="lazy"
          decoding="async"
        />
        {variant !== 'photo' && (
          <>
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply paper-grain"
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
