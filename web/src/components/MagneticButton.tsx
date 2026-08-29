import { useGSAP } from '@gsap/react'
import { useRef, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { useFinePointer, useMotionEnabled } from '../hooks/useMotionEnabled'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
}

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()
  const finePointer = useFinePointer()

  useGSAP(
    () => {
      const el = wrapRef.current
      if (!el || !motionEnabled || !finePointer) return

      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        xTo((e.clientX - cx) * strength)
        yTo((e.clientY - cy) * strength)
      }

      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: wrapRef, dependencies: [motionEnabled, finePointer, strength] },
  )

  const inner = href ? (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )

  return (
    <div ref={wrapRef} className="inline-block will-change-transform">
      {inner}
    </div>
  )
}
