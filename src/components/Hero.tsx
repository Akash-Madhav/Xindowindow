'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const decLineRef = useRef<HTMLDivElement>(null)
  

  useGSAP(() => {
    // Entrance animation for text
    const tl = gsap.timeline({ delay: 0.5 })
    
    if (line1Ref.current && line2Ref.current) {
      tl.fromTo([line1Ref.current, line2Ref.current],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out' }
      )
    }

    if (decLineRef.current) {
      tl.fromTo(decLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'precision' },
        '-=0.8'
      )
    }
  }, { scope: containerRef })

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100svh] bg-[var(--color-black)] overflow-hidden flex items-center justify-center text-center"
      data-section-id="01"
    >
      <div className="w-full max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 sm:px-8 md:px-16 z-20 relative flex flex-col items-center">
        
        {/* Label Chip */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }} className="mb-4 sm:mb-8"
        >
          <div className="px-4 py-2 rounded-full border border-[rgba(200,16,46,0.2)] bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px]">
            <span className="font-mono text-[11px] uppercase text-[var(--color-red)] tracking-[0.3em]">
              Indo-German Excellence
            </span>
          </div>
        </motion.div>

        {/* Text Group */}
        <div className="flex flex-col items-center">
          <h1 className="font-display font-light text-[34px] sm:text-[64px] md:text-[110px] 2xl:text-[140px] tracking-[-0.04em] text-[var(--color-white)] leading-[1.05] flex flex-col items-center">
            <div ref={line1Ref}>The Window &</div>
            <div ref={line2Ref}>Door Experts</div>
          </h1>

          {/* Decorative Line */}
          <div ref={decLineRef} className="h-px w-16 sm:w-32 bg-[var(--color-red)] mt-4 sm:mt-8 origin-center" style={{ transform: 'scaleX(0)' }} />

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }} 
            className="mt-4 sm:mt-8 sm:mt-10 max-w-[560px] 2xl:max-w-[720px] font-sans font-light text-[13px] sm:text-[15px] md:text-[19px] 2xl:text-[22px] leading-[1.65] text-[var(--color-silver)] px-2 sm:px-0"
          >
            Premium uPVC Windows & Doors — engineered with German precision, crafted for India&apos;s finest homes and architectural developments.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-5 sm:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-8 w-full sm:w-auto"
          >
            <button 
              className="group relative overflow-hidden px-8 py-3 sm:px-12 sm:py-4 bg-[var(--color-red)] text-[var(--color-white)] transition-all duration-300 w-full sm:w-auto rounded-full hover:scale-105 shadow-[0_8px_24px_rgba(200,16,46,0.35)]"
              data-cursor-button="true"
            >
              <span className="relative z-10 font-sans uppercase text-[12px] tracking-[0.2em] font-semibold">Explore Collections</span>
            </button>
            <Link 
              href="/contact"
              className="group flex items-center justify-center text-[var(--color-mist)] hover:text-[var(--color-white)] transition-colors duration-300 w-full sm:w-auto"
              data-cursor="link"
            >
              <span className="font-sans font-light uppercase text-[12px] tracking-[0.2em] mr-4 border-b border-transparent group-hover:border-[var(--color-red)] transition-all">Request Quote</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-2 text-[var(--color-red)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="absolute bottom-8 sm:bottom-12 left-0 w-full px-5 sm:px-8 md:px-12 z-20 flex justify-center overflow-x-auto gap-4 md:gap-8 no-scrollbar">
        {[
          { num: '500+', label: 'Projects' },
          { num: '10yr', label: 'Warranty' },
          { num: '200+', label: 'Clients' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.0 + (i * 0.15) }}
            className="flex flex-col items-center min-w-[80px] sm:min-w-[120px]"
          >
            <div className="font-mono text-[16px] sm:text-[24px] md:text-[32px] 2xl:text-[40px] text-[var(--color-red)] tracking-[-0.02em] leading-none mb-1">{stat.num}</div>
            <div className="font-sans text-[10px] uppercase text-[var(--color-silver)] tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Watermark text */}
      <div className="absolute -bottom-10 left-0 w-full pointer-events-none z-0 hidden md:block overflow-visible whitespace-nowrap opacity-[0.03] text-center">
        <span 
          className="font-display font-light text-[240px] leading-none text-transparent tracking-widest"
          style={{ WebkitTextStroke: '1px var(--color-white)' }}
        >
          XINDO
        </span>
      </div>
    </section>
  )
}
