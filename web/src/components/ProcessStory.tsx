import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { HomePortrait } from './HomePortrait'
import { HERO_PORTRAIT } from '../data/portraits'
import { gsap } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

const chapters = [
  {
    num: '01',
    title: 'Send a photo',
    body: 'A clear shot of the front of your house, taken in daylight. That is all we need to get started.',
    preview: 'photo' as const,
  },
  {
    num: '02',
    title: 'Pick a style',
    body: 'Line drawing, shading, or color. Choose your print size. We confirm everything before you pay.',
    preview: 'line' as const,
  },
  {
    num: '03',
    title: 'We draw it',
    body: 'Our artists work from your photo, by hand. One round of revisions is included.',
    preview: 'shaded' as const,
  },
  {
    num: '04',
    title: 'It arrives',
    body: 'Your print ships ready to frame. You also get a high-resolution digital file.',
    preview: 'mat' as const,
  },
]

export function ProcessStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled || !sectionRef.current) return

      gsap.utils.toArray<HTMLElement>('.process-step').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.65,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  return (
    <section id="how-it-works" ref={sectionRef} className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        <p className="text-sm text-ink-faint">The process</p>
        <h2 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl">How it works</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
          From your front-door snapshot to a framed portrait — four simple steps.
        </p>

        <div className="mt-14 space-y-16 lg:space-y-20">
          {chapters.map((ch, i) => (
            <article
              key={ch.num}
              className={`process-step grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}
            >
              <div>
                <span className="font-serif text-5xl font-light text-border-dark">{ch.num}</span>
                <h3 className="mt-3 font-serif text-2xl font-medium text-ink">{ch.title}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">{ch.body}</p>
              </div>

              <div className={ch.preview === 'mat' ? 'mat-board p-5' : 'border border-border bg-paper p-4'}>
                <HomePortrait portrait={HERO_PORTRAIT} variant={ch.preview === 'mat' ? 'shaded' : ch.preview} />
                {ch.preview === 'photo' && (
                  <p className="mt-2 text-center font-serif text-xs italic text-ink-faint">
                    Your photo — we draw from this
                  </p>
                )}
                {ch.preview === 'mat' && (
                  <p className="mt-3 text-center font-serif text-sm italic text-ink-faint">
                    Ready to frame — archival print included
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
