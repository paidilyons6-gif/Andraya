import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

export function useScrollReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  selector: string,
) {
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !containerRef.current) return

      const items = containerRef.current.querySelectorAll(selector)
      if (!items.length) return

      gsap.from(items, {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    },
    { scope: containerRef, dependencies: [motionEnabled, selector] },
  )
}

export function useTiltCard(cardRef: React.RefObject<HTMLElement | null>) {
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      const card = cardRef.current
      if (!card || !motionEnabled) return
      if (window.matchMedia('(pointer: coarse)').matches) return

      const rotateX = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power2.out' })
      const rotateY = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power2.out' })

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        rotateY(x * 12)
        rotateX(-y * 12)
      }

      const onLeave = () => {
        rotateX(0)
        rotateY(0)
      }

      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)

      return () => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: cardRef, dependencies: [motionEnabled] },
  )
}

export function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  end: number,
  suffix = '',
) {
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || !motionEnabled) {
        if (el) el.textContent = `${end}${suffix}`
        return
      }

      const obj = { val: 0 }
      gsap.to(obj, {
        val: end,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`
        },
      })
    },
    { scope: ref, dependencies: [motionEnabled, end, suffix] },
  )
}
