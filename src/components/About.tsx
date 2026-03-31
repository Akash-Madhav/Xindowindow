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
  tag = "Manufacturing Core", 
  title, 
  description1, 
  description2, 
  image, 
  badgeText = "Year Technical Warranty", 
  badgeNumber = "10",
  reverse = false 
}: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<(HTMLDivElement | null)[]>([])
 
  useGSAP(() => {
    if (!containerRef.current) return
 
    // Image Parallax
    gsap.to(imageWrapperRef.current, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
 
    // Content Staggered Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    })
 
    tl.fromTo(contentRef.current, 
      { x: reverse ? 50 : -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'luxurious' }
    )
 
    tl.fromTo(statsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power4.out' },
      "-=0.8"
    )
  }, { scope: containerRef })
 
  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[var(--color-black)] py-32 md:py-48 px-6 md:px-16 overflow-hidden industrial-texture"
      data-section-id={id}
    >
      <div className={`max-w-[1400px] 2xl:max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center`}>
        
        {/* Visual Column - Spans 7 cols */}
        <div 
          className={`lg:col-span-7 relative ${reverse ? 'lg:order-2' : ''}`}
        >
          <div 
            ref={imageWrapperRef}
            className="relative aspect-[16/10] w-full overflow-hidden border border-white/5 shadow-2xl"
          >
            <Image 
              src={image || "/images/about-factory.png"} 
              fill 
              sizes="60vw" 
              className="object-cover grayscale-[0.3] contrast-[1.1] hover:grayscale-0 transition-all duration-[2s]" 
              alt={title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-60" />
          </div>
 
          {/* Technical Badge Overlay */}
          <div className={`absolute -bottom-6 sm:-bottom-10 z-20 bg-[var(--color-black-soft)] border border-[var(--color-primary-muted)] p-6 md:p-14 shadow-3xl flex items-center gap-6 md:gap-10 backdrop-blur-2xl ${reverse ? 'left-4 sm:-left-10' : 'right-4 sm:-right-10'}`}>
            <div className="flex flex-col">
              <span className="font-display text-[48px] md:text-[96px] text-[var(--color-primary)] leading-none font-black italic tracking-tighter">{badgeNumber}</span>
              <span className="font-mono text-[8px] uppercase text-[var(--color-silver)] tracking-[0.3em] font-bold opacity-30 mt-1 md:mt-2">Certified</span>
            </div>
            <div className="w-[1px] h-10 md:h-16 bg-white/10" />
            <span className="font-mono uppercase text-[10px] md:text-[13px] tracking-[0.2em] md:tracking-[0.25em] text-[var(--color-white)] leading-relaxed max-w-[120px] md:max-w-[160px] font-black">
              {badgeText}
            </span>
          </div>
        </div>
 
        {/* Content Column - Spans 5 cols */}
        <div 
          ref={contentRef}
          className={`lg:col-span-5 flex flex-col opacity-0 ${reverse ? 'lg:order-1' : ''}`}
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-[1px] bg-[var(--color-primary)]" />
            <span className="font-mono text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">{tag}</span>
          </div>
 
          <h2 className="font-display font-black text-[42px] md:text-[64px] xl:text-[80px] 2xl:text-[100px] leading-[0.9] tracking-tighter text-[var(--color-white)] mb-12 uppercase italic">
            {title.split(' ').map((word, i) => (
               <span key={i} className={i === 1 ? 'text-[var(--color-primary)]' : ''}>{word} </span>
            ))}
          </h2>
 
          <div className="space-y-10 mb-20">
            <p className="font-sans font-medium text-[16px] md:text-[19px] leading-[1.8] text-[var(--color-silver)] opacity-80">
              {description1}
            </p>
            {description2 && (
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
                <p className="font-sans font-medium text-[16px] md:text-[19px] leading-[1.8] text-[var(--color-silver)] italic opacity-60">
                  {description2}
                </p>
              </div>
            )}
          </div>
 
          {/* Technical Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-10 border-t border-white/5 pt-10 md:pt-14 mb-16 md:mb-20">
            {[
              { label: 'Plant Area', val: '50k sqft' },
              { label: 'Capacity', val: '5k units' },
              { label: 'Standards', val: 'DIN-GER' }
            ].map((m, i) => (
              <div key={i} ref={el => { statsRef.current[i] = el }} className="flex flex-col gap-2 md:gap-3 opacity-0">
                <span className="font-display text-[22px] md:text-[32px] font-black text-[var(--color-white)] tracking-tighter italic">{m.val}</span>
                <span className="font-mono text-[8px] uppercase text-[var(--color-silver)] tracking-widest opacity-40 font-bold">{m.label}</span>
              </div>
            ))}
          </div>
 
          <button 
            className="group flex items-center gap-8 w-fit"
            data-cursor-button="true"
          >
            <div className="w-12 h-12 border border-[var(--color-primary)] rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-[var(--color-primary)]">
               <svg className="w-5 h-5 text-[var(--color-primary)] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <span className="font-sans font-black uppercase text-[12px] tracking-[0.3em] text-white">Full Capabilities</span>
          </button>
        </div>
 
      </div>
 
      {/* Decorative Technical Line */}
      <div className={`absolute top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent ${reverse ? 'right-20' : 'left-20'} hidden xl:block`} />
    </section>
  )
}
