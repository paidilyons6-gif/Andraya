import { useGSAP } from '@gsap/react'
import { useCallback, useRef } from 'react'
import { HomePortrait } from './HomePortrait'
import { SectionHeader } from './SectionHeader'
import { HERO_PORTRAIT } from '../data/portraits'
import { gsap, SplitText } from '../lib/gsap'
import { MOTION } from '../lib/motion'
import { usePinnedTimeline } from '../hooks/usePinnedTimeline'
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

function revealChapter(selector: string) {
  const el = document.querySelector<HTMLElement>(selector)
  if (!el) return
  const numEl = el.querySelector('.process-chapter-num')
  const titleEl = el.querySelector('.process-chapter-title')
  if (numEl) {
    const split = SplitText.create(numEl, { type: 'chars' })
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: MOTION.SURPRISE.charStagger,
      duration: 0.5,
      ease: 'power3.out',
    })
  }
  if (titleEl) {
    const split = SplitText.create(titleEl, { type: 'chars' })
    gsap.from(split.chars, {
      opacity: 0,
      y: 16,
      stagger: MOTION.SURPRISE.charStagger,
      duration: 0.45,
      delay: 0.1,
      ease: 'power3.out',
    })
  }
}

export function ProcessStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()

  const buildTimeline = useCallback((tl: gsap.core.Timeline) => {
    tl.fromTo('.process-photo', { opacity: 0, scale: 0.96, rotation: -1 }, { opacity: 1, scale: 1, rotation: 0, duration: 1 }, 0)
      .add(() => revealChapter('.process-chapter-0'), 0.2)
      .fromTo(
        '.process-flash',
        { opacity: 0 },
        {
          opacity: MOTION.SURPRISE.flashPeak,
          duration: MOTION.SURPRISE.flashDuration / 2,
          yoyo: true,
          repeat: 1,
        },
        0.8,
      )
      .fromTo(
        '.process-line-layer',
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 2, ease: 'none' },
        1.2,
      )
      .fromTo('.process-chapter-0', { opacity: 1 }, { opacity: 0, y: -16, duration: 0.4 }, 2.8)
      .add(() => revealChapter('.process-chapter-1'), 2.9)
      .fromTo('.process-chapter-1', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 2.9)
      .fromTo('.process-line-layer', { opacity: 1 }, { opacity: 0, duration: 0.8 }, 3.8)
      .fromTo('.process-shade-layer', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 3.8)
      .fromTo('.process-chapter-1', { opacity: 1 }, { opacity: 0, y: -16, duration: 0.4 }, 4.8)
      .add(() => revealChapter('.process-chapter-2'), 4.9)
      .fromTo('.process-chapter-2', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 4.9)
      .fromTo(
        '.process-mat',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: MOTION.SURPRISE.bounceEase },
        5.6,
      )
      .fromTo('.process-chapter-2', { opacity: 1 }, { opacity: 0, duration: 0.4 }, 6.4)
      .add(() => revealChapter('.process-chapter-3'), 6.5)
      .fromTo('.process-chapter-3', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 6.5)
  }, [])

  usePinnedTimeline(
    sectionRef,
    { pin: pinRef, end: MOTION.processPinLength, onTimeline: buildTimeline },
    motionEnabled,
  )

  useGSAP(
    () => {
      if (!motionEnabled || !sectionRef.current) return

      const mm = gsap.matchMedia()
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
      <div ref={pinRef} className="hidden min-h-screen lg:block">
        <div className="section-studio relative flex min-h-screen items-center border-b border-border">
          <div
            className="process-flash pointer-events-none absolute inset-0 z-20 bg-paper opacity-0"
            aria-hidden="true"
          />
          <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_1.1fr] items-center gap-16 px-8 py-16">
            <div className="relative h-[420px]">
              <div className="process-photo absolute inset-0 flex items-center justify-center opacity-0">
                <div className="w-full max-w-sm border border-border-dark bg-paper p-3 shadow-sm">
                  <HomePortrait portrait={HERO_PORTRAIT} variant="photo" />
                  <p className="mt-2 text-center font-serif text-xs italic text-ink-faint">
                    Your photo — we draw from this
                  </p>
                </div>
              </div>

              <div className="process-line-layer absolute inset-0 flex items-center justify-center">
                <HomePortrait portrait={HERO_PORTRAIT} variant="line" className="w-full max-w-sm" />
              </div>

              <div className="process-shade-layer absolute inset-0 flex items-center justify-center opacity-0">
                <HomePortrait portrait={HERO_PORTRAIT} variant="shaded" className="w-full max-w-sm" />
              </div>

              <div className="process-mat absolute inset-0 flex items-center justify-center opacity-0">
                <div className="mat-board w-full max-w-sm p-5">
                  <HomePortrait portrait={HERO_PORTRAIT} variant="shaded" />
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
                  <h2 className="process-chapter-title mt-4 font-serif text-3xl font-medium text-ink">
                    {ch.title}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">{ch.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border lg:hidden">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader
            eyebrow="The process"
            title="How it works"
            description="From your front-door snapshot to a framed portrait — four simple steps."
          />
        </div>
        <div className="space-y-16 px-6 pb-20">
          {chapters.map((ch, i) => (
            <article key={ch.num} className="process-mobile-chapter">
              <span className="font-serif text-4xl font-light text-border-dark">{ch.num}</span>
              <h3 className="mt-3 font-serif text-xl font-medium text-ink">{ch.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{ch.body}</p>
              {i === 0 && (
                <div className="mt-6 border border-border bg-paper p-3">
                  <HomePortrait portrait={HERO_PORTRAIT} variant="photo" />
                </div>
              )}
              {i === 1 && (
                <div className="mt-6 border border-border bg-paper p-3">
                  <HomePortrait portrait={HERO_PORTRAIT} variant="line" />
                </div>
              )}
              {i === 3 && (
                <div className="mat-board mt-6 p-4">
                  <HomePortrait portrait={HERO_PORTRAIT} variant="shaded" />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
