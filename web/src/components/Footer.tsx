export function Footer() {
  return (
    <footer className="border-t border-border bg-paper-warm py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
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
