import { HouseLineDrawing } from './HouseDrawings'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-light/40 via-transparent to-transparent" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent">
            Hand-drawn home portraits
          </p>
          <h1 className="font-serif text-5xl font-medium leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
            Your home,
            <br />
            <span className="italic text-ink-muted">beautifully drawn.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            Send us a photo of your house and receive a custom illustration of its facade — from
            elegant line drawings to richly shaded artwork. A timeless keepsake of the place you
            love.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#order"
              className="inline-flex items-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover hover:shadow-accent/30"
            >
              Start Your Commission
            </a>
            <a
              href="#styles"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              View styles & pricing
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <div>
              <dt className="font-serif text-2xl font-semibold text-ink">500+</dt>
              <dd className="mt-1 text-xs text-ink-faint">Homes illustrated</dd>
            </div>
            <div>
              <dt className="font-serif text-2xl font-semibold text-ink">7–10</dt>
              <dd className="mt-1 text-xs text-ink-faint">Days turnaround</dd>
            </div>
            <div>
              <dt className="font-serif text-2xl font-semibold text-ink">100%</dt>
              <dd className="mt-1 text-xs text-ink-faint">Hand-drawn</dd>
            </div>
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-cream-dark to-transparent opacity-60" />
            <div className="relative rotate-1 rounded-xl border border-border bg-paper p-3 shadow-2xl shadow-ink/5 transition-transform duration-500 hover:rotate-0">
              <HouseLineDrawing className="w-full" />
              <p className="mt-2 text-center font-serif text-sm italic text-ink-faint">
                Classic line — Victorian cottage
              </p>
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-lg border border-border bg-paper px-4 py-3 shadow-lg sm:block">
              <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">From</p>
              <p className="font-serif text-xl font-semibold text-ink">$89</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
