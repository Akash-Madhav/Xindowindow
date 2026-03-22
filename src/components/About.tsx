'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import Image from 'next/image'

interface AboutProps {
  id?: string
  tag?: string
  title: string
  description1: string
  description2?: string
  image?: string
  badgeText?: string
  badgeNumber?: string
  reverse?: boolean
}

export default function About({ 
  id = "02", 
  tag = "Who We Are", 
  title, 
  description1, 
  description2, 
  image, 
  badgeText = "Year Warranty", 
  badgeNumber = "10",
  reverse = false 
}: AboutProps) {
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
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
    )
    tl.fromTo(rightColRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
      "-=0.7"
    )

    return () => { tl.kill() }
  }, [])

  return (
    <section 
      ref={containerRef}
      className={`relative w-full min-h-screen bg-[var(--color-black)] py-20 px-6 md:px-12 flex items-center overflow-hidden`}
      data-section-id={id}
    >
      <div className={`max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
        
        {/* Content Column */}
        <div ref={leftColRef} className={`flex flex-col opacity-0 ${reverse ? 'md:order-2' : ''}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
            <span className="font-mono text-[11px] uppercase text-[var(--color-red)] tracking-[0.25em]">{tag}</span>
          </div>

          <h2 className="font-display font-light text-[36px] md:text-[52px] leading-[1.15] tracking-tight text-[var(--color-white)] mb-10 max-w-[620px]">
            {title}
          </h2>

          <div className="space-y-6 mb-12">
            <p className="font-sans font-light text-[17px] md:text-[18px] leading-[1.7] text-[var(--color-silver)] max-w-[560px]">
              {description1}
            </p>
            {description2 && (
              <p className="font-sans font-light text-[17px] md:text-[18px] leading-[1.7] text-[var(--color-silver)] max-w-[560px]">
                {description2}
              </p>
            )}
          </div>

          <button 
            className="group flex items-center text-[var(--color-white)] transition-colors duration-300 w-fit"
            data-cursor="link"
          >
            <span className="font-sans font-normal uppercase text-[12px] tracking-[0.2em] mr-4">Learn More</span>
            <div className="w-12 h-px bg-[var(--color-red)] group-hover:w-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <svg className="w-5 h-5 -ml-1 text-[var(--color-red)] transition-transform group-hover:translate-x-3 duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

        {/* Visual Column */}
        <div ref={rightColRef} className={`relative w-full aspect-[4/5] md:aspect-square opacity-0 ${reverse ? 'md:order-1' : ''}`}>
          {/* Decorative Elements */}
          <div className="absolute -inset-4 border border-[rgba(255,255,255,0.03)] z-0" />
          
          {/* Main Image Container */}
          <div className="absolute inset-0 bg-[#0A0A0B] z-10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] to-transparent opacity-40 z-20" />
            {image ? (
               <Image src={image} fill className="object-cover transition-transform duration-[2s] hover:scale-105" alt={title} />
            ) : (
               <div className="w-full h-full bg-[#111114] flex items-center justify-center">
                  <div className="w-20 h-20 border border-[rgba(200,16,46,0.1)] rounded-full animate-pulse" />
               </div>
            )}
          </div>

          {/* Floating Cinematic Badge */}
          <div className="absolute -left-6 md:-left-12 -bottom-8 md:-bottom-12 z-30 bg-[#0A0A0B] border border-[rgba(200,16,46,0.2)] p-8 md:p-10 shadow-2xl flex items-center gap-6 backdrop-blur-xl">
            <span className="font-display text-[48px] md:text-[64px] text-[var(--color-red)] leading-none font-light">{badgeNumber}</span>
            <span className="font-sans uppercase text-[11px] tracking-[0.2em] text-[var(--color-silver)] leading-relaxed max-w-[100px]">
              {badgeText}
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
