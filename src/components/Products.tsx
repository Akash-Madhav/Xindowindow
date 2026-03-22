'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
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
  { id: 'sliding', name: 'Sliding', type: 'Windows / Doors', watermark: 'SLIDING', links: ['2-Track', '3-Track', 'Multi-Track'], desc: 'Engineered for seamless operation and maximum natural light.' },
  { id: 'casement', name: 'Casement', type: 'Windows / Doors', watermark: 'CASEMENT', links: ['Open Out', 'Open In', 'Top Hung'], desc: 'Superior acoustic insulation and advanced multi-point security.' },
  { id: 'special', name: 'Special', type: 'Architectural', watermark: 'SPECIAL', links: ['Tilt & Turn', 'Slide & Fold', 'Arch'], desc: 'Bespoke European designs for unique architectural requirements.' },
  { id: 'accessories', name: 'Accessories', type: 'Hardware', watermark: 'HARDWARE', links: ['Fiber Mesh', 'SS Mesh', 'Premium Handles'], desc: 'Precision-crafted hardware guaranteeing long-lasting performance.' }
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

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches

    // GSAP image reveal — works on both mobile (scroll-triggered per panel) and desktop (during h-scroll)
    const imgs = imageRefs.current.filter(Boolean) as HTMLDivElement[]
    imgs.forEach(img => {
      gsap.fromTo(img,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15, opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )
    })

    if (window.matchMedia('(pointer: coarse)').matches) return

    // Desktop Horizontal Scroll Logic
    const sections = gsap.utils.toArray('.product-panel') as HTMLDivElement[]
    
    if (trackRef.current && containerRef.current) {
      const trackWidth = trackRef.current.scrollWidth
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          scrub: 2.5,
          snap: 1 / (sections.length - 1),
          end: "+=2000",
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      })

      tl.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none"
      })

      // Ensure layout is captured correctly after initial render
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)

      return () => {
        clearTimeout(refreshTimeout)
        tl.kill()
        ScrollTrigger.getAll().forEach(t => {
          if (t.vars.trigger === containerRef.current) t.kill()
        })
      }
    }
  }, [products])

  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--color-black)] w-full lg:h-screen overflow-hidden z-10"
      data-section-id={id}
    >
      {/* Track: stacked on mobile/tablet, horizontal row on lg+ */}
      <div 
        ref={trackRef} 
        className="flex flex-col lg:flex-row lg:w-[400vw] lg:h-full will-change-transform"
      >
        {products.map((prod, idx) => (
          <div 
            key={prod.id} 
            className="product-panel relative w-full min-h-screen lg:min-h-0 lg:w-[100vw] lg:h-full py-16 sm:py-20 md:py-24 lg:py-0 flex items-center justify-center"
          >
            {/* Watermark Background */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
              <span 
                className="font-display font-light text-transparent text-[18vw] sm:text-[15vw] lg:text-[12vw] 2xl:text-[10vw] tracking-[0.2em] uppercase whitespace-nowrap"
                style={{ WebkitTextStroke: '1.5px var(--color-white)' }}
              >
                {prod.watermark}
              </span>
            </div>

            {/* Content Container */}
            <div className="w-full mx-auto z-20 relative px-5 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24
              flex flex-col gap-6 max-w-lg sm:max-w-2xl md:max-w-3xl
              lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 2xl:gap-32 lg:max-w-[1400px] 2xl:max-w-[1800px] lg:h-full lg:items-center
            ">
              
              {/* Image */}
              <div 
                ref={el => { imageRefs.current[idx] = el }}
                className="relative bg-[#0A0A0B] overflow-hidden group shadow-[0_32px_80px_rgba(0,0,0,0.55)] rounded-sm
                aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9] w-full
                lg:aspect-square 2xl:aspect-[4/5]
              ">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] to-transparent opacity-25 z-10" />
                {prod.image ? (
                  <Image src={prod.image} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" alt={prod.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-silver)] opacity-30">{prod.name} Visual</span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="font-mono text-[11px] sm:text-[12px] text-[var(--color-red)] tracking-[0.3em]">0{idx + 1}</span>
                  <div className="w-6 h-px bg-[var(--color-red)] opacity-30" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-[var(--color-silver)] uppercase tracking-[0.2em]">{prod.type}</span>
                </div>
                
                <h2 className="font-display font-light leading-[0.95] tracking-tight mb-5 sm:mb-7 text-[var(--color-white)]
                  text-[40px] sm:text-[56px] md:text-[64px] lg:text-[60px] xl:text-[76px] 2xl:text-[96px]
                ">
                  {prod.name}
                </h2>
                
                <p className="font-sans font-light text-[var(--color-silver)] leading-[1.75] mb-7 sm:mb-9
                  text-[14px] sm:text-[16px] md:text-[17px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px]
                ">
                  {prod.desc}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-3 mb-8 sm:mb-12">
                  {prod.links.map(link => (
                    <div key={link} className="flex items-center gap-3 group cursor-pointer hover:translate-x-1 transition-transform">
                      <div className="w-1.5 h-1.5 bg-[var(--color-red)] rounded-full shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="font-sans text-[11px] sm:text-[13px] uppercase tracking-[0.15em] text-[var(--color-silver)] group-hover:text-white transition-colors">{link}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className="w-fit group flex items-center text-white transition-colors duration-300"
                  data-cursor="link"
                >
                  <span className="font-sans font-normal uppercase text-[11px] sm:text-[12px] tracking-[0.2em] mr-4">Explore Collection</span>
                  <div className="w-10 sm:w-12 h-px bg-[var(--color-red)] group-hover:w-20 sm:group-hover:w-24 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
