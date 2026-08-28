import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import { gsap, DrawSVGPlugin } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const motionEnabled = useMotionEnabled()
  const [visible, setVisible] = useState(motionEnabled)

  useGSAP(
    () => {
      if (!motionEnabled) {
        onComplete()
        return
      }

      const path = pathRef.current
      const overlay = overlayRef.current
      if (!path || !overlay) return

      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false)
          onComplete()
        },
      })

      tl.from(path, { drawSVG: '0%', duration: 1.4, ease: 'power2.inOut' })
        .from('.preloader-text', { opacity: 0, y: 12, duration: 0.5 }, '-=0.4')
        .to(overlay, { opacity: 0, duration: 0.6, delay: 0.3 })
    },
    { dependencies: [motionEnabled] },
  )

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-cream"
      onClick={() => {
        setVisible(false)
        onComplete()
      }}
      role="presentation"
    >
      <svg width="120" height="100" viewBox="0 0 120 100" aria-hidden="true">
        <path
          ref={pathRef}
          d="M15 75 L60 20 L105 75 M35 75 V55 H85 V75"
          fill="none"
          stroke="#1c1917"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="preloader-text mt-6 font-serif text-xl text-ink-muted">Andraya Studio</p>
      <p className="preloader-text mt-2 text-xs uppercase tracking-[0.3em] text-ink-faint">
        Tap to skip
      </p>
    </div>
  )
}

export { DrawSVGPlugin as _DrawSVGPlugin }
