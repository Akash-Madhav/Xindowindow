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
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${currentX * 0.003}vw, ${currentY * 0.003}vh, 0)`
      }
      requestAnimationFrame(updateParallax)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - window.innerWidth / 2
      targetY = e.clientY - window.innerHeight / 2
    }
    window.addEventListener('mousemove', handleMouseMove)
    requestAnimationFrame(updateParallax)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
      className="relative w-full h-[60vh] md:h-[70vh] bg-[var(--color-black)] flex items-center overflow-hidden"
    >
      {/* Background Cinematic Text */}
      {bgText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
          <span className="font-display text-[15vw] md:text-[10vw] uppercase tracking-[0.25em] text-white whitespace-nowrap">
            {bgText}
          </span>
        </div>
      )}

      {/* Grain Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent to-[var(--color-black)]" />

      <div ref={textRef} className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-block"
        >
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[var(--color-red)]">
             Xindo / {title}
          </span>
        </motion.div>
        
        <h1 
          ref={titleRef}
          className="font-display font-light text-[56px] md:text-[110px] text-white tracking-tight leading-[1.05] mb-10"
        >
          {title}
        </h1>
        
        <div 
          ref={lineRef}
          className="h-px w-24 md:w-32 bg-[var(--color-red)] mb-10 origin-left"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-[540px] font-sans font-light text-[15px] md:text-[17px] text-[var(--color-silver)] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}
