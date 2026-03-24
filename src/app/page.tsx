'use client'

import Hero from '@/components/Hero'
import About from '@/components/About'
import ProductsClient from '@/components/ProductsClient'
import Benefits from '@/components/Benefits'
import TrustSection from '@/components/TrustSection'
import Testimonials from '@/components/Testimonials'


export default function Home() {
  return (
    <main className="min-h-[100svh] bg-[var(--color-black)] w-full overflow-x-hidden selection:bg-[var(--color-red)] selection:text-[var(--color-white)]">
      <Hero />
      
      <About 
        id="company-overview"
        tag="Legacy"
        title="Engineering Excellence Since Inception"
        description1="Xindo Window Pvt. Ltd. represents the pinnacle of fenestration engineering, combining German technological precision with a profound understanding of Indian architectural needs."
        description2="Our strategic Indo-German partnership ensures every profile meets stringent global standards for thermal insulation, security, and durability."
        badgeNumber="10"
        badgeText="Year Warranty"
        image="/images/about.png"
      />

      <ProductsClient 
        id="featured-collections"
      />

      <Benefits 
        id="premium-benefits"
        tag="The Premium Choice"
        title="Nine Reasons Architects Choose Xindo"
      />

      <TrustSection />

      <Testimonials />
    </main>
  )
}
