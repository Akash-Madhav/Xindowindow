'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    author: 'Arul O',
    text: "Very good fast delivery and very good Wintech profile they have given. I am most satisfied with XINDO WINDOW."
  },
  {
    author: 'Bharathi ChandraSekhar',
    text: "Excellent work. Had a complicated arch window. Work was very well executed. Excellent team."
  },
  {
    author: 'Hari Babu R',
    text: "I highly recommend XINDO WINDOW PVT LTD. I got a very good, quality office workstation product, delivered and installed at a reasonable cost."
  },
  {
    author: 'Vijayalakshmanan S',
    text: "Good job done by XINDO WINDOW on the modular kitchen and wardrobe works done to my specifications. Customised to my needs."
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Handle auto-advance
  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isVisible, current])

  // Handle visibility pause
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setCurrent(prev => (prev + 1) % TESTIMONIALS.length)
      if (e.key === 'ArrowLeft') setCurrent(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const nextSlide = useCallback(() => setCurrent(prev => (prev + 1) % TESTIMONIALS.length), [])
  const prevSlide = useCallback(() => setCurrent(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [])

  const splitWords = (text: string) => text.split(' ')

  return (
    <section 
      id="testimonials"
      className="relative bg-red-gradient py-20 sm:py-32 md:py-40 px-5 sm:px-8 md:px-16 w-full overflow-hidden industrial-texture"
      data-section-id="06"
    >
      
      {/* Ambient Quote Mark */}
      <div 
        className="absolute top-10 left-[5%] text-[var(--color-white)] opacity-[0.02] select-none pointer-events-none"
      >
        <span 
          className="font-display font-bold text-[200px] sm:text-[300px] md:text-[500px] leading-none block italic"
          style={{ animation: 'ambientRotate 10s ease-in-out infinite alternate' }}
        >
          &quot;
        </span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ambientRotate {
          0% { transform: rotate(2deg); }
          100% { transform: rotate(-2deg); }
        }
      `}} />

      <div className="max-w-[1000px] 2xl:max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center">
        
        <div className="flex items-center gap-4 mb-20">
          <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
          <span className="font-mono text-[11px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-medium">Client Verdict</span>
          <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
            className="flex flex-col items-center text-center w-full min-h-[240px] sm:min-h-[300px] md:min-h-[340px] justify-center"
            // Swipe gesture handling
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 50) prevSlide()
              else if (info.offset.x < -50) nextSlide()
            }}
          >
            {/* Word by word quote */}
            <h3 className="font-display text-[26px] sm:text-[36px] md:text-[48px] 2xl:text-[60px] font-bold leading-[1.1] text-[var(--color-white)] tracking-tight mb-12 flex flex-wrap justify-center gap-x-3 md:gap-x-4 uppercase italic">
              {splitWords(TESTIMONIALS[current].text).map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 + (i * 0.05), // 50ms stagger
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h3>

            {/* Author Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + (splitWords(TESTIMONIALS[current].text).length * 0.05) + 0.5 }}
              className="flex flex-col items-center group relative"
            >
              <span className="font-mono text-[14px] md:text-[16px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold italic">
                {TESTIMONIALS[current].author}
              </span>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + (splitWords(TESTIMONIALS[current].text).length * 0.05) + 0.8 }}
                className="h-[2px] w-12 bg-[var(--color-primary)] mt-5 opacity-40 origin-center" 
              />
            </motion.div>

          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-[-100px] flex gap-3 z-20">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[2px] transition-all duration-300 ${current === i ? 'w-8 bg-[var(--color-primary)]' : 'w-4 bg-[var(--color-silver)]'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
