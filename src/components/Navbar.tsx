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

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <Link 
              href="/contact"
              className="hidden md:block px-6 py-2.5 rounded-full bg-[var(--color-red)] text-[10px] font-sans uppercase tracking-[0.15em] text-[var(--color-white)] transition-all hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(200,16,46,0.3)]"
              data-cursor-button="true"
            >
              Request Quote
            </Link>

          </div>
        </div>
      </header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 32px) 32px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 32px) 32px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 32px) 32px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[499] bg-[rgba(10,10,11,0.96)] backdrop-blur-xl md:hidden overflow-hidden flex flex-col justify-center px-6"
          >
            <nav className="flex flex-col gap-6 w-full mt-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (i * 0.06), ease: "easeOut" }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display font-normal text-[36px] tracking-tight text-white block uppercase"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 flex flex-col gap-4 border-t border-[rgba(255,255,255,0.1)] pt-8"
            >
              <a href="https://wa.me/919444045544" className="font-mono text-[14px] text-[var(--color-red)]">WhatsApp Chat</a>
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 border border-[rgba(255,255,255,0.1)] text-[11px] font-sans uppercase tracking-widest text-white mt-4 w-fit"
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
