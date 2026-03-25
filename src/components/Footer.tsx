'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-red-gradient-deep border-t border-[var(--color-black-light)] pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 w-full overflow-hidden z-20 industrial-texture" data-section-id="09">

      {/* Background XINDO text - Massive & Technical */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span
          className="font-display font-bold text-[180px] md:text-[320px] leading-none text-transparent tracking-[-0.05em] opacity-[0.02] text-center w-full whitespace-nowrap italic"
          style={{ WebkitTextStroke: '1px var(--color-white)' }}
        >
          XINDO
        </span>
      </div>

      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 flex flex-col">

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-32">

          {/* Col 1: Brand & Ethos */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-4 mb-8 w-fit group">
              <div className="w-[44px] h-[44px] border-2 border-[var(--color-primary)] flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-all duration-300">
                <span className="font-display font-bold text-[22px] text-[var(--color-white)] italic">X</span>
              </div>
              <span className="font-display font-bold text-[18px] md:text-[20px] text-[var(--color-white)] uppercase tracking-tight italic">Xindo Window</span>
            </Link>
            <p className="font-sans font-normal text-[15px] leading-[1.7] text-[var(--color-silver)] mb-10 opacity-80 italic border-l border-[var(--color-primary-muted)] pl-6">
              Engineering the absolute benchmark in fenestration systems for the modern industrial age.
            </p>
            <div className="px-5 py-2.5 w-fit border border-[var(--color-black-light)] bg-[var(--color-black-soft)] backdrop-blur-md flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-white)] font-bold">Indo-German Strategic Alliance</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col">
            <div className="font-mono text-[11px] text-[var(--color-white)] uppercase tracking-[0.4em] mb-10 border-b-2 border-[var(--color-primary-muted)] pb-4 font-bold">Infrastructure</div>
            <ul className="flex flex-col gap-5">
              {[
                { name: 'About Engineering', href: '/about' },
                { name: 'Technical Standards', href: '/about#quality-standards' },
                { name: 'Production Plant', href: '/infrastructure' },
                { name: 'Project Gallery', href: '/gallery' },
                { name: 'Client Records', href: '/#testimonials' },
                { name: 'Technical Careers', href: '/contact#contact-form' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="font-sans font-semibold text-[13px] text-[var(--color-silver)] hover:text-[var(--color-white)] hover:translate-x-2 transition-all duration-300 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[var(--color-primary-muted)] rounded-full opacity-0 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Systems */}
          <div className="flex flex-col">
            <div className="font-mono text-[11px] text-[var(--color-white)] uppercase tracking-[0.4em] mb-10 border-b-2 border-[var(--color-primary-muted)] pb-4 font-bold">Systems</div>
            <ul className="flex flex-col gap-5">
              {[
                { name: 'Sliding Series', href: '/products#sliding' },
                { name: 'Performance Casement', href: '/products#casement' },
                { name: 'Architectural Special', href: '/products#special' },
                { name: 'Precision Hardware', href: '/products#accessories' },
                { name: 'Aluminum Systems', href: '/products#aluminum' },
                { name: 'Technical Glass', href: '/products#glass' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="font-sans font-semibold text-[13px] text-[var(--color-silver)] hover:text-[var(--color-white)] hover:translate-x-2 transition-all duration-300 uppercase tracking-widest flex items-center gap-2">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Operations */}
          <div className="flex flex-col">
            <div className="font-mono text-[11px] text-[var(--color-white)] uppercase tracking-[0.4em] mb-10 border-b-2 border-[var(--color-primary-muted)] pb-4 font-bold">Corporate</div>
            <div className="flex flex-col gap-6">
              <a href="tel:+919444045544" className="font-mono text-[18px] text-[var(--color-white)] font-bold hover:text-[var(--color-primary)] transition-colors duration-300 block">
                +91 94440 45544
              </a>
              <a href="https://wa.me/919444045544" className="font-sans font-bold text-[13px] text-[var(--color-primary)] hover:text-[var(--color-white)] uppercase tracking-[0.2em] transition-all duration-300 block border border-[var(--color-primary-muted)] p-4 text-center">
                Request Engineering Quote
              </a>
              <p className="font-sans font-normal text-[14px] leading-[1.7] text-[var(--color-silver)] mt-4 opacity-70">
                Corporate HQ:<br />
                No. 115/62, Canal Bank Road,<br />
                CIT Nagar, Chennai — 600035
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Regulatory & Legal */}
        <div className="border-t border-[var(--color-black-light)] pt-10 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          <span className="font-mono text-[10px] text-[var(--color-silver)] uppercase tracking-widest opacity-50">© 2026 XINDO WINDOW PVT LTD | ALL RIGHTS RESERVED</span>
          <div className="flex gap-8">
            <span className="font-mono text-[10px] text-[var(--color-primary)] uppercase tracking-[0.3em] font-bold">GS-9001 Certified Plant</span>
            <span className="font-mono text-[10px] text-[var(--color-silver)] uppercase tracking-[0.3em] opacity-50">German Technical Heritage</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
