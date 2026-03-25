'use client'
import PageHero from '@/components/PageHero'
import About from '@/components/About'
import ClientsMarquee from '@/components/ClientsMarquee'
import Testimonials from '@/components/Testimonials'

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <PageHero 
        title="Our Strategic Partners" 
        subtitle="Trusted by India&apos;s leading developers and visionary architects. Our client list is a reflection of our commitment to quality."
        bgText="PARTNERSHIP"
      />
      
      <About 
        id="partnership-vision"
        tag="Strategic Alliances"
        title="We engineer solutions with India's leading visionaries."
        description1="From complex commercial landmarks to exclusive high-end residences, Xindo Window is the definitive fenestration partner for developers who demand structural perfection."
        description2="We offer an elite Indo-German technical standard that ensures every architectural vision is realized with absolute precision and climate resilience."
        badgeNumber="Top-Tier"
        badgeText="Industrial Partner"
        reverse={true}
        image="/images/about-clients.png"
      />

      <ClientsMarquee />

      <Testimonials />
    </main>
  )
}
