'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import Image from 'next/image'

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !leftColRef.current || !rightColRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    })

    tl.fromTo(leftColRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'luxurious' }
    )
    tl.fromTo(rightColRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'luxurious' },
      "-=0.6"
    )

    return () => { tl.kill() }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="bg-[var(--color-black-mid)] py-[64px] md:py-[120px] px-6 md:px-12 w-full relative overflow-hidden" 
      data-section-id="02"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[60%_1fr] gap-16 md:gap-24 items-center">
        
        {/* Content Column */}
        <div ref={leftColRef} className="flex flex-col opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
            <span className="font-mono text-[11px] uppercase text-[var(--color-red)] tracking-[0.18em]">Who We Are</span>
            <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
          </div>

          <h2 className="font-display font-normal text-[30px] md:text-[42px] leading-[1.25] tracking-[-0.01em] text-[var(--color-white)] mb-8 max-w-[600px]">
            Leading uPVC Manufacturer — Built on an Indo-German Legacy
          </h2>

          <p className="font-sans font-normal text-[15px] md:text-[16px] leading-[1.6] text-[var(--color-silver)] max-w-[560px] mb-6">
            Xindo Window Pvt. Ltd. represents the pinnacle of fenestration engineering, combining German technological precision with a profound understanding of Indian architectural needs. We don't just manufacture windows; we craft precise architectural thresholds that elevate the spaces they enclose.
          </p>

          <p className="font-sans font-normal text-[15px] md:text-[16px] leading-[1.6] text-[var(--color-silver)] max-w-[560px] mb-10">
            Our strategic Indo-German partnership ensures every profile meets stringent global standards for thermal insulation, security, and durability. From survey to installation within 4 days of site arrival, our process is as engineered as our products.
          </p>

          <button 
            className="group flex items-center text-[var(--color-mist)] hover:text-[var(--color-white)] transition-colors duration-300 w-fit"
            data-cursor="link"
          >
            <span className="font-sans font-light uppercase text-[12px] tracking-widest mr-3">Company Profile</span>
            <span className="w-12 h-px bg-[var(--color-red)] group-hover:w-16 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <svg className="w-4 h-4 -ml-1 text-[var(--color-red)] transition-transform group-hover:translate-x-2 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

        {/* Visual Column */}
        <div ref={rightColRef} className="relative w-full aspect-[4/5] opacity-0 mt-8 md:mt-0">
          {/* Decorative Corner Brackets */}
          <div className="absolute top-0 left-0 w-[40px] h-[40px] border-t border-l border-[var(--color-red)] opacity-50 z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[40px] h-[40px] border-t border-r border-[var(--color-red)] opacity-50 z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[40px] h-[40px] border-b border-l border-[var(--color-red)] opacity-50 z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[40px] h-[40px] border-b border-r border-[var(--color-red)] opacity-50 z-20 pointer-events-none" />

          {/* Image Container */}
          <div className="absolute inset-4 bg-[var(--color-black)] z-10 overflow-hidden">
            {/* Real image goes here: <Image src="/about-factory.jpg" fill className="object-cover opacity-80" alt="Factory" /> */}
            <div className="w-full h-full bg-[#111114]" />
          </div>

          {/* Floating Badge */}
          <div className="absolute -left-4 md:-left-12 -bottom-6 z-30 bg-[#111114] border border-[rgba(200,16,46,0.25)] p-6 shadow-2xl flex items-center gap-4">
            <span className="font-mono text-[36px] md:text-[48px] text-[var(--color-red)] leading-none">10</span>
            <span className="font-sans uppercase text-[11px] tracking-widest text-[var(--color-silver)] leading-tight max-w-[80px]">
              Year Warranty
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
