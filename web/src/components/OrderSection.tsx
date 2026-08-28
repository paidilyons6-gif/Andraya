import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import { AnimatedText } from './AnimatedText'
import { SectionGlow } from './AmbientBackground'
import { gsap } from '../lib/gsap'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useMotionEnabled } from '../hooks/useMotionEnabled'

type Style = 'line' | 'shaded' | 'color'

const styleLabels: Record<Style, string> = {
  line: 'Classic Line — $89',
  shaded: 'Line + Shading — $149',
  color: 'Full Color — $249',
}

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
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
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
    <section id="order" ref={sectionRef} className="relative overflow-hidden py-20 lg:py-28">
      <SectionGlow color="copper" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-reveal">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Get started</p>
            <AnimatedText
              as="h2"
              className="mt-3 font-serif text-4xl font-medium tracking-tight text-parchment sm:text-5xl"
            >
              Commission your home portrait
            </AnimatedText>
            <p className="mt-4 text-lg leading-relaxed text-parchment-muted">
              Fill out the form and we will send a confirmation with next steps for uploading your
              photo and completing payment. No charge until you approve the final artwork.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { title: 'Satisfaction guaranteed', desc: 'One round of revisions included. We will not print until you love it.' },
                { title: 'Secure & private', desc: 'Your photos are used only for your commission and never shared.' },
                { title: 'Perfect for gifting', desc: 'New homeowners, anniversaries, holidays — a gift they will never forget.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-xl glass-light p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-parchment">{item.title}</h3>
                    <p className="mt-1 text-sm text-parchment-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-reveal gold-border-gradient rounded-2xl p-px shadow-2xl shadow-gold/10">
            <div className="rounded-2xl bg-dusk-light/95 p-8 backdrop-blur-xl">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
                    <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <AnimatedText
                    as="h3"
                    mode="chars"
                    trigger="load"
                    animateKey={submitted}
                    className="font-serif text-2xl font-semibold text-gradient-gold"
                  >
                    Request received!
                  </AnimatedText>
                  <p className="mt-2 max-w-sm text-parchment-muted">
                    Thank you, {form.name.split(' ')[0] || 'friend'}. We will email you within 24 hours
                    with upload instructions and payment details.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-medium text-gold hover:text-gold-bright"
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
                      <label htmlFor={field.id} className="block text-sm font-medium text-parchment">
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        required={field.required}
                        value={form[field.key]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-gold/20 bg-midnight/50 px-4 py-3 text-parchment outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                  <div className="order-field">
                    <label htmlFor="style" className="block text-sm font-medium text-parchment">
                      Illustration style
                    </label>
                    <select
                      id="style"
                      value={form.style}
                      onChange={(e) => setForm({ ...form, style: e.target.value as Style })}
                      className="mt-1.5 w-full rounded-lg border border-gold/20 bg-midnight/50 px-4 py-3 text-parchment outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    >
                      {(Object.keys(styleLabels) as Style[]).map((key) => (
                        <option key={key} value={key} className="bg-midnight">
                          {styleLabels[key]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="order-field">
                    <label htmlFor="address" className="block text-sm font-medium text-parchment">
                      Home address <span className="font-normal text-parchment-muted">(for our reference)</span>
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-gold/20 bg-midnight/50 px-4 py-3 text-parchment outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                      placeholder="123 Oak Street, Austin, TX"
                    />
                  </div>
                  <div className="order-field">
                    <label htmlFor="notes" className="block text-sm font-medium text-parchment">
                      Special requests
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="mt-1.5 w-full resize-none rounded-lg border border-gold/20 bg-midnight/50 px-4 py-3 text-parchment outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                      placeholder="Season preferences, elements to include or exclude, gift message..."
                    />
                  </div>

                  <div className="order-field rounded-lg border border-dashed border-gold/30 bg-gold/5 p-6 text-center">
                    <p className="text-sm font-medium text-gold">Photo upload comes next</p>
                    <p className="mt-1 text-xs text-parchment-muted">
                      After submitting, we will send a link to upload your home photo securely.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="order-field w-full rounded-full bg-gradient-to-r from-copper to-gold py-4 text-sm font-bold uppercase tracking-wider text-midnight transition-all hover:shadow-[0_0_30px_rgba(212,168,83,0.4)]"
                  >
                    Request Commission — No payment yet
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
