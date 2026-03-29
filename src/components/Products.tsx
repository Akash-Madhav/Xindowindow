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
          lerp: 0.08,
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
            opacity: 0,
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

              <div className="w-full z-20 relative px-5 sm:px-10 md:px-16 lg:px-24 2xl:px-40 flex flex-col lg:grid lg:grid-cols-2 lg:gap-32 lg:max-w-[1500px] 2xl:max-w-[2000px] lg:mx-auto items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative bg-[var(--color-black-mid)] overflow-hidden group shadow-2xl border border-[rgba(255,255,255,0.05)] w-full max-w-[320px] sm:max-w-[420px] lg:max-w-none flex-shrink-0 h-[30vh] lg:h-[50vh] xl:h-[55vh] lg:aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-60 z-10" />
                  {prod.image ? <Image src={prod.image} fill sizes="(max-width: 1024px) 100vw, 50vw" priority={idx === 0} className="object-cover transition-transform duration-[3s] group-hover:scale-110" alt={prod.name} /> : null}
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="mt-12 lg:mt-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-[14px] text-[var(--color-primary)] tracking-[0.4em] font-bold">0{idx + 1}</span>
                    <div className="w-10 h-[2px] bg-[var(--color-primary-muted)]" />
                    <span className="font-mono text-[11px] text-[var(--color-silver)] uppercase tracking-[0.4em] font-medium opacity-60">{prod.type}</span>
                  </div>
                  <h2 className="font-display font-bold leading-[0.9] tracking-tighter mb-8 text-[var(--color-white)] text-[38px] sm:text-[54px] lg:text-[84px] 2xl:text-[120px] 3xl:text-[150px] uppercase italic">{prod.name}</h2>
                  <p className="font-sans font-normal text-[var(--color-silver)] leading-[1.7] mb-10 text-[15px] sm:text-[19px] opacity-80 italic border-l-2 border-[var(--color-primary-muted)] pl-10 max-w-[600px]">{prod.desc}</p>
                  
                  <button onClick={() => setSelectedSystemName(prod.name)} className="w-fit group flex items-center text-white transition-all duration-700">
                    <span className="font-sans font-bold uppercase text-[12px] 2xl:text-[15px] tracking-[0.5em] mr-8 group-hover:text-[var(--color-primary)] transition-colors">View Products</span>
                    <div className="relative flex items-center">
                      <div className="w-12 h-[2px] bg-[var(--color-primary)] group-hover:w-32 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <svg className="w-5 h-5 -ml-1 text-[var(--color-primary)] transition-transform group-hover:translate-x-6 duration-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-12 md:p-16 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setSelectedSystemName(null); setSelectedProductName(null) }} className="absolute inset-0 bg-[var(--color-black)]/95 backdrop-blur-3xl pointer-events-auto" />
            
            <motion.div initial={{ opacity: 0, scale: 0.99, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.99, y: 30 }} className="relative w-full h-[100dvh] sm:h-auto sm:max-h-[85vh] sm:max-w-[1500px] bg-red-gradient-deep border-y sm:border border-[rgba(255,255,255,0.05)] overflow-hidden flex flex-col industrial-texture sm:rounded-sm shadow-[0_0_120px_rgba(0,0,0,0.9)]">
              
              {/* Header */}
              <div className="flex items-center justify-between p-8 sm:p-12 border-b border-[rgba(255,255,255,0.05)] relative z-20">
                <div className="flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-[2px] bg-[var(--color-primary)]" />
                    <span className="font-mono text-[11px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-bold">Registry Code: {selectedProductName ? "Deep Detail X-01" : "Global Distribution"}</span>
                  </div>
                  <h2 className="font-display font-bold text-[38px] sm:text-[56px] text-white leading-[0.8] uppercase italic tracking-tighter">
                    {selectedProductName ? selectedProductName : selectedSystemName} 
                    <span className="text-[var(--color-primary)] ml-6 opacity-80">{selectedProductName ? "Spec" : "Catalog"}</span>
                  </h2>
                </div>

                <div className="flex items-center gap-4 sm:gap-8">
                  {selectedProductName && (
                    <button onClick={() => setSelectedProductName(null)} className="flex items-center gap-4 bg-[var(--color-black-mid)] border border-[rgba(255,255,255,0.1)] px-6 sm:px-10 py-4 text-[var(--color-silver)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-700 group">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="group-hover:-translate-x-2 transition-transform duration-500"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                      <span className="hidden sm:inline font-mono text-[12px] uppercase tracking-widest font-bold">Back</span>
                    </button>
                  )}
                  <button onClick={() => { setSelectedSystemName(null); setSelectedProductName(null) }} className="bg-[var(--color-black-mid)] border border-[var(--color-primary-muted)] p-5 hover:bg-[var(--color-primary)] group transition-all duration-500">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white group-hover:rotate-90 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>

              {/* Secure Scroll Area */}
              <div ref={modalScrollRef} className="flex-1 overflow-y-auto custom-scrollbar pointer-events-auto">
                <AnimatePresence mode="wait">
                  {!selectedProductName ? (
                    <motion.div key="grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.8 }} className="p-8 sm:p-16 lg:p-20 product-card-container">
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12 sm:gap-16">
                        {productData.PRODUCT_REGISTRY[selectedSystemName as keyof typeof productData.PRODUCT_REGISTRY]?.map((prod, idx) => (
                          <div key={prod} onClick={() => setSelectedProductName(prod)} className="product-card group relative bg-[var(--color-black-mid)] border border-[rgba(255,255,255,0.03)] hover:border-[var(--color-primary-muted)] p-10 transition-all duration-700 cursor-pointer overflow-hidden rounded-sm shadow-xl">
                            <div className="relative aspect-[1.1/1] w-full mb-10 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                              <Image src={getProductImage(prod)} alt={prod} fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s]" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent opacity-90" />
                            </div>
                            <span className="font-mono text-[10px] text-[var(--color-primary)] tracking-[0.4em] mb-4 block font-bold">REG: {idx+1}</span>
                            <h3 className="font-display font-semibold text-[20px] text-white uppercase italic leading-tight mb-8 group-hover:text-[var(--color-primary)] transition-colors">{prod}</h3>
                            <div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase text-[var(--color-silver)] opacity-40 tracking-widest font-bold group-hover:opacity-100 transition-opacity">Technical Specs</span><div className="w-20 h-[2px] bg-[var(--color-primary-muted)] group-hover:w-full transition-all duration-1000 origin-left" /></div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="detail" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="p-10 sm:p-24 2xl:p-32">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 xl:gap-48 items-center">
                        <div className="lg:col-span-5 relative perspective-1000">
                          <motion.div initial={{ rotateY: -15, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 1.2 }} className="relative aspect-square w-full rounded-sm overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-[0_40px_100px_rgba(0,0,0,0.7)] group">
                            <Image src={getProductImage(selectedProductName)} alt={selectedProductName} fill className="object-cover group-hover:scale-110 transition-transform duration-[4s]" />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--color-white)]/5 to-[var(--color-black)]/50" />
                          </motion.div>
                          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[var(--color-primary)] flex items-center justify-center text-white font-display text-[32px] font-bold italic rotate-12 shadow-2xl z-10 select-none">XINDO</div>
                          <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-[var(--color-primary)] opacity-40" />
                        </div>

                        <div className="lg:col-span-7 flex flex-col">
                          <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-[2.5px] bg-[var(--color-primary)]" />
                            <span className="font-mono text-[12px] text-[var(--color-primary)] uppercase tracking-[0.7em] font-bold">Metric-Spec Distribution Matrix</span>
                          </div>
                          <h3 className="font-display font-bold text-[56px] lg:text-[72px] text-white leading-[0.85] uppercase italic mb-20 tracking-tighter">Performance Architecture</h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-16 gap-x-20 mb-24">
                            {Object.entries(getProductSpecs(selectedProductName)).map(([label, value], i) => (
                              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i*0.1) }} className="flex flex-col border-l-2 border-[var(--color-primary-muted)] pl-10 group cursor-default">
                                <span className="font-mono text-[11px] uppercase text-[var(--color-silver)] opacity-40 tracking-widest mb-4 group-hover:text-[var(--color-primary)] group-hover:opacity-100 transition-all font-bold">{label}</span>
                                <span className="text-white font-display text-[26px] font-semibold italic group-hover:translate-x-3 transition-transform duration-700">{value}</span>
                              </motion.div>
                            ))}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-8">
                            <button className="flex-1 bg-[var(--color-primary)] text-white font-mono text-[13px] uppercase tracking-[0.4em] py-7 px-12 hover:bg-white hover:text-black transition-all duration-700 font-bold shadow-[0_20px_50px_rgba(200,16,46,0.3)]">Request Detail Specification</button>
                            <button className="flex-1 bg-transparent border border-[rgba(255,255,255,0.15)] text-white font-mono text-[13px] uppercase tracking-[0.4em] py-7 px-12 hover:border-[var(--color-primary)] transition-all duration-700 font-bold">Download BIM Repository</button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Secure Footer Status */}
              <div className="px-12 py-8 bg-[var(--color-black-mid)] border-t border-[rgba(255,255,255,0.05)] flex flex-wrap items-center justify-between gap-12 relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-16 font-mono text-[11px] tracking-[0.4em] text-[var(--color-silver)] opacity-30">
                  <span className="flex items-center gap-4"><div className="w-3 h-3 rounded-full bg-[var(--color-primary)] animate-pulse" /> ENCRYPTED REGISTRY ARCHIVE: 2026.04-V4.2</span>
                  <span className="hidden xl:inline">PERFORMANCE CERTIFICATION: DIN 18055 / ASTM E-REG</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[11px] text-[var(--color-primary)] font-bold tracking-[0.5em] uppercase opacity-70">Monitor Nominal</span>
                  <div className="w-32 h-[5px] bg-[var(--color-black-light)] rounded-full overflow-hidden">
                    <motion.div animate={{ x: [-120, 120] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="w-16 h-full bg-[var(--color-primary)] shadow-[0_0_15px_var(--color-primary)]" />
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
