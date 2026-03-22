'use client'
import PageHero from '@/components/PageHero'
import QuoteForm from '@/components/QuoteForm'
import SectionDivider from '@/components/SectionDivider'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)]">
      <PageHero 
        title="Get in Touch" 
        subtitle="Ready to transform your vision into an architectural masterpiece? Our experts are here to guide your technical and aesthetic choices."
        bgText="CONNECT"
      />
      <SectionDivider />
      <div data-section-id="02" className="py-24 px-6 max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-[36px] text-white mb-8">Corporate Office</h2>
          <div className="flex flex-col gap-6 text-[var(--color-silver)] font-light text-[17px]">
            <p>Xindo Window Pvt. Ltd.<br/>Chennai, Tamil Nadu, India</p>
            <p>Email: info@xindowindow.com</p>
            <p>Tel: +91 94440 45544</p>
          </div>
        </div>
        <div>
          <h2 className="font-display text-[36px] text-white mb-8">Factory Address</h2>
          <div className="flex flex-col gap-6 text-[var(--color-silver)] font-light text-[17px]">
            <p>State Highway 113,<br/>Tamil Nadu 600001</p>
            <p>Working Hours: Mon - Sat, 09:00 - 18:00</p>
          </div>
        </div>
      </div>
      <SectionDivider />
      <div data-section-id="03"><QuoteForm /></div>
      <SectionDivider />
      <div data-section-id="04" className="w-full h-24" /> {/* Spacer */}
      <SectionDivider />
      <div data-section-id="05" className="py-24 px-6 max-w-[800px] mx-auto text-center">
         <h2 className="font-display text-[32px] text-white mb-4">FAQ</h2>
         <p className="text-[var(--color-silver)] font-light">Have a technical question about our uPVC systems or installation process? <a href="#" className="text-[var(--color-red)]">Download our technical guide</a> or call our help desk.</p>
      </div>
    </main>
  )
}
