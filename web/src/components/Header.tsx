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

const sections = ['#how-it-works', '#styles', '#gallery', '#order', '#faq']

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

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
        end: 200,
        onUpdate: (self) => setScrolled(self.progress > 0.15),
      })

      sections.forEach((id) => {
        const el = document.querySelector(id)
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActive(id),
          onEnterBack: () => setActive(id),
        })
      })
    },
    { scope: headerRef },
  )

  useGSAP(
    () => {
      const indicator = indicatorRef.current
      if (!indicator || !active) return
      const link = document.querySelector(`[data-nav="${active}"]`)
      if (!link?.parentElement) return
      const linkRect = link.getBoundingClientRect()
      const navRect = link.parentElement.getBoundingClientRect()
      gsap.to(indicator, {
        x: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      })
    },
    { dependencies: [active] },
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
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark border-b border-border shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="group flex items-baseline gap-2">
          <span className="font-serif text-2xl font-semibold tracking-tight text-parchment group-hover:text-gold-bright transition-colors">
            Andraya
          </span>
          <span className="hidden text-[10px] font-bold uppercase tracking-[0.25em] text-gold/70 sm:inline">
            Studio
          </span>
        </a>

        <nav className="relative hidden items-center gap-8 md:flex">
          <span
            ref={indicatorRef}
            className="absolute -bottom-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0"
            aria-hidden="true"
          />
          {links.map((link) => (
            <a
              key={link.href}
              data-nav={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                active === link.href ? 'text-gold-bright' : 'text-parchment-muted hover:text-parchment'
              }`}
            >
              {link.label}
            </a>
          ))}
          <MagneticButton
            href="#order"
            className="rounded-full border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold-bright backdrop-blur-sm transition-all hover:border-gold hover:bg-gold/20 hover:shadow-[0_0_20px_rgba(212,168,83,0.3)]"
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
          <span className={`block h-0.5 w-6 bg-parchment transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-parchment transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-parchment transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="glass-dark border-t border-border px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-base font-medium ${active === link.href ? 'text-gold-bright' : 'text-parchment-muted'}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#order"
              className="rounded-full bg-gradient-to-r from-copper to-gold py-3 text-center text-sm font-bold text-midnight"
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
