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

      tl.from(path, { drawSVG: '0%', duration: 1.6, ease: 'power2.inOut' })
        .from('.preloader-text', { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 }, '-=0.5')
        .to(overlay, { opacity: 0, duration: 0.7, delay: 0.4 })
    },
    { dependencies: [motionEnabled] },
  )

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, #151922 0%, #0c0f14 100%)',
      }}
      onClick={() => {
        setVisible(false)
        onComplete()
      }}
      role="presentation"
    >
      <div
        className="absolute h-48 w-48 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.5) 0%, transparent 70%)' }}
      />
      <svg width="140" height="110" viewBox="0 0 120 100" aria-hidden="true" className="relative">
        <path
          ref={pathRef}
          d="M15 75 L60 20 L105 75 M35 75 V55 H85 V75"
          fill="none"
          stroke="#d4a853"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="preloader-text relative mt-8 font-serif text-2xl text-gradient-gold">Andraya Studio</p>
      <p className="preloader-text relative mt-2 text-xs uppercase tracking-[0.35em] text-parchment-muted">
        Tap to skip
      </p>
    </div>
  )
}

export { DrawSVGPlugin as _DrawSVGPlugin }
