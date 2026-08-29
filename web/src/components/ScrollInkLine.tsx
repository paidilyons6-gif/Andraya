import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

/** Fixed top progress line — draws left→right with scroll */
export function ScrollInkLine() {
  const lineRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      const line = lineRef.current
      if (!line || !motionEnabled) return

      gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          gsap.set(line, { scaleX: self.progress })
        },
      })
    },
    { dependencies: [motionEnabled] },
  )

  if (!motionEnabled) return null

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full"
      aria-hidden="true"
    >
      <div
        ref={lineRef}
        className="h-full w-full bg-accent"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
