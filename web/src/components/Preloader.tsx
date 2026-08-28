import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import { gsap, DrawSVGPlugin } from '../lib/gsap'
import { HOUSE_PATH } from '../lib/motion'
import { useDrawHandoff } from '../context/DrawHandoffContext'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const motionEnabled = useMotionEnabled()
  const { setPreloaderComplete } = useDrawHandoff()
  const [visible, setVisible] = useState(motionEnabled)

  const finish = () => {
    setPreloaderComplete(true)
    setVisible(false)
    onComplete()
  }

  useGSAP(
    () => {
      if (!motionEnabled) {
        finish()
        return
      }

      const path = pathRef.current
      const overlay = overlayRef.current
      if (!path || !overlay) return

      const tl = gsap.timeline({ onComplete: finish })

      tl.from(path, { drawSVG: '0%', duration: 1.4, ease: 'power2.inOut' })
        .from('.preloader-text', { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, '-=0.4')
        .to(overlay, { opacity: 0, duration: 0.6, delay: 0.3 })
    },
    { dependencies: [motionEnabled] },
  )

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-paper"
      onClick={finish}
      role="presentation"
    >
      <svg width="140" height="110" viewBox="0 0 120 100" aria-hidden="true">
        <path
          ref={pathRef}
          d={HOUSE_PATH}
          fill="none"
          stroke="#9c4a32"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="preloader-text mt-8 font-serif text-2xl text-ink">Andraya Studio</p>
      <p className="preloader-text mt-2 text-xs uppercase tracking-[0.3em] text-ink-faint">
        Tap to skip
      </p>
    </div>
  )
}

export { DrawSVGPlugin as _DrawSVGPlugin }
