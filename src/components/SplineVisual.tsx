'use client'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SplineVisual() {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full relative"
    >
      <div className="absolute inset-0 bg-[#0A0A0B] z-[-1]" />
      
      {/* Static Fallback Globe (CSS/SVG) to prevent crashes */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 group">
        <div className="w-[80%] h-[80%] rounded-full border border-[var(--color-red)] border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[60%] h-[60%] rounded-full border border-[rgba(255,255,255,0.1)] animate-[spin_40s_linear_infinite_reverse]" />
      </div>

      {/* Only try Spline if we have a valid-looking scene. 
          Wrapping in a check to prevent the 'buffer' crash if URL is broken. */}
      {false && ( // Disabled temporarily to prevent Home page crash until valid asset is confirmed
        <Spline 
          scene="https://prod.spline.design/your-scene-id/scene.splinecode" 
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className="w-full h-full"
        />
      )}
      
      {/* Fallback/Loading State */}
      {!loaded && !true && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0B]">
          <div className="w-12 h-px bg-[var(--color-red)] animate-pulse" />
        </div>
      )}
    </motion.div>
  )
}
