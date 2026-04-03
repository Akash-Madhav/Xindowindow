'use client'
 
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import Link from 'next/link'
import { useWordPress } from '@/lib/WordPressProvider'
 
export default function Navbar() {
  const { 
    navLinks, 
    brandName, 
    brandSubtitle, 
    navCtaText, 
    navMobilePhone, 
    navMobileCtaText,
    navDirectoryLabel,
    navTechnicalDeskLabel,
    brandWatermark
  } = useWordPress()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const navItemsRef = useRef<(HTMLDivElement | null)[]>([])
 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
 
  useEffect(() => {
    if (mobileMenuOpen && navItemsRef.current.length > 0) {
      gsap.fromTo(navItemsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power4.out', delay: 0.3 }
      )
    }
  }, [mobileMenuOpen])
 
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
        className={`fixed top-0 left-0 right-0 w-full z-[500] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none
          ${scrolled ? 'pt-6' : 'pt-10'}
        `}
      >
        <div
          className={`mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto
            ${scrolled
              ? 'w-[92%] max-w-[1280px] h-[72px] bg-black/80 backdrop-blur-xl border-[rgba(var(--primary-rgb),0.2)] rounded-full'
              : 'w-[95%] max-w-[1720px] h-[88px] bg-transparent backdrop-blur-[4px] border border-white/5 rounded-full'
            }
            px-6 md:px-14 flex items-center justify-between shadow-2xl
          `}
        >
 
          {/* Logo Group */}
          <Link href="/" className="flex items-center gap-4 group" aria-label={`${brandName} Home`} data-cursor="link">
            <div className="relative w-[40px] h-[40px] border-[1.5px] border-[var(--color-primary)] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
              <span className="font-display font-bold text-[20px] text-[var(--color-white)] italic relative z-10">{brandName.charAt(0)}</span>
              <div className="absolute inset-0 bg-[var(--color-primary)] opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-[18px] md:text-[20px] text-[var(--color-white)] leading-none mb-0.5 uppercase italic tracking-tight group-hover:text-[var(--color-primary)] transition-colors">{brandName}</span>
              <span className="font-mono text-[9px] text-[var(--color-silver)] uppercase tracking-[0.4em] leading-none font-bold opacity-40">{brandSubtitle}</span>
            </div>
          </Link>
 
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <div key={link.name} className="relative h-full flex items-center group">
                  <Link
                    href={link.href}
                    data-cursor="link"
                    className={`nav-link text-[12px] py-4 transition-all duration-300
                      ${isActive ? 'text-[var(--color-white)] font-black' : 'text-[var(--color-silver)] font-bold group-hover:text-[var(--color-white)]'}
                    `}
                  >
                    {link.name}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]"
                    />
                  )}
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-[1px] bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                </div>
              )
            })}
          </nav>
 
          {/* CTAs */}
          <div className="flex items-center gap-10">
            <Link
              href="/contact"
              className="hidden sm:block px-6 md:px-10 py-3 bg-[var(--color-primary)] text-[10px] md:text-[11px] font-sans uppercase tracking-[0.25em] text-white transition-all hover:scale-[1.05] shadow-primary font-black border border-white/5 active:scale-95"
              data-cursor-button="true"
            >
              {navCtaText}
            </Link>
 
            {/* Minimal Technical Hamburger — mobile/tablet only */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden group flex flex-col gap-[7px] justify-center items-end w-12 h-12 relative z-[600]"
              aria-label="Toggle Menu"
              data-cursor="link"
            >
              <div className={`h-[1px] bg-white transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'w-8 rotate-45 translate-y-[8px]' : 'w-8'}`} />
              <div className={`h-[1px] bg-[var(--color-primary)] transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-0 scale-x-0' : 'w-4 group-hover:w-8'}`} />
              <div className={`h-[1px] bg-white transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'w-8 -rotate-45 -translate-y-[8px]' : 'w-6 group-hover:w-8'}`} />
            </button>
          </div>
        </div>
      </header>
 
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[499] bg-[var(--color-black)] md:hidden overflow-hidden flex flex-col"
          >
            {/* Background Texture/Overlay */}
            <div className="absolute inset-0 bg-red-gradient opacity-10" />
            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[var(--color-primary-muted)]/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full px-10 pt-32 pb-20">
              <span className="font-mono text-[10px] text-[var(--color-primary)] uppercase tracking-[0.6em] mb-12 opacity-60">{navDirectoryLabel}</span>
              
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <div 
                    key={link.name} 
                    ref={el => { navItemsRef.current[i] = el }}
                    className="overflow-hidden"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-display font-black text-[42px] leading-none uppercase tracking-tighter italic block transition-colors
                        ${pathname === link.href ? 'text-[var(--color-primary)]' : 'text-[var(--color-white)] active:text-[var(--color-primary)]'}
                      `}
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
              </nav>
 
              <div className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--color-silver)] opacity-30">{navTechnicalDeskLabel}</span>
                  <a href={`tel:+91${navMobilePhone.replace(/\s+/g, '')}`} className="font-display font-bold text-[24px] text-white">{navMobilePhone}</a>
                </div>
                
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-6 bg-[var(--color-primary)] text-[12px] font-sans font-black uppercase tracking-[0.3em] text-center text-white shadow-primary"
                >
                  {navMobileCtaText}
                </Link>
              </div>
            </div>
 
            {/* Watermark */}
            <div className="absolute -bottom-10 -right-10 opacity-[0.03] select-none pointer-events-none">
              <span className="font-display text-[50vw] leading-none font-bold rotate-12">{brandWatermark}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
