import { FAQ } from './components/FAQ'
import { Footer, Testimonials } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { OrderSection } from './components/OrderSection'
import { Pricing } from './components/Pricing'

function App() {
  return (
    <>
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
    </>
  )
}

export default App
