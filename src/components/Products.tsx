'use client'

import { useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

interface ProductItem {
  id: string
  name: string
  type: string
  watermark: string
  links: string[]
  desc: string
  image?: string
}

const DEFAULT_PRODUCTS = [
  { 
    id: 'veka', 
    name: 'VEKA (UPVC)', 
    type: 'German Vinyl Systems', 
    watermark: 'VEKA', 
    links: ['Thermal Insul', 'Acoustic Seal', 'Tropical Proof'], 
    desc: 'Premium German-engineered uPVC profiles designed for extreme durability and tropical climate resistance. Featuring multi-chambered technology for superior thermal and acoustic insulation.', 
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'aluk', 
    name: 'ALUK / ALUMINIUM', 
    type: 'System Aluminium', 
    watermark: 'ALUK', 
    links: ['Architectural', 'Minimalist', 'Structural'], 
    desc: 'High-performance architectural aluminum systems combining sleek aesthetics with structural integrity. Ideal for expansive glass surfaces and modern minimalist designs.', 
    image: 'https://images.unsplash.com/photo-1510000218930-bc500989047b?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'totalis', 
    name: 'TOTALIS', 
    type: 'High-Performance', 
    watermark: 'TOTALIS', 
    links: ['Security Max', 'Weather Tight', 'Versatile'], 
    desc: 'Specialized high-end fenestration solutions for unique architectural requirements. Engineered for maximum security, weather-tightness, and aesthetic versatility.', 
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'xindo', 
    name: 'XINDO (SLEEK)', 
    type: 'Slim & Sleek Series', 
    watermark: 'SLEEK', 
    links: ['Max Vision', 'Luxury Fit', 'Commercial'], 
    desc: 'Ultra-slim profile systems designed for maximum transparency and minimal sightlines. The pinnacle of modern engineering for luxury residential and commercial spaces.', 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' 
  }
]

interface ProductsProps {
  id?: string
  products?: ProductItem[]
}

export default function Products({
  id = "03",
  products = DEFAULT_PRODUCTS
}: ProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const getScrollAmount = useCallback(() => {
    if (!trackRef.current) return 0
    return trackRef.current.scrollWidth - window.innerWidth
  }, [])

  useGSAP(() => {
    // Horizontal scroll + pinning runs on ALL screen sizes
    const sections = gsap.utils.toArray('.product-panel') as HTMLDivElement[]

    if (trackRef.current && containerRef.current) {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          scrub: 1.5,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.3, max: 0.8 },
            delay: 0.05,
            ease: 'power2.inOut',
          },
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          refreshPriority: 1
        }
      })

      tl.to(trackRef.current, {
        x: () => -getScrollAmount(),
        ease: 'none'
      })

      const onResize = () => {
        ScrollTrigger.refresh()
      }
      
      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
        tl.kill()
        ScrollTrigger.getAll().forEach(st => st.kill())
      }
    }
  }, { dependencies: [products, getScrollAmount], scope: containerRef })

  return (
    <section
      id={id.toLowerCase().replace(/\s+/g, '-')}
      ref={containerRef}
      className="relative bg-red-gradient-deep w-full h-[100svh] overflow-hidden z-10 industrial-texture"
      data-section-id={id}
    >
      {/* Track: always horizontal across all screen sizes */}
      <div
        ref={trackRef}
        className="flex flex-row w-fit h-full will-change-transform"
      >
        {products.map((prod, idx) => (
          <div
            key={prod.id}
            className="product-panel relative w-screen max-w-full shrink-0 h-full flex items-center justify-center overflow-hidden"
          >
            {/* Watermark - Technical Look */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0 opacity-[0.02]">
              <span
                className="font-display font-bold text-transparent text-[22vw] lg:text-[14vw] tracking-[-0.05em] uppercase whitespace-nowrap italic"
                style={{ WebkitTextStroke: '1px var(--color-white)' }}
              >
                {prod.watermark}
              </span>
            </div>

            {/* Content — column on mobile, 2-col grid on desktop */}
            <div className="w-full z-20 relative px-5 sm:px-10 md:px-14 lg:px-20 2xl:px-32 flex flex-col items-center text-center lg:text-left lg:items-center justify-center gap-8 lg:grid lg:grid-cols-2 lg:gap-20 2xl:gap-40 lg:max-w-[1400px] 2xl:max-w-[1900px] lg:mx-auto">
              {/* Image Container with Technical Borders */}
              <div
                ref={el => { imageRefs.current[idx] = el }}
                className="relative bg-[var(--color-black-mid)] overflow-hidden group shadow-2xl border border-[var(--color-black-light)] w-full max-w-[320px] sm:max-w-[420px] lg:max-w-none flex-shrink-0 h-[28vh] sm:h-[32vh] md:h-[40vh] lg:h-[45vh] lg:aspect-square 2xl:aspect-[4/5] 3xl:h-[55vh]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-50 z-10" />
                {prod.image ? (
                  <Image src={prod.image} fill sizes="(max-width: 1024px) 100vw, (max-width: 1920px) 50vw, 40vw" className="object-cover transition-transform duration-[2.5s] group-hover:scale-110 contrast-[1.05] grayscale-[0.1]" alt={prod.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-silver)] opacity-30">{prod.name} Visual</span>
                  </div>
                )}
                
                {/* Product Detail Overlay */}
                <div className="absolute top-6 right-6 z-20 hidden lg:block">
                  <div className="bg-[var(--color-black-soft)] border border-[var(--color-primary-muted)] px-4 py-3 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <span className="font-mono text-[10px] 2xl:text-[12px] uppercase text-[var(--color-primary)] tracking-widest font-bold">Base Standard: ASTM/ISO</span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col items-center lg:items-start flex-shrink min-h-0 w-full px-2 sm:px-0">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="font-mono text-[11px] sm:text-[14px] text-[var(--color-primary)] tracking-[0.4em] font-bold">0{idx + 1}</span>
                  <div className="w-6 sm:w-10 h-[2px] bg-[var(--color-primary-muted)]" />
                  <span className="font-mono text-[10px] sm:text-[12px] text-[var(--color-silver)] uppercase tracking-[0.3em] font-medium opacity-60">{prod.type}</span>
                </div>

                <h2 className="font-display font-bold leading-[0.9] tracking-tighter mb-6 lg:mb-8 text-[var(--color-white)] text-[34px] sm:text-[52px] md:text-[72px] lg:text-[80px] 2xl:text-[112px] 3xl:text-[140px] uppercase italic">
                  {prod.name}
                </h2>

                <p className="font-sans font-normal text-[var(--color-silver)] leading-[1.6] sm:leading-[1.7] mb-8 sm:mb-10 text-[14px] sm:text-[17px] lg:text-[18px] 2xl:text-[22px] 3xl:text-[28px] max-w-[500px] lg:max-w-[600px] 3xl:max-w-[900px] opacity-80 italic border-l-2 border-[var(--color-primary-muted)] pl-6 text-left">
                  {prod.desc}
                </p>

                {/* Technical Specs Overlay Style */}
                <div className="flex flex-wrap justify-start gap-x-6 gap-y-3 mb-10 max-w-[640px] 3xl:max-w-none">
                  {prod.links.map(link => (
                    <div key={link} className="flex items-center gap-2 group cursor-pointer">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[var(--color-primary)] group-hover:scale-150 transition-transform duration-300" />
                      <span className="font-mono text-[10px] sm:text-[12px] 3xl:text-[16px] uppercase tracking-[0.2em] text-[var(--color-white)] opacity-60 group-hover:opacity-100 group-hover:text-[var(--color-primary)] transition-all font-bold italic">{link}</span>
                    </div>
                  ))}
                </div>

                <button className="w-fit group flex items-center text-white transition-all duration-500" data-cursor="link">
                  <span className="font-sans font-bold uppercase text-[11px] sm:text-[12px] 2xl:text-[14px] tracking-[0.3em] mr-6 group-hover:text-[var(--color-primary)] transition-colors">Technical Specification</span>
                  <div className="relative flex items-center">
                    <div className="w-10 sm:w-14 h-[2px] bg-[var(--color-primary)] group-hover:w-24 2xl:group-hover:w-32 transition-all duration-700 ease-[luxurious] border-none" />
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 -ml-1 text-[var(--color-primary)] transition-transform group-hover:translate-x-4 duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
