import { useState } from 'react'

const links = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#styles', label: 'Styles & Pricing' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#order', label: 'Order' },
  { href: '#faq', label: 'FAQ' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-cream/90 backdrop-blur-md">
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
          <a
            href="#order"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-ink/90"
          >
            Commission Yours
          </a>
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
