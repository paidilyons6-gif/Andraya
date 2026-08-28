import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { AnimatedText } from './AnimatedText'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

const steps = [
  {
    number: '1',
    title: 'Send a photo',
    description: 'A clear shot of the front of your house, taken in daylight. That is all we need to get started.',
  },
  {
    number: '2',
    title: 'Pick a style',
    description: 'Line drawing, shading, or color. Choose your print size. We will confirm everything before you pay.',
  },
  {
    number: '3',
    title: 'We draw it',
    description: 'Our artists work from your photo, by hand. One round of revisions is included if something needs adjusting.',
  },
  {
    number: '4',
    title: 'It arrives',
    description: 'Your print ships ready to frame. You also get a high-resolution digital file.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      if (!motionEnabled) return
      ScrollTrigger.batch('.step-card', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, { y: 32, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' })
        },
      })
    },
    { scope: sectionRef, dependencies: [motionEnabled] },
  )

  return (
    <section id="how-it-works" ref={sectionRef} className="section-studio border-b border-border py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-lg">
          <p className="text-sm text-ink-faint">The process</p>
          <AnimatedText as="h2" className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl">
            How it works
          </AnimatedText>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <span className="font-serif text-4xl font-light text-border-dark">{step.number}</span>
              <h3 className="mt-3 font-serif text-lg font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
