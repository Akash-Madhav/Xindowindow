'use client'
import PageHero from '@/components/PageHero'
import Process from '@/components/Process'
import ClientsMarquee from '@/components/ClientsMarquee'
import QuoteForm from '@/components/QuoteForm'
import SectionDivider from '@/components/SectionDivider'

export default function InfrastructurePage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)]">
      <PageHero 
        title="The Factory" 
        subtitle="State-of-the-art manufacturing facility powered by German robotics and local craftsmanship. Witness the precision behind Xindo."
        bgText="PRECISION"
      />
      <SectionDivider />
      <div data-section-id="02" className="py-24 px-6 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aspect-video bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center">
          <span className="font-mono text-[10px] text-[var(--color-silver)] uppercase tracking-widest">Robotic Welding Visual</span>
        </div>
        <div>
          <h2 className="font-display text-[42px] text-white mb-6 leading-tight">Automated Perfection</h2>
          <p className="text-[var(--color-silver)] font-light text-[18px] leading-relaxed mb-8">Our Chennai facility employs fully automated CNC processing centers to ensure every miter, every cut, and every weld is accurate to 0.5mm.</p>
          <ul className="flex flex-col gap-4">
             <li className="flex items-center gap-3 text-[var(--color-white)] font-sans text-[14px] uppercase tracking-wider">
               <span className="w-1.5 h-1.5 bg-[var(--color-red)] rounded-full" /> Automatic PVC Welding
             </li>
             <li className="flex items-center gap-3 text-[var(--color-white)] font-sans text-[14px] uppercase tracking-wider">
               <span className="w-1.5 h-1.5 bg-[var(--color-red)] rounded-full" /> CNC Corner Cleaning
             </li>
             <li className="flex items-center gap-3 text-[var(--color-white)] font-sans text-[14px] uppercase tracking-wider">
               <span className="w-1.5 h-1.5 bg-[var(--color-red)] rounded-full" /> EPDM Gasket Integration
             </li>
          </ul>
        </div>
      </div>
      <SectionDivider />
      <div data-section-id="03"><Process /></div>
      <SectionDivider />
      <div data-section-id="04"><ClientsMarquee /></div>
      <SectionDivider />
      <div data-section-id="05"><QuoteForm /></div>
    </main>
  )
}
