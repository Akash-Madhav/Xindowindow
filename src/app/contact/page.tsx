'use client'
import PageHero from '@/components/PageHero'
import About from '@/components/About'
import QuoteForm from '@/components/QuoteForm'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-red)] selection:text-[var(--color-white)]">
      <PageHero 
        title="Connect with Us" 
        subtitle="Ready to transform your vision into an architectural masterpiece? Our experts are here to guide your technical and aesthetic choices."
        bgText="CONTACT"
      />
      
      <div className="py-12 md:py-24">
        <QuoteForm />
      </div>

      <About 
        id="02"
        tag="Regional Presence"
        title="Visit our Corporate Office & Factory"
        description1="Located in the industrial heart of Chennai, our corporate office and primary manufacturing facility are open for architectural consultations and technical walkthroughs."
        description2="Tel: +91 94440 45544 | Email: info@xindowindow.com | State Highway 113, Tamil Nadu"
        badgeNumber="Chennai"
        badgeText="Headquarters"
        reverse={false}
        image="/images/about-office.png"
      />

      <div className="py-24 px-6 max-w-[800px] mx-auto text-center opacity-60">
         <h2 className="font-display text-[24px] text-white mb-4 uppercase tracking-widest">Architectural Documentation</h2>
         <p className="text-[var(--color-silver)] font-light text-[14px] leading-relaxed">Have a technical question about our uPVC systems or installation process? Our technical help desk is available for deep-dive specification analysis.</p>
      </div>
    </main>
  )
}
