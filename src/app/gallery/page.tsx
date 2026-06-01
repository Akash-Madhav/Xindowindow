import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import { GALLERY_PAGE_DATA } from '@/data/site-content'
 
export default function GalleryPage() {
  const data = GALLERY_PAGE_DATA;

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
