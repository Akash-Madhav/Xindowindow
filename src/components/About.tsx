'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.about-label', {
      scrollTrigger: {
        trigger: '.about-label',
        start: 'top 85%',
      },
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: 'power3.out'
    });

    gsap.from('.about-headline', {
      scrollTrigger: {
        trigger: '.about-headline',
        start: 'top 85%',
      },
      opacity: 0,
      y: 32,
      duration: 0.8,
      delay: 0.1,
      ease: 'power3.out'
    });

    gsap.from('.about-subtext', {
      scrollTrigger: {
        trigger: '.about-subtext',
        start: 'top 85%',
      },
      opacity: 0,
      y: 16,
      duration: 0.6,
      delay: 0.2,
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-16 md:py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-slate-mid)]">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Content Section */}
          <div className="lg:col-span-7 order-2 lg:order-1 mt-12 lg:mt-0">
            <span className="about-label caption text-[var(--color-red)] mb-4 block">WHO WE ARE</span>
            <div className="h-[1px] w-[120px] bg-[var(--color-red)] opacity-50 mb-8 hidden md:block"></div>
            
            <h2 className="about-headline text-4xl md:text-[42px] font-headline text-on-surface leading-[1.25] mb-8 tracking-tight">
              Leading uPVC Manufacturer — <br className="hidden md:block" />
              <span className="text-[var(--color-off-white)]">Built on an Indo-German Legacy</span>
            </h2>
            
            <div className="about-subtext space-y-8 text-[var(--color-mist)] body font-light leading-relaxed">
              <p>
                Born from the synergy of German engineering precision and the soulful aesthetic of Indian architectural luxury, Xindo Window redefines the boundary between interior and exterior. Our uPVC profiles are designed to withstand the harshest tropical climates while maintaining the delicate silence of a sanctuary.
              </p>
              <p>
                Every window and door system we produce undergoes rigorous testing in our state-of-the-art facilities. We utilize a unique blend of lead-free formulations and high-performance polymers to deliver windows that offer superior thermal insulation and acoustic dampening, echoing the highest European standards.
              </p>
            </div>
            
            <div className="mt-12">
              <a className="group inline-flex items-center gap-4 text-[var(--color-red)] font-sans font-bold uppercase tracking-[0.12em] text-[13px] hover:text-[var(--color-red-bright)] transition-all duration-300" href="#">
                Company Profile
                <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Visual Section */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative w-full h-full flex justify-center">
            <div className="relative p-4 md:p-8 w-full max-w-md mx-auto">
              {/* Decorative Brackets */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-[1px] border-r-[1px] border-[var(--color-red)] opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[1px] border-l-[1px] border-[var(--color-red)] opacity-60"></div>
              
              {/* Main Image */}
              <div className="aspect-[4/5] overflow-hidden bg-surface-container-lowest relative rounded-sm shadow-xl">
                <Image 
                  alt="Modern architectural window installation" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT-QRL3i4Rkw-SyPjcNNB8FgZTEN6aM080re2fzGEejpsbgxe3jVNydcZ5r-H5FZ5JQR5ZpwFxpHn8NG38CcP3aq0JojWIbfHmrytbXGOuqRy9u9bVd7sM7fEQT3yRH4atrpPIzKWAfQiQB103oykp41uiK6lKkFidmD_mJ4QRElUot5NML2vngW4IJrwLl4o-xe0Yry3NiCAWQrK_ygI0jPEvOOoiW4cDF4YrwDBX2c35Hke9eIB1mbuEf-Dx_eFN9A5VAjh38nSV" 
                  fill
                  className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                />
                
                {/* Floating Badge */}
                <div className="glass-surface absolute bottom-[-20px] left-[-20px] md:bottom-8 md:left-[-40px] w-28 h-28 flex flex-col items-center justify-center rounded-sm">
                  <svg className="w-8 h-8 text-[var(--color-red)] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-white)]">ISO Certified</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
