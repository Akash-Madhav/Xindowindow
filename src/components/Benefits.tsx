'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'

interface BenefitItem {
  title: string
  desc: string
}

const DEFAULT_BENEFITS = [
  { title: 'Maintenance Free', desc: '10-year warranty' },
  { title: 'Customizable', desc: 'cutting-edge technology' },
  { title: 'High Quality', desc: 'thermal, soundproof, security, weather' },
  { title: 'Eco-Friendly', desc: 'environmentally-friendly materials' },
  { title: 'Thermal Insulation', desc: 'multi-chamber profiles' },
  { title: 'Soundproofing', desc: 'noise muffling' },
  { title: 'Rotting Proof', desc: 'rot-resistant uPVC' },
  { title: 'Warping Proof', desc: 'extreme climate resistance' },
  { title: 'Security', desc: 'multi-point locking systems' }
]

interface BenefitsProps {
  id?: string
  tag?: string
  title: string
  items?: BenefitItem[]
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

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
      
      iteration += 1 / 3 // Increase per 30ms interval -> ~1200ms total
    }, 30)

    return () => clearInterval(interval)
  }, [text, inView])

  return displayText
}

export default function Benefits({ 
  id = "04", 
  tag = "Benefits", 
  title, 
  items = DEFAULT_BENEFITS 
}: BenefitsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const svgLinesRef = useRef<SVGRectElement>(null)
  
  const [inView, setInView] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  const scrambledText = useScrambleText(title, inView)

  useGSAP(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)

    if (!containerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        onEnter: () => setInView(true),
      }
    })

    // SVG Blueprint Draw
    if (svgLinesRef.current) {
      tl.fromTo(svgLinesRef.current,
        { strokeDashoffset: 4000 },
        { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, 0
      )
    }

    // Grid entrance
    const cards = gsap.utils.toArray('.benefit-card')
    
    if (window.matchMedia('(pointer: coarse)').matches) {
      tl.fromTo(cards, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power4.out' }, 0.4
      )
    } else {
      tl.fromTo(cards, 
        { rotateY: 90, opacity: 0, y: 40 },
        { rotateY: 0, opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power4.out' }, 0.4
      )
    }
  }, { dependencies: [items, title], scope: containerRef })

  return (
    <section 
      id={id.toLowerCase().replace(/\s+/g, '-')}
      ref={containerRef}
      className={`relative bg-red-gradient py-20 sm:py-32 md:py-40 px-5 sm:px-8 md:px-16 w-full overflow-hidden z-10 industrial-texture border-y border-[var(--color-black-light)]`}
      data-section-id={id}
    >
      {/* Blueprint SVG Background (Cinematic overlay) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] flex items-center justify-center">
        <svg width="120%" height="120%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="var(--color-primary)" strokeWidth="0.75" strokeDasharray="4000">
            <rect ref={svgLinesRef} x="2.5%" y="5%" width="95%" height="90%" />
            <line x1="500" y1="30" x2="500" y2="570" />
            <line x1="25" y1="300" x2="975" y2="300" />
            <circle cx="500" cy="300" r="200" />
          </g>
        </svg>
      </div>

      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto relative z-10 flex flex-col items-center w-full">
        
        <div className="flex items-center gap-4 mb-10">
          <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
          <span className="font-mono text-[11px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-medium">{tag}</span>
          <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
        </div>

        <h2 ref={headerRef} className="font-display font-bold text-[32px] sm:text-[44px] md:text-[60px] 2xl:text-[76px] tracking-tight text-[var(--color-white)] text-center mb-16 sm:mb-24 min-h-[60px] max-w-[900px] uppercase italic">
          {scrambledText}
        </h2>

         {/* Grid container with 3D perspective */}
        <div 
          ref={gridRef}
          style={{ perspective: isTouch ? 'none' : '2000px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[var(--color-black-light)] border border-[var(--color-black-light)] w-full"
        >
          {items.map((benefit, i) => (
            <div 
              key={i} 
              className="benefit-card group relative bg-[var(--color-black-mid)] p-10 sm:p-12 md:p-14 lg:p-16 flex flex-col gap-8 hover:bg-[var(--color-black-soft)] transition-all duration-700 ease-[luxurious] transform-style-3d origin-center border border-transparent hover:border-[var(--color-primary-muted)]"
            >
              <div className="font-mono text-[28px] text-[var(--color-primary)] opacity-30 group-hover:opacity-100 transition-all duration-500 font-bold italic">0{i+1}</div>
              <div className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-[22px] sm:text-[24px] md:text-[32px] text-[var(--color-white)] leading-tight uppercase tracking-tight">{benefit.title}</h3>
                <p className="font-sans text-[14px] md:text-[15px] text-[var(--color-silver)] uppercase tracking-[0.12em] leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{benefit.desc}</p>
              </div>
              <div className="absolute top-12 right-12">
                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-primary)] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-700" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
