import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useFinePointer, useMotionEnabled } from '../hooks/useMotionEnabled'

export function PenCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()
  const finePointer = useFinePointer()

  useGSAP(
    () => {
      if (!motionEnabled || !finePointer) return

      const cursor = cursorRef.current
      const ring = ringRef.current
      if (!cursor || !ring) return

      document.body.classList.add('pen-cursor-active')

      const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' })
      const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' })
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' })
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' })

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX)
        yTo(e.clientY)
        ringX(e.clientX)
        ringY(e.clientY)
      }

      const onEnterInteractive = () => {
        gsap.to(cursor, { scale: 1.4, duration: 0.3 })
        gsap.to(ring, { scale: 2, opacity: 0.4, duration: 0.3 })
      }

      const onLeaveInteractive = () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 })
        gsap.to(ring, { scale: 1, opacity: 0.15, duration: 0.3 })
      }

      window.addEventListener('mousemove', onMove)

      const interactives = document.querySelectorAll('a, button, [data-magnetic]')
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })

      return () => {
        document.body.classList.remove('pen-cursor-active')
        window.removeEventListener('mousemove', onMove)
        interactives.forEach((el) => {
          el.removeEventListener('mouseenter', onEnterInteractive)
          el.removeEventListener('mouseleave', onLeaveInteractive)
        })
      }
    },
    { dependencies: [motionEnabled, finePointer] },
  )

  if (!motionEnabled || !finePointer) return null

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/20 opacity-15"
        aria-hidden="true"
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 20 L4 4 L14 14 L10 14 L16 20 Z"
            fill="#d4a853"
            stroke="#f0c674"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </>
  )
}
