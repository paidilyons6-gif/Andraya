import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'
import { gsap } from '../lib/gsap'

type MotionSetup = () => void | (() => void)

/**
 * Runs GSAP setup only when motion is allowed (no prefers-reduced-motion).
 * Uses gsap.matchMedia for automatic revert on preference change.
 */
export function useGSAPAnimations(
  setup: MotionSetup,
  scope?: RefObject<HTMLElement | null>,
  dependencies: unknown[] = [],
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cleanup = setup()
        return () => {
          if (typeof cleanup === 'function') cleanup()
        }
      })

      return () => mm.revert()
    },
    { scope, dependencies },
  )
}

/** Imperative helper for one-off matchMedia blocks outside hooks */
export function withMotionMedia(reducedSetup: () => void, motionSetup: MotionSetup) {
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: reduce)', reducedSetup)
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const cleanup = motionSetup()
    return () => {
      if (typeof cleanup === 'function') cleanup()
    }
  })
  return mm
}

export function canAnimate() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
