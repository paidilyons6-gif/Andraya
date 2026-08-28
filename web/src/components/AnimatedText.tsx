import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap, SplitText } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

type AnimatedTextProps = {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  children: string
  className?: string
  mode?: 'lines' | 'words' | 'chars'
  trigger?: 'load' | 'scroll'
  delay?: number
}

export function AnimatedText({
  as: Tag = 'h2',
  children,
  className = '',
  mode = 'lines',
  trigger = 'scroll',
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || !motionEnabled) return

      const run = () => {
        const split = SplitText.create(el, {
          type: mode,
          mask: mode === 'lines' ? 'lines' : undefined,
          aria: 'auto',
        })

        const targets =
          mode === 'chars' ? split.chars : mode === 'words' ? split.words : split.lines

        const fromVars =
          mode === 'chars'
            ? { opacity: 0, y: 24, rotationX: -40, transformOrigin: '50% 100% -20px' }
            : { yPercent: 110, opacity: 0 }

        const tweenVars: gsap.TweenVars = {
          ...fromVars,
          opacity: 1,
          y: 0,
          yPercent: 0,
          rotationX: 0,
          duration: mode === 'chars' ? 0.7 : 1,
          stagger: mode === 'chars' ? 0.025 : mode === 'words' ? 0.06 : 0.1,
          ease: 'expo.out',
          delay,
        }

        if (trigger === 'scroll') {
          tweenVars.scrollTrigger = {
            trigger: el,
            start: 'top 85%',
            once: true,
          }
        }

        gsap.from(targets, tweenVars)

        return () => split.revert()
      }

      if (document.fonts?.ready) {
        document.fonts.ready.then(run)
      } else {
        return run()
      }
    },
    { scope: ref, dependencies: [motionEnabled, children, mode, trigger, delay] },
  )

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}
