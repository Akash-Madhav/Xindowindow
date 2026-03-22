'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap-config'

const BENEFITS = [
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

function useScrambleText(text: string, inView: boolean) {
  const [displayText, setDisplayText] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  useEffect(() => {
    if (!inView) return

    let iteration = 0
    let interval: ReturnType<typeof setInterval>
    
    interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index]
            if (letter === ' ') return ' '
            return chars[Math.floor(Math.random() * chars.length)]
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

export default function Benefits() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const svgLinesRef = useRef<SVGRectElement>(null)
  
  const [inView, setInView] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  const scrambledText = useScrambleText("Nine Reasons Xindo is India's Premium Choice", inView)

  useEffect(() => {
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
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'luxurious' }, 0.4
      )
    } else {
      tl.fromTo(cards, 
        { rotateY: 90, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'luxurious' }, 0.4
      )
    }

    return () => { tl.kill() }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--color-black-soft)] py-24 md:py-32 px-6 md:px-12 w-full overflow-hidden min-h-[100svh] z-10"
      data-section-id="04"
    >
      {/* Blueprint SVG Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="var(--color-red)" strokeWidth="1" strokeDasharray="4000">
            <rect ref={svgLinesRef} x="5%" y="10%" width="90%" height="80%" className="blueprint-path" />
            <line x1="500" y1="60" x2="500" y2="540" />
            <line x1="50" y1="300" x2="950" y2="300" />
            <circle cx="500" cy="300" r="100" />
            <rect x="250" y="150" width="100" height="100" />
            <rect x="650" y="150" width="100" height="100" />
            <rect x="250" y="350" width="100" height="100" />
            <rect x="650" y="350" width="100" height="100" />
          </g>
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
        
        <div className="flex items-center gap-4 mb-4">
          <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
          <span className="font-mono text-[11px] uppercase text-[var(--color-red)] tracking-[0.18em]">Benefits</span>
          <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
        </div>

        <h2 ref={headerRef} className="font-mono font-normal text-[24px] md:text-[32px] tracking-[-0.01em] text-[var(--color-white)] text-center mb-16 h-[40px]">
          {scrambledText}
        </h2>

         {/* Grid container with 3D perspective */}
        <div 
          ref={gridRef}
          style={{ perspective: isTouch ? 'none' : '1000px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-[2px] w-full max-w-[1200px]"
        >
          {BENEFITS.map((benefit, i) => (
            <div 
              key={i} 
              className="benefit-card group relative bg-[rgba(255,255,255,0.02)] p-8 md:p-10 flex flex-col gap-6 md:hover:bg-[rgba(200,16,46,0.08)] border border-transparent md:hover:border-[rgba(200,16,46,0.3)] md:hover:shadow-[0_0_40px_rgba(200,16,46,0.1)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:hover:-translate-y-2 transform-style-3d origin-center"
            >
              <div className="font-mono text-[24px] text-[var(--color-red)] opacity-60 group-hover:opacity-100 transition-opacity">0{i+1}</div>
              <div>
                <h3 className="font-display text-[22px] md:text-[28px] text-[var(--color-white)] mb-2">{benefit.title}</h3>
                <p className="font-sans text-[13px] md:text-[14px] text-[var(--color-silver)] uppercase tracking-wider">{benefit.desc}</p>
              </div>
              <div className="absolute top-8 right-8 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 flex items-center justify-center">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-red)] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
