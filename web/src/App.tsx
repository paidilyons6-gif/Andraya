import { lazy, Suspense, useState } from 'react'
import { LenisProvider } from './providers/LenisProvider'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Testimonials } from './components/Testimonials'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { OrderSection } from './components/OrderSection'
import { PenCursor } from './components/PenCursor'
import { Pricing } from './components/Pricing'
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
      <div className="paper-grain pointer-events-none fixed inset-0 z-[9997] opacity-[0.035]" aria-hidden="true" />
      <PenCursor />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Pricing />
        <Gallery />
        <Testimonials />
        <OrderSection />
        <FAQ />
      </main>
      <Footer />
    </LenisProvider>
  )
}

export default App
