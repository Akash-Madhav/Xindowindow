'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)
  
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const decLineRef = useRef<HTMLDivElement>(null)
  
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)

    // Wait for preloader to finish (approx 1500ms total, we trigger at 1500ms)
    const masterTl = gsap.timeline({ delay: 1.5 })

    // Headline entrance
    if (line1Ref.current && line2Ref.current) {
      masterTl.fromTo(line1Ref.current, 
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "luxurious" }, 0.2
      )
      masterTl.fromTo(line2Ref.current, 
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "luxurious" }, 0.35
      )
    }

    // Image Reveal
    if (imageWrapperRef.current) {
      masterTl.fromTo(imageWrapperRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: "luxurious" }, 0.6
      )
    }

    // Decorative Red Line
    if (decLineRef.current) {
      masterTl.fromTo(decLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "0.16, 1, 0.3, 1" }, 0.9
      )
    }

    return () => {
      masterTl.kill()
    }
  }, [])

  // Mouse Parallax & Gyroscope
  useEffect(() => {
    let requestRef: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08

      if (textGroupRef.current) {
        textGroupRef.current.style.transform = `translate3d(${currentX * 0.008}vw, ${currentY * 0.008}vh, 0)`
      }
      if (imageWrapperRef.current) {
        imageWrapperRef.current.style.transform = `translate3d(${currentX * -0.004}vw, ${currentY * -0.004}vh, 0)`
      }

      requestRef = requestAnimationFrame(updateParallax)
    }

    if (!isTouch) {
      const handleMouseMove = (e: MouseEvent) => {
        targetX = e.clientX - window.innerWidth / 2
        targetY = e.clientY - window.innerHeight / 2
      }
      window.addEventListener('mousemove', handleMouseMove)
      requestRef = requestAnimationFrame(updateParallax)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        cancelAnimationFrame(requestRef)
      }
    } else {
      // Gyroscope tilt
      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma !== null && e.beta !== null) {
          // Limit rotation to [-30, 30] degrees mapping to [-4px, 4px] roughly
          targetX = Math.max(-30, Math.min(30, e.gamma)) * (4 / 30)
          targetY = Math.max(-30, Math.min(30, e.beta - 45)) * (4 / 30) // Assuming user holds phone at 45deg
        }
      }

      // Request permission for iOS 13+
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // Must be triggered by user action, so we fallback gracefully if not active yet
        // A click anywhere could request this, but we'll just listen if it's already granted
      }
      
      window.addEventListener('deviceorientation', handleOrientation)
      
      const updateGyro = () => {
        currentX += (targetX - currentX) * 0.06
        currentY += (targetY - currentY) * 0.06
        
        if (textGroupRef.current) {
          textGroupRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
        }
        if (imageWrapperRef.current) {
          imageWrapperRef.current.style.transform = `translate3d(${-currentX}px, ${-currentY}px, 0)`
        }
        requestRef = requestAnimationFrame(updateGyro)
      }
      requestRef = requestAnimationFrame(updateGyro)

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation)
        cancelAnimationFrame(requestRef)
      }
    }
  }, [isTouch])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100svh] bg-[var(--color-black)] overflow-hidden flex items-center"
      data-section-id="01"
    >
      {/* Right parallax image area */}
      <div 
        ref={imageWrapperRef} 
        className="absolute right-0 top-0 w-full md:w-[55%] h-full z-0 overflow-hidden"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-black)] via-[rgba(10,10,11,0.6)] to-transparent z-10" />
        <div className="absolute inset-0 bg-[#1A1A1E]" /> {/* Placeholder for actul image */}
        {/* <Image src="/hero-image.jpg" ... /> */}
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 z-20 relative h-full flex flex-col justify-center">
        
        {/* Label Chip */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }} className="mb-8 w-fit"
        >
          <div className="px-3 py-1.5 rounded-full border border-[rgba(200,16,46,0.3)] bg-[rgba(255,255,255,0.04)] backdrop-blur-[8px]">
            <span className="font-mono text-[10px] uppercase text-[var(--color-red)] tracking-widest">
              Indo-German Excellence
            </span>
          </div>
        </motion.div>

        {/* Text Group for Parallax */}
        <div ref={textGroupRef} className="will-change-transform">
          <h1 className="font-display font-light text-[48px] md:text-[96px] tracking-[-0.03em] text-[var(--color-white)] leading-[1.05] flex flex-col">
            <div ref={line1Ref} className="origin-left">The Window &</div>
            <div ref={line2Ref} className="origin-left ml-6 md:ml-16">Door Experts</div>
          </h1>

          {/* Decorative Line */}
          <div ref={decLineRef} className="h-px w-[200px] bg-[var(--color-red)] mt-6 origin-left" style={{ transform: 'scaleX(0)' }} />

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.3 }} // 1500 preloader + 800 delay = 2.3
            className="mt-8 max-w-[440px] font-sans font-light text-[17px] md:text-[18px] leading-[1.65] text-[var(--color-silver)]"
          >
            Premium uPVC Windows & Doors — engineered with German precision, crafted for India's finest homes and developments.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-6"
          >
            <button 
              className="group relative overflow-hidden px-8 py-4 border border-[var(--color-red)] text-[var(--color-red)] hover:text-[var(--color-white)] transition-colors duration-300 w-full sm:w-auto"
              data-cursor-button="true"
            >
              <span className="relative z-10 font-sans uppercase text-[12px] tracking-widest font-medium">Explore Products</span>
              <div className="absolute inset-0 bg-[var(--color-red)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
            </button>
            <button 
              className="group flex items-center text-[var(--color-mist)] hover:text-[var(--color-white)] transition-colors duration-300 w-full sm:w-auto mt-4 sm:mt-0"
              data-cursor="link"
            >
              <span className="font-sans uppercase text-[12px] tracking-widest mr-2">Request Quote</span>
              <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
              <svg className="w-4 h-4 -ml-1 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <div className="absolute bottom-6 md:bottom-12 left-0 w-full px-6 md:px-12 z-20 overflow-x-auto snap-x flex gap-4 md:gap-6 pb-2 no-scrollbar">
          {[
            { num: '500+', label: 'Projects' },
            { num: '10yr', label: 'Warranty' },
            { num: '200+', label: 'Clients' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.9 + (i * 0.15) }}
              className="snap-start flex-shrink-0 min-w-[200px] bg-[rgba(255,255,255,0.04)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] border-t-2 border-t-[var(--color-red)] p-5 md:p-6"
            >
              <div className="font-mono text-[24px] md:text-[28px] text-[var(--color-red)] tracking-[-0.02em] leading-none mb-1">{stat.num}</div>
              <div className="font-sans text-[11px] uppercase text-[var(--color-silver)] tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Watermark text */}
      <div className="absolute -bottom-5 left-0 w-full pointer-events-none z-0 hidden md:block overflow-visible whitespace-nowrap opacity-5">
        <span 
          className="font-display font-light text-[200px] leading-none text-transparent tracking-widest"
          style={{ WebkitTextStroke: '1px var(--color-white)' }}
        >
          XINDO
        </span>
      </div>
    </section>
  )
}
