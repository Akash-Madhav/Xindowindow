'use client'
import PageHero from '@/components/PageHero'
import Gallery from '@/components/Gallery'
import ClientsMarquee from '@/components/ClientsMarquee'
import QuoteForm from '@/components/QuoteForm'
import SectionDivider from '@/components/SectionDivider'

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)]">
      <PageHero 
        title="Showcase" 
        subtitle="A visual testament to architectural grandeur. Explore our portfolio of luxury residences and high-profile commercial landmarks."
        bgText="PORTFOLIO"
      />
      <SectionDivider />
      <div data-section-id="02"><Gallery /></div>
      <SectionDivider />
      <div data-section-id="03" className="py-24 px-6 max-w-[1200px] mx-auto text-center">
        <h2 className="font-display text-[42px] text-white mb-6">Designed to Inspire</h2>
        <p className="text-[var(--color-silver)] font-light max-w-[600px] mx-auto">From coastal villas to urban skyscrapers, Xindo provides the structural integrity and aesthetic clarity required by modern architects.</p>
      </div>
      <SectionDivider />
      <div data-section-id="04"><ClientsMarquee /></div>
      <SectionDivider />
      <div data-section-id="05"><QuoteForm /></div>
    </main>
  )
}
