'use client'

import { motion } from 'framer-motion'

const CLIENT_LOGOS = [
  { name: 'Developer A', logo: '/images/logos/client1.png' },
  { name: 'Developer B', logo: '/images/logos/client2.png' },
  { name: 'Developer C', logo: '/images/logos/client3.png' },
  { name: 'Developer D', logo: '/images/logos/client4.png' },
  { name: 'Architect E', logo: '/images/logos/client5.png' },
  { name: 'Architect F', logo: '/images/logos/client6.png' }
]

const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', detail: 'Quality Management' },
  { name: 'DIN Standard', detail: 'German Engineering' },
  { name: 'GS Certified', detail: 'Safety & Quality' }
]

export default function TrustSection() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-black)] border-t border-[var(--color-black-light)] industrial-texture">
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 sm:px-8 md:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Logo Marquee / Grid */}
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-[var(--color-red)]" />
              <span className="font-mono text-[11px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-medium">Strategic Partners</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
              {CLIENT_LOGOS.map((client, i) => (
                <div key={i} className="group relative aspect-video flex items-center justify-center bg-[var(--color-black-soft)] border border-[var(--color-black-light)] grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 p-6">
                  {/* Placeholder for actual logos */}
                  <span className="font-display font-bold text-[14px] text-[var(--color-white)] tracking-widest uppercase opacity-20 group-hover:opacity-100 transition-opacity">{client.name}</span>
                  <div className="absolute inset-0 border border-[var(--color-red-muted)] opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Quality */}
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-[var(--color-red)]" />
              <span className="font-mono text-[11px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-medium">Technical Standards</span>
            </div>

            <div className="flex flex-col gap-6">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="flex items-center justify-between p-8 bg-[var(--color-black-soft)] border-l-2 border-[var(--color-red)] hover:bg-[var(--color-black-mid)] transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-[20px] sm:text-[24px] text-[var(--color-white)] uppercase tracking-tight italic">{cert.name}</span>
                    <span className="font-mono text-[10px] uppercase text-[var(--color-silver)] tracking-[0.2em] mt-1 opacity-60">{cert.detail}</span>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center border border-[var(--color-black-light)] group-hover:border-[var(--color-red-muted)] transition-colors">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-red)]" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
