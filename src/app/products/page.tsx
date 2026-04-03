import PageHero from '@/components/PageHero'
import Products from '@/components/Products'
import Benefits from '@/components/Benefits'
import { getProductsPageData } from '@/lib/wordpress'
 
export default async function ProductsPage() {
  const data = await getProductsPageData();

  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <PageHero 
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        bgText={data.hero.bgText}
      />
      
      <div className="relative">
        <Products 
          id="02"
          products={data.products}
        />
      </div>
 
      <Benefits 
        id="03"
        tag={data.benefits.tag}
        title={data.benefits.title}
        items={data.benefits.items}
      />
    </main>
  )
}
