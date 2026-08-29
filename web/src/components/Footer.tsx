import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const motionEnabled = useMotionEnabled()

  useGSAP(
    () => {
      const line = lineRef.current
      if (!line || !motionEnabled || !footerRef.current) return

      gsap.from(line, {
        drawSVG: '0%',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
        },
      })
    },
    { scope: footerRef, dependencies: [motionEnabled] },
  )

  return (
    <footer ref={footerRef} className="border-t border-border bg-paper-warm py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <svg className="mb-12 h-px w-full" viewBox="0 0 1000 1" preserveAspectRatio="none" aria-hidden="true">
          <line
            ref={lineRef}
            x1="0"
            y1="0.5"
            x2="1000"
            y2="0.5"
            stroke="#9c4a32"
            strokeWidth="1"
          />
        </svg>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl font-medium text-ink">Andraya</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
              Hand-drawn portraits of the homes people love. Every illustration is crafted with care
              by our studio artists.
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wider text-ink-faint">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {['How It Works', 'Styles & Pricing', 'Gallery', 'Order'].map((label, i) => {
                const hrefs = ['#how-it-works', '#styles', '#gallery', '#order']
                return (
                  <li key={label}>
                    <a href={hrefs[i]} className="text-ink-muted transition-colors hover:text-ink">
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wider text-ink-faint">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li>
                <a href="mailto:hello@andraya.studio" className="transition-colors hover:text-accent">
                  hello@andraya.studio
                </a>
              </li>
              <li>Mon–Fri, 9am–6pm ET</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-ink-faint">© {new Date().getFullYear()} Andraya Studio. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-ink-faint">
            <a href="#" className="transition-colors hover:text-ink-muted">Privacy</a>
            <a href="#" className="transition-colors hover:text-ink-muted">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
