import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import { HERO_PORTRAIT } from '../data/portraits'
import { gsap, Flip, DrawSVGPlugin } from '../lib/gsap'
import { HERO_ARTWORK_ID, MOTION } from '../lib/motion'
import { useDrawHandoff } from '../context/DrawHandoffContext'
import { useMotionEnabled } from '../hooks/useMotionEnabled'
import { DrawOnSvg } from './DrawOnSvg'
import { HouseLineDrawing } from './HouseDrawings'
import { Logo } from './Logo'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()
  const {
    setPreloaderComplete,
    setFlipComplete,
    setArtworkReady,
    setSkippedHandoff,
    heroTargetRef,
  } = useDrawHandoff()
  const [visible, setVisible] = useState(motionEnabled)

  const finish = (skipped = false) => {
    if (skipped) setSkippedHandoff(true)
    setPreloaderComplete(true)
    setFlipComplete(true)
    setArtworkReady(true)
    setVisible(false)
    onComplete()
  }

  useGSAP(
    () => {
      if (!motionEnabled) {
        finish(true)
        return
      }

      const overlay = overlayRef.current
      const target = heroTargetRef.current
      const artwork = document.getElementById(HERO_ARTWORK_ID)
      if (!overlay || !target || !artwork) {
        finish(true)
        return
      }

      const tl = gsap.timeline()

      tl.from('.preloader-text', { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, 0.6)
        .to({}, { duration: 0.35 })
        .add(() => {
          const state = Flip.getState(artwork)
          target.insertBefore(artwork, target.firstChild)

          Flip.from(state, {
            duration: MOTION.SURPRISE.flipDuration,
            ease: 'power2.inOut',
            scale: true,
            absolute: true,
            onComplete: () => {
              gsap.from('.hero-tape', {
                rotation: (_i, el) => (el.classList.contains('-rotate-45') ? -90 : 90),
                opacity: 0,
                duration: 0.5,
                stagger: 0.12,
                ease: MOTION.SURPRISE.bounceEase,
              })
              setPreloaderComplete(true)
              setFlipComplete(true)
              setArtworkReady(true)
            },
          })
        })
        .to(overlay, { opacity: 0, duration: 0.55, ease: 'power2.inOut' }, '-=0.7')
        .add(() => {
          setVisible(false)
          onComplete()
        })
    },
    { dependencies: [motionEnabled] },
  )

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-paper"
      onClick={() => finish(true)}
      role="presentation"
    >
      <div id={HERO_ARTWORK_ID} className="mat-board w-[min(85vw,320px)] p-5">
        <DrawOnSvg trigger="load" duration={1.2} stagger={MOTION.stagger.draw}>
          <HouseLineDrawing className="w-full" />
        </DrawOnSvg>
        <p className="mt-3 text-center font-serif text-sm italic text-ink-faint">
          Fig. 1 — {HERO_PORTRAIT.label}
        </p>
      </div>
      <div className="preloader-text mt-10">
        <Logo variant="full" size="lg" />
      </div>
      <p className="preloader-text mt-4 text-[11px] font-medium uppercase tracking-[0.28em] text-ink-faint">
        Tap to skip
      </p>
    </div>
  )
}

export { DrawSVGPlugin as _DrawSVGPlugin }
