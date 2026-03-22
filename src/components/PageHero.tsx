'use client'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import { useEffect, useRef } from 'react'

interface PageHeroProps {
  title: string
  subtitle: string
  bgText?: string
  image?: string // Placeholder for now
}

export default function PageHero({ title, subtitle, bgText }: PageHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    
    if (titleRef.current) {
      tl.fromTo(titleRef.current, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
      )
    }
    
    if (lineRef.current) {
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'precision' },
        '-=0.8'
      )
    }

    return () => { tl.kill() }
  }, [])

  return (
    <section 
      data-section-id="01"
      className="relative w-full h-[100svh] bg-[var(--color-black)] flex items-center justify-center overflow-hidden text-center"
    >
      {/* Background Cinematic Text */}
      {bgText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <span className="font-display text-[20vw] md:text-[14vw] uppercase tracking-[0.2em] text-white whitespace-nowrap">
            {bgText}
          </span>
        </div>
      )}

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 z-10 pointer-events-none bg-gradient-to-t from-[var(--color-black)] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-1/3 z-10 pointer-events-none bg-gradient-to-b from-[var(--color-black)] to-transparent" />

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="px-4 py-2 rounded-full border border-[rgba(200,16,46,0.2)] bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px]">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[var(--color-red)]">
              Xindo / {title}
            </span>
          </div>
        </motion.div>
        
        <h1 
          ref={titleRef}
          className="font-display font-light text-[56px] md:text-[110px] text-white tracking-tight leading-[1.05] flex flex-col items-center"
        >
          {title}
        </h1>
        
        <div 
          ref={lineRef}
          className="h-px w-24 md:w-32 bg-[var(--color-red)] my-10 origin-center"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-[600px] font-sans font-light text-[17px] md:text-[20px] text-[var(--color-silver)] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}
