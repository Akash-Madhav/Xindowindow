'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products', hasDropdown: true },
  { name: 'Infrastructure', href: '#infrastructure' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Clients', href: '#clients' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

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
              ? 'w-[92%] max-w-[1200px] h-[64px] rounded-full bg-[rgba(10,10,11,0.75)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
              : 'w-[96%] max-w-[1400px] h-[80px] rounded-2xl bg-[rgba(255,255,255,0.02)] backdrop-blur-[8px] border border-[rgba(255,255,255,0.05)]'
            }
            px-6 md:px-10 flex items-center justify-between
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
          <nav className="hidden md:flex items-center gap-8 h-full" onMouseLeave={() => setMegaMenuOpen(false)}>
            {NAV_LINKS.map((link) => (
              <div 
                key={link.name} 
                className="relative h-full flex items-center"
                onMouseEnter={() => link.hasDropdown && setMegaMenuOpen(true)}
              >
                <Link
                  href={link.href}
                  data-cursor="link"
                  className="font-sans font-normal uppercase text-[10px] tracking-[0.18em] text-[var(--color-silver)] hover:text-[var(--color-white)] transition-colors duration-300 group py-4"
                >
                  {link.name}
                  <span className="absolute bottom-4 left-0 w-full h-px bg-[var(--color-red)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Link>
                
                {/* Mega Menu Hook trigger invisible area */}
                {link.hasDropdown && megaMenuOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[120px] h-[20px] bg-transparent" />
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <a href="tel:+919444045544" className="hidden lg:block font-mono text-[11px] text-[var(--color-silver)] hover:text-[var(--color-white)] transition-colors" data-cursor="link">
              +91 94440 45544
            </a>
            <button 
              className="hidden md:block px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.1)] text-[10px] font-sans uppercase tracking-[0.15em] text-[var(--color-white)] transition-all hover:bg-[var(--color-white)] hover:text-[var(--color-black)] hover:scale-105 active:scale-95"
              data-cursor="button"
            >
              Request Quote
            </button>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[501]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`block w-5 h-[1px] bg-white transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-[1px]' : '-translate-y-1'}`} />
              <span className={`block w-5 h-[1px] bg-white transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block w-5 h-[1px] bg-white transition-all duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-[1px]' : 'translate-y-1'}`} />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full left-0 w-full h-[320px] bg-[rgba(10,10,11,0.94)] backdrop-blur-[20px] border-b border-[rgba(200,16,46,0.12)] hidden md:block z-[490]"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <div className="max-w-[1400px] h-full mx-auto px-12 py-10 grid grid-cols-4 gap-8">
                {/* Product Col 1 */}
                <div className="flex flex-col">
                  <div className="h-[120px] w-full bg-[rgba(255,255,255,0.02)] mb-4 border border-[rgba(255,255,255,0.05)] flex items-center justify-center">
                    <span className="font-mono text-[10px] text-[var(--color-silver)]">Sliding Visual</span>
                  </div>
                  <h4 className="font-display font-medium text-[20px] text-white tracking-wide mb-2">Sliding</h4>
                  <ul className="flex flex-col gap-2">
                    <li><Link href="#" className="font-sans text-[12px] text-[var(--color-silver)] hover:text-white transition-colors">Windows</Link></li>
                    <li><Link href="#" className="font-sans text-[12px] text-[var(--color-silver)] hover:text-white transition-colors">Doors</Link></li>
                  </ul>
                </div>
                {/* Product Col 2 */}
                <div className="flex flex-col">
                  <div className="h-[120px] w-full bg-[rgba(255,255,255,0.02)] mb-4 border border-[rgba(255,255,255,0.05)] flex items-center justify-center">
                    <span className="font-mono text-[10px] text-[var(--color-silver)]">Casement Visual</span>
                  </div>
                  <h4 className="font-display font-medium text-[20px] text-white tracking-wide mb-2">Casement</h4>
                  <ul className="flex flex-col gap-2">
                    <li><Link href="#" className="font-sans text-[12px] text-[var(--color-silver)] hover:text-white transition-colors">Windows</Link></li>
                    <li><Link href="#" className="font-sans text-[12px] text-[var(--color-silver)] hover:text-white transition-colors">Doors</Link></li>
                  </ul>
                </div>
                {/* Product Col 3 */}
                <div className="flex flex-col">
                  <div className="h-[120px] w-full bg-[rgba(255,255,255,0.02)] mb-4 border border-[rgba(255,255,255,0.05)] flex items-center justify-center">
                    <span className="font-mono text-[10px] text-[var(--color-silver)]">Special Visual</span>
                  </div>
                  <h4 className="font-display font-medium text-[20px] text-white tracking-wide mb-2">Special Doors & Windows</h4>
                  <ul className="flex flex-col gap-2">
                    <li><Link href="#" className="font-sans text-[12px] text-[var(--color-silver)] hover:text-white transition-colors">Folding</Link></li>
                    <li><Link href="#" className="font-sans text-[12px] text-[var(--color-silver)] hover:text-white transition-colors">Tilt & Turn</Link></li>
                  </ul>
                </div>
                {/* Product Col 4 */}
                <div className="flex flex-col">
                  <div className="h-[120px] w-full bg-[rgba(255,255,255,0.02)] mb-4 border border-[rgba(255,255,255,0.05)] flex items-center justify-center">
                    <span className="font-mono text-[10px] text-[var(--color-silver)]">Accessory Visual</span>
                  </div>
                  <h4 className="font-display font-medium text-[20px] text-white tracking-wide mb-2">Accessories</h4>
                  <ul className="flex flex-col gap-2">
                    <li><Link href="#" className="font-sans text-[12px] text-[var(--color-silver)] hover:text-white transition-colors">Hardware</Link></li>
                    <li><Link href="#" className="font-sans text-[12px] text-[var(--color-silver)] hover:text-white transition-colors">Meshes</Link></li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              <a href="tel:+919444045544" className="font-mono text-[14px] text-white">+91 94440 45544</a>
              <a href="https://wa.me/919444045544" className="font-mono text-[14px] text-[var(--color-red)]">WhatsApp Chat</a>
              <button className="px-6 py-3 border border-[rgba(255,255,255,0.1)] text-[11px] font-sans uppercase tracking-widest text-white mt-4 w-fit">
                Request Quote
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
