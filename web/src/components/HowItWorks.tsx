const steps = [
  {
    number: '01',
    title: 'Share your photo',
    description:
      'Upload a clear front-facing photo of your home. Include the full facade, good lighting, and minimal obstructions like parked cars.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Choose your style',
    description:
      'Pick from our line drawing, shaded, or full-color options. Select your size and any add-ons like digital files or extra copies.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'We draw by hand',
    description:
      'Our artists study every architectural detail — windows, trim, landscaping — and create your portrait with care and precision.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Receive your artwork',
    description:
      'Your finished illustration arrives ready to frame — a personal piece you will cherish for years, or give as a meaningful gift.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Simple process</p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            From your doorstep to your wall in four easy steps.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.number} className="group relative">
              {i < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-px w-full bg-border lg:block" aria-hidden="true" />
              )}
              <div className="relative rounded-2xl border border-border bg-cream p-6 transition-shadow hover:shadow-lg hover:shadow-ink/5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-serif text-sm font-medium text-accent">{step.number}</span>
                  <div className="rounded-full bg-cream-dark p-2.5 text-ink-muted">{step.icon}</div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
