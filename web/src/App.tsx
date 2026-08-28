import { useState } from 'react'
import { LenisProvider } from './providers/LenisProvider'
import { FAQ } from './components/FAQ'
import { Footer, Testimonials } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { OrderSection } from './components/OrderSection'
import { PenCursor } from './components/PenCursor'
import { Preloader } from './components/Preloader'
import { Pricing } from './components/Pricing'
import './lib/gsap'

function App() {
  const [ready, setReady] = useState(false)

  return (
    <LenisProvider>
      {!ready && <Preloader onComplete={() => setReady(true)} />}
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
