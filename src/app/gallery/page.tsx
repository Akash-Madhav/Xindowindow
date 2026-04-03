import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import { getGalleryPageData } from '@/lib/wordpress'
 
export default async function GalleryPage() {
  const data = await getGalleryPageData();
 
  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <Hero data={data.hero} />
      
      <Gallery 
        id="project-vault"
        tag={data.hero.chipText}
        title={data.hero.headlineLine1[0] || ""}
        projects={data.projects}
      />
    </main>
  )
}
