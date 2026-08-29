import { Suspense, lazy, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { AnimatedText } from './AnimatedText'
import { HomePortrait } from './HomePortrait'
import { GALLERY_PORTRAITS } from '../data/portraits'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { MOTION } from '../lib/motion'
import { refreshScrollTriggers } from '../hooks/useScrollProgress'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

const GalleryCanvas = lazy(() =>
  import('./webgl/GalleryCanvas').then((m) => ({ default: m.GalleryCanvas })),
)

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const approachRef = useRef<HTMLDivElement>(null)
  const approachBgRef = useRef<HTMLDivElement>(null)
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
        if (approachRef.current && approachBgRef.current) {
          gsap.fromTo(
            approachBgRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: approachRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )

          gsap.to(vignetteRef.current, {
            opacity: 1,
            scrollTrigger: {
              trigger: approachRef.current,
              start: 'top 70%',
              end: 'bottom top',
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

        const cards = gsap.utils.toArray<HTMLElement>('.gallery-card')
        cards.forEach((card) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'center center',
            end: 'center center',
            onEnter: () => {
              gsap.to(cards, {
                scale: (_i, el) => (el === card ? MOTION.SURPRISE.spotlightScale : 1),
                opacity: (_i, el) => (el === card ? 1 : MOTION.SURPRISE.dimOpacity),
                duration: 0.45,
                ease: 'power2.out',
              })
            },
            onEnterBack: () => {
              gsap.to(cards, {
                scale: (_i, el) => (el === card ? MOTION.SURPRISE.spotlightScale : 1),
                opacity: (_i, el) => (el === card ? 1 : MOTION.SURPRISE.dimOpacity),
                duration: 0.45,
                ease: 'power2.out',
              })
            },
            onLeave: () => {
              gsap.to(card, { scale: 1, opacity: 1, duration: 0.35 })
            },
            onLeaveBack: () => {
              gsap.to(card, { scale: 1, opacity: 1, duration: 0.35 })
            },
          })
        })

        return () => {
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === sectionRef.current || st.trigger === pinRef.current) st.kill()
          })
        }
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
      <div
        ref={approachRef}
        className="pointer-events-none relative hidden lg:block"
        style={{ height: MOTION.galleryApproachLength }}
        aria-hidden="true"
      >
        <div
          ref={approachBgRef}
          className="absolute inset-0 opacity-0"
          style={{
            background: `linear-gradient(to bottom, var(--color-paper), var(--color-gallery-bg))`,
          }}
        />
        <div
          ref={vignetteRef}
          className="absolute inset-0 opacity-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 25%, rgba(26, 24, 22, 0.9) 100%)',
          }}
        />
      </div>

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
              mode="chars"
              trigger="scroll"
              className="mt-3 font-serif text-4xl font-medium text-gallery-spot sm:text-5xl"
            >
              Recent commissions
            </AnimatedText>
            <p className="mt-4 max-w-lg text-base text-gallery-muted">
              Real homes, real clients — each portrait drawn by hand from a front-facing photo.
            </p>
          </div>

          <div className="relative pb-24">
            <div
              ref={trackRef}
              className="flex w-max gap-8 px-8 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
            >
              {GALLERY_PORTRAITS.map((item) => (
                <article
                  key={item.title}
                  className="gallery-card w-[min(85vw,360px)] shrink-0"
                  style={{ transformOrigin: 'top center', perspective: '800px' }}
                >
                  <div
                    className="mat-board p-4"
                    style={{ transform: 'rotateX(2deg)', transformOrigin: 'top center' }}
                  >
                    <HomePortrait portrait={item.portrait} variant={item.styleVariant} />
                    <div className="mt-4 border-t border-border pt-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-lg font-medium text-ink">{item.title}</h3>
                        <span className="shrink-0 text-[10px] uppercase tracking-wider text-ink-faint">
                          {item.style}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-ink-muted">{item.portrait.location}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="gallery-wall border-b border-border px-6 py-16 lg:hidden">
        <p className="text-xs uppercase tracking-[0.25em] text-gallery-muted">Portfolio</p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-gallery-spot">Recent commissions</h2>
        <p className="mt-4 text-sm text-gallery-muted">
          Real homes, real clients — each portrait drawn by hand from a front-facing photo.
        </p>
        <div className="mt-10 space-y-8">
          {GALLERY_PORTRAITS.map((item) => (
            <article key={item.title} className="gallery-card">
              <div className="mat-board p-4">
                <HomePortrait portrait={item.portrait} variant={item.styleVariant} />
                <div className="mt-4 border-t border-border pt-3">
                  <h3 className="font-serif text-lg font-medium text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-ink-faint">{item.style}</p>
                  <p className="text-sm text-ink-muted">{item.portrait.location}</p>
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
