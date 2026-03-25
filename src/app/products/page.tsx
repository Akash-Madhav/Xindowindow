import PageHero from '@/components/PageHero'
import Products from '@/components/Products'
import Benefits from '@/components/Benefits'
import TechnicalUI from '@/components/TechnicalUI'

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
            { id: 'sliding-lux', name: 'Elite Sliding', type: 'Panoramic Systems', watermark: 'PANORAMIC', links: ['Slim Profile', 'Triple Track', 'Self-Lubricating'], desc: 'Our Elite Sliding series offers virtually unobstructed views with some of the slimmest sightlines in the industry.', image: '/images/sliding.png' },
            { id: 'casement-lux', name: 'Master Casement', type: 'Acoustic Barrier', watermark: 'ACOUSTIC', links: ['Multi-Acoustic Seal', 'Heavy Duty Hinges', 'Dual Action'], desc: 'Engineered specifically for noise reduction in high-density urban environments without sacrificing elegance.', image: '/images/casement.png' },
            { id: 'special-lux', name: 'Custom Studio', type: 'Architectural Bespoke', watermark: 'BESPOKE', links: ['Arched Frames', 'Compound Miters', 'Bifold Systems'], desc: 'When the design demands unique geometries, our Custom Studio delivers precision-engineered solutions.', image: '/images/tilt_turn.png' },
            { id: 'hardware-lux', name: 'Signature Hardware', type: 'Swiss-German Components', watermark: 'KINETIC', links: ['Multi-Point Locking', 'Anti-Corrosive Handles', 'Friction Stays'], desc: 'The unseen excellence that ensures your windows operate with frictionless grace for decades.', image: '/images/hardware.png' }
          ]}
        />
      </div>

      <TechnicalUI />

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
