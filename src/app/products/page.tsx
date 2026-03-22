'use client'
import PageHero from '@/components/PageHero'
import Products from '@/components/Products'
import Benefits from '@/components/Benefits'
import QuoteForm from '@/components/QuoteForm'
import SectionDivider from '@/components/SectionDivider'

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)]">
      <PageHero 
        title="Collections" 
        subtitle="Uncompromising precision in every frame. Explore our ranges from minimalist sliding systems to grand architectural focal points."
        bgText="SYSTEMS"
      />
      <SectionDivider />
      <div data-section-id="02"><Products /></div>
      <SectionDivider />
      <div data-section-id="03" className="py-24 px-6 max-w-[1200px] mx-auto text-center">
        <h2 className="font-display text-[42px] text-white mb-6">Unrivaled Performance</h2>
        <p className="text-[var(--color-silver)] font-light max-w-[600px] mx-auto">Our uPVC systems are tested for extreme Indian weather conditions, ensuring 10+ years of silent, secure performance.</p>
      </div>
      <SectionDivider />
      <div data-section-id="04"><Benefits /></div>
      <SectionDivider />
      <div data-section-id="05"><QuoteForm /></div>
    </main>
  )
}
