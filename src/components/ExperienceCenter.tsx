'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function ExperienceCenter({ id = "experience-center" }: { id?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Parallax effect for the showroom image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  // Variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section 
      id={id}
      ref={containerRef}
      className="relative bg-[var(--color-black)] py-24 sm:py-32 md:py-48 overflow-hidden industrial-texture"
    >
      {/* Dynamic Background Red Glow */}
      <div className="absolute inset-0 bg-red-gradient opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex flex-col"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[var(--color-primary)]" />
              <span className="font-mono text-[11px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-bold italic">Showroom Alpha-Direct</span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="font-display font-bold text-[48px] md:text-[72px] text-white leading-[0.9] uppercase italic mb-8 tracking-tighter">
              Touch the Precision, <br />
              <span className="text-[var(--color-primary)]">Feel the Engineering</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="font-sans text-[17px] md:text-[19px] text-[var(--color-silver)] leading-relaxed mb-12 max-w-xl border-l-2 border-[var(--color-primary-muted)] pl-8 opacity-80 italic">
              Architecture is meant to be experienced at 1:1 scale. We invite you to our state-of-the-art Experience Center, where you can move massive sliding systems with a single finger and witness the acoustic differential first-hand.
            </motion.p>

            {/* Feature Stagger Group */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-10 items-center mb-16">
              {[
                { label: 'Interactive', value: 'Full-Scale Models' },
                { label: 'Tactile', value: 'Finish Samples' },
                { label: 'Thermal', value: 'Testing Zone' }
              ].map((f, i) => (
                <div key={f.label} className="flex flex-col group">
                  <span className="text-[var(--color-primary)] font-display text-[26px] font-bold italic transition-transform group-hover:scale-110 duration-500">{f.label}</span>
                  <span className="text-[var(--color-silver)] font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-all">{f.value}</span>
                </div>
              ))}
            </motion.div>

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group bg-transparent border border-[var(--color-primary)] text-white font-mono text-[12px] uppercase tracking-[0.4em] py-6 px-12 hover:bg-[var(--color-primary)] transition-all duration-700 font-bold self-start overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                Book a Private Tour
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-2 transition-transform duration-500"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-1000 ease-in-out" />
            </motion.button>
          </motion.div>

          {/* Visual Content with Parallax */}
          <motion.div
            style={{ opacity }}
            className="relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-[3/4] w-full rounded-sm overflow-hidden border border-[rgba(255,255,255,0.05)] shadow-[0_0_80px_rgba(0,0,0,0.6)]">
              <motion.div 
                style={{ y }} 
                className="relative w-full h-[120%] -top-[10%]"
              >
                <Image 
                  src="/images/experience-center.png"
                  alt="Xindo Experience Center"
                  fill
                  priority
                  className="object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-[3s]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Technical Element */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute -bottom-8 -left-8 md:-left-12 bg-[var(--color-black-mid)] border border-[var(--color-primary-muted)] p-8 backdrop-blur-3xl hidden sm:block shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
                <span className="font-mono text-[11px] uppercase text-white tracking-[0.4em] font-bold">LUMI-01 REGISTRY</span>
              </div>
              <p className="font-sans text-[13px] text-[var(--color-silver)] opacity-80 leading-relaxed italic">
                Witness Acoustic performance <br />
                differential of <span className="text-white font-bold">-48.2dB</span>
              </p>
            </motion.div>
            
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t border-r border-[var(--color-primary)] opacity-30 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
