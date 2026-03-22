'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Consultation & Site Audit',
    desc: 'Our acoustic and thermal engineers assess your space, wind load requirements, and architectural vision.'
  },
  {
    num: '02',
    title: 'Precision Fabrication',
    desc: 'Profiles are cut, reinforced with galvanized steel, and fusion-welded in our state-of-the-art facility.'
  },
  {
    num: '03',
    title: 'Surgical Installation',
    desc: 'Expert technicians install the systems with specialized sealants to ensure 100% weather and sound proofing.'
  },
  {
    num: '04',
    title: 'Handover & Warranty',
    desc: 'Rigorous final inspection followed by the handover of your 10-year comprehensive warranty certificate.'
  }
];

export default function Process() {
  const container = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Reveal steps individually as user scrolls
    const stepElements = gsap.utils.toArray('.process-step');
    
    stepElements.forEach((step: any, i) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
        },
        opacity: 0.3,
        x: 40,
        duration: 0.6,
        ease: 'power2.out',
      });
      
      // Highlight effect when scrolling past
      gsap.to(step.querySelector('.step-num'), {
        scrollTrigger: {
          trigger: step,
          start: 'top center',
          end: 'bottom center',
          toggleClass: 'text-[var(--color-red)]'
        }
      });
      
      gsap.to(step.querySelector('.step-line'), {
        scrollTrigger: {
          trigger: step,
          start: 'top center',
          end: 'bottom center',
          toggleClass: 'bg-[var(--color-red)] w-full'
        }
      });
    });

  }, { scope: container });

  return (
    <section ref={container} className="pt-16 pb-24 px-6 md:px-12 bg-[var(--color-black)] relative border-t border-[var(--color-slate-deep)]">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* Left: Sticky Context */}
          <div className="relative">
            <div className="md:sticky md:top-32 max-w-sm">
              <span className="caption text-[var(--color-red)] mb-4 block">OUR PROCESS</span>
              <h2 className="text-[42px] font-headline text-on-surface leading-[1.25] mb-6">
                The Anatomy of Installation
              </h2>
              <p className="text-[var(--color-mist)] body font-light">
                From structural analysis to the final polish, our 4-step deployment maintains absolute quality control.
              </p>
              
              <div className="mt-12 w-24 h-[1px] bg-[var(--color-charcoal)]"></div>
            </div>
          </div>
          
          {/* Right: Scrolling Steps */}
          <div className="space-y-16 mt-8 md:mt-0 pb-16">
            {steps.map((step, i) => (
              <div key={i} className="process-step group relative pl-8 border-l border-[var(--color-charcoal)]">
                 {/* Animated Line Indicator */}
                <div className="step-line absolute left-[-1px] top-0 w-[1px] h-0 bg-[var(--color-red)] transition-all duration-300"></div>

                <div className="step-num font-mono text-[32px] text-[var(--color-charcoal)] mb-4 transition-colors duration-300">
                  {step.num}
                </div>
                <h4 className="font-headline text-2xl text-[var(--color-white)] mb-3">{step.title}</h4>
                <p className="body-s text-[var(--color-mist)]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
