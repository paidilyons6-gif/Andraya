import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { AnimatedText } from './AnimatedText'
import { DrawOnSvg } from './DrawOnSvg'
import { CottageHouse, ModernHouse, VictorianHouse } from './HouseDrawings'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

const galleryItems = [
  { title: 'Victorian Revival', style: 'Classic Line', location: 'Portland, OR', House: VictorianHouse, accent: '#d4a853' },
  { title: 'Country Cottage', style: 'Line + Shading', location: 'Asheville, NC', House: CottageHouse, accent: '#5a7a62' },
  { title: 'Mid-Century Modern', style: 'Classic Line', location: 'Palm Springs, CA', House: ModernHouse, accent: '#d4957a' },
  { title: 'Craftsman Bungalow', style: 'Line + Shading', location: 'Seattle, WA', House: VictorianHouse, accent: '#b8653a' },
  { title: 'Colonial Estate', style: 'Full Color', location: 'Charleston, SC', House: CottageHouse, accent: '#f0c674' },
  { title: 'Urban Brownstone', style: 'Classic Line', location: 'Brooklyn, NY', House: ModernHouse, accent: '#7a9a82' },
]

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !sectionRef.current || !trackRef.current) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current!
        const totalScroll = track.scrollWidth - window.innerWidth + 200

        gsap.to(track, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.from('.gallery-card', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-gold/10 py-20 lg:py-28"
      style={{
        background: 'linear-gradient(180deg, #080a0e 0%, #0c0f14 40%, #151922 100%)',
      }}
    >
      {/* Spotlight sweep */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(212,168,83,0.25) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Portfolio</p>
            <AnimatedText
              as="h2"
              className="mt-3 font-serif text-4xl font-medium tracking-tight text-parchment sm:text-5xl"
            >
              Recent commissions
            </AnimatedText>
            <p className="mt-4 text-lg text-parchment-muted">
              Every home tells a story. Here are a few we have had the pleasure of drawing.
            </p>
          </div>
          <a
            href="#order"
            className="shrink-0 rounded-full border border-gold/50 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold-bright backdrop-blur-sm transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(212,168,83,0.3)]"
          >
            Commission yours →
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        >
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className="gallery-card group w-[min(85vw,360px)] shrink-0 overflow-hidden rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
              style={{
                boxShadow: `0 0 0 1px rgba(212,168,83,0.15), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${item.accent}15`,
              }}
            >
              <DrawOnSvg trigger="scroll" stagger={0.04} duration={0.6}>
                <div
                  className="relative flex aspect-[4/3] items-center justify-center p-8"
                  style={{
                    background: `linear-gradient(145deg, #faf3ea 0%, #f0e0cc 100%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${item.accent}20 0%, transparent 70%)`,
                    }}
                  />
                  <item.House className="relative h-full w-full max-h-36" />
                </div>
              </DrawOnSvg>
              <div className="border-t border-gold/10 bg-dusk-light/90 p-5 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium text-parchment">{item.title}</h3>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      background: `${item.accent}20`,
                      color: item.accent,
                    }}
                  >
                    {item.style}
                  </span>
                </div>
                <p className="mt-1 text-sm text-parchment-muted">{item.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ScrollTrigger }
