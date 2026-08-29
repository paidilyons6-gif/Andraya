import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { Logo } from './Logo'
import { MagneticButton } from './MagneticButton'

const links = [
  { href: '#how-it-works', label: 'Process' },
  { href: '#styles', label: 'Pricing' },
  { href: '#gallery', label: 'Portfolio' },
  { href: '#order', label: 'Order' },
  { href: '#faq', label: 'FAQ' },
]

const sections = ['#how-it-works', '#styles', '#gallery', '#order', '#faq']

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const lastScroll = useRef(0)

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 0,
        end: 80,
        onUpdate: (self) => setScrolled(self.progress > 0.2),
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

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const header = headerRef.current
          if (!header) return
          const y = self.scroll()
          if (y > lastScroll.current && y > 120) {
            gsap.to(header, { y: '-100%', duration: 0.35, ease: 'power2.out' })
          } else {
            gsap.to(header, { y: 0, duration: 0.35, ease: 'power2.out' })
          }
          lastScroll.current = y
        },
      })
    },
    { scope: headerRef },
  )

  useGSAP(
    () => {
      if (!navRef.current) return
      const underlines = navRef.current.querySelectorAll('.nav-link-underline')
      underlines.forEach((el) => {
        const link = el.parentElement?.getAttribute('href')
        gsap.to(el, {
          scaleX: link === active ? 1 : 0,
          duration: 0.35,
          ease: 'power2.out',
          transformOrigin: 'left center',
        })
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
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-border bg-paper/95 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-paper/70 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 lg:px-8">
        <a href="#" className="group transition-opacity hover:opacity-90" aria-label="Andraya Studio — Home">
          <Logo variant="full" size="sm" />
        </a>

        <nav ref={navRef} className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-[13px] tracking-wide transition-colors ${
                active === link.href ? 'font-medium text-ink' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {link.label}
              <span
                className="nav-link-underline absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent"
                aria-hidden="true"
              />
            </a>
          ))}
          <MagneticButton href="#order" strength={0.2} className="btn-primary px-5 py-2.5 text-[13px]">
            Commission
          </MagneticButton>
        </nav>

        <button
          type="button"
          className="rounded-sm p-2.5 transition-colors hover:bg-paper-warm md:hidden"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
          <span className={`my-1 block h-0.5 w-5 bg-ink ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-paper px-6 py-5 md:hidden">
          <div className="mb-5 flex justify-center">
            <Logo variant="full" size="md" />
          </div>
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-sm px-3 py-2.5 text-ink-muted transition-colors hover:bg-paper-warm hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#order"
              className="btn-accent mt-3 text-center"
              onClick={() => setOpen(false)}
            >
              Commission a drawing
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
