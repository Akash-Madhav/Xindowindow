'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Collections', href: '/products' },
  { name: 'Facility', href: '/infrastructure' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Clients', href: '/clients' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[500] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none
          ${scrolled ? 'pt-4' : 'pt-6'}
        `}
      >
        <div 
          className={`mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto
            ${scrolled 
              ? 'w-[92%] max-w-[1200px] h-[64px] rounded-full bg-[rgba(10,10,11,0.85)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
              : 'w-[96%] max-w-[1400px] h-[80px] rounded-full bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)]'
            }
            px-8 md:px-12 flex items-center justify-between
          `}
        >
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Xindo Window Home" data-cursor="link">
            <div className="w-[32px] h-[32px] border border-[var(--color-red)] flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:rotate-90">
              <span className="font-display text-[16px] text-[var(--color-white)]">X</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-medium text-[15px] md:text-[17px] text-[var(--color-white)] leading-none mb-0.5">Xindo Window</span>
              <span className="font-sans font-light text-[9px] text-[var(--color-silver)] uppercase tracking-widest leading-none">Pvt. Ltd.</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 h-full">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <div 
                  key={link.name} 
                  className="relative h-full flex items-center"
                >
                  <Link
                    href={link.href}
                    data-cursor="link"
                    className={`font-sans font-normal uppercase text-[10px] tracking-[0.18em] transition-colors duration-300 group py-4 
                      ${isActive ? 'text-[var(--color-white)]' : 'text-[var(--color-silver)] hover:text-[var(--color-white)]'}
                    `}
                  >
                    {link.name}
                    {isActive ? (
                      <motion.span 
                        layoutId="activeTab"
                        className="absolute bottom-4 left-0 w-full h-[2px] bg-[var(--color-red)]"
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : (
                      <span className="absolute bottom-4 left-0 w-full h-px bg-[var(--color-red)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    )}
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Right Section / Hamburger */}
          <div className="flex items-center gap-4">
            <Link 
              href="/contact"
              className="hidden md:block px-6 py-2.5 rounded-full bg-[var(--color-red)] text-[10px] font-sans uppercase tracking-[0.15em] text-[var(--color-white)] transition-all hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(200,16,46,0.3)]"
              data-cursor-button="true"
            >
              Request Quote
            </Link>

            {/* Premium Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col gap-[5px] justify-center items-center w-10 h-10 md:hidden relative z-[600]"
              aria-label="Toggle Menu"
              data-cursor="link"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1.5px] bg-white block rounded-full origin-center transition-all bg-[var(--color-white)]"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-6 h-[1.5px] bg-white block rounded-full transition-all bg-[var(--color-white)]"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1.5px] bg-white block rounded-full origin-center transition-all bg-[var(--color-white)]"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[499] bg-[rgba(10,10,11,0.98)] md:hidden flex flex-col items-center justify-center p-8 pt-24"
          >
            {/* Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
               <span className="font-display text-[40vw] text-white rotate-90 leading-none">XINDO</span>
            </div>

            <nav className="flex flex-col gap-4 w-full relative z-10 items-center text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + (i * 0.08), ease: [0.16, 1, 0.3, 1] }}
                  key={link.name}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-display font-light text-[42px] tracking-tight block uppercase transition-colors 
                      ${pathname === link.href ? 'text-[var(--color-red)]' : 'text-white hover:text-[var(--color-red)]'}
                    `}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-16 flex flex-col gap-6 items-center w-full relative z-10 border-t border-[rgba(255,255,255,0.05)] pt-12"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-silver)] mb-2">Connect with us</span>
                <a href="https://wa.me/919444045544" className="font-sans text-[16px] text-white underline underline-offset-8 decoration-[var(--color-red)]/30 hover:decoration-[var(--color-red)] transition-all">WhatsApp Concierge</a>
              </div>
              
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 px-10 py-4 bg-[var(--color-red)] text-[12px] font-sans uppercase tracking-[0.2em] text-white rounded-full shadow-[0_12px_40px_rgba(200,16,46,0.3)]"
              >
                Request Quote
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
