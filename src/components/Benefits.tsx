'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: '500+', label: 'Projects' },
  { value: '10', label: 'Years' },
  { value: '200+', label: 'Clients' },
  { value: '25+', label: 'Team Members' },
];

const benefits = [
  { title: 'Maintenance Free', desc: '10-year warranty on all profiles.', icon: 'handyman' },
  { title: 'Customizable', desc: 'Cutting-edge tech tailored to your vision.', icon: 'tune' },
  { title: 'High Quality', desc: 'Thermal, acoustic, security, and weather resistant.', icon: 'workspace_premium' },
  { title: 'Eco-Friendly', desc: 'Environmentally-friendly materials.', icon: 'eco' },
  { title: 'Thermal Insulation', desc: 'Multi-chamber profiles map heat out.', icon: 'device_thermostat' },
  { title: 'Soundproofing', desc: 'Optimal noise muffling up to 40dB.', icon: 'hearing_disabled' },
  { title: 'Rotting Proof', desc: 'Never rots or corrodes in any weather.', icon: 'verified_user' },
  { title: 'Warping Proof', desc: 'Extreme climate resistant stability.', icon: 'architecture' },
  { title: 'Security', desc: 'Multi-point locking systems.', icon: 'lock' }
];

export default function Benefits() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Stats counters
    gsap.from('.stat-val', {
      scrollTrigger: {
        trigger: '.stats-row',
        start: 'top 80%',
      },
      textContent: 0,
      duration: 1.8,
      ease: 'power2.out',
      snap: { textContent: 1 },
      stagger: 0.1
    });

    // Benefit cards entrance
    gsap.from('.benefit-card', {
      scrollTrigger: {
        trigger: '.benefits-grid',
        start: 'top 80%',
      },
      opacity: 0,
      y: 24,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out'
    });
    
    // Icon entrance
    gsap.from('.benefit-icon', {
      scrollTrigger: {
        trigger: '.benefits-grid',
        start: 'top 80%',
      },
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.7)',
      stagger: 0.08
    });

  }, { scope: container });

  return (
    <section ref={container} className="pt-24 pb-16 md:pb-24 px-6 md:px-12 bg-[var(--color-slate-deep)] relative overflow-hidden">
      {/* Background SVG grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h40v40H0V0zm39 39V1h-38v38h38z%22 fill=%22%23C8102E%22 fill-rule=%22evenodd%22/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-[1320px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="caption text-[var(--color-red)] mb-4 block">WHY XINDO</span>
          <h2 className="text-[42px] font-headline text-on-surface leading-[1.25] mb-4">
            Nine Pillars of Excellence
          </h2>
          <p className="text-[var(--color-mist)] body font-light max-w-2xl mx-auto">
            Benefits of Xindo UPVC Doors and Windows
          </p>
        </div>

        {/* Stats Row */}
        <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-t border-[var(--color-charcoal)] pt-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center relative">
               {/* top gold border */}
              <div className="absolute top-[-48px] left-1/2 -translate-x-1/2 w-12 h-[2px] bg-[var(--color-red)]"></div>
              
              <div className="stat-val stat text-[var(--color-red)] mb-2">{stat.value}</div>
              <div className="label-mono text-[var(--color-mist)]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="benefit-card glass-surface p-6 md:p-8 rounded-[var(--radius-lg)] group hover:ring-1 hover:ring-[var(--color-red)] transition-all duration-300">
              <div className="benefit-icon w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-red-muted)]/20 mb-6 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:bg-[var(--color-red-muted)]/40 transition-all duration-300">
                <span className="material-symbols-outlined text-[var(--color-red)]" style={{ fontSize: '24px' }}>
                  {benefit.icon}
                </span>
              </div>
              <h4 className="font-headline text-[24px] text-[var(--color-red)] mb-3">{benefit.title}</h4>
              <p className="body-s text-[var(--color-mist)]">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
