import { Suspense, lazy, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { AnimatedText } from './AnimatedText'
import { DrawOnSvg } from './DrawOnSvg'
import { CottageHouse, ModernHouse, VictorianHouse } from './HouseDrawings'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { MOTION } from '../lib/motion'
import { refreshScrollTriggers } from '../hooks/useScrollProgress'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

const GalleryCanvas = lazy(() =>
  import('./webgl/GalleryCanvas').then((m) => ({ default: m.GalleryCanvas })),
)

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
  const approachRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const [webglActive, setWebglActive] = useState(false)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !sectionRef.current) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        if (approachRef.current) {
          gsap.fromTo(
            approachRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'top 20%',
                scrub: 1,
              },
            },
          )

          gsap.to(vignetteRef.current, {
            opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'top top',
              scrub: 1,
            },
          })
        }

        if (pinRef.current && trackRef.current) {
          const track = trackRef.current
          const totalScroll = () => track.scrollWidth - window.innerWidth + 240

          ScrollTrigger.create({
            trigger: pinRef.current,
            start: 'top top',
            end: () => `+=${totalScroll()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
              setWebglActive(true)
              requestAnimationFrame(() => refreshScrollTriggers())
            },
            onLeave: () => setWebglActive(false),
            onEnterBack: () => setWebglActive(true),
            onLeaveBack: () => setWebglActive(false),
            onUpdate: (self) => {
              progressRef.current = self.progress
            },
          })

          gsap.to(track, {
            x: () => -totalScroll(),
            ease: 'none',
            scrollTrigger: {
              trigger: pinRef.current,
              start: 'top top',
              end: () => `+=${totalScroll()}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
        }

        return () => ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === sectionRef.current || st.trigger === pinRef.current) st.kill()
        })
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.from('.gallery-card', {
          y: 32,
          opacity: 0,
          duration: 0.7,
          stagger: MOTION.stagger.card,
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
    <section id="gallery" ref={sectionRef} className="relative">
      {/* Approach transition */}
      <div
        ref={approachRef}
        className="pointer-events-none relative h-[30vh] opacity-0 lg:block hidden"
        aria-hidden="true"
      >
        <div
          ref={vignetteRef}
          className="absolute inset-0 opacity-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(26, 24, 22, 0.85) 100%)',
          }}
        />
      </div>

      {/* Desktop pinned gallery */}
      <div ref={pinRef} className="relative hidden lg:block">
        {webglActive && motionEnabled && (
          <div className="pointer-events-none absolute inset-0 z-0">
            <Suspense fallback={null}>
              <GalleryCanvas progressRef={progressRef} />
            </Suspense>
          </div>
        )}

        <div className="gallery-wall relative z-10 min-h-screen overflow-hidden">
          <div className="mx-auto max-w-6xl px-8 pt-20 pb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-gallery-muted">Portfolio</p>
            <AnimatedText
              as="h2"
              className="mt-3 font-serif text-4xl font-medium text-gallery-spot sm:text-5xl"
            >
              Recent commissions
            </AnimatedText>
            <p className="mt-4 max-w-lg text-base text-gallery-muted">
              Scroll through work from our studio wall — each piece drawn by hand from a client&apos;s
              photo.
            </p>
          </div>

          <div className="relative pb-24">
            <div
              ref={trackRef}
              className="flex w-max gap-8 px-8 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
            >
              {galleryItems.map((item) => (
                <article key={item.title} className="gallery-card w-[min(85vw,360px)] shrink-0">
                  <div className="mat-board p-4">
                    <DrawOnSvg trigger="scroll" stagger={0.04} duration={0.6}>
                      <div className="flex aspect-[4/3] items-center justify-center border border-border bg-paper p-6">
                        <item.House className="h-full w-full max-h-36" />
                      </div>
                    </DrawOnSvg>
                    <div className="mt-4 border-t border-border pt-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-lg font-medium text-ink">{item.title}</h3>
                        <span className="shrink-0 text-[10px] uppercase tracking-wider text-ink-faint">
                          {item.style}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-ink-muted">{item.location}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile vertical gallery */}
      <div className="gallery-wall border-b border-border px-6 py-16 lg:hidden">
        <p className="text-xs uppercase tracking-[0.25em] text-gallery-muted">Portfolio</p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-gallery-spot">Recent commissions</h2>
        <p className="mt-4 text-sm text-gallery-muted">
          Every home tells a story. Here are a few we have had the pleasure of drawing.
        </p>
        <div className="mt-10 space-y-8">
          {galleryItems.map((item) => (
            <article key={item.title} className="gallery-card">
              <div className="mat-board p-4">
                <DrawOnSvg trigger="scroll" stagger={0.04} duration={0.6}>
                  <div className="flex aspect-[4/3] items-center justify-center border border-border bg-paper p-6">
                    <item.House className="h-full w-full max-h-32" />
                  </div>
                </DrawOnSvg>
                <div className="mt-4 border-t border-border pt-3">
                  <h3 className="font-serif text-lg font-medium text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-ink-faint">{item.style}</p>
                  <p className="text-sm text-ink-muted">{item.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <a
          href="#order"
          className="mt-10 inline-block border border-gallery-muted px-6 py-3 text-sm text-gallery-spot"
        >
          Commission yours →
        </a>
      </div>

      {/* Exit wash back to paper */}
      <div
        className="pointer-events-none hidden h-[20vh] lg:block"
        style={{
          background: 'linear-gradient(to bottom, var(--color-gallery-bg), var(--color-paper))',
        }}
        aria-hidden="true"
      />
    </section>
  )
}

export { ScrollTrigger }
