'use client'
 
import { useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
 
interface ProcessStep {
  num: string
  title: string
  desc: string
}
 
const DEFAULT_STEPS = [
  { num: '01', title: 'Survey', desc: 'Spatially-precise site analysis and profile selection protocol.' },
  { num: '02', title: 'Selection', desc: 'Bespoke configuration of uPVC sliding and casement systems.' },
  { num: '03', title: 'Fabrication', desc: 'Automated CNC manufacturing with 0.5mm precision tolerance.' },
  { num: '04', title: 'Implementation', desc: 'Certified technical installation and structural validation.' }
]
 
interface ProcessProps {
  id?: string
  tag?: string
  title?: string
  steps?: ProcessStep[]
}
 
export default function Process({
  id = "05",
  tag = "Technical Workflow",
  steps = DEFAULT_STEPS
}: ProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
 
  useGSAP(() => {
    if (!containerRef.current || !lineRef.current) return
 
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1
      }
    })
 
    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, transformOrigin: 'left', ease: 'none' }
    )
 
    tl.fromTo('.process-node',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.25, ease: 'back.out(2)' },
      0
    )
  }, { scope: containerRef })
 
  return (
    <section
      ref={containerRef}
      className="relative bg-[var(--color-black)] py-32 md:py-48 px-6 md:px-16 w-full min-h-screen flex items-center overflow-hidden industrial-texture"
      data-section-id={id}
    >
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto flex flex-col items-center w-full">
 
        <div className="flex items-center gap-4 sm:gap-6 mb-20 md:mb-48">
          <div className="w-10 sm:w-16 h-[1px] bg-[var(--color-primary)]" />
          <span className="font-mono text-[9px] sm:text-[10px] uppercase text-[var(--color-primary)] tracking-[0.4em] sm:tracking-[0.6em] font-black italic">{tag}</span>
          <div className="w-10 sm:w-16 h-[1px] bg-[var(--color-primary)]" />
        </div>
 
        {/* Cinematic Timeline */}
        <div className="relative w-full">
          
          {/* Base Track */}
          <div className="absolute top-[30px] left-[5%] w-[90%] h-[1px] bg-white/5 z-0 hidden md:block" />
          <div 
             ref={lineRef}
             className="absolute top-[30px] left-[5%] w-[90%] h-[1.5px] bg-[var(--color-primary)] z-0 origin-left hidden md:block" 
          />
 
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-12 w-full relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center px-4">
                
                {/* Interaction Node */}
                <div className="process-node relative w-12 h-12 md:w-14 md:h-14 bg-[var(--color-black)] border border-white/10 flex items-center justify-center mb-8 md:mb-20 transition-all duration-700 group-hover:border-[var(--color-primary)] group-hover:bg-[rgba(200,16,46,0.1)] group-hover:shadow-primary pointer-events-none">
                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[var(--color-primary)] rounded-full animate-pulse group-hover:scale-150 transition-transform" />
                   {/* Massive Backdrop Number */}
                   <div className="absolute -top-8 md:-top-12 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                      <span className="font-display text-[80px] md:text-[120px] font-black italic leading-none">{step.num}</span>
                   </div>
                </div>

                <h3 className="font-display font-black text-[22px] md:text-[32px] 2xl:text-[40px] text-white uppercase italic tracking-tighter mb-4 md:mb-8 group-hover:text-[var(--color-primary)] transition-colors">
                  {step.title}
                </h3>
                
                <p className="font-sans font-medium text-[13px] md:text-[16px] text-[var(--color-silver)] leading-relaxed italic opacity-50 group-hover:opacity-100 transition-opacity max-w-[280px] md:max-w-none">
                  {step.desc}
                </p>

                {/* Tech Label */}
                <div className="mt-6 md:mt-10 px-4 py-1.5 border border-white/5 bg-white/[0.02] opacity-60 md:opacity-0 group-hover:opacity-100 transition-all duration-500 md:translate-y-4 group-hover:translate-y-0">
                   <span className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-silver)]">PHASE_VALIDATED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
 
      </div>
 
      {/* Decorative Ambience */}
      <div className="absolute -bottom-20 left-0 w-full pointer-events-none opacity-[0.02] flex justify-between px-20">
         <span className="font-display text-[200px] font-black italic">CH-05</span>
         <span className="font-display text-[200px] font-black italic">PROTOCOL</span>
      </div>
    </section>
  )
}
