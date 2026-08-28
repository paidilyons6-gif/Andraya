import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import { AnimatedText } from './AnimatedText'
import { gsap } from '../lib/gsap'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

type Style = 'line' | 'shaded' | 'color'

const styleLabels: Record<Style, string> = {
  line: 'Classic Line — $89',
  shaded: 'Line + Shading — $149',
  color: 'Full Color — $249',
}

const inputClass =
  'mt-1.5 w-full rounded-sm border border-border bg-paper px-4 py-3 text-ink outline-none transition-colors ink-focus'

export function OrderSection() {
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const motionEnabled = useMotionEnabled()
  useScrollReveal(sectionRef, '.order-reveal')

  const [form, setForm] = useState({
    name: '',
    email: '',
    style: 'shaded' as Style,
    address: '',
    notes: '',
  })

  useGSAP(
    () => {
      if (!motionEnabled || !formRef.current || submitted) return

      gsap.from(formRef.current.querySelectorAll('.order-field'), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    },
    { scope: formRef, dependencies: [motionEnabled, submitted] },
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="order" ref={sectionRef} className="border-b border-border py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-reveal">
            <p className="text-sm text-ink-faint">Get started</p>
            <AnimatedText
              as="h2"
              className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl"
            >
              Commission your home portrait
            </AnimatedText>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Fill out the form and we will send a confirmation with next steps for uploading your
              photo and completing payment. No charge until you approve the final artwork.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { title: 'Satisfaction guaranteed', desc: 'One round of revisions included. We will not print until you love it.' },
                { title: 'Secure & private', desc: 'Your photos are used only for your commission and never shared.' },
                { title: 'Perfect for gifting', desc: 'New homeowners, anniversaries, holidays — a gift they will never forget.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 border border-border bg-paper-warm p-4">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent text-accent">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-reveal mat-board p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent text-accent">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <AnimatedText
                  as="h3"
                  mode="chars"
                  trigger="load"
                  animateKey={submitted}
                  className="font-serif text-2xl font-medium text-ink"
                >
                  Request received!
                </AnimatedText>
                <p className="mt-2 max-w-sm text-ink-muted">
                  Thank you, {form.name.split(' ')[0] || 'friend'}. We will email you within 24 hours
                  with upload instructions and payment details.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: 'name', label: 'Your name', type: 'text', required: true, placeholder: 'Jane Smith', key: 'name' as const },
                  { id: 'email', label: 'Email address', type: 'email', required: true, placeholder: 'jane@example.com', key: 'email' as const },
                ].map((field) => (
                  <div key={field.id} className="order-field">
                    <label htmlFor={field.id} className="block text-sm font-medium text-ink">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required={field.required}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="mt-1.5 w-full rounded-sm border border-border bg-paper px-4 py-3 text-ink outline-none transition-colors ink-focus"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div className="order-field">
                  <label htmlFor="style" className="block text-sm font-medium text-ink">
                    Illustration style
                  </label>
                  <select
                    id="style"
                    value={form.style}
                    onChange={(e) => setForm({ ...form, style: e.target.value as Style })}
                    className="mt-1.5 w-full rounded-sm border border-border bg-paper px-4 py-3 text-ink outline-none transition-colors ink-focus"
                  >
                    {(Object.keys(styleLabels) as Style[]).map((key) => (
                      <option key={key} value={key}>
                        {styleLabels[key]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="order-field">
                  <label htmlFor="address" className="block text-sm font-medium text-ink">
                    Home address <span className="font-normal text-ink-muted">(for our reference)</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="mt-1.5 w-full rounded-sm border border-border bg-paper px-4 py-3 text-ink outline-none transition-colors ink-focus"
                    placeholder="123 Oak Street, Austin, TX"
                  />
                </div>
                <div className="order-field">
                  <label htmlFor="notes" className="block text-sm font-medium text-ink">
                    Special requests
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="Season preferences, elements to include or exclude, gift message..."
                  />
                </div>

                <div className="order-field border border-dashed border-border-dark bg-paper-warm p-6 text-center">
                  <p className="text-sm font-medium text-ink">Photo upload comes next</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    After submitting, we will send a link to upload your home photo securely.
                  </p>
                </div>

                <button
                  type="submit"
                  className="order-field w-full rounded-sm bg-accent py-4 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
                >
                  Request commission — no payment yet
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
