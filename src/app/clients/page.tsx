import Hero from '@/components/Hero'
import About from '@/components/About'
import ClientsMarquee from '@/components/ClientsMarquee'
import Testimonials from '@/components/Testimonials'
import { getClientsPageData } from '@/lib/wordpress'
 
export default async function ClientsPage() {
  const data = await getClientsPageData();
 
  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <Hero data={data.hero} />
      
      <About 
        id="partnership-vision"
        tag={data.about.tag}
        title={data.about.title}
        description1={data.about.description1}
        description2={data.about.description2}
        badgeNumber={data.about.badgeNumber}
        badgeText={data.about.badgeText}
        reverse={true}
        image={data.about.image}
        badgeStatusLabel={data.about.badgeStatusLabel}
      />
 
      <ClientsMarquee 
        tag={data.clientsMarquee.tag}
        clients={data.clientsMarquee.clients}
      />
 
      <div className="py-24">
        <Testimonials items={data.testimonials} />
      </div>
    </main>
  )
}
