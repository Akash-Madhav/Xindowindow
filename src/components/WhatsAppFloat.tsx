'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { SiWhatsapp } from '@icons-pack/react-simple-icons'
import { useWordPress } from '@/lib/WordPressProvider'

export default function WhatsAppFloat() {
  const { whatsappUrl, whatsappTooltip, whatsappAriaLabel, whatsappDefaultMessage } = useWordPress()
  const [visible, setVisible] = useState(false)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1800)
    const pulseTimer = setTimeout(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 3600)
    }, 8000)
    return () => {
      clearTimeout(timer)
      clearTimeout(pulseTimer)
    }
  }, [])

  // Build dynamic URL if message is provided
  const finalWhatsappUrl = whatsappUrl && whatsappDefaultMessage 
    ? `${whatsappUrl}?text=${encodeURIComponent(whatsappDefaultMessage)}`
    : whatsappUrl

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
            href={finalWhatsappUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={whatsappAriaLabel}
            className="group flex flex-row items-center"
            data-cursor-button="true"
          >
            {/* Tooltip for desktop only */}
            <span className="hidden md:block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-mono text-[10px] uppercase text-[var(--color-white)] mr-3 pointer-events-none">
              {whatsappTooltip}
            </span>

            {/* Button */}
            <div 
              className={`flex items-center justify-center w-[48px] h-[48px] md:w-[52px] md:h-[52px] rounded-full
                bg-[rgba(26,26,30,0.85)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                md:hover:bg-[rgba(37,211,102,0.15)] md:hover:border-[rgba(37,211,102,0.4)] md:hover:shadow-[0_12px_32px_rgba(37,211,102,0.3)] md:hover:-translate-y-1
                ${pulse ? 'animate-pulse-whatsapp' : ''}
              `}
            >
              <SiWhatsapp color="#25D366" size={24} />
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
