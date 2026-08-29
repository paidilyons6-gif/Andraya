import { useGSAP } from '@gsap/react'
import { useRef, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

type DrawingRevealProps = {
  children: ReactNode
  className?: string
  trigger?: 'load' | 'scroll'
  delay?: number
  duration?: number
}

/**
 * Simulates ink spreading across the page — reveals a finished portrait
 * left-to-right like a pen drawing being completed.
 */
export function DrawingReveal({
  children,
  className = '',
  trigger = 'load',
  delay = 0,
  duration = 1.4,
}: DrawingRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || !motionEnabled) return

      gsap.fromTo(
        el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration,
          delay,
          ease: 'power2.inOut',
          ...(trigger === 'scroll'
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  once: true,
                },
              }
            : {}),
        },
      )
    },
    { scope: ref, dependencies: [motionEnabled, trigger, delay, duration] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
