import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Gallery from '@/components/Gallery'

export const metadata: Metadata = {
  title: "Project Gallery",
  description: "Explore our visual testament to architectural grandeur. A portfolio of luxury residences and high-profile commercial landmarks featuring Xindo systems.",
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-red-gradient selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <PageHero 
        title="The Gallery" 
        subtitle="A visual testament to architectural grandeur. Explore our portfolio of luxury residences and high-profile commercial landmarks."
        bgText="PORTFOLIO"
      />
      
      <Gallery 
        id="02"
        tag="Visual Testament"
        title="SHOWCASE"
        projects={[
          { id: 10, name: 'Sapphire Residences', height: 'h-[400px]', image: '/images/gallery/sapphire.png', location: 'Chennai', system: 'VEKA' },
          { id: 11, name: 'Marina Bay Towers', height: 'h-[300px]', image: '/images/gallery/marina.png', location: 'Dubai', system: 'ALUK' },
          { id: 12, name: 'Skyline Corporate Hub', height: 'h-[450px]', image: '/images/gallery/skyline.png', location: 'Bangalore', system: 'TOTALIS' },
          { id: 13, name: 'The Emerald Villa', height: 'h-[320px]', image: '/images/gallery/emerald.png', location: 'Hyderabad', system: 'SLEEK' },
          { id: 14, name: 'Azure Tech Park', height: 'h-[380px]', image: '/images/gallery/azure.png', location: 'Pune', system: 'VEKA' },
          { id: 15, name: 'Ivory Heights', height: 'h-[280px]', image: '/images/gallery/ivory.png', location: 'Mumbai', system: 'ALUK' }
        ]}
      />
    </main>
  )
}
