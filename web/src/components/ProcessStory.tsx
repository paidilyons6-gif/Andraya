import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { HouseLineDrawing, HouseShadedDrawing } from './HouseDrawings'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { MOTION } from '../lib/motion'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

const chapters = [
  {
    num: '01',
    title: 'Send a photo',
    body: 'A clear shot of the front of your house, taken in daylight. That is all we need to get started.',
  },
  {
    num: '02',
    title: 'Pick a style',
    body: 'Line drawing, shading, or color. Choose your print size. We confirm everything before you pay.',
  },
  {
    num: '03',
    title: 'We draw it',
    body: 'Our artists work from your photo, by hand. One round of revisions is included.',
  },
  {
    num: '04',
    title: 'It arrives',
    body: 'Your print ships ready to frame. You also get a high-resolution digital file.',
  },
]

export function ProcessStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !sectionRef.current || !pinRef.current) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const pin = pinRef.current!
        const drawPaths = pin.querySelectorAll<SVGGeometryElement>('.process-line-layer [data-draw]')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: MOTION.processPinLength,
            pin,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        tl.fromTo('.process-photo', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1 }, 0)
          .fromTo('.process-chapter-0', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 0)

        if (drawPaths.length) {
          tl.fromTo(
            drawPaths,
            { drawSVG: '0%' },
            { drawSVG: '100%', duration: 2, stagger: MOTION.stagger.draw, ease: 'none' },
            1,
          )
        }

        tl.fromTo('.process-chapter-0', { opacity: 1 }, { opacity: 0, y: -16, duration: 0.4 }, 2)
          .fromTo('.process-chapter-1', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 2.1)
          .fromTo('.process-line-layer', { opacity: 1 }, { opacity: 0, duration: 0.8 }, 3)
          .fromTo('.process-shade-layer', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 3)
          .fromTo('.process-chapter-1', { opacity: 1 }, { opacity: 0, y: -16, duration: 0.4 }, 4)
          .fromTo('.process-chapter-2', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 4.1)
          .fromTo('.process-mat', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: MOTION.easings.reveal }, 5)
          .fromTo('.process-chapter-2', { opacity: 1 }, { opacity: 0, duration: 0.4 }, 5.8)
          .fromTo('.process-chapter-3', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 6)

        return () => tl.scrollTrigger?.kill()
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray<HTMLElement>('.process-mobile-chapter').forEach((el) => {
          gsap.from(el, {
            y: 32,
            opacity: 0,
            duration: 0.7,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  return (
    <section id="how-it-works" ref={sectionRef} className="relative">
      {/* Desktop pinned narrative */}
      <div ref={pinRef} className="hidden min-h-screen lg:block">
        <div className="section-studio flex min-h-screen items-center border-b border-border">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_1.1fr] items-center gap-16 px-8 py-16">
            <div className="relative h-[420px]">
              <div className="process-photo absolute inset-0 flex items-center justify-center opacity-0">
                <div className="w-full max-w-sm border border-border-dark bg-paper p-3 shadow-sm">
                  <div
                    className="aspect-[4/3] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'linear-gradient(135deg, #d4cfc7 0%, #a8a29e 40%, #78716c 100%)',
                    }}
                  />
                  <p className="mt-2 text-center font-serif text-xs italic text-ink-faint">
                    Reference photo — your submission
                  </p>
                </div>
              </div>

              <div className="process-line-layer absolute inset-0 flex items-center justify-center">
                <HouseLineDrawing className="w-full max-w-sm" />
              </div>

              <div className="process-shade-layer absolute inset-0 flex items-center justify-center opacity-0">
                <HouseShadedDrawing className="w-full max-w-sm" />
              </div>

              <div className="process-mat absolute inset-0 flex items-center justify-center opacity-0">
                <div className="mat-board w-full max-w-sm p-5">
                  <HouseShadedDrawing className="w-full" />
                  <p className="mt-3 text-center font-serif text-sm italic text-ink-faint">
                    Ready to frame — archival print included
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[280px]">
              {chapters.map((ch, i) => (
                <div
                  key={ch.num}
                  className={`process-chapter-${i} absolute inset-0 flex flex-col justify-center ${i === 0 ? '' : 'opacity-0'}`}
                >
                  <span className="process-chapter-num font-serif text-6xl font-light text-border-dark">
                    {ch.num}
                  </span>
                  <h2 className="mt-4 font-serif text-3xl font-medium text-ink">{ch.title}</h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">{ch.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: editorial stack */}
      <div className="border-b border-border lg:hidden">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm text-ink-faint">The process</p>
          <h2 className="mt-2 font-serif text-3xl font-medium text-ink">How it works</h2>
        </div>
        <div className="space-y-16 px-6 pb-20">
          {chapters.map((ch, i) => (
            <article key={ch.num} className="process-mobile-chapter">
              <span className="font-serif text-4xl font-light text-border-dark">{ch.num}</span>
              <h3 className="mt-3 font-serif text-xl font-medium text-ink">{ch.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{ch.body}</p>
              {i === 1 && (
                <div className="mt-6 border border-border bg-paper p-4">
                  <DrawOnSvgMobile />
                </div>
              )}
              {i === 3 && (
                <div className="mat-board mt-6 p-4">
                  <HouseShadedDrawing className="w-full" />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DrawOnSvgMobile() {
  const ref = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !ref.current) return
      const paths = ref.current.querySelectorAll<SVGGeometryElement>('[data-draw]')
      gsap.from(paths, {
        drawSVG: '0%',
        duration: 1.2,
        stagger: 0.05,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      })
    },
    { scope: ref, dependencies: [motionEnabled] },
  )

  return (
    <div ref={ref}>
      <HouseLineDrawing className="w-full" />
    </div>
  )
}

export { ScrollTrigger }
