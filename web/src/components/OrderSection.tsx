import { useRef, useState } from 'react'
import { AnimatedText } from './AnimatedText'
import { useScrollReveal } from '../hooks/useScrollReveal'

type Style = 'line' | 'shaded' | 'color'

const styleLabels: Record<Style, string> = {
  line: 'Classic Line — $89',
  shaded: 'Line + Shading — $149',
  color: 'Full Color — $249',
}

export function OrderSection() {
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  useScrollReveal(sectionRef, '.order-reveal')
  const [form, setForm] = useState({
    name: '',
    email: '',
    style: 'shaded' as Style,
    address: '',
    notes: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="order" ref={sectionRef} className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-reveal">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Get started</p>
            <AnimatedText
              as="h2"
              className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl"
            >
              Commission your home portrait
            </AnimatedText>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Fill out the form and we will send a confirmation with next steps for uploading your
              photo and completing payment. No charge until you approve the final artwork.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-ink">Satisfaction guaranteed</h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    One round of revisions included. We will not print until you love it.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-ink">Secure & private</h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    Your photos are used only for your commission and never shared.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-ink">Perfect for gifting</h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    New homeowners, anniversaries, holidays — a gift they will never forget.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-reveal rounded-2xl border border-border bg-paper p-8 shadow-xl shadow-ink/5">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-light">
                  <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-ink">Request received!</h3>
                <p className="mt-2 max-w-sm text-ink-muted">
                  Thank you, {form.name.split(' ')[0] || 'friend'}. We will email you within 24 hours
                  with upload instructions and payment details.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-accent hover:text-accent-hover"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink">
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-border bg-cream px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-border bg-cream px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="style" className="block text-sm font-medium text-ink">
                    Illustration style
                  </label>
                  <select
                    id="style"
                    value={form.style}
                    onChange={(e) => setForm({ ...form, style: e.target.value as Style })}
                    className="mt-1.5 w-full rounded-lg border border-border bg-cream px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  >
                    {(Object.keys(styleLabels) as Style[]).map((key) => (
                      <option key={key} value={key}>
                        {styleLabels[key]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-ink">
                    Home address <span className="font-normal text-ink-faint">(for our reference)</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-border bg-cream px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    placeholder="123 Oak Street, Austin, TX"
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-ink">
                    Special requests
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="mt-1.5 w-full resize-none rounded-lg border border-border bg-cream px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    placeholder="Season preferences, elements to include or exclude, gift message..."
                  />
                </div>

                <div className="rounded-lg border border-dashed border-border bg-cream-dark/30 p-6 text-center">
                  <svg
                    className="mx-auto h-8 w-8 text-ink-faint"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-ink-muted">Photo upload comes next</p>
                  <p className="mt-1 text-xs text-ink-faint">
                    After submitting, we will send a link to upload your home photo securely.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-ink py-4 text-sm font-semibold text-cream transition-colors hover:bg-ink/90"
                >
                  Request Commission — No payment yet
                </button>
                <p className="text-center text-xs text-ink-faint">
                  By submitting, you agree to our terms. We typically respond within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
