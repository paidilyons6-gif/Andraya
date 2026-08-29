import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { Logo } from './Logo'
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
    <footer ref={footerRef} className="border-t border-border bg-paper-warm py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <svg className="mb-14 h-px w-full" viewBox="0 0 1000 1" preserveAspectRatio="none" aria-hidden="true">
          <line ref={lineRef} x1="0" y1="0.5" x2="1000" y2="0.5" stroke="#8f3f2b" strokeWidth="1" />
        </svg>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Logo variant="full" size="lg" showTagline />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-muted">
              A boutique illustration studio specializing in hand-drawn home portraits. Every
              commission is crafted with care by our in-house artists.
            </p>
          </div>
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="section-eyebrow text-ink-faint">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {['How It Works', 'Styles & Pricing', 'Portfolio', 'Order'].map((label, i) => {
                const hrefs = ['#how-it-works', '#styles', '#gallery', '#order']
                return (
                  <li key={label}>
                    <a href={hrefs[i]} className="text-ink-muted transition-colors hover:text-accent">
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="section-eyebrow text-ink-faint">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-ink-muted">
              <li>
                <a href="mailto:hello@andraya.studio" className="transition-colors hover:text-accent">
                  hello@andraya.studio
                </a>
              </li>
              <li>Mon–Fri, 9am–6pm ET</li>
              <li>Portland, Oregon</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} Andraya Studio. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-ink-faint">
            <a href="#" className="transition-colors hover:text-ink-muted">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-ink-muted">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
