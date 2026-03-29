'use client'

import React, { useRef, useCallback, useState, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { useLenis } from 'lenis/react'
import productData from '@/data/product-registry.json'

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
    type: 'German Precision Vinyl', 
    watermark: 'VEKA', 
    links: ['Multi-Chambered', 'Acoustic I-50', 'Tropical Grade'], 
    desc: 'Uncompromising German-engineered uPVC profiles. Designed for hyper-durability and extreme tropical resistance, featuring advanced multi-chambered technology for ultimate insulation.', 
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'aluk', 
    name: 'ALUK / ALUMINIUM', 
    type: 'Architectural System Aluminium', 
    watermark: 'ALUK', 
    links: ['Infineo Series', 'SC95 Minimalist', 'Structural Glazing'], 
    desc: 'High-performance architectural aluminum systems. Combining sleek, ultra-slim aesthetics with unyielding structural integrity for expansive modern focal points.', 
    image: 'https://images.unsplash.com/photo-1510000218930-bc500989047b?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'totalis', 
    name: 'TOTALIS', 
    type: 'Elite Performance Fenestration', 
    watermark: 'TOTALIS', 
    links: ['Zero-Threshold', 'Max Security', 'Weather-Tight'], 
    desc: 'Bespoke high-end fenestration solutions for unique architectural requirements. Engineered for zero-threshold transitions and maximum security architectural deployment.', 
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'xindo', 
    name: 'XINDO (SLEEK)', 
    type: 'Ultra-Slim Luxury Series', 
    watermark: 'SLEEK', 
    links: ['Invisible Frame', 'X12 Partition', 'Grand Panoramic'], 
    desc: 'The pinnacle of minimalist engineering. Ultra-slim profile systems designed for maximum transparency and zero-sightline luxury residential and commercial spaces.', 
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
  
  // Modal State
  const [selectedSystemName, setSelectedSystemName] = useState<string | null>(null)
  const [selectedProductName, setSelectedProductName] = useState<string | null>(null)
  
  const modalScrollRef = useRef<HTMLDivElement>(null)
  const globalLenis = useLenis()

  // Main Page Smooth Scroll Handle
  const getScrollAmount = useCallback(() => {
    if (!trackRef.current) return 0
    return trackRef.current.scrollWidth - window.innerWidth
  }, [])

  useGSAP(() => {
    if (trackRef.current && containerRef.current) {
      const sections = gsap.utils.toArray('.product-panel') as HTMLDivElement[]
      
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

      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener('resize', onResize)
      return () => {
        window.removeEventListener('resize', onResize)
        tl.kill()
        ScrollTrigger.getAll().forEach(st => st.kill())
      }
    }
  }, { dependencies: [products, getScrollAmount], scope: containerRef })

  // Modal Scroll / Body Lock / Global Scroll Stop
  useEffect(() => {
    if (selectedSystemName) {
      document.body.style.overflow = 'hidden'
      globalLenis?.stop()
      
      if (modalScrollRef.current) {
        const lenis = new Lenis({
          wrapper: modalScrollRef.current,
          lerp: 0.1, 
          smoothWheel: true,
        })

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        const rafId = requestAnimationFrame(raf)

        const ctx = gsap.context(() => {
          gsap.from('.product-card', {
            y: 30,
            opacity: 0, // Fades on card entrance is still fine for entrance, but the *viewing* (modal block) shouldn't fade.
            duration: 1.2,
            stagger: 0.04,
            ease: 'power4.out',
            scrollTrigger: {
              scroller: modalScrollRef.current,
              trigger: '.product-card-container',
              start: 'top 85%',
            }
          })
        }, modalScrollRef)

        return () => {
          cancelAnimationFrame(rafId)
          lenis.destroy()
          ctx.revert()
        }
      }
    } else {
      document.body.style.overflow = ''
      globalLenis?.start()
    }
  }, [selectedSystemName, selectedProductName, globalLenis])

  // Helpers
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
    const n = name.toUpperCase()
    return {
      acoustic: n.includes('VEKA') ? "-48.2 dB Reduction" : "-42.5 dB Reduction",
      thermal: n.includes('ALUMINIUM') ? "U-Value 1.1 W/m²K" : "U-Value 1.3 W/m²K",
      wind: n.includes('SLEEK') ? "4500 Pa Resistance" : "3800 Pa Resistance",
      water: "Class 9A+ ISO-Certified",
      standard: "DIN 18055 / ASTM Certified",
      warranty: "10 Years Structural Seal"
    }
  }

  return (
    <>

      <section
        id={id.toLowerCase().replace(/\s+/g, '-')}
        ref={containerRef}
        className="relative bg-red-gradient-deep w-full h-[100svh] overflow-hidden z-10 industrial-texture"
        data-section-id={id}
      >
        <div ref={trackRef} className="flex flex-row w-fit h-full will-change-transform">
          {products.map((prod, idx) => (
            <div key={prod.id} className="product-panel relative w-screen max-w-full shrink-0 h-full flex items-center justify-center overflow-hidden">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
                <span className="font-display font-bold text-transparent text-[22vw] lg:text-[14vw] tracking-[-0.05em] uppercase whitespace-nowrap italic" style={{ WebkitTextStroke: '1px var(--color-white)' }}>
                  {prod.watermark}
                </span>
              </div>

              <div className="w-full z-20 relative px-5 sm:px-10 md:px-16 lg:px-24 flex flex-col items-center lg:items-center justify-center lg:grid lg:grid-cols-2 lg:gap-32 lg:max-w-[1500px] lg:mx-auto">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative bg-[var(--color-black-mid)] overflow-hidden group shadow-2xl border border-[rgba(255,255,255,0.05)] w-full max-w-[320px] sm:max-w-[420px] lg:max-w-none h-[28vh] lg:h-[45vh] lg:aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-60 z-10" />
                  {prod.image ? <Image src={prod.image} fill sizes="(max-width: 1024px) 100vw, 50vw" priority={idx === 0} className="object-cover transition-transform duration-[3s] group-hover:scale-110" alt={prod.name} /> : null}
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="mt-10 lg:mt-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-mono text-[14px] text-[var(--color-primary)] tracking-[0.4em] font-bold">0{idx + 1}</span>
                    <div className="w-8 h-[2px] bg-[var(--color-primary-muted)]" />
                    <span className="font-mono text-[10px] sm:text-[11px] text-[var(--color-silver)] uppercase tracking-[0.3em] font-medium opacity-60">{prod.type}</span>
                  </div>
                  <h2 className="font-display font-bold leading-[0.9] tracking-tighter mb-6 lg:mb-8 text-[var(--color-white)] text-[34px] sm:text-[48px] lg:text-[72px] 2xl:text-[112px] uppercase italic">{prod.name}</h2>
                  <p className="font-sans font-normal text-[var(--color-silver)] leading-[1.6] mb-8 text-[14px] sm:text-[16px] opacity-80 italic border-l-2 border-[var(--color-primary-muted)] pl-8 max-w-[500px]">{prod.desc}</p>
                  
                  <button onClick={() => setSelectedSystemName(prod.name)} className="w-fit group flex items-center text-white transition-all duration-700">
                    <span className="font-sans font-bold uppercase text-[11px] 2xl:text-[13px] tracking-[0.4em] mr-8 group-hover:text-[var(--color-primary)] transition-colors">View Products</span>
                    <div className="relative flex items-center">
                      <div className="w-10 h-[2px] bg-[var(--color-primary)] group-hover:w-28 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <svg className="w-4 h-4 -ml-1 text-[var(--color-primary)] transition-transform group-hover:translate-x-5 duration-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </button>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Polish Isolated Portal */}
      <AnimatePresence>
        {selectedSystemName && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-10 md:p-16 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setSelectedSystemName(null); setSelectedProductName(null) }} className="absolute inset-0 bg-[var(--color-black)]/96 backdrop-blur-3xl pointer-events-auto transition-all duration-500" />
            
            {/* Modal Container: Removed Initial Opacity Fading */}
            <motion.div 
              initial={{ scale: 0.99, y: 30 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.99, y: 30 }} 
              className="relative w-full h-[100dvh] sm:h-[85vh] sm:max-w-[1440px] bg-red-gradient-deep border-y sm:border border-[rgba(255,255,255,0.05)] overflow-hidden flex flex-col industrial-texture sm:rounded-sm shadow-[0_0_120px_rgba(0,0,0,0.9)]"
            >
              
              {/* Recalibrated Header */}
              <div className="flex items-center justify-between p-6 sm:p-10 border-b border-[rgba(255,255,255,0.05)] relative z-20 bg-[var(--color-black)]/30 backdrop-blur-md">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-[1.5px] bg-[var(--color-primary)]" />
                    <span className="font-mono text-[9px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-bold">X-REG: {selectedProductName ? "DETAIL VIEW" : "SYSTEM CATALOG"}</span>
                  </div>
                  <h2 className="font-display font-bold text-[28px] sm:text-[42px] text-white leading-[0.85] uppercase italic tracking-tighter">
                    {selectedProductName ? selectedProductName : selectedSystemName} 
                    <span className="text-[var(--color-primary)] ml-4 opacity-70 font-medium tracking-normal text-[20px] sm:text-[28px]">{selectedProductName ? "SPEC" : "Registry"}</span>
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  {selectedProductName && (
                    <button onClick={() => setSelectedProductName(null)} className="flex items-center gap-3 bg-[var(--color-black-mid)] border border-[rgba(255,255,255,0.1)] px-5 py-3 text-[var(--color-silver)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-700 font-mono text-[10px] uppercase tracking-widest font-bold">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                      <span className="hidden sm:inline">Back</span>
                    </button>
                  )}
                  <button onClick={() => { setSelectedSystemName(null); setSelectedProductName(null) }} className="bg-[var(--color-black-mid)] border border-[rgba(255,255,255,0.1)] p-4 hover:border-[var(--color-primary)] transition-all duration-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>

              {/* Seamless Scroll Area */}
              <div ref={modalScrollRef} className="flex-1 overflow-y-auto custom-scrollbar pointer-events-auto no-x-scroll">
                <AnimatePresence mode="wait">
                  {!selectedProductName ? (
                    <motion.div key="grid" 
                      initial={{ scale: 0.98 }} 
                      animate={{ scale: 1 }} 
                      exit={{ x: -100 }} 
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
                      className="p-8 sm:p-14 product-card-container"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {productData.PRODUCT_REGISTRY[selectedSystemName as keyof typeof productData.PRODUCT_REGISTRY]?.map((prod, idx) => (
                          <div key={prod} onClick={() => setSelectedProductName(prod)} className="product-card group relative bg-[rgba(20,20,22,0.4)] border border-[rgba(255,255,255,0.03)] hover:border-[var(--color-primary-muted)] p-8 transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-sm">
                            <div className="relative aspect-square w-full mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                              <Image src={getProductImage(prod)} alt={prod} fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[4s]" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent opacity-80" />
                            </div>
                            <span className="font-mono text-[9px] text-[var(--color-primary)] tracking-[0.4em] mb-3 block font-bold opacity-60">REF-ID_0{idx+1}</span>
                            <h3 className="font-display font-semibold text-[18px] text-white uppercase italic leading-tight mb-6 group-hover:text-[var(--color-primary)] transition-colors">{prod}</h3>
                            <div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase text-[var(--color-silver)] opacity-30 tracking-widest font-bold group-hover:opacity-100 transition-opacity">Technical Profile</span><div className="w-16 h-[1.5px] bg-[var(--color-primary-muted)] group-hover:w-full transition-all duration-1000 origin-left" /></div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="detail" 
                      initial={{ x: 100 }} 
                      animate={{ x: 0 }} 
                      exit={{ x: 100 }} 
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
                      className="p-8 sm:p-16 lg:p-24 bg-[var(--color-black)] min-h-full flex items-center relative z-10"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center w-full max-w-[1300px] mx-auto">
                        {/* Detail Left: Technical Image */}
                        <div className="lg:col-span-5 relative group">
                          <div className="relative aspect-square w-full rounded-sm overflow-hidden border border-[rgba(255,255,255,0.05)] shadow-2xl">
                            <Image src={getProductImage(selectedProductName)} alt={selectedProductName} fill className="object-cover group-hover:scale-110 transition-transform duration-[5s]" />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--color-white)]/5 to-[var(--color-black)]/40" />
                          </div>
                          {/* Fixed Badge Position */}
                          <div className="absolute top-4 left-4 bg-[var(--color-primary)] px-4 py-2 border border-white/10 shadow-xl">
                            <span className="font-display font-bold text-white text-[14px] italic">XINDO-ALPHA</span>
                          </div>
                          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-[var(--color-primary)] opacity-40 pointer-events-none" />
                        </div>

                        {/* Detail Right: Integrated Specs Matrix */}
                        <div className="lg:col-span-7 flex flex-col">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-[1.5px] bg-[var(--color-primary)]" />
                            <span className="font-mono text-[10px] text-[var(--color-primary)] uppercase tracking-[0.6em] font-bold">Engineered Specifications</span>
                          </div>
                          <h3 className="font-display font-bold text-[48px] lg:text-[64px] text-white leading-[0.85] uppercase italic mb-14 tracking-tighter">Performance Data</h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12 mb-16">
                            {Object.entries(getProductSpecs(selectedProductName)).map(([label, value], i) => (
                              <div key={label} className="flex flex-col border-l border-[rgba(255,255,255,0.1)] pl-8 group cursor-default hover:border-[var(--color-primary)] transition-colors">
                                <span className="font-mono text-[9px] uppercase text-[var(--color-silver)] opacity-40 tracking-widest mb-3 font-bold">{label}</span>
                                <span className="text-white font-display text-[22px] font-semibold italic group-hover:translate-x-2 transition-transform duration-500">{value}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-5">
                            <button className="flex-1 bg-[var(--color-primary)] text-white font-mono text-[11px] uppercase tracking-[0.4em] py-6 px-10 hover:bg-white hover:text-black transition-all duration-700 font-bold shadow-2xl">Request Specs</button>
                            <button className="flex-1 bg-transparent border border-[rgba(255,255,255,0.1)] text-white font-mono text-[11px] uppercase tracking-[0.4em] py-6 px-10 hover:border-[var(--color-primary)] transition-all duration-700 font-bold">BIM Data</button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Optimized Footer Status */}
              <div className="px-8 sm:px-12 py-5 bg-[var(--color-black)] border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between gap-8 relative z-30">
                <div className="flex items-center gap-10 font-mono text-[9px] tracking-[0.3em] text-[var(--color-silver)] opacity-30">
                  <span className="hidden md:flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" /> REGISTRY: 2026.04-V4.2</span>
                  <span className="hidden xl:inline">STANDARDS: DIN 18055 / ASTM-REG</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[9px] text-[var(--color-primary)] font-bold tracking-[0.4em] uppercase opacity-60">System Monitor</span>
                  <div className="w-24 h-[3px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div animate={{ x: [-100, 100] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-12 h-full bg-[var(--color-primary)]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
