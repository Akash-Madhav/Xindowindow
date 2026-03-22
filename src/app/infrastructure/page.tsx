'use client'
import PageHero from '@/components/PageHero'
import About from '@/components/About'
import Process from '@/components/Process'

export default function InfrastructurePage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-red)] selection:text-[var(--color-white)]">
      <PageHero 
        title="The Infrastructure" 
        subtitle="State-of-the-art manufacturing facility powered by German robotics and local craftsmanship. Witness the precision behind Xindo."
        bgText="FACTORY"
      />
      
      <About 
        id="02"
        tag="Strategic Capability"
        title="20,000 Sq.Ft. of Automated Precision"
        description1="Our Chennai facility employs fully automated CNC processing centers to ensure every miter, every cut, and every weld is accurate to 0.5mm. We don't believe in manual error; we believe in robotic perfection."
        description2="From automatic PVC welding to CNC corner cleaning and EPDM gasket integration, our line is a masterclass in modern fenestration technology."
        badgeNumber="Automated"
        badgeText="Manufacturing Line"
        image="/images/about-factory.png"
      />

      <Process 
        id="03"
        tag="Supply Chain Integrity"
        steps={[
          { num: '01', title: 'Extrusion', desc: 'Sourcing high-grade uPVC compounds engineered for UV stability.' },
          { num: '02', title: 'Fabrication', desc: 'Precision-automated machining with millimetric accuracy.' },
          { num: '03', title: 'Quality Control', desc: 'Rigorous 20-point inspection before any dispatch.' },
          { num: '04', title: 'Logistics', desc: 'Secured transport and tracking system for timely delivery.' }
        ]}
      />
    </main>
  )
}
