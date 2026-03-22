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

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    
    if (titleRef.current) {
      tl.fromTo(titleRef.current, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'luxurious' }
      )
    }
    
    if (lineRef.current) {
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'precision' },
        '-=0.5'
      )
    }

    return () => { tl.kill() }
  }, [])

  return (
    <section 
      data-section-id="01"
      className="relative w-full h-[60vh] md:h-[70vh] bg-[var(--color-black)] flex items-center justify-center overflow-hidden"
    >
      {/* Background Cinematic Text */}
      {bgText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <span className="font-display text-[15vw] md:text-[10vw] uppercase tracking-[0.2em] text-white whitespace-nowrap">
            {bgText}
          </span>
        </div>
      )}

      {/* Grain Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent to-[var(--color-black)]" />

      <div className="relative z-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-block"
        >
          <span className="font-mono text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-[var(--color-red)]">
            Xindo Window / {title}
          </span>
        </motion.div>
        
        <h1 
          ref={titleRef}
          className="font-display font-light text-[56px] md:text-[120px] text-white tracking-tight leading-none mb-8"
        >
          {title}
        </h1>
        
        <div 
          ref={lineRef}
          className="h-px w-24 md:w-32 bg-[var(--color-red)] mx-auto mb-8 origin-center"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-[600px] mx-auto font-sans font-light text-[15px] md:text-[18px] text-[var(--color-silver)] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}
