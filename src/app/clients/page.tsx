'use client'
import PageHero from '@/components/PageHero'
import About from '@/components/About'
import ClientsMarquee from '@/components/ClientsMarquee'
import Testimonials from '@/components/Testimonials'

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-red)] selection:text-[var(--color-white)]">
      <PageHero 
        title="Our Strategic Partners" 
        subtitle="Trusted by India's leading developers and visionary architects. Our client list is a reflection of our commitment to quality."
        bgText="PARTNERSHIP"
      />
      
      <About 
        id="02"
        tag="Mutual Trust"
        title="We collaborate with India's leading visionaries."
        description1="From mega-townships to boutique coastal retreats, Xindo is the preferred fenestration partner for developers who refuse to compromise on structural integrity or aesthetic purity."
        description2="We don't just supply windows; we build long-term infrastructure partnerships that span across decades and developments."
        badgeNumber="Premium"
        badgeText="Developer Choice"
        reverse={true}
        image="/images/about-clients.png"
      />

      <ClientsMarquee />

      <Testimonials />
    </main>
  )
}
