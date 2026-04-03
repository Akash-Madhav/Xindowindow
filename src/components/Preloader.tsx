'use client'
 
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import { useReveal } from './RevealProvider'
import { useWordPress } from '@/lib/WordPressProvider'
 
export default function Preloader() {
  const { preloaderSteps, preloaderSystemLabel, preloaderGridLabel } = useWordPress()
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStep, setLoadingStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const logoPathRef = useRef<SVGPathElement>(null)
  const { triggerReveal } = useReveal()
 
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('xindo-preloader-done-premium')
    if (hasLoaded) {
      setTimeout(() => {
        setIsLoading(false)
        triggerReveal()
      }, 0)
      return
    }
 
    if (!preloaderSteps || preloaderSteps.length === 0) return

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < preloaderSteps.length - 1 ? prev + 1 : prev))
    }, 400)
 
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsLoading(false)
          triggerReveal()
          sessionStorage.setItem('xindo-preloader-done-premium', 'true')
        }, 300)
      }
    })
 
    tl.fromTo(logoPathRef.current, 
      { strokeDashoffset: 400, strokeDasharray: 400 },
      { strokeDashoffset: 0, duration: 1.5, ease: 'expo.inOut' }
    )
 
    tl.fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: 'luxurious' },
      "-=1.2"
    )
 
    return () => {
      clearInterval(stepInterval)
      tl.kill()
    }
  }, [preloaderSteps, triggerReveal])
 
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 1, ease: [0.77, 0, 0.175, 1] } 
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#09090B] overflow-hidden"
        >
          {/* Internal Texture Layer */}
          <div className="absolute inset-0 industrial-texture opacity-20 pointer-events-none" />
          
          {/* Content Wrapper to handle precise centering */}
          <div className="relative z-10 flex flex-col items-center justify-center -translate-y-6 sm:-translate-y-10">
            {/* Central Technical Logo */}
            <div className="relative mb-16">
              <svg width="120" height="120" viewBox="0 0 120 120" className="text-[var(--color-primary)]">
                <path
                  ref={logoPathRef}
                  d="M30,30 L90,90 M90,30 L30,90"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="butt"
                  fill="none"
                />
                <motion.rect
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  x="10" y="10" width="100" height="100"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              
              {/* Spinning Aura */}
              <div className="absolute inset-[-40px] border border-[var(--color-primary)]/10 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-[-20px] border border-[var(--color-white)]/5 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
            </div>
 
            {/* Status Indicators */}
            <div className="flex flex-col items-center gap-4">
              <div className="h-4 overflow-hidden flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={loadingStep}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-[9px] sm:text-[11px] text-[var(--color-silver)] uppercase tracking-[0.5em] font-black"
                  >
                    {preloaderSteps?.[loadingStep] || ""}
                  </motion.span>
                </AnimatePresence>
              </div>
 
              {/* Minimal Progress Bar */}
              <div className="w-[200px] h-[1px] bg-white/10 relative mt-4">
                <div 
                  ref={progressRef}
                  className="absolute inset-0 bg-[var(--color-primary)] origin-left"
                />
              </div>
 
              <div className="mt-8 flex gap-6">
                <span className="font-mono text-[8px] text-[var(--color-primary)] opacity-40 uppercase tracking-widest">{preloaderSystemLabel}</span>
                <span className="font-mono text-[8px] text-[var(--color-primary)] opacity-40 uppercase tracking-widest">{preloaderGridLabel}</span>
              </div>
            </div>
          </div>
 
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(200,16,46,0.05)_0%,transparent_70%)] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
