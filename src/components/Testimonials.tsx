'use client'
 
import { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
 
interface Testimonial {
  author: string;
  text: string;
}
 
interface TestimonialsProps {
  tag: string;
  items: Testimonial[];
}
 
export default function Testimonials({
  tag,
  items = []
}: TestimonialsProps) {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
 
  const nextSlide = useCallback(() => {
    if (items.length === 0) return
    setCurrent(prev => (prev + 1) % items.length)
  }, [items.length])
 
  useGSAP(() => {
    if (!quoteRef.current || items.length === 0) return
 
    gsap.fromTo(quoteRef.current.querySelectorAll('.word'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: 'luxurious' }
    )
  }, { dependencies: [current], scope: containerRef })
 
  useEffect(() => {
    if (items.length === 0) return
    const timer = setInterval(nextSlide, 8000)
    return () => clearInterval(timer)
  }, [nextSlide, items.length])
 
  if (items.length === 0) return null;
 
  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--color-black)] py-32 md:py-48 px-6 md:px-16 w-full overflow-hidden industrial-texture"
      data-section-id="06"
    >
      {/* Background Iconography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02]">
         <span className="font-display font-black text-[300px] md:text-[500px] leading-none text-white italic tracking-tighter uppercase whitespace-nowrap select-none">
           VERDICT
         </span>
      </div>
 
      <div className="max-w-[1200px] 2xl:max-w-[1600px] mx-auto relative z-10 flex flex-col items-center">
        
        <div className="flex items-center gap-6 mb-32">
          <div className="w-16 h-[1px] bg-[var(--color-primary)]" />
          <span className="font-mono text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">{tag}</span>
          <div className="w-16 h-[1px] bg-[var(--color-primary)]" />
        </div>
 
        <div className="relative w-full flex flex-col items-center justify-center min-h-[400px]">
          <div ref={quoteRef} className="text-center">
             <h2 className="font-display font-black text-[32px] md:text-[56px] 2xl:text-[88px] text-white leading-[1] uppercase italic tracking-tighter mb-16 flex flex-wrap justify-center gap-x-4 md:gap-x-6">
                {items[current].text.split(' ').map((word, i) => (
                  <span key={`${current}-${i}`} className="word inline-block">{word}</span>
                ))}
             </h2>
 
              <div className="flex flex-col items-center gap-6">
                 <span className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.4em] text-[var(--color-primary)] font-black italic">{items[current].author}</span>
                 <div className="w-12 h-[2px] bg-[var(--color-primary)] shadow-primary" />
              </div>
          </div>
        </div>
 
        {/* Navigation Indicator */}
        <div className="mt-32 flex gap-4">
           {items.map((_, i) => (
             <button 
               key={i} 
               onClick={() => setCurrent(i)}
               className={`h-1 transition-all duration-700 ${current === i ? 'w-16 bg-[var(--color-primary)] shadow-primary' : 'w-4 bg-white/10'}`}
             />
           ))}
        </div>
      </div>
 
      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 opacity-20 hidden md:block">
         <span className="font-mono text-[9px] uppercase tracking-[0.4em] font-black text-white/50">XINDO_REF_6.01</span>
      </div>
    </section>
  )
}
