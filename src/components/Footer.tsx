'use client'
 
import Link from 'next/link'
 
export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-black)] pt-20 sm:pt-32 pb-16 w-full z-20 border-t border-white/5 overflow-x-hidden" data-section-id="09">

      {/* Absolute Cinematic Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.015] w-full text-center overflow-hidden">
        <span
          className="font-display font-black text-[120px] sm:text-[200px] md:text-[450px] leading-none text-transparent tracking-[-0.05em] uppercase italic inline-block"
          style={{ WebkitTextStroke: '1px md:WebkitTextStroke: 2px var(--color-white)' }}
        >
          XINDO
        </span>
      </div>

      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-10 md:px-16 relative z-10 flex flex-col">

        {/* Main Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 sm:gap-20 lg:gap-12 xl:gap-16 mb-24 sm:mb-40">

          {/* Brand & Mission - 4 Cols */}
          <div className="lg:col-span-4 flex flex-col gap-10 min-w-0">
            <Link href="/" className="flex items-center gap-4 sm:gap-6 w-fit group">
              <div className="w-10 h-10 sm:w-14 sm:h-14 border-2 border-[var(--color-primary)] flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-all duration-500">
                <span className="font-display font-black text-[18px] sm:text-[24px] text-white italic">X</span>
              </div>
              <span className="font-display font-black text-[18px] sm:text-[20px] text-white uppercase italic tracking-tighter">Xindo Window</span>
            </Link>
            
            <p className="font-sans font-medium text-[15px] sm:text-[16px] leading-[1.8] text-[var(--color-silver)] opacity-60 italic border-l-2 border-[var(--color-primary)] pl-6 sm:pl-10">
              Engineering the absolute benchmark in high-value fenestration systems. Architectural precision crafted for the future of Indian living.
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-[var(--color-white)] font-black italic">System Online: release 1.02</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-[var(--color-white)] font-black italic">Quality Index: certified</span>
              </div>
            </div>
          </div>

          {/* Navigation Sections - 5 Cols */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-10 min-w-0">
            <div className="flex flex-col gap-8 sm:gap-10">
              <span className="font-mono text-[11px] text-[var(--color-primary)] uppercase tracking-[0.6em] font-black italic">Infrastructure</span>
              <ul className="flex flex-col gap-5 sm:gap-6">
                {[
                  { name: 'Engineering', href: '/about' },
                  { name: 'Standards', href: '/about#quality' },
                  { name: 'Plant', href: '/infrastructure' },
                  { name: 'Gallery', href: '/gallery' },
                  { name: 'Technical', href: '/contact' }
                ].map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="font-sans font-black text-[12px] sm:text-[13px] text-[var(--color-silver)] hover:text-white hover:translate-x-3 transition-all duration-500 uppercase tracking-widest flex items-center gap-4 group">
                      <div className="w-0 h-[1.5px] bg-[var(--color-primary)] group-hover:w-4 transition-all" />
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-8 sm:gap-10">
              <span className="font-mono text-[11px] text-[var(--color-primary)] uppercase tracking-[0.6em] font-black italic">Systems</span>
              <ul className="flex flex-col gap-5 sm:gap-6">
                {[
                  { name: 'Sliding', href: '/products#sliding' },
                  { name: 'Casement', href: '/products#casement' },
                  { name: 'Special', href: '/products#special' },
                  { name: 'Hardware', href: '/products#hardware' },
                  { name: 'Aluminum', href: '/products#aluminum' }
                ].map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="font-sans font-black text-[12px] sm:text-[13px] text-[var(--color-silver)] hover:text-white hover:translate-x-3 transition-all duration-500 uppercase tracking-widest flex items-center gap-4 group">
                      <div className="w-0 h-[1.5px] bg-[var(--color-primary)] group-hover:w-4 transition-all" />
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Operations Hub - 3 Cols */}
          <div className="lg:col-span-3 flex flex-col gap-8 min-w-0 overflow-hidden">
            <span className="font-mono text-[11px] text-[var(--color-primary)] uppercase tracking-[0.6em] font-black italic">Operations</span>
            <div className="flex flex-col gap-8">
              <a href="tel:+919444045544" className="font-display text-[20px] lg:text-[24px] xl:text-[28px] text-white font-black italic hover:text-[var(--color-primary)] transition-colors tracking-tight">
                +91 94440 45544
              </a>
              <a 
                href="https://wa.me/919444045544" 
                className="group relative bg-[var(--color-primary)] text-white text-center py-5 sm:py-6 px-6 font-sans font-black text-[10px] xl:text-[11px] uppercase tracking-[0.3em] xl:tracking-[0.4em] shadow-primary overflow-hidden"
              >
                <span className="relative z-10 italic">Request Protocol</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </a>
              <div className="flex flex-col gap-2 opacity-40">
                <span className="font-mono text-[10px] text-white uppercase tracking-widest font-black">Corporate HQ</span>
                <p className="font-sans text-[12px] sm:text-[13px] text-[var(--color-silver)] font-medium leading-relaxed italic break-words">
                  No. 115/62, Canal Bank Road,<br />
                  CIT Nagar, Chennai — 600035
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Regulatory Bottom */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col items-center md:items-start gap-2">
             <span className="font-mono text-[8px] sm:text-[9px] text-[var(--color-silver)] uppercase tracking-[0.4em] opacity-30 font-black text-center md:text-left">© 2026 XINDO WINDOW PRIVATE LIMITED</span>
             <span className="font-mono text-[8px] sm:text-[9px] text-[var(--color-primary)] uppercase tracking-[0.4em] font-black italic">GERMAN TECHNICAL HERITAGE</span>
          </div>
          
          <div className="flex items-center gap-8 sm:gap-12">
            <div className="flex flex-col items-center md:items-end gap-1">
               <span className="font-display text-[14px] sm:text-[16px] text-white font-black italic">GS-9001</span>
               <span className="font-mono text-[7px] sm:text-[8px] text-[var(--color-silver)] uppercase tracking-widest opacity-30">CERTIFIED</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col items-center md:items-end gap-1">
               <span className="font-display text-[14px] sm:text-[16px] text-white font-black italic">LUMI-AIR</span>
               <span className="font-mono text-[7px] sm:text-[8px] text-[var(--color-silver)] uppercase tracking-widest opacity-30">AIR-TIGHT PROTOCOL</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
