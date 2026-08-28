import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

/** Full-page animated ink-wash atmosphere — gradient orbs + architectural ghost lines */
export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !rootRef.current) return

      const blobs = rootRef.current.querySelectorAll('.ambient-blob')
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: `random(-80, 80)`,
          y: `random(-60, 60)`,
          scale: `random(0.9, 1.15)`,
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      gsap.to('.ambient-sketch', {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      })

      gsap.to('.ambient-blob', {
        y: (i) => (i + 1) * -80,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      })
    },
    { scope: rootRef, dependencies: [motionEnabled] },
  )

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base twilight gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-midnight via-dusk to-[#1a1210]" />

      {/* Animated ink-wash orbs */}
      <div
        className="ambient-blob absolute -left-[20%] top-[5%] h-[55vh] w-[55vh] rounded-full opacity-40 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #d4a853 0%, #b8653a 40%, transparent 70%)',
        }}
      />
      <div
        className="ambient-blob absolute -right-[15%] top-[25%] h-[45vh] w-[45vh] rounded-full opacity-30 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, #5a7a62 0%, #3d5244 50%, transparent 70%)',
        }}
      />
      <div
        className="ambient-blob absolute bottom-[10%] left-[30%] h-[40vh] w-[40vh] rounded-full opacity-25 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #d4957a 0%, #8b4519 45%, transparent 70%)',
        }}
      />
      <div
        className="ambient-blob absolute right-[20%] top-[60%] h-[35vh] w-[35vh] rounded-full opacity-20 blur-[70px]"
        style={{
          background: 'radial-gradient(circle, #f0c674 0%, transparent 65%)',
        }}
      />

      {/* Ghost architectural sketches */}
      <svg
        className="ambient-sketch absolute -left-8 top-[12%] h-64 w-64 opacity-[0.06] text-gold"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        <path d="M20 160 L100 40 L180 160 M40 160 V120 H160 V160" />
        <rect x="70" y="125" width="60" height="35" />
        <path d="M70 142 H130" />
      </svg>
      <svg
        className="ambient-sketch absolute -right-4 top-[35%] h-80 w-80 rotate-12 opacity-[0.05] text-parchment"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
      >
        <rect x="30" y="90" width="140" height="70" />
        <rect x="50" y="110" width="35" height="30" />
        <rect x="115" y="110" width="35" height="30" />
        <line x1="30" y1="90" x2="170" y2="90" strokeWidth="1.2" />
      </svg>
      <svg
        className="ambient-sketch absolute bottom-[20%] left-[15%] h-48 w-48 -rotate-6 opacity-[0.04] text-blush"
        viewBox="0 0 200 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
      >
        <path d="M30 120 L100 50 L170 120" />
        <rect x="55" y="95" width="90" height="25" />
      </svg>

      {/* Fine crosshatch texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(212, 168, 83, 0.3) 2px,
            rgba(212, 168, 83, 0.3) 3px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(212, 168, 83, 0.2) 2px,
            rgba(212, 168, 83, 0.2) 3px
          )`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,15,20,0.65)_100%)]" />
    </div>
  )
}

/** Per-section accent wash — place inside sections for localized color drama */
export function SectionGlow({
  color = 'gold',
  className = '',
}: {
  color?: 'gold' | 'sage' | 'blush' | 'copper'
  className?: string
}) {
  const colors = {
    gold: 'radial-gradient(ellipse at center, rgba(212,168,83,0.18) 0%, transparent 70%)',
    sage: 'radial-gradient(ellipse at center, rgba(90,122,98,0.15) 0%, transparent 70%)',
    blush: 'radial-gradient(ellipse at center, rgba(212,149,122,0.2) 0%, transparent 70%)',
    copper: 'radial-gradient(ellipse at center, rgba(184,101,58,0.22) 0%, transparent 70%)',
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ background: colors[color] }}
      aria-hidden="true"
    />
  )
}
