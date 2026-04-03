import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import About from '@/components/About'
import Process from '@/components/Process'
import { getInfrastructurePageData } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: "Infrastructure & Manufacturing",
  description: "Explore our 20,000 sq.ft. automated uPVC manufacturing facility in Chennai. German precision, robotic accuracy, and architectural quality standards.",
}

export default async function InfrastructurePage() {
  const data = await getInfrastructurePageData();

  return (
    <main className="min-h-screen bg-red-gradient selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <PageHero 
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        bgText={data.hero.bgText}
      />
      
      <About 
        id="manufacturing-precision"
        tag={data.about.tag}
        title={data.about.title}
        description1={data.about.description1}
        description2={data.about.description2}
        badgeNumber={data.about.badgeNumber}
        badgeText={data.about.badgeText}
        image={data.about.image}
      />

      <Process 
        id="manufacturing-process"
        tag={data.process.tag}
        steps={data.process.steps}
      />
    </main>
  )
}
