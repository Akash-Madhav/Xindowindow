'use client'
import PageHero from '@/components/PageHero'
import ClientsMarquee from '@/components/ClientsMarquee'
import Testimonials from '@/components/Testimonials'
import QuoteForm from '@/components/QuoteForm'
import SectionDivider from '@/components/SectionDivider'

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)]">
      <PageHero 
        title="Distinguished Data" 
        subtitle="Trusted by India's leading developers and visionary architects. Our client list is a reflection of our commitment to quality."
        bgText="PARTNERSHIP"
      />
      <SectionDivider />
      <div data-section-id="02"><ClientsMarquee /></div>
      <SectionDivider />
      <div data-section-id="03"><Testimonials /></div>
      <SectionDivider />
      <div data-section-id="04" className="py-24 px-6 max-w-[1200px] mx-auto text-center">
        <h2 className="font-display text-[42px] text-white mb-6">Built on Trust</h2>
        <p className="text-[var(--color-silver)] font-light max-w-[600px] mx-auto">We don't just supply windows; we build long-term infrastructure partnerships that span across decades and developments.</p>
      </div>
      <SectionDivider />
      <div data-section-id="05"><QuoteForm /></div>
    </main>
  )
}
