import Hero from '@/components/Hero'
import About from '@/components/About'
import Process from '@/components/Process'
import Benefits from '@/components/Benefits'
import { getAboutPageData } from '@/lib/wordpress'
 
export default async function AboutPage() {
  const aboutData = await getAboutPageData();
 
  return (
    <main className="min-h-[100svh] bg-[var(--color-black)] w-full overflow-x-hidden selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <Hero data={aboutData.hero} />
 
      <About 
        id="about-narrative"
        tag={aboutData.about.tag}
        title={aboutData.about.title}
        description1={aboutData.about.description1}
        description2={aboutData.about.description2}
        badgeNumber={aboutData.about.badgeNumber}
        badgeText={aboutData.about.badgeText}
        image={aboutData.about.image}
        badgeStatusLabel={aboutData.about.badgeStatusLabel}
        ctaLabel={aboutData.about.ctaLabel}
        stats={aboutData.about.stats}
      />
 
      <Process 
        id="workflow"
        tag={aboutData.process.tag}
        steps={aboutData.process.steps}
      />
 
      <Benefits 
        id="quality-standards"
        data={aboutData.benefits}
      />
    </main>
  )
}
