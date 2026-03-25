'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
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

  useGSAP(() => {
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
  }, { scope: containerRef })

  return (
    <section 
      id={id.toLowerCase().replace(/\s+/g, '-')}
      ref={containerRef}
      className={`relative w-full min-h-screen bg-red-gradient py-20 sm:py-32 px-5 sm:px-8 md:px-16 flex items-center overflow-hidden industrial-texture`}
      data-section-id={id}
    >
      <div className={`max-w-[1400px] 2xl:max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
        
        {/* Content Column */}
        <div ref={leftColRef} className={`flex flex-col opacity-0 ${reverse ? 'md:order-2' : ''}`}>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
            <span className="font-mono text-[11px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-medium">{tag}</span>
          </div>

          <h2 className="font-display font-bold text-[36px] sm:text-[48px] md:text-[64px] 2xl:text-[80px] leading-[1.05] tracking-tight text-[var(--color-white)] mb-10 max-w-[720px] uppercase italic">
            {title}
          </h2>

          <div className="space-y-8 mb-16">
            <p className="font-sans font-normal text-[16px] sm:text-[18px] md:text-[20px] leading-[1.7] text-[var(--color-silver)] max-w-[640px] opacity-90">
              {description1}
            </p>
            {description2 && (
              <p className="font-sans font-normal text-[16px] sm:text-[18px] md:text-[20px] leading-[1.7] text-[var(--color-silver)] max-w-[640px] opacity-80 border-l-2 border-[var(--color-primary-muted)] pl-8 italic">
                {description2}
              </p>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 mb-16 border-y border-[var(--color-black-light)] py-12">
            {[
              { label: 'Technical Heritage', val: '15+ Yrs' },
              { label: 'Plant Capacity', val: '50k Units' },
              { label: 'German Standards', val: 'DIN/ISO' }
            ].map((m, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="font-mono text-[24px] md:text-[32px] font-bold text-[var(--color-white)] tracking-tight">{m.val}</span>
                <span className="font-mono text-[9px] uppercase text-[var(--color-silver)] tracking-widest opacity-60 leading-tight">{m.label}</span>
              </div>
            ))}
          </div>

          <button 
            className="group flex items-center text-[var(--color-white)] transition-all duration-300 w-fit"
            data-cursor="link"
          >
            <span className="font-sans font-bold uppercase text-[13px] tracking-[0.25em] mr-6 group-hover:text-[var(--color-primary)] transition-colors">Engineering Dossier</span>
            <div className="relative flex items-center">
              <div className="w-12 h-[2px] bg-[var(--color-primary)] group-hover:w-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <svg className="w-5 h-5 -ml-1 text-[var(--color-primary)] transition-transform group-hover:translate-x-3 duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </button>
        </div>

        {/* Visual Column */}
        <div ref={rightColRef} className={`relative w-full aspect-square opacity-0 ${reverse ? 'md:order-1' : ''}`}>
          {/* Subtle Technical Grid Underlay */}
          <div className="absolute -inset-8 border border-[var(--color-black-light)] z-0 pointer-events-none opacity-40" />
          
          {/* Main Image Container */}
          <div className="absolute inset-0 bg-[var(--color-black-mid)] z-10 overflow-hidden shadow-xl border border-[var(--color-black-light)]">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-60 z-20" />
            {image ? (
               <Image src={image} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-[2.5s] hover:scale-110 contrast-[1.05] grayscale-[0.2]" alt={title} />
            ) : (
               <div className="w-full h-full bg-[var(--color-black-soft)] flex items-center justify-center">
                  <div className="w-24 h-24 border-2 border-[var(--color-primary-muted)] rounded-none animate-pulse rotate-45" />
               </div>
            )}
          </div>

          {/* Technical Badge */}
          <div className="absolute -left-6 md:-left-16 -bottom-8 md:-bottom-12 z-30 bg-[var(--color-black-soft)] border border-[var(--color-black-light)] p-8 md:p-12 shadow-2xl flex items-center gap-8 backdrop-blur-xl">
            <div className="flex flex-col">
              <span className="font-display text-[56px] md:text-[88px] text-[var(--color-primary)] leading-none font-bold italic tracking-tighter">{badgeNumber}</span>
              <span className="font-mono text-[10px] uppercase text-[var(--color-silver)] tracking-[0.3em] font-medium opacity-50 -mt-1">Technical Precision</span>
            </div>
            <span className="font-mono uppercase text-[11px] md:text-[12px] tracking-[0.2em] text-[var(--color-white)] leading-tight max-w-[120px] font-semibold border-l border-[var(--color-primary-muted)] pl-8 py-2">
              {badgeText}
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
