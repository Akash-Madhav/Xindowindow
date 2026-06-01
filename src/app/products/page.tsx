import Hero from '@/components/Hero'
import Products from '@/components/Products'
import Benefits from '@/components/Benefits'
import { PRODUCTS_PAGE_DATA } from '@/data/site-content'
 
export default function ProductsPage() {
  const data = PRODUCTS_PAGE_DATA;

  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <Hero data={data.hero} />
      
      <div className="relative">
        <Products 
          id="product-grid"
          products={data.products}
          registry={data.registry}
        />
      </div>
 
      <Benefits 
        id="technical-standards"
        data={data.benefits}
      />
    </main>
  )
}
