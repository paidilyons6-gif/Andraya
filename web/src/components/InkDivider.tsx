import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

const strokes = [
  'M0,40 Q120,10 240,35 T480,30',
  'M0,80 Q200,50 400,75 T800,65',
  'M0,20 Q80,60 160,25 T320,40',
]

export function InkDivider({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !ref.current) return
      const paths = ref.current.querySelectorAll('[data-ink]')
      gsap.from(paths, {
        drawSVG: '0%',
        duration: 2,
        stagger: 0.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          once: true,
        },
      })
    },
    { scope: ref, dependencies: [motionEnabled] },
  )

  return (
    <svg
      ref={ref}
      className={`mx-auto block w-full max-w-4xl px-6 ${className}`}
      viewBox="0 0 800 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {strokes.map((d, i) => (
        <path
          key={i}
          data-ink
          d={d}
          fill="none"
          stroke="url(#inkGrad)"
          strokeWidth={1.5 - i * 0.3}
          opacity={0.5 - i * 0.1}
          strokeDasharray="4 6"
        />
      ))}
      <defs>
        <linearGradient id="inkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4a853" stopOpacity="0" />
          <stop offset="30%" stopColor="#d4a853" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#b8653a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#b8653a" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
