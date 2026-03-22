'use client'

import { useRef, useState } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'

interface ProcessStep {
  num: string
  title: string
  desc: string
}

const DEFAULT_STEPS = [
  { num: '01', title: 'Survey', desc: 'We survey your space and recommend the ideal uPVC profile for your requirements.' },
  { num: '02', title: 'Selection', desc: 'Choose from our complete range of sliding, casement, or special uPVC solutions.' },
  { num: '03', title: 'Fabrication', desc: 'Indo-German precision manufacturing to your exact specification.' },
  { num: '04', title: 'Installation', desc: 'Professional installation within 4 days of windows arriving at site.' }
]

interface ProcessProps {
  id?: string
  tag?: string
  title?: string
  steps?: ProcessStep[]
}

export default function Process({ 
  id = "05", 
  tag = "Our Process", 
  steps = DEFAULT_STEPS 
}: ProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(true)

  useGSAP(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)

    if (!containerRef.current || !lineRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        end: 'bottom 80%',
        scrub: 1.2
      }
    })

    // Draw horizontal line based on scroll
    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, transformOrigin: 'left', ease: 'none' }
    )
  }, { dependencies: [steps], scope: containerRef })

  return (
    <section 
      ref={containerRef}
      className={`relative bg-[var(--color-black)] py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 w-full min-h-screen flex items-center overflow-hidden z-10`}
      data-section-id={id}
    >
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto flex flex-col items-center w-full">
        
        <div className="flex items-center gap-4 mb-24 md:mb-40">
          <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
          <span className="font-mono text-[11px] uppercase text-[var(--color-red)] tracking-[0.25em]">{tag}</span>
          <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
        </div>

        {/* Desktop Process Timeline */}
        <div className="hidden md:grid grid-cols-4 gap-8 w-full relative">
          {/* Connecting Line */}
          <div className="absolute top-[8px] left-[10%] w-[80%] h-[1px] bg-[rgba(255,255,255,0.05)] z-0" />
          <div ref={lineRef} className="absolute top-[8px] left-[10%] w-[80%] h-[1px] bg-[var(--color-red)] z-0" />

          {steps.map((step, idx) => (
            <div key={idx} className="group relative z-10 flex flex-col px-4 cursor-default items-center">
              {/* Step Dot */}
              <div className="w-4 h-4 rounded-full border border-[var(--color-red)] bg-[var(--color-black)] mb-12 group-hover:bg-[var(--color-red)] group-hover:shadow-[0_0_20px_rgba(200,16,46,0.6)] transition-all duration-500 ease-out" />
              
              <div className="font-display text-[72px] font-extralight text-[var(--color-red)] opacity-[0.08] group-hover:opacity-20 transition-opacity mb-4 leading-none text-center">
                {step.num}
              </div>
              
              <h3 className="font-display text-[22px] sm:text-[26px] md:text-[32px] 2xl:text-[38px] font-light text-[var(--color-white)] mb-4 text-center tracking-tight">
                {step.title}
              </h3>
              
              <p className="font-sans text-[13px] sm:text-[14px] md:text-[16px] font-light text-[var(--color-silver)] text-center px-4 leading-[1.65]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Process Timeline */}
        <div className="md:hidden flex flex-col w-full relative pl-4">
          <div className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-[rgba(200,16,46,0.2)] z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-row items-start mb-16 last:mb-0">
              <div className="w-7 h-7 rounded-full border border-[var(--color-red)] bg-[#0A0A0B] flex items-center justify-center shrink-0 mt-1 shadow-[0_0_15px_rgba(200,16,46,0.2)]">
                <div className="w-2 h-2 rounded-full bg-[var(--color-red)]" />
              </div>
              
              <div className="flex flex-col ml-8">
                <div className="font-mono text-[42px] font-light text-[var(--color-red)] opacity-20 mb-2 leading-none">
                  {step.num}
                </div>
                <h3 className="font-display text-[28px] font-light text-[var(--color-white)] mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-[16px] font-light text-[var(--color-silver)] leading-[1.7]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
