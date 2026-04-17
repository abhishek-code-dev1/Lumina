import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import PreWedding from './components/PreWedding'
import Services from './components/Services'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MobileBottomNav from './components/MobileBottomNav'

function App() {
  return (
    <div className="bg-dark-900 min-h-screen">
      <Navbar />
      <main className="pb-14 md:pb-0"> {/* padding bottom for compact 52px mobile nav */}
        <Hero />
        <Portfolio />
        <PreWedding />
        <Services />
        <About />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}

export default App
