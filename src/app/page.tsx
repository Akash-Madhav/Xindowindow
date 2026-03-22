import Hero from '@/components/Hero'
import About from '@/components/About'
import Products from '@/components/Products'
import Benefits from '@/components/Benefits'
import Process from '@/components/Process'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import ClientsMarquee from '@/components/ClientsMarquee'
import QuoteForm from '@/components/QuoteForm'
import Footer from '@/components/Footer'
import SectionDivider from '@/components/SectionDivider'

export default function Home() {
  return (
    <main className="flex min-h-[100svh] flex-col bg-[var(--color-black)] w-full overflow-hidden selection:bg-[var(--color-red)] selection:text-[var(--color-white)]">
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Products />
      <SectionDivider />
      <Benefits />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <Gallery />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <ClientsMarquee />
      <SectionDivider />
      <QuoteForm />
      <Footer />
    </main>
  )
}
