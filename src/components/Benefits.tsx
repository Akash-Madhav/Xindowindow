'use client'
 
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
 
interface BenefitItem {
  title: string
  desc: string
}
 
const DEFAULT_BENEFITS = [
  { title: 'Zero Maintenance', desc: '10-year certified technical warranty' },
  { title: 'Bespoke Engineering', desc: 'Cutting-edge customization protocols' },
  { title: 'Elite Performance', desc: 'Thermal, acoustic, and security validation' },
  { title: 'Eco-Dynamics', desc: 'Environmentally-sustainable materials' },
  { title: 'Thermal Shield', desc: 'Advanced multi-chamber profile systems' },
  { title: 'Acoustic Mastery', desc: 'High-performance noise attenuation' },
  { title: 'Oxidation Proof', desc: 'Corrosion and rot-resistant surfaces' },
  { title: 'Climate Resilience', desc: 'Engineered for extreme environmental stress' },
  { title: 'Secure-Lock', desc: 'Multi-point reinforced security locking' }
]
 
interface BenefitsProps {
  id?: string
  tag?: string
  title: string
  items?: BenefitItem[]
}
 
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+'
 
function useScrambleText(text: string, inView: boolean) {
  const [displayText, setDisplayText] = useState('')
 
  useEffect(() => {
    if (!inView) return
 
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index]
            if (letter === ' ') return ' '
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          })
          .join('')
      )
 
      if (iteration >= text.length) {
        clearInterval(interval)
      }
      
      iteration += 1 / 4
    }, 30)
 
    return () => clearInterval(interval)
  }, [text, inView])
 
  return displayText
}
 
export default function Benefits({ 
  id = "04", 
  tag = "Technical Advantage", 
  title, 
  items = DEFAULT_BENEFITS 
}: BenefitsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
 
  const scrambledText = useScrambleText(title, inView)
 
  useGSAP(() => {
    if (!containerRef.current) return
 
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        onEnter: () => setInView(true),
      }
    })
 
    tl.fromTo('.benefit-card', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'luxurious' }
    )
  }, { scope: containerRef })
 
  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--color-black)] py-32 md:py-48 px-6 md:px-16 w-full overflow-hidden industrial-texture"
      data-section-id={id}
    >
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto relative z-10 flex flex-col items-center">
        
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-[var(--color-primary)]" />
          <span className="font-mono text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">{tag}</span>
        </div>
 
        <h2 className="font-display font-black text-[42px] md:text-[64px] 2xl:text-[96px] tracking-tighter text-[var(--color-white)] text-center mb-24 min-h-[120px] max-w-[1000px] uppercase italic leading-[0.9]">
          {scrambledText}
        </h2>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5 border border-white/5 w-full">
          {items.map((benefit, i) => (
            <div 
              key={i} 
              className="benefit-card group relative bg-[var(--color-black)] p-12 sm:p-16 lg:p-20 flex flex-col gap-10 hover:bg-[var(--color-black-soft)] transition-all duration-700 ease-in-out overflow-hidden"
              data-cursor="image"
            >
              {/* Massive Watermark */}
              <div className="absolute top-10 right-10 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] group-hover:translate-x-4 transition-all duration-1000">
                <span className="font-display text-[156px] font-black italic leading-none selection:bg-transparent">0{i+1}</span>
              </div>
 
              <div className="flex flex-col gap-6 relative z-10">
                <div className="w-8 h-[2px] bg-[var(--color-primary)] mb-2" />
                <h3 className="font-display font-black text-[24px] md:text-[32px] text-[var(--color-white)] leading-tight uppercase tracking-tight italic group-hover:text-[var(--color-primary)] transition-colors">{benefit.title}</h3>
                <p className="font-sans font-medium text-[14px] md:text-[16px] text-[var(--color-silver)] uppercase tracking-[0.2em] leading-relaxed opacity-40 group-hover:opacity-100 transition-opacity">{benefit.desc}</p>
              </div>
 
              {/* Hover Technical Detail */}
              <div className="absolute bottom-10 right-10 flex items-center gap-4 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-primary)] font-bold">CERTIFIED</span>
                <svg className="w-5 h-5 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Dynamic Background Red Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,16,46,0.03)_0%,transparent_70%)] pointer-events-none" />
    </section>
  )
}
