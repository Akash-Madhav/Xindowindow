'use client'

import { useRef } from 'react'
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
  { id: 'sliding', name: 'Sliding', type: 'Windows / Doors', watermark: 'SLIDING', links: ['2-Track', '3-Track', 'Multi-Track'], desc: 'Engineered for seamless operation and maximum natural light.', image: '/images/sliding.png' },
  { id: 'casement', name: 'Casement', type: 'Windows / Doors', watermark: 'CASEMENT', links: ['Open Out', 'Open In', 'Top Hung'], desc: 'Superior acoustic insulation and advanced multi-point security.', image: '/images/casement.png' },
  { id: 'special', name: 'Special', type: 'Architectural', watermark: 'SPECIAL', links: ['Tilt & Turn', 'Slide & Fold', 'Arch'], desc: 'Bespoke European designs for unique architectural requirements.', image: '/images/tilt_turn.png' },
  { id: 'accessories', name: 'Accessories', type: 'Hardware', watermark: 'HARDWARE', links: ['Fiber Mesh', 'SS Mesh', 'Premium Handles'], desc: 'Precision-crafted hardware guaranteeing long-lasting performance.', image: '/images/hardware.png' }
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

  useGSAP(() => {
    // Horizontal scroll + pinning runs on ALL screen sizes
    const sections = gsap.utils.toArray('.product-panel') as HTMLDivElement[]

    if (trackRef.current && containerRef.current) {
      const getScrollAmount = () => trackRef.current!.scrollWidth - window.innerWidth

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
        }
      })

      tl.to(trackRef.current, {
        x: () => -getScrollAmount(),
        ease: 'none'
      })

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)

      return () => clearTimeout(refreshTimeout)
    }
  }, { dependencies: [products], scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative bg-[var(--color-black)] w-full h-screen overflow-hidden z-10"
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
            {/* Watermark */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
              <span
                className="font-display font-light text-transparent text-[20vw] lg:text-[12vw] 2xl:text-[10vw] tracking-[0.2em] uppercase whitespace-nowrap"
                style={{ WebkitTextStroke: '1.5px var(--color-white)' }}
              >
                {prod.watermark}
              </span>
            </div>

            {/* Content — column on mobile, 2-col grid on desktop */}
            <div className="w-full h-full z-20 relative px-5 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 flex flex-col justify-center gap-3 sm:gap-5 pt-14 sm:pt-16 pb-6 lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 2xl:gap-32 lg:max-w-[1400px] 2xl:max-w-[1800px] lg:mx-auto lg:pt-0 lg:pb-0 lg:items-center">

              {/* Image */}
              <div
                ref={el => { imageRefs.current[idx] = el }}
                className="relative bg-[#0A0A0B] overflow-hidden group shadow-[0_16px_48px_rgba(0,0,0,0.55)] rounded-sm w-full flex-shrink-0 h-[28vh] sm:h-[34vh] md:h-[38vh] lg:h-auto lg:aspect-square 2xl:aspect-[4/5]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] to-transparent opacity-25 z-10" />
                {prod.image ? (
                  <Image src={prod.image} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[2s] group-hover:scale-105" alt={prod.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-silver)] opacity-30">{prod.name} Visual</span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col flex-shrink min-h-0">
                <div className="flex items-center gap-3 mb-2 sm:mb-4">
                  <span className="font-mono text-[10px] sm:text-[12px] text-[var(--color-red)] tracking-[0.3em]">0{idx + 1}</span>
                  <div className="w-5 h-px bg-[var(--color-red)] opacity-30" />
                  <span className="font-mono text-[9px] sm:text-[11px] text-[var(--color-silver)] uppercase tracking-[0.2em]">{prod.type}</span>
                </div>

                <h2 className="font-display font-light leading-[0.95] tracking-tight mb-2 sm:mb-4 text-[var(--color-white)] text-[32px] sm:text-[48px] md:text-[60px] lg:text-[60px] xl:text-[76px] 2xl:text-[96px]">
                  {prod.name}
                </h2>

                <p className="font-sans font-light text-[var(--color-silver)] leading-[1.6] mb-3 sm:mb-6 text-[12px] sm:text-[15px] md:text-[16px] xl:text-[18px] 2xl:text-[22px]">
                  {prod.desc}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 mb-4 sm:mb-8">
                  {prod.links.map(link => (
                    <div key={link} className="flex items-center gap-2 group cursor-pointer hover:translate-x-1 transition-transform">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[var(--color-red)] rounded-full shrink-0" />
                      <span className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.12em] text-[var(--color-silver)] group-hover:text-white transition-colors">{link}</span>
                    </div>
                  ))}
                </div>

                <button className="w-fit group flex items-center text-white transition-colors duration-300" data-cursor="link">
                  <span className="font-sans font-normal uppercase text-[10px] sm:text-[12px] tracking-[0.2em] mr-3">Explore Collection</span>
                  <div className="w-8 sm:w-12 h-px bg-[var(--color-red)] group-hover:w-16 sm:group-hover:w-24 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
