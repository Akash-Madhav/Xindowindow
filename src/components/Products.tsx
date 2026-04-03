'use client'
 
import React, { useRef, useCallback, useState, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { WPProductItem } from '@/lib/wp-types'

const DEFAULT_PRODUCTS: WPProductItem[] = [
  { 
    id: 'veka', 
    title: 'VEKA (UPVC)', 
    type: 'German Precision Vinyl', 
    watermark: 'VEKA', 
    specs: ['Multi-Chambered', 'Acoustic I-50', 'Tropical Grade'], 
    description: 'Uncompromising German-engineered uPVC profiles. Designed for hyper-durability and extreme tropical resistance, featuring advanced multi-chambered technology for ultimate insulation.', 
    image: '/images/sliding.png' 
  },
  { 
    id: 'aluk', 
    title: 'ALUK / ALUMINIUM', 
    type: 'Architectural System Aluminium', 
    watermark: 'ALUK', 
    specs: ['Infineo Series', 'SC95 Minimalist', 'Structural Glazing'], 
    description: 'High-performance architectural aluminum systems. Combining sleek, ultra-slim aesthetics with unyielding structural integrity for expansive modern focal points.', 
    image: '/images/casement.png' 
  },
  { 
    id: 'totalis', 
    title: 'TOTALIS', 
    type: 'Elite Performance Fenestration', 
    watermark: 'TOTALIS', 
    specs: ['Zero-Threshold', 'Max Security', 'Weather-Tight'], 
    description: 'Bespoke high-end fenestration solutions for unique architectural requirements. Engineered for zero-threshold transitions and maximum security architectural deployment.', 
    image: '/images/tilt_turn.png' 
  },
  { 
    id: 'xindo', 
    title: 'XINDO (SLEEK)', 
    type: 'Ultra-Slim Luxury Series', 
    watermark: 'SLEEK', 
    specs: ['Invisible Frame', 'X12 Partition', 'Grand Panoramic'], 
    description: 'The pinnacle of minimalist engineering. Ultra-slim profile systems designed for maximum transparency and zero-sightline luxury residential and commercial spaces.', 
    image: '/images/hardware.png' 
  }
]

interface ProductsProps {
  id?: string
  products?: WPProductItem[]
  registry?: Record<string, string[]>
}

export default function Products({
  id = "03",
  products = DEFAULT_PRODUCTS,
  registry = {}
}: ProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  
  const [selectedSystemName, setSelectedSystemName] = useState<string | null>(null)
  const [selectedProductName, setSelectedProductName] = useState<string | null>(null)
  
  const globalLenis = useLenis()

  const getScrollAmount = useCallback(() => {
    if (!trackRef.current) return 0
    return trackRef.current.scrollWidth - window.innerWidth
  }, [])

  useGSAP(() => {
    if (trackRef.current && containerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          scrub: 1.5,
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      })

      tl.to(trackRef.current, {
        x: () => -getScrollAmount(),
        ease: 'none'
      })

      return () => {
        tl.kill()
        ScrollTrigger.getAll().forEach(st => st.kill())
      }
    }
  }, { dependencies: [products, getScrollAmount], scope: containerRef })

  // Pause/Resume site when modal is open
  useEffect(() => {
    if (selectedSystemName) {
      // Stop Lenis smooth scroll
      globalLenis?.stop()
      // Pause all GSAP ScrollTriggers so horizontal scroll pin doesn't interfere
      ScrollTrigger.getAll().forEach(st => st.disable())
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Resume Lenis
      globalLenis?.start()
      // Re-enable all ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.enable())
      // Restore body scroll
      document.body.style.overflow = ''
    }
  }, [selectedSystemName, globalLenis])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      globalLenis?.start()
      ScrollTrigger.getAll().forEach(st => st.enable())
      document.body.style.overflow = ''
    }
  }, [globalLenis])

  const getProductImage = (name: string) => {
    const n = name.toUpperCase()
    if (n.includes('SLIDING')) return '/images/sliding.png'
    if (n.includes('CASEMENT')) return '/images/casement.png'
    if (n.includes('TILT')) return '/images/tilt_turn.png'
    if (n.includes('DOOR')) return '/images/casement.png'
    if (n.includes('HARDWARE')) return '/images/hardware.png'
    return '/images/sliding.png'
  }

  const getProductSpecs = (name: string) => {
    return {
      acoustic: "-48.2 dB Reduct",
      thermal: "U-Val 1.1 W/m²K",
      wind: "4500 Pa Resist",
      water: "Class 9A+ ISO",
      standard: "DIN 18055 GER",
      warranty: "10 Years Seal"
    }
  }

  const closeModal = () => {
    setSelectedSystemName(null)
    setSelectedProductName(null)
  }

  return (
    <>
      <section
        id={id}
        ref={containerRef}
        className="relative bg-[var(--color-black)] w-full h-[100svh] overflow-hidden z-10 industrial-texture"
      >
        <div ref={trackRef} className="flex flex-row w-fit h-full will-change-transform">
          {products.map((prod, idx) => (
            <div key={prod.id} className="product-panel relative w-screen max-w-full shrink-0 h-full flex items-center justify-center overflow-hidden">
              {/* Massive Technical Watermark */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
                <span className="font-display font-black text-transparent text-[30vw] tracking-[-0.05em] uppercase whitespace-nowrap italic selection:bg-transparent" style={{ WebkitTextStroke: '2px var(--color-white)' }}>
                  {prod.watermark}
                </span>
              </div>

              <div className="w-full h-full z-20 relative px-6 md:px-16 lg:px-24 flex flex-col lg:grid lg:grid-cols-2 lg:items-center max-w-[1400px] 2xl:max-w-[1920px] mx-auto overflow-hidden">
                
                {/* Visual Area */}
                <div className="relative group overflow-hidden border border-white/5 shadow-3xl aspect-[4/5] lg:aspect-square w-full scale-90 lg:scale-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-80 z-10" />
                  <Image 
                    src={prod.image || "/images/sliding.png"} 
                    fill 
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 800px" 
                    className="object-cover grayscale-[0.5] contrast-[1.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s]" 
                    alt={prod.title} 
                  />
                  {/* Technical Chip */}
                  <div className="absolute top-10 left-10 z-20 flex flex-col gap-2">
                    <span className="font-mono text-[9px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">PROT-TYPE_V.01</span>
                    <div className="w-12 h-[2px] bg-[var(--color-primary)]" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0 lg:pl-32">
                  <div className="flex items-center gap-6 mb-10">
                    <span className="font-display text-[48px] text-[var(--color-primary)] font-black italic leading-none">0{idx + 1}</span>
                    <div className="w-12 h-[1px] bg-white/20" />
                    <span className="font-mono text-[10px] text-[var(--color-silver)] uppercase tracking-[0.4em] font-black opacity-30">{prod.type}</span>
                  </div>

                  <h2 className="font-display font-black text-[48px] md:text-[88px] 2xl:text-[120px] text-white leading-[0.85] uppercase italic mb-12 tracking-tighter">
                    {prod.title}
                  </h2>

                  <p className="font-sans font-medium text-[15px] md:text-[18px] 2xl:text-[24px] text-[var(--color-silver)] leading-relaxed mb-16 max-w-xl opacity-60 italic border-l-2 border-[var(--color-primary)] pl-10">
                    {prod.description}
                  </p>

                  <button 
                    onClick={() => setSelectedSystemName(prod.title)}
                    className="group flex items-center gap-10"
                    data-cursor-button="true"
                  >
                    <div className="w-14 h-14 border border-[var(--color-primary)] rounded-full flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-all duration-500">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-[var(--color-primary)] group-hover:text-white transition-colors"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                    <span className="font-sans font-black uppercase text-[12px] tracking-[0.4em] text-white">Full Registry</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Product Registry Modal ─── */}
      <AnimatePresence>
        {selectedSystemName && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-[var(--color-black)]/95 backdrop-blur-3xl"
              onClick={closeModal}
            />
            
            {/* Modal Card — full screen mobile, constrained on larger screens */}
            <motion.div 
              initial={{ scale: 0.96, y: 60, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 60, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={[
                'relative z-10 flex flex-col industrial-texture',
                'w-full h-[100dvh]',                          // Mobile: full viewport
                'sm:h-[92dvh] sm:max-w-[95vw]',              // Tablet
                'lg:h-[88dvh] lg:max-w-[1400px]',            // Desktop
                '2xl:max-w-[1600px]',                        // Wide
                'bg-[var(--color-black-soft)] border border-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.9)]',
                'overflow-hidden',
              ].join(' ')}
              onClick={e => e.stopPropagation()}
            >

              {/* ── Modal Header ── */}
              <div className="flex-shrink-0 px-5 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-8 border-b border-white/5 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1.5 sm:gap-3 min-w-0">
                  <div className="flex items-center gap-3 sm:gap-5">
                    <div className="w-6 sm:w-10 h-[1.5px] bg-[var(--color-primary)] flex-shrink-0" />
                    <span className="font-mono text-[8px] sm:text-[10px] text-[var(--color-primary)] uppercase tracking-[0.4em] sm:tracking-[0.6em] font-black italic whitespace-nowrap">X-REG_SYSTEMS</span>
                  </div>
                  <h2 className="font-display font-black text-[22px] sm:text-[36px] lg:text-[52px] 2xl:text-[64px] text-white leading-none uppercase italic tracking-tighter truncate">
                    {selectedProductName || selectedSystemName}
                  </h2>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                  {selectedProductName && (
                    <button 
                      onClick={() => setSelectedProductName(null)}
                      className="p-2.5 sm:p-4 border border-white/10 hover:border-[var(--color-primary)] transition-all group"
                      aria-label="Back"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    </button>
                  )}
                  <button 
                    onClick={closeModal}
                    className="p-2.5 sm:p-4 border border-white/10 hover:border-[var(--color-primary)] transition-all"
                    aria-label="Close"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>

              {/* ── Scrollable Body ── */}
              <div 
                className="flex-1 overflow-y-auto custom-scrollbar"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                }}
              >
                <div className="p-5 sm:p-8 lg:p-12 2xl:p-16">
                  <AnimatePresence mode="wait">
                    {!selectedProductName ? (

                      /* ── Product Grid View ── */
                      <motion.div 
                        key="grid"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.35 }}
                        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5 border border-white/5"
                      >
                        {registry[selectedSystemName as keyof typeof registry]?.map((prod: string, idx: number) => (
                          <div 
                            key={prod} 
                            onClick={() => setSelectedProductName(prod)}
                            className="group relative bg-[var(--color-black)] hover:bg-[var(--color-black-soft)] transition-all duration-500 cursor-pointer overflow-hidden p-5 sm:p-8 lg:p-10"
                          >
                            <div className="relative aspect-square w-full mb-5 sm:mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[2s]">
                              <Image 
                                src={getProductImage(prod)} 
                                alt={prod} 
                                fill 
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[4s]" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-60" />
                            </div>
                            <span className="font-mono text-[8px] sm:text-[9px] text-[var(--color-primary)] tracking-[0.3em] sm:tracking-[0.4em] mb-2 block font-black opacity-30 group-hover:opacity-100 transition-opacity italic">0{idx+1}_REF</span>
                            <h3 className="font-display font-black text-[16px] sm:text-[20px] lg:text-[24px] text-white uppercase italic leading-[0.9] tracking-tighter group-hover:text-[var(--color-primary)] transition-colors">{prod}</h3>
                          </div>
                        ))}
                      </motion.div>

                    ) : (

                      /* ── Product Detail View ── */
                      <motion.div 
                        key="detail"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start"
                      >
                        {/* Product Image */}
                        <div className="lg:col-span-5 relative w-full">
                          <div className="relative aspect-square w-full border border-white/5 shadow-2xl overflow-hidden">
                            <Image 
                              src={getProductImage(selectedProductName)} 
                              alt={selectedProductName} 
                              fill 
                              sizes="(max-width: 1024px) 100vw, 600px"
                              className="object-cover" 
                            />
                          </div>
                          <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-24 h-24 sm:w-32 sm:h-32 border-b-2 border-r-2 border-[var(--color-primary)] opacity-20 pointer-events-none" />
                        </div>

                        {/* Product Specs */}
                        <div className="lg:col-span-7 flex flex-col gap-8 sm:gap-12 w-full pb-4">
                          <div className="grid grid-cols-2 gap-5 sm:gap-8">
                            {Object.entries(getProductSpecs(selectedProductName)).map(([label, val]) => (
                              <div key={label} className="border-l border-white/10 pl-5 sm:pl-8 flex flex-col gap-1.5 sm:gap-2 group hover:border-[var(--color-primary)] transition-colors">
                                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[var(--color-silver)] opacity-30 font-black">{label}</span>
                                <span className="text-white font-display text-[18px] sm:text-[24px] lg:text-[28px] 2xl:text-[32px] font-black italic tracking-tighter group-hover:translate-x-2 transition-transform duration-500">{val}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                            <button className="flex-1 bg-[var(--color-primary)] text-white font-sans text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] py-4 sm:py-5 px-6 sm:px-10 shadow-primary hover:bg-white hover:text-black transition-all">Download Spec</button>
                            <button className="flex-1 border border-white/10 text-white font-sans text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] py-4 sm:py-5 px-6 sm:px-10 hover:border-[var(--color-primary)] transition-all">BIM Library</button>
                          </div>
                        </div>
                      </motion.div>

                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ── Modal Footer ── */}
              <div className="flex-shrink-0 px-5 sm:px-10 py-4 sm:py-6 border-t border-white/5 flex items-center justify-between opacity-30">
                <span className="font-mono text-[7px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] uppercase font-black">XINDO_ALPHA CORE PROTOCOL</span>
                <span className="font-mono text-[7px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] uppercase font-black">© 2026 ARCHITECTURAL SYSTEMS</span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
