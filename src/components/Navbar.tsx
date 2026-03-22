'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Framer Motion Variants
  const menuVariants: Variants = {
    closed: { clipPath: 'circle(0% at calc(100% - 40px) 40px)' },
    open: { 
      clipPath: 'circle(150% at calc(100% - 40px) 40px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, x: 40 },
    open: (i: number) => ({
      opacity: 1, x: 0,
      transition: { delay: i * 0.06 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-400 ease-in-out ${scrolled ? 'h-[64px] bg-[var(--color-black)]/85 backdrop-blur-xl border-b border-[var(--glass-border-red)]' : 'h-[80px] bg-transparent'}`}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-[80px] h-full flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-[60]">
            <svg className="w-8 h-8 text-[var(--color-red)]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z" />
            </svg>
            <span className="font-headline text-2xl font-bold tracking-tight text-[var(--color-white)] hidden sm:block">Xindo Window</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {['About Xindo', 'Products', 'Infrastructure', 'Gallery', 'Testimonials', 'Clients'].map((item) => (
              <div key={item} className="relative group">
                <Link href="#" className="nav-link text-[13px] uppercase tracking-widest text-[var(--color-off-white)] group-hover:text-[var(--color-white)] transition-colors">
                  {item}
                </Link>
                <div className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[var(--color-red)] group-hover:w-full transition-all duration-300 ease-in-out"></div>
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 xl:gap-6">
            <a href="tel:+919444045544" className="hidden xl:block text-[var(--color-white)] font-mono text-[13px] hover:text-[var(--color-red)] transition-colors">
              +91 94440 45544
            </a>
            <button className="px-5 xl:px-6 py-2 border border-[var(--color-red)] text-[var(--color-red)] font-bold uppercase tracking-widest text-[11px] rounded-[var(--radius-md)] hover:bg-[var(--color-red)] hover:text-white hover:shadow-[var(--shadow-glow)] transition-all">
              Request Quote
            </button>
          </div>

          {/* Hamburger Mobile */}
          <button 
            className="md:hidden z-[60] w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
            <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-[var(--color-black)] z-50 flex flex-col px-6 pt-24 pb-12"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {['Company Profile', 'Products', 'Infrastructure', 'Gallery', 'Testimonials', 'Career', 'Contact Us'].map((item, i) => (
                <motion.div custom={i} variants={itemVariants} key={item}>
                  <Link href="#" className="font-headline text-[32px] text-[var(--color-white)]" onClick={() => setMenuOpen(false)}>
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <motion.a custom={7} variants={itemVariants} href="tel:+919444045544" className="font-mono text-xl text-[var(--color-white)] py-4 border-b border-[var(--color-charcoal)]">
                +91 94440 45544
              </motion.a>
              <motion.button custom={8} variants={itemVariants} className="w-full py-4 bg-transparent border border-[#25D366] text-[#25D366] font-bold uppercase tracking-widest text-[13px] rounded-sm mt-4">
                Chat on WhatsApp
              </motion.button>
              <motion.button custom={9} variants={itemVariants} className="w-full py-4 bg-[var(--color-red)] text-white font-bold uppercase tracking-widest text-[13px] rounded-sm">
                Request Quote
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
