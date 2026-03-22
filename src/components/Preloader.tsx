'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('xindo-preloader-done')
    if (hasLoaded) {
      setIsLoading(false)
      return
    }

    // Mobile loader is faster
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const speedMultiplier = isMobile ? 0.7 : 1;

    const timer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem('xindo-preloader-done', 'true')
    }, 1100 * speedMultiplier) // 800ms draw + 300ms pause

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }} // 600ms unmount fade
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-black)]"
          aria-live="polite"
          role="status"
          aria-label="Loading"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 120 120"
            className="text-[var(--color-red)]"
            aria-hidden="true"
          >
            <motion.path
              d="M20,20 L100,100 M100,20 L20,100"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            />
            {/* Box around the X */}
            <motion.rect
              x="10" y="10" width="100" height="100"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
