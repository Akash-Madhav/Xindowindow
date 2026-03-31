import PageHero from '@/components/PageHero'
import Products from '@/components/Products'
import Benefits from '@/components/Benefits'

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <PageHero 
        title="Systems Portfolio" 
        subtitle="Uncompromising engineering precision in every profile. Explore our ranges from high-performance sliding systems to grand architectural focal points."
        bgText="ENGINEERING"
      />
      
      <div className="relative">
        <Products 
          id="02"
          products={[
            { 
              id: 'veka-lux', 
              name: 'VEKA (UPVC)', 
              type: 'German Vinyl Systems', 
              watermark: 'VEKA', 
              links: ['Multi-Chambered', 'Tropical Variant', 'Acoustic Glass'], 
              desc: 'Premium German-engineered uPVC profiles designed for extreme durability and tropical climate resistance. Featuring multi-chambered technology for superior thermal and acoustic insulation.', 
              image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=800' 
            },
            { 
              id: 'aluk-lux', 
              name: 'ALUK / ALUMINIUM', 
              type: 'System Aluminium', 
              watermark: 'ALUK', 
              links: ['Architectural', 'Structural', 'Minimalist'], 
              desc: 'High-performance architectural aluminum systems combining sleek aesthetics with structural integrity. Ideal for expansive glass surfaces and modern minimalist designs.', 
              image: 'https://images.unsplash.com/photo-1509391366360-fe5172a182ad?auto=format&fit=crop&q=80&w=800' 
            },
            { 
              id: 'totalis-lux', 
              name: 'TOTALIS', 
              type: 'High-Performance', 
              watermark: 'TOTALIS', 
              links: ['Security', 'Weather-Tight', 'Versatile'], 
              desc: 'Specialized high-end fenestration solutions for unique architectural requirements. Engineered for maximum security, weather-tightness, and aesthetic versatility.', 
              image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=800' 
            },
            { 
              id: 'xindo-lux', 
              name: 'XINDO (SLEEK)', 
              type: 'Slim & Sleek Series', 
              watermark: 'SLEEK', 
              links: ['Max Transparency', 'Luxury', 'Commercial'], 
              desc: 'Ultra-slim profile systems designed for maximum transparency and minimal sightlines. The pinnacle of modern engineering for luxury residential and commercial spaces.', 
              image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' 
            }
          ]}
        />
      </div>

      <Benefits 
        id="03"
        tag="Architectural Freedom"
        title="Customized for Your Design Language"
        items={[
          { title: 'Bespoke Sizing', desc: 'Millimeter precision for any rough opening' },
          { title: 'Color Curation', desc: 'Premium lamination in metallic and wood finishes' },
          { title: 'Glass Integration', desc: 'Supporting DGU, TGU, and Acoustic laminates' },
          { title: 'Smart Security', desc: 'Compatible with modern home automation sensors' }
        ]}
      />
    </main>
  )
}
