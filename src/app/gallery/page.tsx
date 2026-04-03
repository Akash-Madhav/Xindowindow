import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Gallery from '@/components/Gallery'
import { getGalleryPageData } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: "Project Gallery",
  description: "Explore our visual testament to architectural grandeur. A portfolio of luxury residences and high-profile commercial landmarks featuring Xindo systems.",
}

export default async function GalleryPage() {
  const data = await getGalleryPageData();

  return (
    <main className="min-h-screen bg-red-gradient selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <PageHero 
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        bgText={data.hero.bgText}
      />
      
      <Gallery 
        id="02"
        tag={data.gallery.tag}
        title={data.gallery.title}
        projects={data.gallery.items}
      />
    </main>
  )
}
