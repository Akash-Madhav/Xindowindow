'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap-config'

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Survey',
    desc: 'We survey your space and recommend the ideal uPVC profile for your requirements.'
  },
  {
    num: '02',
    title: 'Selection',
    desc: 'Choose from our complete range of sliding, casement, or special uPVC solutions.'
  },
  {
    num: '03',
    title: 'Fabrication',
    desc: 'Indo-German precision manufacturing to your exact specification.'
  },
  {
    num: '04',
    title: 'Installation',
    desc: 'Professional installation within 4 days of windows arriving at site.'
  }
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const isTouch = typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : true

  useEffect(() => {
    if (!containerRef.current || !lineRef.current || isTouch) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1
      }
    })

    // Draw horizontal line based on scroll
    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, transformOrigin: 'left', ease: 'none' }
    )

    return () => { tl.kill() }
  }, [isTouch])

  return (
    <section 
      ref={containerRef}
      className="bg-[var(--color-black)] py-[64px] md:py-[120px] px-6 md:px-12 w-full relative"
      data-section-id="05"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        
        <div className="flex items-center gap-4 mb-20 md:mb-32">
          <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
          <span className="font-mono text-[11px] uppercase text-[var(--color-red)] tracking-[0.18em]">Our Process</span>
          <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
        </div>

        {/* Desktop Process Timeline */}
        <div className="hidden md:grid grid-cols-4 gap-4 w-full relative">
          {/* Connecting Line */}
          <div className="absolute top-[8px] left-[5%] w-[90%] h-[1px] bg-[rgba(200,16,46,0.2)] z-0" />
          <div ref={lineRef} className="absolute top-[8px] left-[5%] w-[90%] h-[1px] bg-[var(--color-red)] z-0" />

          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className="group relative z-10 flex flex-col px-4 cursor-default">
              {/* Step Dot */}
              <div className="w-4 h-4 rounded-full border border-[var(--color-red)] bg-[var(--color-black)] mx-auto mb-10 group-hover:bg-[var(--color-red)] group-hover:shadow-[0_0_12px_rgba(200,16,46,0.8)] transition-all duration-300 ease-out" />
              
              <div className="font-mono text-[64px] font-light text-[var(--color-red)] opacity-10 group-hover:opacity-20 transition-opacity mb-2 leading-none text-center">
                {step.num}
              </div>
              
              <h3 className="font-display text-[22px] font-medium text-[var(--color-white)] mb-3 text-center">
                {step.title}
              </h3>
              
              <p className="font-sans text-[13px] font-light text-[var(--color-silver)] text-center px-4 leading-[1.6]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Process Timeline */}
        <div className="md:hidden flex flex-col w-full relative pl-2 py-4">
          <div className="absolute left-[14px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--color-red)] to-transparent opacity-50 z-0" />
          
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-row items-start mb-12 last:mb-0">
              <div className="w-6 h-6 rounded-full border border-[var(--color-red)] bg-[var(--color-black)] flex items-center justify-center shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-[var(--color-red)]" />
              </div>
              
              <div className="flex flex-col ml-6">
                <div className="font-mono text-[36px] font-light text-[var(--color-red)] opacity-20 mb-1 leading-none">
                  {step.num}
                </div>
                <h3 className="font-display text-[24px] font-medium text-[var(--color-white)] mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-[14px] font-light text-[var(--color-silver)] leading-[1.6]">
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
