import Hero from '@/components/Hero'
import About from '@/components/About'
import ExperienceCenter from '@/components/ExperienceCenter'
import Benefits from '@/components/Benefits'
import Products from '@/components/Products'
import TrustSection from '@/components/TrustSection'
import Testimonials from '@/components/Testimonials'
import QuoteForm from '@/components/QuoteForm'
import ClientsMarquee from '@/components/ClientsMarquee'
import { getHomePageData } from '@/lib/wordpress'
 
export default async function Home() {
  const homeData = await getHomePageData();
 
  return (
    <main className="min-h-[100svh] bg-[var(--color-black)] w-full overflow-x-hidden selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <Hero data={homeData.hero} />
      
      <About 
        id="02"
        tag={homeData.about.tag}
        title={homeData.about.title}
        description1={homeData.about.description1}
        description2={homeData.about.description2}
        badgeNumber={homeData.about.badgeNumber}
        badgeText={homeData.about.badgeText}
        image={homeData.about.image}
        badgeStatusLabel={homeData.about.badgeStatusLabel}
        ctaLabel={homeData.about.ctaLabel}
        stats={homeData.about.stats}
      />
 
      <ExperienceCenter data={homeData.experienceCenter} />
 
      <Products 
        id="03" 
        products={homeData.products}
        registry={homeData.registry}
      />
 
      <Benefits 
        id="premium-benefits"
        data={homeData.benefits}
      />
 
      <TrustSection data={homeData.trustSection} />
 
      <Testimonials tag={homeData.testimonials.tag} items={homeData.testimonials.items} />
 
      <ClientsMarquee 
        tag={homeData.clientsMarquee.tag}
        clients={homeData.clientsMarquee.clients}
      />
 
      <QuoteForm data={homeData.quoteForm} />
    </main>
  )
}
