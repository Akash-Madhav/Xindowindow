'use client'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

interface PageHeroProps {
  title: string
  subtitle: string
  bgText?: string
  image?: string // Placeholder for now
}

export default function PageHero({ title, subtitle, bgText }: PageHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
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
  })

  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden bg-red-gradient industrial-texture">
      {/* Background Watermark - Technical Look */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
        <h1 
          className="font-display font-bold text-[22vw] lg:text-[16vw] text-transparent tracking-tighter uppercase whitespace-nowrap italic"
          style={{ WebkitTextStroke: '1px var(--color-white)' }}
        >
          {bgText || title}
        </h1>
      </div>

      <div className="relative z-10 text-center px-6 max-w-[1000px] 2xl:max-w-[1400px] 3xl:max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 sm:w-12 h-[2px] bg-[var(--color-primary)]" />
            <span className="font-mono text-[9px] sm:text-[11px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-bold opacity-60">System Registry</span>
            <div className="w-10 sm:w-12 h-[2px] bg-[var(--color-primary)]" />
          </div>

          <h1 ref={titleRef} className="font-display font-bold text-[36px] sm:text-[52px] md:text-[72px] 2xl:text-[96px] 3xl:text-[120px] leading-[0.95] text-white tracking-tighter uppercase italic mb-8">
            {title}
          </h1>
          
          <div ref={lineRef} className="w-12 sm:w-16 h-[3px] bg-[var(--color-primary)] mb-8 origin-center" />

          <p className="font-sans font-normal text-[14px] sm:text-[17px] md:text-[19px] 2xl:text-[22px] 3xl:text-[28px] text-[var(--color-silver)] max-w-[500px] sm:max-w-[700px] 2xl:max-w-none opacity-80 leading-relaxed italic border-l-2 border-[var(--color-primary-muted)] pl-6 sm:pl-8 mx-auto text-left">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
