import Hero from '@/components/Hero'
import About from '@/components/About'
import { getInfrastructurePageData } from '@/lib/wordpress'
 
export default async function InfrastructurePage() {
  const data = await getInfrastructurePageData();
 
  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <Hero data={data.hero} />
      
      <About 
        id="facility-core"
        tag={data.tag}
        title={data.title}
        description1={data.description}
        description2=""
        badgeNumber={data.stats[0]?.value || ""}
        badgeText={data.stats[0]?.label || ""}
        image="/images/about-industrial.png"
        badgeStatusLabel="FACILITY_ACTIVE"
        ctaLabel="VIEW CAPACITY"
        stats={data.stats}
      />
    </main>
  )
}
