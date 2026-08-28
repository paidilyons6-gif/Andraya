import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '../lib/gsap'
import { MagneticButton } from './MagneticButton'

const links = [
  { href: '#how-it-works', label: 'Process' },
  { href: '#styles', label: 'Pricing' },
  { href: '#gallery', label: 'Work' },
  { href: '#order', label: 'Order' },
  { href: '#faq', label: 'FAQ' },
]

const sections = ['#how-it-works', '#styles', '#gallery', '#order', '#faq']

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

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
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-border bg-paper/95 backdrop-blur-sm' : 'border-transparent bg-paper/80'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="font-serif text-xl font-semibold text-ink">
          Andraya
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                active === link.href ? 'font-medium text-ink' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {link.label}
            </a>
          ))}
          <MagneticButton
            href="#order"
            strength={0.2}
            className="rounded-sm bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink/90"
          >
            Order
          </MagneticButton>
        </nav>

        <button
          type="button"
          className="p-2 md:hidden"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
          <span className={`my-1 block h-0.5 w-5 bg-ink ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-paper px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-ink-muted" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
