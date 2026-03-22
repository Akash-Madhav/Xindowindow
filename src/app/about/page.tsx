'use client'
import PageHero from '@/components/PageHero'
import About from '@/components/About'
import Benefits from '@/components/Benefits'
import Process from '@/components/Process'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-red)] selection:text-[var(--color-white)]">
      <PageHero 
        title="Our Heritage" 
        subtitle="Bridging Indo-German architectural excellence since inception. We don't just build windows; we engineer views and secure legacies."
        bgText="LEGACY"
      />
      
      <About 
        id="02"
        tag="The Vision"
        title="We don't manufacture windows — We craft thresholds."
        description1="Guided by German precision and fueled by Indian architectural ambition, Xindo represents a paradigm shift in fenestration. Every profile we produce is a testament to our commitment to structural integrity and aesthetic purity."
        description2="Our strategic Indo-German partnership ensures every profile meets stringent global standards for thermal insulation, security, and durability."
        badgeNumber="Indo-German"
        badgeText="Core Partnership"
        reverse={true}
      />

      <Process 
        id="03"
        tag="The Masterclass"
        steps={[
          { num: '01', title: 'Consultation', desc: 'Analyzing the specific wind-loads and acoustic requirements of your architectural site.' },
          { num: '02', title: 'Specification', desc: 'Selecting the precise uPVC blend and steel reinforcement for maximum stability.' },
          { num: '03', title: 'Craftsmanship', desc: 'Indo-German fabrication using precision-automated machinery.' },
          { num: '04', title: 'Integration', desc: 'Seamless structural installation within 4 working days.' }
        ]}
      />

      <Benefits 
        id="04"
        tag="Quality Standards"
        title="Engineered to Outlast the Elements"
        items={[
          { title: 'Extreme Durability', desc: 'Resistant to coastal salt and city smog' },
          { title: 'Thermal Barrier', desc: 'Reducing energy costs by up to 30%' },
          { title: 'Acoustic Control', desc: 'Up to 40dB noise reduction' },
          { title: 'Zero Maintenance', desc: 'UV-resistant profiles that never fade' }
        ]}
      />
    </main>
  )
}
