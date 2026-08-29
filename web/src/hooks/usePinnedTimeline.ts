import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

type PinnedTimelineOptions = {
  /** Element to pin (defaults to trigger) */
  pin?: RefObject<HTMLElement | null>
  /** ScrollTrigger end value, e.g. '450%' or '+=2000' */
  end: string | (() => string)
  scrub?: number | boolean
  anticipatePin?: number
  /** Only run above this media query */
  media?: string
  /** Build the scrubbed timeline */
  onTimeline: (tl: gsap.core.Timeline) => void
}

/**
 * Standardizes desktop pin + scrub ScrollTrigger timelines.
 * Automatically cleans up on unmount / matchMedia revert.
 */
export function usePinnedTimeline(
  triggerRef: RefObject<HTMLElement | null>,
  options: PinnedTimelineOptions,
  enabled: boolean,
) {
  const { pin, end, scrub = 1, anticipatePin = 1, media = '(min-width: 1024px)', onTimeline } =
    options

  useGSAP(
    () => {
      if (!enabled || !triggerRef.current) return

      const mm = gsap.matchMedia()

      mm.add(media, () => {
        const trigger = triggerRef.current!
        const pinEl = pin?.current ?? trigger

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: 'top top',
            end,
            pin: pinEl,
            scrub,
            anticipatePin,
            invalidateOnRefresh: true,
          },
        })

        onTimeline(tl)

        return () => tl.scrollTrigger?.kill()
      })

      return () => mm.revert()
    },
    { scope: triggerRef, dependencies: [enabled, end, onTimeline] },
  )
}

export { ScrollTrigger }
