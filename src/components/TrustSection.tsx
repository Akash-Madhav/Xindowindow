'use client'
 
import React, { useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import { WPTrustSectionData } from '@/lib/wp-types'

interface TrustSectionProps {
  data?: WPTrustSectionData;
}
 
export default function TrustSection({ data }: TrustSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Fallbacks are now data-driven
  const tag = data?.tag || ""
  const title1 = data?.title1 || ""
  const title2 = data?.title2 || ""
  const logos = data?.logos || []
  const certifications = data?.certifications || []
  const efficiencyMetric = data?.efficiencyMetric || ""
  const protocolMetric = data?.protocolMetric || ""
  const validationTag = data?.validationTag || ""
  const uptimeLabel = data?.uptimeLabel || ""
  const protocolLabel = data?.protocolLabel || ""
 
  useGSAP(() => {
    if (!containerRef.current) return
 
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    })
 
    tl.fromTo('.partner-box', 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, stagger: 0.08, duration: 1, ease: 'power4.out' }
    )
 
    tl.fromTo('.cert-item',
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'luxurious' },
      "-=0.6"
    )
  }, { scope: containerRef })
 
  return (
    <section 
      ref={containerRef}
      className="relative py-32 md:py-48 bg-[var(--color-black)] overflow-hidden industrial-texture"
    >
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32">
          
          {/* Partners Column - 7 Cols */}
          <div className="lg:col-span-7 flex flex-col gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-[1px] bg-[var(--color-primary)]" />
                <span className="font-mono text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">{tag}</span>
              </div>
              <h2 className="font-display font-black text-[32px] md:text-[44px] lg:text-[52px] xl:text-[64px] text-white leading-[0.95] uppercase italic tracking-tight">
                {title1} <br />
                <span className="text-[var(--color-primary)]">{title2}</span>
              </h2>
            </div>
 
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/5 border border-white/5">
              {logos.map((client: any, i: number) => (
                <div 
                  key={i} 
                  className="partner-box group relative aspect-video flex flex-col items-center justify-center bg-[var(--color-black)] hover:bg-[var(--color-black-soft)] transition-all duration-700 p-8 overflow-hidden"
                >
                  <span className="font-display font-black text-[12px] md:text-[14px] text-white tracking-[0.4em] uppercase opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">{client.name}</span>
                  <span className="font-mono text-[8px] uppercase text-[var(--color-primary)] tracking-widest opacity-0 group-hover:opacity-60 mt-4 transition-opacity">{client.detail}</span>
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0 transition-all duration-1000" />
                </div>
              ))}
            </div>
          </div>
 
          {/* Certifications Column - 5 Cols */}
          <div className="lg:col-span-5 flex flex-col gap-16">
            <div className="flex items-center gap-6">
              <div className="w-12 h-[1px] bg-[var(--color-primary)]" />
              <span className="font-mono text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">{validationTag}</span>
            </div>
 
            <div className="flex flex-col gap-8">
              {certifications.map((cert: any, i: number) => (
                <div
                  key={i}
                  className="cert-item group relative p-10 bg-[var(--color-black-soft)] border-l-2 border-[var(--color-primary)] transition-all duration-500 hover:pl-14"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[var(--color-primary)] font-black opacity-40">PRTCL-{cert.id}</span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    </div>
                    <h3 className="font-display font-black text-[24px] md:text-[32px] text-white leading-none uppercase italic tracking-tighter group-hover:text-[var(--color-primary)] transition-colors">{cert.name}</h3>
                    <p className="font-sans font-medium text-[13px] md:text-[15px] text-[var(--color-silver)] uppercase tracking-widest opacity-40 group-hover:opacity-80 transition-opacity">{cert.detail}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
 
            {/* Efficiency Mark */}
            <div className="mt-auto pt-16 border-t border-white/5 flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="font-display text-[48px] font-black text-white italic leading-none">{efficiencyMetric}</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-silver)] opacity-30 mt-2">{uptimeLabel}</span>
               </div>
               <div className="w-[1px] h-12 bg-white/10" />
               <div className="flex flex-col text-right">
                  <span className="font-display text-[48px] font-black text-white italic leading-none">{protocolMetric}</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-silver)] opacity-30 mt-2">{protocolLabel}</span>
               </div>
            </div>
          </div>
 
        </div>
      </div>
 
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(200,16,46,0.03)_0%,transparent_70%)] pointer-events-none" />
    </section>
  )
}
