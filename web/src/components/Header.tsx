import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { MagneticButton } from './MagneticButton'

const links = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#styles', label: 'Styles & Pricing' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#order', label: 'Order' },
  { href: '#faq', label: 'FAQ' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const header = headerRef.current
      if (!header) return

      gsap.from(header, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      })

      ScrollTrigger.create({
        start: 0,
        end: 150,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(header, {
            backgroundColor: `rgba(247, 244, 239, ${0.85 + p * 0.1})`,
            boxShadow: p > 0.1 ? '0 4px 24px rgba(28,25,23,0.08)' : 'none',
          })
        },
      })
    },
    { scope: headerRef },
  )

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border/60 bg-cream/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="group flex items-baseline gap-1.5">
          <span className="font-serif text-2xl font-semibold tracking-tight text-ink">Andraya</span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-ink-faint sm:inline">
            Studio
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <MagneticButton
            href="#order"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-ink/90"
          >
            Commission Yours
          </MagneticButton>
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span className={`block h-0.5 w-6 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-cream px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-ink-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#order"
              className="rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-cream"
              onClick={() => setOpen(false)}
            >
              Commission Yours
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
