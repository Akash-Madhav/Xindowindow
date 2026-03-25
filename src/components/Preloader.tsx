'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('xindo-preloader-done')
    if (hasLoaded) {
      Promise.resolve().then(() => setIsLoading(false))
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem('xindo-preloader-done', 'true')
    }, 2000) // Stay longer to cover hydration better

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
            width="100"
            height="100"
            viewBox="0 0 120 120"
            className="text-[var(--color-primary)]"
            aria-hidden="true"
          >
            <motion.path
              d="M30,30 L90,90 M90,30 L30,90"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="square"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            />
            {/* Box around the X - more industrial */}
            <motion.rect
              x="15" y="15" width="90" height="90"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1]
              }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
