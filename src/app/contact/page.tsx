import Hero from '@/components/Hero'
import About from '@/components/About'
import QuoteForm from '@/components/QuoteForm'
import { getContactPageData } from '@/lib/wordpress'
 
export default async function ContactPage() {
  const data = await getContactPageData();
 
  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <Hero data={data.hero} />
      
      <div className="py-24 md:py-48">
        <QuoteForm data={data.quoteForm} />
      </div>
 
      <About 
        id="corporate-hq"
        tag="Corporate HQ"
        title="Physical Operations Base."
        description1={data.quoteForm.address}
        description2="Direct access to our engineering desk and manufacturing protocol coordinators."
        badgeNumber="HQ"
        badgeText="Manufacturing & Administration"
        reverse={false}
        image="/images/about-industrial.png"
      />
 
      <div className="py-24 px-6 max-w-[800px] mx-auto text-center opacity-60">
         <h2 className="font-display text-[24px] text-white mb-4 uppercase tracking-widest">{data.documentation.title}</h2>
         <p className="text-[var(--color-silver)] font-light text-[14px] leading-relaxed italic">{data.documentation.desc}</p>
      </div>
    </main>
  )
}
