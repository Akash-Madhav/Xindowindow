'use client'
 
import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
 
interface AboutProps {
  id?: string;
  tag: string;
  title: string;
  description1: string;
  description2?: string;
  badgeNumber?: string;
  badgeText?: string;
  badgeStatusLabel?: string;
  ctaLabel?: string;
  reverse?: boolean;
  image: string;
  stats?: { id: string; label: string; value: string; detail: string }[];
}
 
export default function About({ 
  id, 
  tag, 
  title, 
  description1, 
  description2, 
  badgeNumber, 
  badgeText, 
  badgeStatusLabel = "PHASE_VALIDATED",
  ctaLabel = "TECHNICAL PORTFOLIO",
  reverse = false,
  image,
  stats
}: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
 
  useGSAP(() => {
    if (!containerRef.current) return
 
    // Image Parallax
    gsap.to(imageRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })
 
    // Text Stagger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    })
 
    tl.from(".about-animate", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "luxurious"
    })
  }, { scope: containerRef })
 
  return (
    <section id={id} ref={containerRef} className="relative py-24 md:py-48 overflow-hidden bg-[var(--color-black)]">
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-6 md:px-16 flex flex-col md:flex-row gap-20 items-start">
        
        {/* Visual Engine */}
        <div className={`relative w-full md:w-1/2 overflow-hidden aspect-[4/5] sm:aspect-square md:aspect-[4/5] ${reverse ? 'md:order-last' : ''}`}>
          <div ref={imageRef} className="absolute inset-0 scale-110">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-40" />
          
          {/* Engineering Badge */}
          {badgeNumber && (
            <div className="absolute bottom-10 right-10 z-20 backdrop-blur-xl bg-white/5 border border-white/10 p-8 md:p-12 min-w-[200px] sm:min-w-[280px]">
              <span className="font-mono text-[10px] text-[var(--color-primary)] mb-4 block uppercase tracking-[0.3em] font-black">{badgeStatusLabel}</span>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-[48px] md:text-[84px] text-white font-black leading-none italic">{badgeNumber}</span>
                <span className="font-mono text-[11px] sm:text-[13px] text-[var(--color-silver)] uppercase tracking-widest leading-tight w-[100px] font-bold">{badgeText}</span>
              </div>
            </div>
          )}
        </div>
 
        {/* Narrative Engine */}
        <div className="w-full md:w-1/2 pt-10">
          <div className="flex flex-col gap-10 md:gap-14">
            <div className="about-animate flex items-center gap-6">
              <div className="w-12 h-[1px] bg-[var(--color-primary)]" />
              <span className="font-mono text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">{tag}</span>
            </div>
 
            <h2 className="about-animate font-display font-black text-[36px] md:text-[56px] lg:text-[84px] text-white leading-[0.9] uppercase italic tracking-tighter">
              {title}
            </h2>
 
            <div className="about-animate flex flex-col gap-8">
              <p className="font-sans font-medium text-[16px] md:text-[18px] text-[var(--color-silver)] leading-relaxed max-w-[580px] opacity-80">
                {description1}
              </p>
              {description2 && (
                <p className="font-sans text-[14px] md:text-[15px] text-[var(--color-silver)]/60 leading-relaxed max-w-[500px] italic">
                  {description2}
                </p>
              )}
            </div>
 
            {/* Dynamic Stats Hub */}
            {stats && (
              <div className="about-animate grid grid-cols-2 gap-8 md:gap-16 pt-8 border-t border-white/5">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex flex-col gap-3">
                    <span className="font-mono text-[9px] text-[var(--color-primary)] opacity-40 uppercase tracking-[0.4em] font-black">{stat.label}</span>
                    <div className="flex items-baseline gap-3">
                       <span className="font-display text-[32px] md:text-[44px] text-white font-black italic">{stat.value}</span>
                       <span className="font-mono text-[10px] text-[var(--color-silver)] uppercase">{stat.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="about-animate pt-8">
               <button className="group relative pr-16 flex items-center gap-4 py-4 hover:pr-20 transition-all duration-500 overflow-hidden">
                 <span className="font-mono text-[12px] uppercase text-white tracking-[0.3em] font-bold">{ctaLabel}</span>
                 <div className="absolute right-0 w-8 h-[2px] bg-[var(--color-primary)] group-hover:w-full transition-all duration-700" />
               </button>
            </div>
          </div>
        </div>
      </div>
 
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-full bg-[radial-gradient(circle_at_70%_30%,rgba(200,16,46,0.03)_0%,transparent_70%)] pointer-events-none" />
    </section>
  )
}
