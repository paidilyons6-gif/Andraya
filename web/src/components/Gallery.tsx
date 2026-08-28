import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { AnimatedText } from './AnimatedText'
import { DrawOnSvg } from './DrawOnSvg'
import { CottageHouse, ModernHouse, VictorianHouse } from './HouseDrawings'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

const galleryItems = [
  { title: 'Victorian Revival', style: 'Classic Line', location: 'Portland, OR', House: VictorianHouse },
  { title: 'Country Cottage', style: 'Line + Shading', location: 'Asheville, NC', House: CottageHouse },
  { title: 'Mid-Century Modern', style: 'Classic Line', location: 'Palm Springs, CA', House: ModernHouse },
  { title: 'Craftsman Bungalow', style: 'Line + Shading', location: 'Seattle, WA', House: VictorianHouse },
  { title: 'Colonial Estate', style: 'Full Color', location: 'Charleston, SC', House: CottageHouse },
  { title: 'Urban Brownstone', style: 'Classic Line', location: 'Brooklyn, NY', House: ModernHouse },
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
          y: 32,
          opacity: 0,
          duration: 0.7,
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
      className="section-studio relative overflow-hidden border-b border-border py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-sm text-ink-faint">Portfolio</p>
            <AnimatedText
              as="h2"
              className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl"
            >
              Recent commissions
            </AnimatedText>
            <p className="mt-4 text-base text-ink-muted">
              Every home tells a story. Here are a few we have had the pleasure of drawing.
            </p>
          </div>
          <a
            href="#order"
            className="shrink-0 border border-border-dark bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
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
              className="gallery-card w-[min(85vw,340px)] shrink-0"
            >
              <div className="mat-board p-4">
                <DrawOnSvg trigger="scroll" stagger={0.04} duration={0.6}>
                  <div className="flex aspect-[4/3] items-center justify-center border border-border bg-paper p-6">
                    <item.House className="h-full w-full max-h-36" />
                  </div>
                </DrawOnSvg>
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg font-medium text-ink">{item.title}</h3>
                    <span className="shrink-0 text-xs text-ink-faint">{item.style}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">{item.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ScrollTrigger }
