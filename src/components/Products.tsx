'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import Link from 'next/link'
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
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)

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
      className={`relative bg-[var(--color-black)] w-full lg:h-screen min-h-screen overflow-hidden z-10`}
      data-section-id={id}
    >
      <div 
        ref={trackRef} 
        className={`flex ${isTouch ? 'flex-col w-full' : 'flex-row w-[400vw] h-full will-change-transform'}`}
      >
        {products.map((prod, idx) => (
          <div 
            key={prod.id} 
            className={`product-panel relative ${
              isTouch 
                ? 'w-full min-h-screen py-16 sm:py-24 md:py-28' 
                : 'w-[100vw] h-full'
            } flex items-center justify-center`}
          >
            {/* Watermark Background */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
              <span 
                className={`font-display font-light text-transparent ${isTouch ? 'text-[18vw] sm:text-[15vw]' : 'text-[12vw] 2xl:text-[10vw]'} tracking-[0.2em] uppercase whitespace-nowrap`}
                style={{ WebkitTextStroke: '1.5px var(--color-white)' }}
              >
                {prod.watermark}
              </span>
            </div>

            {/* Content Container — stacked on phone, 2-col on tablet+ */}
            <div className={`w-full mx-auto z-20 relative px-5 sm:px-10 md:px-14 xl:px-20 2xl:px-24
              ${isTouch
                ? 'flex flex-col gap-8 max-w-xl sm:max-w-2xl md:max-w-5xl'
                : 'max-w-[1400px] 2xl:max-w-[1800px] grid grid-cols-2 gap-12 xl:gap-20 2xl:gap-32 h-full items-center'
              }
            `}>
              
              {/* Image Column */}
              <div className={`relative bg-[#0A0A0B] overflow-hidden group shadow-[0_32px_80px_rgba(0,0,0,0.55)]
                ${isTouch
                  ? 'aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9] w-full rounded-sm'
                  : 'aspect-square 2xl:aspect-[4/5] rounded-sm'
                }
              `}>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] to-transparent opacity-25 z-10" />
                {prod.image ? (
                  <Image src={prod.image} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" alt={prod.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-silver)] opacity-30">{prod.name} Visual</span>
                  </div>
                )}
              </div>

              {/* Text Column */}
              <div className="flex flex-col">
                {/* Tag row */}
                <div className="flex items-center gap-3 mb-5 sm:mb-7">
                  <span className="font-mono text-[11px] sm:text-[12px] text-[var(--color-red)] tracking-[0.3em]">0{idx + 1}</span>
                  <div className="w-6 h-px bg-[var(--color-red)] opacity-30" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-[var(--color-silver)] uppercase tracking-[0.2em]">{prod.type}</span>
                </div>
                
                {/* Title */}
                <h2 className={`font-display font-light leading-[0.95] tracking-tight mb-6 sm:mb-8 text-[var(--color-white)]
                  ${isTouch
                    ? 'text-[48px] sm:text-[64px] md:text-[72px]'
                    : 'text-[60px] xl:text-[76px] 2xl:text-[96px]'
                  }
                `}>
                  {prod.name}
                </h2>
                
                {/* Description */}
                <p className={`font-sans font-light text-[var(--color-silver)] leading-[1.75] mb-8 sm:mb-10
                  ${isTouch
                    ? 'text-[15px] sm:text-[17px] md:text-[18px]'
                    : 'text-[16px] xl:text-[18px] 2xl:text-[22px]'
                  }
                `}>
                  {prod.desc}
                </p>

                {/* Feature links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 mb-10 sm:mb-14">
                  {prod.links.map(link => (
                    <div key={link} className="flex items-center gap-3 group cursor-pointer hover:translate-x-1 transition-transform">
                      <div className="w-1.5 h-1.5 bg-[var(--color-red)] rounded-full shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.15em] text-[var(--color-silver)] group-hover:text-white transition-colors">{link}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
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
