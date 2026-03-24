'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const decLineRef = useRef<HTMLDivElement>(null)
  

  useGSAP(() => {
    // Entrance animation for text - immediate after preloader
    const tl = gsap.timeline({ delay: 0.2 })
    
    if (line1Ref.current && line2Ref.current) {
      tl.fromTo([line1Ref.current, line2Ref.current],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out' }
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
      className="relative w-full h-[100svh] bg-[var(--color-black)] overflow-hidden flex items-center justify-center text-center industrial-texture"
      data-section-id="01"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image 
            src="/images/hero-bg.png" 
            alt="Xindo Industrial Architecture" 
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale-[0.2] contrast-[1.1]"
          />
        </motion.div>
        {/* Technical Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-black)] via-[rgba(9,9,11,0.4)] to-[var(--color-black)] z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,16,46,0.03)_0%,transparent_70%)] z-1" />
      </div>

      <div className="w-full max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 sm:px-8 md:px-16 z-20 relative flex flex-col items-center">
        
        {/* Label Chip */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }} className="mb-4 sm:mb-8"
        >
          <div className="px-5 py-2 rounded-full border border-[var(--color-red-muted)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[12px] flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase text-[var(--color-off-white)] tracking-[0.4em]">
              German Engineering Excellence
            </span>
          </div>
        </motion.div>

        {/* Text Group */}
        <div className="flex flex-col items-center">
          <h1 className="font-display font-bold text-[36px] sm:text-[64px] lg:text-[100px] xl:text-[120px] 2xl:text-[156px] 3xl:text-[180px] tracking-[-0.05em] text-[var(--color-white)] leading-[0.9] flex flex-col items-center uppercase italic">
            <div ref={line1Ref} className="overflow-hidden">Engineering</div>
            <div ref={line2Ref} className="text-[var(--color-red)] overflow-hidden">The Future</div>
          </h1>

          {/* Technical Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }} 
            className="mt-6 sm:mt-10 lg:mt-12 max-w-[500px] lg:max-w-[700px] 2xl:max-w-[820px] 3xl:max-w-[1000px] font-sans font-normal text-[14px] sm:text-[16px] lg:text-[18px] 2xl:text-[22px] 3xl:text-[26px] leading-[1.6] text-[var(--color-silver)] px-6 sm:px-0 opacity-80"
          >
            Defining the benchmark for high-value infrastructure through premium uPVC systems. Crafted with German technical precision for India&apos;s leading architectural projects.
          </motion.p>

          {/* Primary Action Group */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8 sm:mt-14 lg:mt-16 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 lg:gap-14 w-full sm:w-auto"
          >
            <button 
              className="group relative overflow-hidden px-10 py-4 sm:px-12 sm:py-5 lg:px-14 bg-[var(--color-red)] text-[var(--color-white)] transition-all duration-500 w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] shadow-red"
              data-cursor-button="true"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              <span className="relative z-10 font-sans uppercase text-[12px] sm:text-[13px] tracking-[0.25em] font-bold">Inquire Project</span>
            </button>
            <Link 
              href="/contact"
              className="group flex items-center justify-center text-[var(--color-silver)] hover:text-[var(--color-white)] transition-all duration-300 w-[80%] sm:w-auto border-b border-transparent hover:border-[var(--color-red)] py-2"
              data-cursor="link"
            >
              <span className="font-sans font-semibold uppercase text-[11px] sm:text-[13px] tracking-[0.2em] mr-4 transition-all">View Specifications</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-2 text-[var(--color-red)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Corporate Confidence Strip */}
      <div className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-0 w-full px-5 sm:px-12 z-20 flex justify-center items-end overflow-hidden gap-6 sm:gap-12 lg:gap-20 2xl:gap-32">
        {[
          { num: '15+', label: 'Tech Heritage' },
          { num: '5k+', label: 'Units Delivered' },
          { num: 'GS', label: 'German Standard' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 + (i * 0.2), ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="font-mono text-[22px] sm:text-[40px] lg:text-[56px] 2xl:text-[72px] 3xl:text-[90px] text-[var(--color-white)] font-bold tracking-tight leading-none mb-2 tabular-nums">
              {stat.num}
            </div>
            <div className="font-mono text-[8px] sm:text-[10px] lg:text-[11px] 2xl:text-[13px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-medium opacity-60">
              {stat.label}
            </div>
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
