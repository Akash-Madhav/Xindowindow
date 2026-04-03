'use client'
 
import React, { useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { WPExperienceCenterData } from '@/lib/wp-types'

interface ExperienceCenterProps {
  id?: string;
  data?: WPExperienceCenterData;
}
 
export default function ExperienceCenter({ 
  id = "experience-center",
  data
}: ExperienceCenterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const flareRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<(HTMLDivElement | null)[]>([])

  // Fallbacks are now handled by the server component passing data, 
  // but we keep local mapping for safety.
  const tag = data?.tag || ""
  const title1 = data?.title1 || ""
  const title2 = data?.title2 || ""
  const description = data?.description || ""
  const stats = data?.stats || []
  const ctaText = data?.ctaText || ""
  const bgImage = data?.image || ""
  const watermark = data?.watermark || ""
  const ambientLabel = data?.ambientLabel || ""
 
  useGSAP(() => {
    if (!containerRef.current) return
 
    // Image Parallax & Scale
    gsap.fromTo(imageRef.current,
      { scale: 1.2, y: '5%' },
      { 
        scale: 1, 
        y: '-5%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    )
 
    // Content Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      }
    })
 
    tl.fromTo(contentRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'luxurious' }
    )
 
    tl.fromTo(statsRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power4.out' },
      "-=0.8"
    )
 
    // Lens Flare Interaction
    gsap.to(flareRef.current, {
      x: '20%',
      opacity: 0.4,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    })
 
  }, { scope: containerRef })
 
  return (
    <section 
      id={id}
      ref={containerRef}
      className="relative w-full min-h-screen bg-[var(--color-black)] flex items-center justify-center overflow-hidden industrial-texture"
    >
      {/* Background Cinematic Asset */}
      <div className="absolute inset-0 z-0">
        <div ref={imageRef} className="relative w-full h-full">
           <Image 
            src={bgImage}
            alt="Xindo Experience Center"
            fill
            className="object-cover grayscale-[0.4] contrast-[1.2] brightness-[0.7]"
          />
        </div>
        {/* Elite Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-black)] via-[rgba(9,9,11,0.5)] to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-[var(--color-black)] z-10" />
 
        {/* Dynamic Lens Flare */}
        <div 
          ref={flareRef}
          className="absolute top-1/4 -left-1/4 w-[150%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(200,16,46,0.15)_0%,transparent_70%)] opacity-0 z-20 blur-[100px] pointer-events-none" 
        />
      </div>
 
      <div className="max-w-[1400px] 2xl:max-w-[1800px] w-full mx-auto px-6 md:px-16 relative z-30">
        <div className="max-w-[850px] 2xl:max-w-[1100px]" ref={contentRef}>
          
          <div className="flex items-center gap-6 mb-12 opacity-80">
            <div className="w-16 h-[1.5px] bg-[var(--color-primary)]" />
            <span className="font-mono text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">{tag}</span>
          </div>
 
          <h2 className="font-display font-black text-[48px] md:text-[88px] xl:text-[112px] 2xl:text-[144px] text-white leading-[0.85] uppercase italic mb-12 tracking-tighter">
            {title1} <br />
            <span className="text-[var(--color-primary)]">{title2}</span>
          </h2>
 
          <p className="font-sans text-[17px] md:text-[22px] 2xl:text-[28px] text-[var(--color-silver)] leading-relaxed mb-16 max-w-2xl border-l-[3px] border-[var(--color-primary)] pl-12 opacity-70 italic font-medium">
            {description}
          </p>
 
          {/* Tech Spec Grid */}
          <div className="flex flex-wrap gap-12 md:gap-24 mb-20">
            {stats.map((f, i) => (
              <div 
                key={i} 
                ref={el => { statsRef.current[i] = el }}
                className="flex flex-col gap-3 group opacity-0"
              >
                <span className="text-[var(--color-primary)] font-display text-[28px] md:text-[36px] 2xl:text-[48px] font-black italic tracking-tighter transition-all group-hover:translate-x-3">{f.value}</span>
                <span className="text-[var(--color-silver)] font-mono text-[9px] 2xl:text-[11px] uppercase tracking-[0.4em] opacity-40 font-bold">{f.label}</span>
              </div>
            ))}
          </div>
 
          <button 
            className="group relative bg-[var(--color-primary)] text-white font-sans text-[12px] font-black uppercase tracking-[0.4em] py-7 px-16 shadow-primary active:scale-95 transition-transform overflow-hidden"
            data-cursor-button="true"
          >
            <span className="relative z-10 flex items-center gap-6">
              {ctaText}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="group-hover:translate-x-4 transition-transform duration-500"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-[1.2s] ease-in-out" />
          </button>
 
        </div>
      </div>
 
      {/* Absolute Geometric Watermark */}
      <div className="absolute bottom-20 right-20 hidden xl:block opacity-[0.05] pointer-events-none select-none">
        <div className="flex flex-col items-end">
           <span className="font-display text-[120px] leading-none font-black italic">{watermark}</span>
           <span className="font-mono text-[14px] tracking-[1em] mr-[-1em]">{ambientLabel}</span>
        </div>
      </div>
    </section>
  )
}
