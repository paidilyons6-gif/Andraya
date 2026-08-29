import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { MOTION } from '../lib/motion'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

type InkBurstProps = {
  trigger: boolean
  className?: string
}

/** Terracotta ink splatter — plays once when trigger becomes true */
export function InkBurst({ trigger, className = '' }: InkBurstProps) {
  const ref = useRef<SVGSVGElement>(null)
  const playedRef = useRef(false)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      const svg = ref.current
      if (!trigger || !svg || !motionEnabled || playedRef.current) return
      playedRef.current = true

      const splats = svg.querySelectorAll('[data-splat]')
      gsap.set(svg, { opacity: 1 })
      gsap.fromTo(
        splats,
        { scale: 0, opacity: 0, transformOrigin: '50% 50%' },
        {
          scale: 1,
          opacity: (_i, el) => Number(el.getAttribute('data-opacity') ?? 0.7),
          duration: MOTION.SURPRISE.inkBurstDuration,
          stagger: 0.04,
          ease: 'power3.out',
        },
      )
      gsap.to(svg, {
        opacity: 0,
        duration: 0.5,
        delay: MOTION.SURPRISE.inkBurstDuration + 0.2,
        ease: 'power2.in',
      })
    },
    { dependencies: [trigger, motionEnabled] },
  )

  if (!motionEnabled) return null

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute inset-0 m-auto h-48 w-48 opacity-0 ${className}`}
      aria-hidden="true"
    >
      <circle data-splat data-opacity="0.55" cx="100" cy="100" r="28" fill="#9c4a32" />
      <ellipse data-splat data-opacity="0.45" cx="72" cy="88" rx="18" ry="12" fill="#b85c3a" />
      <ellipse data-splat data-opacity="0.4" cx="128" cy="92" rx="14" ry="20" fill="#9c4a32" />
      <circle data-splat data-opacity="0.35" cx="110" cy="118" r="10" fill="#7a3a28" />
      <ellipse data-splat data-opacity="0.3" cx="85" cy="115" rx="8" ry="14" fill="#9c4a32" />
      <path
        data-splat
        data-opacity="0.5"
        d="M100 55 Q115 70 100 85 Q85 70 100 55"
        fill="#c4704a"
      />
      {[0, 45, 90, 135, 200, 250, 310].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const cx = 100 + Math.cos(rad) * 42
        const cy = 100 + Math.sin(rad) * 42
        return (
          <circle
            key={i}
            data-splat
            data-opacity="0.25"
            cx={cx}
            cy={cy}
            r={4 + (i % 3)}
            fill="#9c4a32"
          />
        )
      })}
    </svg>
  )
}
