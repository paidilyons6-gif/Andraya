import { useGSAP } from '@gsap/react'
import { useRef, type RefObject } from 'react'
import { ScrollTrigger } from '../lib/gsap'
import { useMotionEnabled } from './useMotionEnabled'

type ScrollProgressOptions = {
  start?: string
  end?: string
  pin?: boolean | RefObject<HTMLElement | null>
  pinSpacing?: boolean
  scrub?: boolean | number
  invalidateOnRefresh?: boolean
  onUpdate?: (progress: number) => void
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
  enabled?: boolean
}

/**
 * Returns a ref holding 0→1 scroll progress for a pinned/scrubbed section.
 * WebGL and DOM layers read the same ref for coordinated motion.
 */
export function useScrollProgress(
  triggerRef: RefObject<HTMLElement | null>,
  options: ScrollProgressOptions = {},
) {
  const progressRef = useRef(0)
  const motionEnabled = useMotionEnabled()
  const enabled = options.enabled ?? true

  useGSAP(
    () => {
      const trigger = triggerRef.current
      if (!trigger || !motionEnabled || !enabled) return

      const pinTarget =
        options.pin && typeof options.pin === 'object' ? options.pin.current : options.pin ? trigger : false

      ScrollTrigger.create({
        trigger,
        start: options.start ?? 'top top',
        end: options.end ?? 'bottom bottom',
        pin: pinTarget || false,
        pinSpacing: options.pinSpacing ?? true,
        scrub: options.scrub ?? false,
        invalidateOnRefresh: options.invalidateOnRefresh ?? true,
        onUpdate: (self) => {
          progressRef.current = self.progress
          options.onUpdate?.(self.progress)
        },
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
      })
    },
    { scope: triggerRef, dependencies: [motionEnabled, enabled] },
  )

  return progressRef
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}
