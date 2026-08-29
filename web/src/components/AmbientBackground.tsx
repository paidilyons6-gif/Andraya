import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

/** Paper studio backdrop with scroll-scrubbed watercolor washes */
export function StudioBackdrop() {
  const wash1Ref = useRef<HTMLDivElement>(null)
  const wash2Ref = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled) return

      if (wash1Ref.current) {
        gsap.to(wash1Ref.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 1.5 },
        })
      }
      if (wash2Ref.current) {
        gsap.to(wash2Ref.current, {
          y: 30,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 1.2 },
        })
      }
    },
    { dependencies: [motionEnabled] },
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-paper" />
      <div
        ref={wash1Ref}
        className="absolute -right-[20%] top-[10%] h-[70vh] w-[70vh] rounded-full opacity-[0.35] blur-[120px] will-change-transform"
        style={{ background: 'radial-gradient(circle, #e8ddd4 0%, transparent 70%)' }}
      />
      <div
        ref={wash2Ref}
        className="absolute -left-[10%] bottom-[20%] h-[50vh] w-[50vh] rounded-full opacity-[0.25] blur-[100px] will-change-transform"
        style={{ background: 'radial-gradient(circle, #dde5da 0%, transparent 70%)' }}
      />
    </div>
  )
}
