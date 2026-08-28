import { useGSAP } from '@gsap/react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import { useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { canAnimate } from '../hooks/useGSAPAnimations'
import { refreshScrollTriggers } from '../hooks/useScrollProgress'
import 'lenis/dist/lenis.css'

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)
  const motionAllowed = canAnimate()

  useGSAP(() => {
    if (!motionAllowed) return

    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
    }
  }, [])

  useGSAP(() => {
    const onResize = () => refreshScrollTriggers()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!motionAllowed) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.08,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
