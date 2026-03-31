'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from './RevealProvider'
import { ReactNode } from 'react'

export function RevealWrapper({ children }: { children: ReactNode }) {
  const { isRevealed } = useReveal()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isRevealed ? 1 : 0,
        y: isRevealed ? 0 : 20
      }}
      transition={{ 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1 
      }}
      className="relative w-full"
    >
      {children}
    </motion.div>
  )
}
