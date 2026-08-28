import { lazy, Suspense, useState } from 'react'
import { DrawHandoffProvider } from './context/DrawHandoffContext'
import { StudioBackdrop } from './components/AmbientBackground'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { OrderSection } from './components/OrderSection'
import { Pricing } from './components/Pricing'
import { ProcessStory } from './components/ProcessStory'
import { Testimonials } from './components/Testimonials'
import { LenisProvider } from './providers/LenisProvider'
import './lib/gsap'

const Preloader = lazy(() =>
  import('./components/Preloader').then((m) => ({ default: m.Preloader })),
)

function App() {
  const [ready, setReady] = useState(false)

  return (
    <DrawHandoffProvider>
      <LenisProvider>
        {!ready && (
          <Suspense fallback={null}>
            <Preloader onComplete={() => setReady(true)} />
          </Suspense>
        )}
        <StudioBackdrop />
        <div className="paper-grain pointer-events-none fixed inset-0 z-[1] opacity-[0.04]" aria-hidden="true" />
        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <ProcessStory />
            <Pricing />
            <Gallery />
            <Testimonials />
            <OrderSection />
            <FAQ />
          </main>
          <Footer />
        </div>
      </LenisProvider>
    </DrawHandoffProvider>
  )
}

export default App
