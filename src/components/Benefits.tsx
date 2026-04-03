'use client'
 
import { useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import { WPBenefitsData } from '@/lib/wp-types'
 
interface BenefitsProps {
  id?: string;
  data: WPBenefitsData;
}
 
export default function Benefits({ id, data }: BenefitsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const tag = data?.tag || ""
  const title = data?.title || ""
  const items = data?.items || []
 
  useGSAP(() => {
    if (!containerRef.current) return
 
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    })
 
    tl.fromTo('.benefit-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: 'luxurious' }
    )
  }, { scope: containerRef })
 
  return (
    <section 
      id={id}
      ref={containerRef}
      className="relative py-32 md:py-48 bg-[var(--color-black-mid)] overflow-hidden industrial-texture"
    >
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-6 md:px-16 relative z-10">
        
        <div className="flex flex-col gap-10 mb-24 md:mb-32">
          <div className="flex items-center gap-6">
            <div className="w-12 h-[1px] bg-[var(--color-primary)]" />
            <span className="font-mono text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">{tag}</span>
          </div>
          <h2 className="font-display font-black text-[32px] md:text-[52px] lg:text-[72px] text-white leading-[0.95] uppercase italic tracking-tighter">
            {title}
          </h2>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/5 border border-white/5">
          {items.map((benefit, i) => (
            <div 
              key={i}
              className="benefit-card group relative p-12 bg-[var(--color-black)] hover:bg-[var(--color-black-soft)] transition-all duration-700 min-h-[400px] flex flex-col justify-between"
            >
              <div className="flex flex-col gap-8">
                <span className="font-mono text-[11px] text-[var(--color-primary)] font-black opacity-40">ITEM_{benefit.id}</span>
                <div className="flex flex-col">
                  <span className="font-mono text-[12px] uppercase text-[var(--color-silver)] tracking-[0.3em] font-bold opacity-30 group-hover:opacity-60 transition-opacity">{benefit.label}</span>
                  <h3 className="font-display font-black text-[36px] md:text-[44px] text-white leading-none uppercase italic mt-2 group-hover:text-[var(--color-primary)] transition-colors">{benefit.value}</h3>
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <p className="font-sans font-medium text-[14px] text-[var(--color-silver)] uppercase tracking-widest leading-relaxed opacity-40 group-hover:opacity-100 transition-opacity italic">
                  {benefit.detail}
                </p>
                <div className="w-0 h-[2px] bg-[var(--color-primary)] group-hover:w-full transition-all duration-1000" />
              </div>
 
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-[var(--color-primary)]"><path d="M7 17L17 7M17 17V7H7" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(200,16,46,0.02)_0%,transparent_70%)] pointer-events-none" />
    </section>
  )
}
