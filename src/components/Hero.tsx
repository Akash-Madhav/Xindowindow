'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo('.hero-text-1', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.2")
      .fromTo('.hero-text-2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
      .fromTo('.hero-subtext', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.6")
      .fromTo('.hero-btn', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 }, "-=0.4")
      .fromTo('.hero-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.2");

  }, { scope: container });

  return (
    <main ref={container} className="min-h-screen flex flex-col md:flex-row relative z-10">
      {/* Left Side: Content Area (55%) */}
      <section className="w-full md:w-[55%] min-h-[100svh] md:min-h-screen bg-[var(--color-obsidian)] flex items-center px-8 md:px-24 pt-32 pb-20 z-10 relative">
        <div className="max-w-2xl relative z-10 pt-16 md:pt-0">
          {/* Label Chip */}
          <div className="hero-label inline-flex items-center px-4 py-1.5 mb-8 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md">
            <span className="caption text-[var(--color-red)]">Indo-German Excellence</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-headline font-bold leading-[0.9] tracking-tighter mb-6 pt-2">
            <span className="hero-text-1 text-[var(--color-red)] block">The Window</span>
            <span className="hero-text-2 text-[var(--color-white)] block">&amp; Door Experts</span>
          </h2>

          {/* Body Text */}
          <p className="hero-subtext body-l text-[var(--color-mist)] mb-12 max-w-lg">
            Premium uPVC Windows &amp; Doors — engineered with German precision, crafted for Indian homes.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <button className="hero-btn px-8 py-4 bg-[var(--color-red)] text-white font-bold uppercase tracking-widest text-[13px] rounded-sm transition-all hover:bg-[var(--color-red-bright)] hover:-translate-y-[2px] hover:shadow-[var(--shadow-glow)] active:translate-y-0 active:scale-98 active:bg-[var(--color-red-deep)]">
              Explore Products
            </button>
            <button className="hero-btn px-8 py-4 bg-transparent border border-[var(--color-red)] text-[var(--color-red)] hover:bg-[var(--color-red)] hover:text-white font-bold uppercase tracking-widest text-[13px] rounded-sm transition-all">
              Request Quote
            </button>
          </div>

          {/* Floating Glass Cards */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
            <div className="hero-card p-4 md:p-5 rounded-sm glass-surface">
              <span className="block text-[var(--color-white)] text-2xl md:text-3xl font-headline font-bold mb-1">500+</span>
              <span className="label-mono text-[9px] md:text-[11px] text-[var(--color-mist)]">Projects</span>
            </div>
            <div className="hero-card p-4 md:p-5 rounded-sm glass-surface">
              <span className="block text-[var(--color-white)] text-2xl md:text-3xl font-headline font-bold mb-1">10</span>
              <span className="label-mono text-[9px] md:text-[11px] text-[var(--color-mist)]">Warranty</span>
            </div>
            <div className="hero-card p-4 md:p-5 rounded-sm glass-surface">
              <span className="block text-[var(--color-white)] text-2xl md:text-3xl font-headline font-bold mb-1">ISO</span>
              <span className="label-mono text-[9px] md:text-[11px] text-[var(--color-mist)]">Certified</span>
            </div>
          </div>
        </div>
        
        {/* Subtle noise texture */}
         <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      </section>

      {/* Right Side: Visual Area (45%) */}
      {/* Desktop View */}
      <section className="hidden md:block w-[45%] h-screen relative overflow-hidden bg-[var(--color-slate-deep)]">
        <div className="absolute inset-0" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}>
          <Image
            alt="Premium window installation"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAK6Ug5iCXWvyCjSWLVIHjrDnEpLEKcrVoUwviri40vryuJ8Qbq_ey3VT_eCIUfQOGhRlfY0CTxG86jdtLfreTui_tnab6M9XCBYMzS8J-qGz5DsSjmM4gleumAkwa_cx9aJij0QiRn_n0JVlm8oWfN-idWPISR2o9EQ2lMEQlayhS88yb-gl4sA5-XEU-Vum05pKB6_XGcS3KCv2NO57ZOaWb7znz9vSazzHqF7GZFQnyXNzN5LECAJ0Vj7O5ian6EZ-hEoJSmOAR"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-obsidian)] via-transparent to-transparent"></div>
        </div>
      </section>

      {/* Mobile view fallback */}
      <div className="md:hidden w-full h-[400px] relative">
        <Image
          alt="Premium window installation"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy7QFL4v5oSvw1axzV6aEtJSN1g-3rsissMrGVmTHCkldMAbr27HvNpNERke35kW72yZiW9fhPoxqnp0DNJyCCg2IRQNWttik8bMsV1Hj6SmALXNHAeByanAGvOnFrTb-6349lK88216WG0DI7VDKNAWR1b3ww0ZJcMUD_b71gkARqWm5hcVJwSqlv9PCyxsOaS9PpkYALTysantkRGcsgvk0qgELMnK0lYJfW0CTN4_6zl1-hn1IKw-ZAhdzrKXKet7npyyzLRdE4"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)] to-transparent"></div>
      </div>
    </main>
  );
}
