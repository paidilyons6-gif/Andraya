import { useGSAP } from '@gsap/react'
import { useRef, type ReactNode } from 'react'
import { gsap, DrawSVGPlugin } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

type DrawOnSvgProps = {
  children: ReactNode
  className?: string
  trigger?: 'load' | 'scroll' | 'scrub'
  stagger?: number
  duration?: number
  delay?: number
}

export function DrawOnSvg({
  children,
  className = '',
  trigger = 'load',
  stagger = 0.08,
  duration = 1.2,
  delay = 0,
}: DrawOnSvgProps) {
  const ref = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      const root = ref.current
      if (!root || !motionEnabled) return

      const paths = root.querySelectorAll<SVGGeometryElement>('[data-draw]')
      if (!paths.length) return

      if (trigger === 'scrub') {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        })
        tl.from(paths, {
          drawSVG: '0%',
          duration: 1,
          stagger,
          ease: 'none',
        })
        return
      }

      const tweenVars: gsap.TweenVars = {
        drawSVG: '0%',
        duration,
        stagger,
        delay,
        ease: 'power2.inOut',
      }

      if (trigger === 'scroll') {
        tweenVars.scrollTrigger = {
          trigger: root,
          start: 'top 75%',
          once: true,
        }
      }

      gsap.from(paths, tweenVars)
    },
    { scope: ref, dependencies: [motionEnabled, trigger, stagger, duration, delay] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export { DrawSVGPlugin }
