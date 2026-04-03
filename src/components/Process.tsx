'use client'
 
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
 
interface ProcessProps {
  id?: string;
  tag: string;
  steps: {
    id: string;
    title: string;
    desc: string;
    status: string;
  }[];
  stepStatusLabel?: string;
}
 
export default function Process({ 
    id, 
    tag, 
    steps,
    stepStatusLabel = "WORKFLOW_PHASE"
}: ProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
 
  useGSAP(() => {
    if (!containerRef.current) return
 
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    })
 
    tl.from('.process-step', {
      x: -40,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'luxurious'
    })
 
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      { 
        scaleY: 1, 
        duration: 3, 
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true
        }
      }
    )
  }, { scope: containerRef })
 
  return (
    <section 
      id={id}
      ref={containerRef}
      className="relative py-24 md:py-48 bg-[var(--color-black)] overflow-hidden"
    >
      {/* Decorative Watermark */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.03] select-none font-display font-black text-[280px] leading-none text-white -translate-y-1/4 translate-x-1/4 italic rotate-12">
         WORKFLOW
      </div>
 
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-6 md:px-16 relative z-10">
        <div className="flex flex-col gap-10 mb-20 md:mb-32">
          <div className="flex items-center gap-6">
            <div className="w-12 h-[1px] bg-[var(--color-primary)]" />
            <span className="font-mono text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">{tag}</span>
          </div>
        </div>
 
        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 top-0 w-[1px] h-full bg-white/5" />
          <div 
            ref={lineRef}
            className="absolute left-0 top-0 w-[1px] h-full bg-[var(--color-primary)] origin-top z-10" 
          />
 
          <div className="flex flex-col gap-24 md:gap-40 pl-8 md:pl-20">
            {steps.map((step, i) => (
              <div 
                key={i}
                className="process-step group relative"
              >
                <div className="absolute left-[-42px] md:left-[-102px] top-4 w-5 h-5 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-black)] z-20 group-hover:bg-[var(--color-primary)] transition-colors duration-500" />
                
                <div className="flex flex-col gap-6 md:gap-10">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] text-[var(--color-primary)] opacity-40 uppercase tracking-[0.4em] font-black">{step.status || `${stepStatusLabel}_${step.id}`}</span>
                    <h3 className="font-display font-black text-[36px] md:text-[64px] lg:text-[84px] text-white leading-none uppercase italic group-hover:text-[var(--color-primary)] transition-colors duration-700 tracking-tighter">
                      {step.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 max-w-[800px]">
                    <p className="font-sans font-medium text-[15px] md:text-[18px] text-[var(--color-silver)] leading-relaxed opacity-60">
                      {step.desc}
                    </p>
                    <div className="hidden lg:block h-[1px] flex-1 bg-white/5" />
                    <span className="font-mono text-[11px] text-[var(--color-silver)]/40 font-black uppercase">PH-{step.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_20%_80%,rgba(200,16,46,0.02)_0%,transparent_70%)] pointer-events-none" />
    </section>
  )
}
