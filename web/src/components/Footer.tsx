export function Footer() {
  return (
    <footer
      className="relative border-t border-gold/15 py-16"
      style={{
        background: 'linear-gradient(180deg, #0c0f14 0%, #080a0e 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.5), transparent)',
        }}
      />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-serif text-3xl font-semibold text-gradient-gold">Andraya</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-parchment-muted">
              Hand-drawn portraits of the homes people love. Every illustration is crafted with care
              by our studio artists.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {['How It Works', 'Styles & Pricing', 'Gallery', 'Order'].map((label, i) => {
                const hrefs = ['#how-it-works', '#styles', '#gallery', '#order']
                return (
                  <li key={label}>
                    <a href={hrefs[i]} className="text-parchment-muted transition-colors hover:text-gold-bright">
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-parchment-muted">
              <li>
                <a href="mailto:hello@andraya.studio" className="transition-colors hover:text-gold-bright">
                  hello@andraya.studio
                </a>
              </li>
              <li>Mon–Fri, 9am–6pm ET</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-8 sm:flex-row">
          <p className="text-xs text-parchment-muted">© {new Date().getFullYear()} Andraya Studio. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-parchment-muted">
            <a href="#" className="transition-colors hover:text-gold">Privacy</a>
            <a href="#" className="transition-colors hover:text-gold">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Testimonials } from './Testimonials'
