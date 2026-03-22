'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    // Entrance delay 1800ms
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1800)

    // Pulse triggers after 8s inactivity
    const pulseTimer = setTimeout(() => {
      setPulse(true)
      // Pulse duration is 1.2s * 3 = 3.6s
      setTimeout(() => setPulse(false), 3600)
    }, 8000)

    return () => {
      clearTimeout(timer)
      clearTimeout(pulseTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-[450] right-5 bottom-[calc(80px+env(safe-area-inset-bottom))] md:right-8 md:bottom-8"
        >
          <Link
            href="https://wa.me/919444045544?text=Hi%2C%20I%27m%20interested%20in%20Xindo%20Windows%20and%20Doors.%20I%27d%20like%20to%20know%20more%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="group flex flex-row items-center"
            data-cursor-button="true"
          >
            {/* Tooltip for desktop only */}
            <span className="hidden md:block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-mono text-[10px] uppercase text-[var(--color-white)] mr-3 pointer-events-none">
              Chat on WhatsApp
            </span>

            {/* Button */}
            <div 
              className={`flex items-center justify-center w-[48px] h-[48px] md:w-[52px] md:h-[52px]
                bg-[rgba(26,26,30,0.85)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                md:hover:bg-[rgba(37,211,102,0.12)] md:hover:border-[rgba(37,211,102,0.3)] md:hover:shadow-[0_12px_32px_rgba(37,211,102,0.2)] md:hover:-translate-y-1
                ${pulse ? 'animate-pulse-whatsapp' : ''}
              `}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
          </Link>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes whatsappPulse {
              0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); }
              50% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
              100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
            }
            .animate-pulse-whatsapp {
              animation: whatsappPulse 1.2s cubic-bezier(0.16,1,0.3,1) infinite;
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
