import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import About from '@/components/About'
import QuoteForm from '@/components/QuoteForm'
import { getContactPageData } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: "Contact & Engineering Support",
  description: "Connect with Xindo Window's technical experts. Request a quote for premium uPVC systems or consult on architectural fenestration for your project.",
}

export default async function ContactPage() {
  const data = await getContactPageData();

  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <PageHero 
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        bgText={data.hero.bgText}
      />
      
      <div className="py-12 md:py-24">
        <QuoteForm data={data.quoteForm} />
      </div>

      <About 
        id="corporate-hq"
        tag={data.about.tag}
        title={data.about.title}
        description1={data.about.description1}
        description2={data.about.description2}
        badgeNumber={data.about.badgeNumber}
        badgeText={data.about.badgeText}
        reverse={false}
        image={data.about.image}
      />

      <div className="py-24 px-6 max-w-[800px] mx-auto text-center opacity-60">
         <h2 className="font-display text-[24px] text-white mb-4 uppercase tracking-widest">{data.documentation.title}</h2>
         <p className="text-[var(--color-silver)] font-light text-[14px] leading-relaxed italic">{data.documentation.desc}</p>
      </div>
    </main>
  )
}
