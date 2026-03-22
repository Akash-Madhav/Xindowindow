'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-[#070707] border-t border-[rgba(200,16,46,0.15)] pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 w-full overflow-hidden z-20" data-section-id="09">
      
      {/* Background XINDO text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span 
          className="font-display font-light text-[140px] md:text-[240px] leading-none text-transparent tracking-widest opacity-[0.03] text-center w-full whitespace-nowrap"
          style={{ WebkitTextStroke: '1px var(--color-white)' }}
        >
          XINDO
        </span>
      </div>

      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 relative z-10 flex flex-col">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Col 1 */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-4 mb-6 w-fit">
              <div className="w-[36px] h-[36px] border border-[var(--color-red)] flex items-center justify-center">
                <span className="font-display text-[18px] text-[var(--color-white)]">X</span>
              </div>
              <span className="font-display font-medium text-[16px] md:text-[18px] text-[var(--color-white)]">Xindo Window</span>
            </Link>
            <p className="font-sans font-light text-[14px] leading-[1.6] text-[var(--color-silver)] mb-8">
              "The Window Door Experts"<br/>
              Give Your Home The Best.
            </p>
            <div className="px-3 py-1.5 w-fit border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex items-center gap-2">
              <span className="text-[var(--color-red)] text-[10px]">⬡</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#9A9A98]">Indo-German Partnership</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col">
            <h4 className="font-mono text-[10px] text-[var(--color-white)] uppercase tracking-widest mb-6 border-b border-[#2E2E33] pb-4">Company</h4>
            <ul className="flex flex-col gap-4">
              {['About', 'Certifications', 'Infrastructure', 'Gallery', 'Testimonials', 'Career'].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase()}`} className="font-sans font-light text-[14px] text-[var(--color-silver)] hover:text-[var(--color-red)] transition-colors duration-200">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col">
            <h4 className="font-mono text-[10px] text-[var(--color-white)] uppercase tracking-widest mb-6 border-b border-[#2E2E33] pb-4">Products</h4>
            <ul className="flex flex-col gap-4">
              {['Sliding Windows', 'Sliding Doors', 'Casement Windows', 'Casement Doors', 'Special Windows', 'Accessories'].map((link) => (
                <li key={link}>
                  <Link href="#products" className="font-sans font-light text-[14px] text-[var(--color-silver)] hover:text-[var(--color-red)] transition-colors duration-200">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col">
            <h4 className="font-mono text-[10px] text-[var(--color-white)] uppercase tracking-widest mb-6 border-b border-[#2E2E33] pb-4">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+919444045544" className="font-sans font-normal text-[16px] text-[var(--color-white)] hover:text-[var(--color-red)] transition-colors duration-200 block">
                +91 94440 45544
              </a>
              <a href="https://wa.me/919444045544" className="font-sans font-light text-[14px] text-[var(--color-silver)] hover:text-[#25D366] transition-colors duration-200 block">
                WhatsApp Connect
              </a>
              <p className="font-sans font-light text-[14px] leading-[1.6] text-[var(--color-silver)] mt-4">
                No. 115/62, Canal Bank Road,<br/>
                CIT Nagar, Chennai — 600035
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2E2E33] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          <span className="font-mono text-[11px] text-[var(--color-silver)]">© 2026 XINDO WINDOW PVT LTD</span>
          <span className="font-mono text-[11px] text-[var(--color-silver)] uppercase tracking-widest text-[#9A9A98]">Engineered for Excellence</span>
        </div>
      </div>
    </footer>
  )
}
