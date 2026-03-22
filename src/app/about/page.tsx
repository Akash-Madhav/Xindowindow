'use client'
import PageHero from '@/components/PageHero'
import About from '@/components/About'
import Benefits from '@/components/Benefits'
import Process from '@/components/Process'
import QuoteForm from '@/components/QuoteForm'
import SectionDivider from '@/components/SectionDivider'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)]">
      <PageHero 
        title="Our Story" 
        subtitle="Bridging Indo-German architectural excellence since inception. We don't just build windows; we engineer views and secure legacies."
        bgText="LEGACY"
      />
      <SectionDivider />
      <div data-section-id="02"><About /></div>
      <SectionDivider />
      <div data-section-id="03"><Benefits /></div>
      <SectionDivider />
      <div data-section-id="04"><Process /></div>
      <SectionDivider />
      <div data-section-id="05"><QuoteForm /></div>
    </main>
  )
}
