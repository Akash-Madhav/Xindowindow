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


  useGSAP(() => {
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
      id={id.toLowerCase().replace(/\s+/g, '-')}
      ref={containerRef}
      className={`relative bg-red-gradient py-20 sm:py-32 md:py-40 px-5 sm:px-8 md:px-16 w-full min-h-screen flex items-center overflow-hidden z-10 industrial-texture`}
      data-section-id={id}
    >
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto flex flex-col items-center w-full">

        <div className="flex items-center gap-4 mb-24 md:mb-40">
          <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
          <span className="font-mono text-[11px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-medium">{tag}</span>
          <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
        </div>

        {/* Desktop Process Timeline */}
        <div className="hidden md:grid grid-cols-4 gap-12 w-full relative">
          {/* Connecting Line */}
          <div className="absolute top-[8px] left-[10%] w-[80%] h-[1px] bg-[var(--color-black-light)] z-0" />
          <div ref={lineRef} className="absolute top-[8px] left-[10%] w-[80%] h-[1px] bg-[var(--color-primary)] z-0" />

          {steps.map((step, idx) => (
            <div key={idx} className="group relative z-10 flex flex-col px-4 cursor-default items-center">
              {/* Step Dot */}
              <div className="w-5 h-5 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-black)] mb-12 group-hover:bg-[var(--color-primary)] group-hover:shadow-[0_0_24px_rgba(200,16,46,0.8)] transition-all duration-700 ease-[luxurious]" />

              <div className="font-display font-bold text-[84px] text-[var(--color-primary)] opacity-[0.06] group-hover:opacity-15 transition-opacity mb-2 leading-none text-center italic tracking-tighter">
                {step.num}
              </div>

              <h3 className="font-display font-bold text-[24px] sm:text-[28px] md:text-[32px] 2xl:text-[42px] text-white mb-6 text-center tracking-tight uppercase italic">
                {step.title}
              </h3>

              <p className="font-sans text-[14px] sm:text-[15px] md:text-[17px] font-normal text-[var(--color-silver)] text-center px-4 leading-relaxed opacity-80">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Process Timeline */}
        <div className="md:hidden flex flex-col w-full relative pl-6">
          <div className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-[var(--color-black-light)] z-0" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-row items-start mb-20 last:mb-0">
              <div className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-black-mid)] flex items-center justify-center shrink-0 mt-1 shadow-[0_0_20px_rgba(200,16,46,0.3)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
              </div>

              <div className="flex flex-col ml-8">
                <div className="font-display font-bold text-[56px] text-[var(--color-primary)] opacity-15 mb-2 leading-none italic tracking-tighter">
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-[32px] text-white mb-4 uppercase italic">
                  {step.title}
                </h3>
                <p className="font-sans text-[17px] font-normal text-[var(--color-silver)] leading-relaxed opacity-80">
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
