'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap-config'
import Link from 'next/link'

const PRODUCTS = [
  {
    id: 'sliding',
    name: 'Sliding',
    type: 'Windows / Doors',
    watermark: 'SLIDING',
    links: ['2-Track Sliding', '3-Track Sliding', 'Multi-Track with Mesh'],
    desc: 'Engineered for seamless operation and maximum natural light. Perfect for modern Indian homes.'
  },
  {
    id: 'casement',
    name: 'Casement',
    type: 'Windows / Doors',
    watermark: 'CASEMENT',
    links: ['Open Out', 'Open In', 'Top Hung', 'French Doors'],
    desc: 'Superior acoustic insulation and advanced multi-point security locking systems.'
  },
  {
    id: 'special',
    name: 'Special',
    type: 'Architectural Systems',
    watermark: 'SPECIAL',
    links: ['Tilt & Turn', 'Slide & Fold', 'Arch Windows', 'Bay Windows'],
    desc: 'Bespoke European designs for unique architectural requirements and luxury spaces.'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    type: 'Hardware & Meshes',
    watermark: 'HARDWARE',
    links: ['Fiber Mesh', 'SS Mesh', 'Premium Handles', 'Friction Stays'],
    desc: 'Precision-crafted hardware guaranteeing long-lasting performance and security.'
  }
]

export default function Products() {
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
      
      const pinScroll = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${trackWidth - window.innerWidth}`
        }
      })

      // Image reveals per panel
      sections.forEach((panel) => {
        const img = panel.querySelector('.product-img-reveal')
        if (img) {
          gsap.fromTo(img,
            { clipPath: 'inset(100% 0 0 0)' },
            { 
              clipPath: 'inset(0% 0 0 0)', 
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: pinScroll,
                start: "left center",
                end: "center center",
                scrub: true
              }
            }
          )
        }
      })

      return () => {
        pinScroll.kill()
        ScrollTrigger.getAll().forEach(t => {
          if (t.vars.trigger === containerRef.current) t.kill()
        })
      }
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--color-black)] w-full lg:h-[100svh] overflow-hidden"
      data-section-id="03"
    >
      <div 
        ref={trackRef} 
        className={`flex ${isTouch ? 'flex-col snap-y snap-mandatory h-[85svh] overflow-y-auto w-full border-t border-[rgba(255,255,255,0.05)]' : 'flex-row w-[400vw] h-full will-change-transform'}`}
      >
        {PRODUCTS.map((prod, idx) => (
          <div 
            key={prod.id} 
            className={`product-panel relative ${isTouch ? 'w-full h-full snap-start' : 'w-[100vw] h-full'} flex items-center justify-center`}
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.04]">
              <span 
                className={`font-display font-light text-transparent ${isTouch ? 'text-[64px]' : 'text-[120px] lg:text-[200px]'} tracking-widest uppercase`}
                style={{ WebkitTextStroke: '1px var(--color-white)' }}
              >
                {prod.watermark}
              </span>
            </div>

            {/* Background Image Reveal */}
            <div className="absolute inset-0 z-0 pointer-events-none product-img-reveal" style={{ clipPath: isTouch ? 'none' : 'inset(100% 0 0 0)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,11,0.2)] to-[rgba(10,10,11,0.9)] z-10" />
              {/* Image Placeholder */}
              <div className="w-full h-full bg-[#111]" />
            </div>

            {/* Content Container */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_40%] h-full z-20 relative pt-20 md:pt-0">
              
              {/* Left Content */}
              <div className="flex flex-col justify-center h-full max-w-[480px]">
                <div className="font-mono text-[10px] text-[var(--color-red)] uppercase tracking-[0.15em] mb-4">
                  0{idx + 1} // {prod.type}
                </div>
                <h2 className="font-display text-[42px] md:text-[72px] text-[var(--color-white)] leading-[1.1] mb-6">
                  {prod.name}
                </h2>
                
                <p className="font-sans font-light text-[15px] md:text-[18px] text-[var(--color-silver)] leading-[1.65] mb-8">
                  {prod.desc}
                </p>

                <div className="flex flex-col gap-3 mb-12">
                  {prod.links.map(link => (
                    <div key={link} className="flex items-center gap-3">
                      <div className="w-[4px] h-[4px] bg-[var(--color-red)] rounded-full" />
                      <span className="font-sans text-[13px] text-[var(--color-silver)] hover:text-white transition-colors cursor-pointer">{link}</span>
                    </div>
                  ))}
                </div>

                <button 
                  data-cursor-button="true"
                  className="w-fit group relative px-8 py-4 border border-[var(--color-red)] text-[var(--color-white)] bg-transparent overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-[0_0_20px_rgba(200,16,46,0.3)]"
                >
                  <div className="absolute inset-0 bg-[rgba(200,16,46,0.1)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                  <span className="relative z-10 font-sans uppercase text-[12px] tracking-widest font-medium group-hover:text-[var(--color-white)]">Explore Collection</span>
                </button>
              </div>

              {/* Right DrawSVG Graphic */}
              <div className="hidden md:flex items-center justify-center relative">
                <svg width="60%" height="60%" viewBox="0 0 100 100" className="opacity-80 drop-shadow-[0_0_30px_rgba(200,16,46,0.2)]" preserveAspectRatio="xMidYMid meet">
                  {/* Pseudo structural line drawing representation to be replaced with real DrawSVG */}
                  <rect x="25" y="20" width="50" height="70" fill="none" stroke="var(--color-red)" strokeWidth="1.5" className="draw-path" strokeDasharray="300" strokeDashoffset="0" />
                  <line x1="50" y1="20" x2="50" y2="90" stroke="var(--color-red)" strokeWidth="1.5" className="draw-path" />
                  <line x1="25" y1="55" x2="75" y2="55" stroke="var(--color-red)" strokeWidth="1.5" className="draw-path" />
                </svg>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
