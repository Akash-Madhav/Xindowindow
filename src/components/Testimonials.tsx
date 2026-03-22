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
    <section className="relative w-full h-[100svh] bg-[var(--color-black)] overflow-hidden flex items-center justify-center px-6 md:px-12" data-section-id="06">
      
      {/* Ambient Quote Mark */}
      <div 
        className="absolute top-0 left-[-40px] md:left-[5%] text-[var(--color-white)] opacity-[0.03] select-none pointer-events-none"
      >
        <span 
          className="font-display font-light text-[300px] md:text-[400px] leading-none block"
          style={{ animation: 'ambientRotate 8s ease-in-out infinite alternate' }}
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

      <div className="max-w-[1000px] w-full relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} 
            className="flex flex-col items-center text-center w-full min-h-[300px] justify-center"
            // Swipe gesture handling
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 50) prevSlide()
              else if (info.offset.x < -50) nextSlide()
            }}
          >
            {/* Word by word quote */}
            <h3 className="font-display text-[28px] md:text-[42px] font-normal leading-[1.3] text-[var(--color-white)] tracking-[-0.01em] mb-12 flex flex-wrap justify-center gap-x-2 md:gap-x-3">
              {splitWords(TESTIMONIALS[current].text).map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.1 + (i * 0.04), // 40ms stagger
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
              transition={{ delay: 0.1 + (splitWords(TESTIMONIALS[current].text).length * 0.04) + 0.4 }}
              className="flex flex-col items-center group relative overflow-hidden"
            >
              <span className="font-mono text-[14px] uppercase tracking-widest text-[var(--color-red)]">
                {TESTIMONIALS[current].author}
              </span>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + (splitWords(TESTIMONIALS[current].text).length * 0.04) + 0.6 }}
                className="h-[1px] w-full bg-[var(--color-red)] mt-3 opacity-60 origin-left" 
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
              className={`h-[2px] transition-all duration-300 ${current === i ? 'w-8 bg-[var(--color-red)]' : 'w-4 bg-[var(--color-silver)]'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
