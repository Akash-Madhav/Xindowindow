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

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

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
            <div className="w-[36px] h-[36px] border-2 border-[var(--color-primary)] flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:bg-[var(--color-primary)]">
              <span className="font-display font-bold text-[18px] text-[var(--color-white)] italic">X</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-[16px] md:text-[18px] text-[var(--color-white)] leading-none mb-0.5 uppercase italic tracking-tight">Xindo Window</span>
              <span className="font-mono text-[9px] text-[var(--color-silver)] uppercase tracking-[0.3em] leading-none font-bold opacity-60">Architectural Systems</span>
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
                    className={`nav-link py-4 
                      ${isActive ? 'text-[var(--color-white)]' : 'text-[var(--color-silver)] hover:text-[var(--color-white)]'}
                    `}
                  >
                    {link.name}
                    {isActive ? (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute bottom-4 left-0 w-full h-[2px] bg-[var(--color-primary)]"
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : (
                      <span className="absolute bottom-4 left-0 w-full h-px bg-[var(--color-primary)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    )}
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Right Section / Hamburger */}
          <div className="flex items-center gap-8">
            <Link
              href="/contact"
              className="hidden lg:block px-9 py-2.5 rounded-full bg-[var(--color-primary)] text-[10px] font-sans uppercase tracking-[0.14em] text-white transition-all hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(200,16,46,0.2)] font-bold border border-white/10 whitespace-nowrap"
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
            className="fixed inset-0 z-[499] bg-[rgba(10,10,11,0.98)] md:hidden overflow-y-auto"
          >
            {/* Background Watermark */}
            <div className="fixed inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden -z-10">
              <span className="font-display text-[40vw] text-white rotate-90 leading-none">XINDO</span>
            </div>

            <div className="min-h-full flex flex-col px-6 pt-20 pb-10">
              <nav className="flex flex-col gap-0 w-full relative z-10 items-center text-center">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + (i * 0.06), ease: [0.16, 1, 0.3, 1] }}
                    key={link.name}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-display font-bold text-[24px] sm:text-[32px] tracking-tighter block uppercase transition-all py-1.5 italic
                        ${pathname === link.href ? 'text-[var(--color-primary)] scale-110' : 'text-white hover:text-[var(--color-primary)]'}
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
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col gap-5 items-center w-full relative z-10 mt-6 border-t border-[rgba(255,255,255,0.05)] pt-6 pb-2"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-silver)] mb-0.5 opacity-50">Connect with us</span>
                  <a href="https://wa.me/919444045544" className="font-sans text-[15px] sm:text-[16px] text-white underline underline-offset-8 decoration-[var(--color-primary)]/30 hover:decoration-[var(--color-primary)] transition-all font-bold">WhatsApp Concierge</a>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 px-8 py-3.5 bg-[var(--color-primary)] text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-white rounded-full shadow-[0_8px_24px_rgba(200,16,46,0.3)] font-bold active:scale-95 transition-transform"
                >
                  Request Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
