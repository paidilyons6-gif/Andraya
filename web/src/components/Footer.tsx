import { Testimonials } from './Testimonials'

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-stone-400">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl font-semibold text-cream">Andraya</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              Hand-drawn portraits of the homes people love. Every illustration is crafted with care
              by our studio artists.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#how-it-works" className="transition-colors hover:text-cream">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#styles" className="transition-colors hover:text-cream">
                  Styles & Pricing
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition-colors hover:text-cream">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#order" className="transition-colors hover:text-cream">
                  Order
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="mailto:hello@andraya.studio" className="transition-colors hover:text-cream">
                  hello@andraya.studio
                </a>
              </li>
              <li>Mon–Fri, 9am–6pm ET</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 sm:flex-row">
          <p className="text-xs">© {new Date().getFullYear()} Andraya Studio. All rights reserved.</p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="transition-colors hover:text-cream">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-cream">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Testimonials }
