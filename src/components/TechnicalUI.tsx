'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import productData from '@/data/product-registry.json'

const { CATEGORIES, PRODUCT_REGISTRY } = productData as { 
  CATEGORIES: { id: string, name: string, tag: string, description: string }[], 
  PRODUCT_REGISTRY: Record<string, string[]> 
}

export default function TechnicalUI() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handleCategoryClick = (catName: string) => {
    setActiveCategory(activeCategory === catName ? null : catName)
    setSelectedProduct(null)
  }

  const activeCategoryData = CATEGORIES.find(c => c.name === activeCategory)

  return (
    <section className="relative bg-red-gradient py-24 sm:py-32 px-5 sm:px-8 md:px-16 flex flex-col items-center industrial-texture overflow-hidden min-h-[800px]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-16">
        <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
        <span className="font-mono text-[11px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-medium italic">Product Registry 1.0</span>
        <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 items-start justify-center">
        {/* Left: Category Selector (Uiverse Component) */}
        <div className="flex flex-col gap-8 shrink-0">
          <div className="max-w-[300px]">
            <h2 className="font-display font-bold text-[32px] md:text-[44px] text-white leading-[0.9] uppercase italic mb-6 tracking-tighter">
              {activeCategory ? (
                <>
                  {activeCategory.split(' ')[0]} <br />
                  <span className="text-[var(--color-primary)]">{activeCategory.split(' ').slice(1).join(' ')}</span>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-12 h-[2px] bg-[var(--color-primary)]" />
                    <span className="font-mono text-[12px] text-white tracking-[0.2em] font-bold not-italic">
                      {PRODUCT_REGISTRY[activeCategory]?.length || 0} SYSTEMS REGISTERED
                    </span>
                  </div>
                </>
              ) : (
                <>
                  Precision <br /> 
                  <span className="text-[var(--color-primary)]">Inventory</span>
                </>
              )}
            </h2>

            <p className="font-sans text-[14px] text-[var(--color-silver)] opacity-60 leading-relaxed border-l border-[var(--color-primary-muted)] pl-6 min-h-[60px]">
              {activeCategoryData ? activeCategoryData.description : "Select a technical category to deploy its specific engineering registry. Millimetric data for professional deployment."}
            </p>
          </div>

          {/* Interactive Categories (Modified Uiverse Card) */}
          <div className="flex gap-[6px] p-[0.6em] bg-[var(--color-black-soft)] border border-[var(--color-black-light)] rounded-[2px] w-full sm:w-[320px] h-[320px] sm:h-[380px]">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                className={`relative flex items-center justify-center cursor-pointer overflow-hidden rounded-[2px] border border-[rgba(var(--primary-rgb),0.3)] bg-[var(--color-black-mid)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${activeCategory === cat.name ? 'flex-[6] border-[var(--color-primary)] bg-[rgba(var(--primary-rgb),0.05)] shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]' : 'flex-1 hover:flex-[6] hover:border-[var(--color-primary)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]'}
                `}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <span className={`panel-text min-w-[20em] p-[0.5em] text-center uppercase text-[var(--color-primary)] font-mono text-[10px] font-[700] whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${activeCategory === cat.name ? 'rotate-0 opacity-100 tracking-[0.25em]' : 'rotate-[-90deg] opacity-60 tracking-[0.15em] group-hover:rotate-0 group-hover:opacity-100 group-hover:tracking-[0.25em]'}
                `}>
                  {cat.name} ({PRODUCT_REGISTRY[cat.name]?.length || 0})
                </span>
                
                {activeCategory === cat.name && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--color-primary)] rounded-full shadow-[0_0_10px_var(--color-primary)]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Grid (Rectangular Cards) */}
        <div className="flex-1 w-full min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {activeCategory ? (
              <motion.div 
                key={activeCategory}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6"
              >
                {PRODUCT_REGISTRY[activeCategory].map((prod, idx) => (
                  <motion.div 
                    key={prod}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="group relative bg-[var(--color-black-mid)] border border-[var(--color-black-light)] hover:border-[var(--color-primary-muted)] p-6 cursor-pointer transition-all duration-500 overflow-hidden"
                    onClick={() => setSelectedProduct(prod)}
                  >
                    {/* Subtle Background Mark */}
                    <div className="absolute top-2 right-2 font-mono text-[10px] opacity-10 group-hover:opacity-30 transition-opacity uppercase italic">
                      SYSTEM {idx + 1}
                    </div>
                    
                    {/* Image Area (Placeholder for premium window image) */}
                    <div className="w-full h-40 bg-[var(--color-black)] mb-6 flex items-center justify-center overflow-hidden border border-[var(--color-black-light)] group-hover:border-[var(--color-primary-muted)] transition-colors">
                      <div className="relative w-full h-full opacity-40 group-hover:opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700">
                        <Image 
                          src={`https://images.unsplash.com/photo-1510000218930-bc500989047b?auto=format&fit=crop&q=80&w=400&v=${idx}`} 
                          alt={prod}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                        />
                      </div>
                    </div>

                    <h3 className="font-display font-semibold text-[15px] text-white uppercase italic leading-tight group-hover:text-[var(--color-primary)] transition-colors tracking-tight">
                      {prod}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[var(--color-silver)] opacity-40 uppercase tracking-widest group-hover:opacity-100 transition-opacity">Certified Unit</span>
                      <div className="w-8 h-[1px] bg-[var(--color-primary-muted)] group-hover:w-12 transition-all duration-500" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                className="w-full h-full border border-dashed border-[var(--color-black-light)] rounded-sm flex items-center justify-center p-20 text-center"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border border-[var(--color-primary-muted)] rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full" />
                  </div>
                  <p className="font-mono text-[12px] uppercase tracking-[0.3em] font-medium text-[var(--color-silver)]">System Idle — Select Category</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[var(--color-black)]/90 backdrop-blur-xl"
              onClick={() => setSelectedProduct(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[1000px] bg-red-gradient-deep border border-[var(--color-primary-muted)] p-8 sm:p-16 industrial-texture overflow-hidden"
            >
              <button 
                className="absolute top-8 right-8 text-[var(--color-silver)] hover:text-white transition-colors p-2 z-10"
                onClick={() => setSelectedProduct(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 items-center">
                <div className="relative aspect-[4/3] w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1510000218930-bc500989047b?auto=format&fit=crop&q=80&w=800" 
                    alt={selectedProduct}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover border border-[var(--color-black-light)]"
                  />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[var(--color-primary)] flex items-center justify-center text-white font-display text-[24px] font-bold italic rotate-12 z-10">
                    XINDO
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-[var(--color-primary)] uppercase tracking-[0.5em] mb-4">Product Specification</span>
                  <h2 className="font-display font-bold text-[28px] sm:text-[40px] text-white leading-tight uppercase italic mb-8 tracking-tighter">
                    {selectedProduct}
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    <div>
                      <h4 className="font-mono text-[9px] uppercase text-[var(--color-silver)] opacity-50 mb-1 tracking-widest">Acoustic Rating</h4>
                      <p className="text-[15px] font-semibold text-white">42 dB Reduction</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[9px] uppercase text-[var(--color-silver)] opacity-50 mb-1 tracking-widest">U-Value</h4>
                      <p className="text-[15px] font-semibold text-white">1.1 W/m²K</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[9px] uppercase text-[var(--color-silver)] opacity-50 mb-1 tracking-widest">Wind Pressure</h4>
                      <p className="text-[15px] font-semibold text-white">3500 Pa</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[9px] uppercase text-[var(--color-silver)] opacity-50 mb-1 tracking-widest">Water Tightness</h4>
                      <p className="text-[15px] font-semibold text-white">Class 9A</p>
                    </div>
                  </div>

                  <button className="bg-[var(--color-primary)] text-white font-mono text-[11px] uppercase tracking-[0.3em] py-5 px-10 hover:bg-white hover:text-black transition-all duration-500 font-bold self-start">
                    Request Technical Data
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>

  )
}
