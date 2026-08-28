import { CottageHouse, ModernHouse, VictorianHouse } from './HouseDrawings'

const galleryItems = [
  {
    title: 'Victorian Revival',
    style: 'Classic Line',
    location: 'Portland, OR',
    House: VictorianHouse,
  },
  {
    title: 'Country Cottage',
    style: 'Line + Shading',
    location: 'Asheville, NC',
    House: CottageHouse,
  },
  {
    title: 'Mid-Century Modern',
    style: 'Classic Line',
    location: 'Palm Springs, CA',
    House: ModernHouse,
  },
  {
    title: 'Craftsman Bungalow',
    style: 'Line + Shading',
    location: 'Seattle, WA',
    House: VictorianHouse,
  },
  {
    title: 'Colonial Estate',
    style: 'Full Color',
    location: 'Charleston, SC',
    House: CottageHouse,
  },
  {
    title: 'Urban Brownstone',
    style: 'Classic Line',
    location: 'Brooklyn, NY',
    House: ModernHouse,
  },
]

export function Gallery() {
  return (
    <section id="gallery" className="border-y border-border bg-ink py-20 text-cream lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent-light/80">Portfolio</p>
            <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Recent commissions
            </h2>
            <p className="mt-4 text-lg text-stone-400">
              Every home tells a story. Here are a few we have had the pleasure of drawing.
            </p>
          </div>
          <a
            href="#order"
            className="shrink-0 rounded-full border border-stone-600 px-6 py-3 text-sm font-medium transition-colors hover:border-cream hover:bg-cream/5"
          >
            Commission yours →
          </a>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-xl border border-stone-700 bg-stone-900 transition-transform hover:-translate-y-1"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-[#faf9f7] p-8 transition-transform group-hover:scale-[1.02]">
                <item.House className="h-full w-full max-h-32 text-ink" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium">{item.title}</h3>
                  <span className="shrink-0 rounded-full bg-stone-800 px-2.5 py-0.5 text-xs text-stone-400">
                    {item.style}
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-500">{item.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
