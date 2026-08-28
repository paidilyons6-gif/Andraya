import { lazy, Suspense, useState } from 'react'
import { AmbientBackground } from './components/AmbientBackground'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { InkDivider } from './components/InkDivider'
import { OrderSection } from './components/OrderSection'
import { PenCursor } from './components/PenCursor'
import { Pricing } from './components/Pricing'
import { Testimonials } from './components/Testimonials'
import { LenisProvider } from './providers/LenisProvider'
import './lib/gsap'

const Preloader = lazy(() =>
  import('./components/Preloader').then((m) => ({ default: m.Preloader })),
)

function App() {
  const [ready, setReady] = useState(false)

  return (
    <LenisProvider>
      {!ready && (
        <Suspense fallback={null}>
          <Preloader onComplete={() => setReady(true)} />
        </Suspense>
      )}
      <AmbientBackground />
      <div className="paper-grain pointer-events-none fixed inset-0 z-[1] opacity-[0.06] mix-blend-overlay" aria-hidden="true" />
      <PenCursor />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <InkDivider className="-mt-2 mb-0 py-8" />
          <HowItWorks />
          <InkDivider className="py-6" />
          <Pricing />
          <Gallery />
          <Testimonials />
          <OrderSection />
          <FAQ />
        </main>
        <Footer />
      </div>
    </LenisProvider>
  )
}

export default App
