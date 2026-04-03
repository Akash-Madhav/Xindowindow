import Hero from '@/components/Hero'
import About from '@/components/About'
import Process from '@/components/Process'
import Benefits from '@/components/Benefits'
import QuoteForm from '@/components/QuoteForm'
import { getAboutPageData } from '@/lib/wordpress'

export default async function AboutPage() {
  const aboutData = await getAboutPageData();

  return (
    <main className="min-h-[100svh] bg-[var(--color-black)] w-full overflow-x-hidden selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      {/* Dynamic Hero Section */}
      <Hero 
        data={{
          chipText: "Technical Heritage",
          headlineLine1: [aboutData.hero.title],
          headlineLine2: [""],
          subtext: aboutData.hero.subtitle,
          ctaPrimaryText: "Consult Technical Hub",
          ctaSecondaryText: "Quality Standards",
          ctaSecondaryLink: "#benefits",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-building-4475-large.mp4",
          bgImage: "/images/hero-bg.png",
          watermark1: "LEGACY",
          watermark2: "PRECISION"
        }}
      />

      {/* Brand Narrative */}
      <About 
        id="about-narrative"
        tag={aboutData.about.tag}
        title={aboutData.about.title}
        description1={aboutData.about.description1}
        description2={aboutData.about.description2}
        badgeNumber={aboutData.about.badgeNumber}
        badgeText={aboutData.about.badgeText}
        image={aboutData.about.image}
      />

      <Process 
        id="workflow"
        tag={aboutData.process.tag}
        steps={aboutData.process.steps}
      />

      <Benefits 
        id="quality-standards"
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
