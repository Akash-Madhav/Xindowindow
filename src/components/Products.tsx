'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const products = [
  {
    title: 'Sliding',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbAyL-zNepcjyPc0xWXqk6pj4zzoV2dD7DwSw33WeKNpE4Juj_PSG_IHsWWreacSnyHXnIvrWzNu2L6L7CgobNGGTfsVI4TRdm_VGCzzvo3lbpbpzILguO2VCA-li0SHYgZeSJ0JIpcM_vvFCSwwNs8rkZeXzm5m7zBcKzNxPq7o473CmMjBAbcs7zljbZbLEOo19B01l8uMp3jrrGM-g6ZbkQd4Glmtdp3pVdpPXRuEHvhW8TM_ptqjxKlnj7QZt5kt75RTICOv2T',
    links: ['Windows', 'Doors'],
    icon: (
      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    )
  },
  {
    title: 'Casement',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaOntmqtJIts_YO4Hd6gmXB0I0HWibvOIS-rCow3euPuSno7VmzPi3Mfrcf-WZjg0IwmrTrFiRzUbzM-9iVxD-c7pxn_Bb6cS02YfyMvUkMyZr5Nx7r96sC8ZjKJ_sSDnumU6_8n4wG5aFyDeZ0ynCr531TOt-quCku5Qwu57DTedZC6zZ582RS1mBhNfxGQnrkjaW3mhk-eGDPiSirSVTN3whVmqRlIck1PRj71-48dm5TtU8pg4r0CoqGdYhkuSi0iQu1axbAPk_',
    links: ['Windows', 'Doors'],
    icon: (
      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v18M3 12h18" />
      </svg>
    )
  },
  {
    title: 'Special',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg98G2mUqqU19YFmMnY841Gigu7P3bcubM7h2gzpdeNAo6OCorbWFf-Zz_3iK2b-4JWZ2DlyIbs1QzNA6P5pNIJJtJAXGHEwn5AZCVaLQdCDW9vnkG7uiyLr5_TcmTTyaA6UaNnjgEo5ccD7KOSiLrHjo3IuyTvszkvR9pdkdN9TnDreTA0-iKze-BmYTCNSjLpEU-73m9CO3GpY6R6F92p1aYy6r_vJnLwPpG9occrnKVuj4Q-SZ-oV-iSJllsLgCuJWVaCmzvI7O',
    links: ['Doors & Windows', 'View All'],
    icon: (
      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2A10 10 0 002 12v10a1 1 0 001 1h18a1 1 0 001-1V12A10 10 0 0012 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 12v11M2 12h20" />
      </svg>
    )
  },
  {
    title: 'Accessories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEZ0s4yd9ZUxyaTbyKBXrEjptjOtbl8jE86UcQOev2Z7n5MIJJ7sbOaPu9SPEVhfUwAYAkoTWHtsn34DBVs0OWW5ZB6FDqL8Hxeyjx2-GQYUHHz8LOO5T8yolf0hHzkaxPFFje083sw4EMknX8DzoBmV71a14QFno-2hgFC7mLFmseRr-ebWykC3MGDNgQ15Y_bfqNzv9BcenutKoVr4aWDuI8UuZb-Z2hrzFkKDl7xJHHasekG-zLniN6-S2IhTNx1s56KWkFcd-V',
    links: ['View All Hardware'],
    icon: (
      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

export default function Products() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.prod-header', {
      scrollTrigger: {
        trigger: '.prod-header',
        start: 'top 85%',
      },
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: 'power3.out'
    });

    gsap.from('.prod-card', {
      scrollTrigger: {
        trigger: '.prod-card',
        start: 'top 80%',
      },
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 px-6 md:px-12 bg-[var(--color-obsidian)] border-t border-[var(--color-slate-deep)]">
      <div className="max-w-[1320px] mx-auto">
        {/* Header Section */}
        <div className="prod-header mb-16 max-w-2xl">
          <span className="caption text-[var(--color-red)] mb-4 block">OUR PRODUCTS</span>
          <h2 className="text-[42px] font-headline text-on-surface leading-[1.25] mb-6">
            Precision-Engineered for Every Space
          </h2>
          <p className="text-[var(--color-mist)] body font-light max-w-md">
            We have the best products for you. Choose one that is close to your heart.
          </p>
        </div>

        {/* 2x2 Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          {products.map((prod, i) => (
            <div key={i} className="prod-card group relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] bg-surface-container overflow-hidden rounded-[var(--radius-lg)] cursor-pointer transition-all duration-500 hover:ring-1 hover:ring-[var(--color-red)] hover:shadow-[var(--shadow-xl)]">
              {/* Background Image */}
              <Image
                alt={prod.title}
                src={prod.image}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
              
              {/* Central Icon */}
              <div className="absolute inset-0 flex items-center justify-center -translate-y-12 opacity-80 group-hover:opacity-100 transition-opacity text-white/40">
                {prod.icon}
              </div>
              
              {/* Bottom Glass Overlay */}
              <div className="glass-surface opacity-100 md:opacity-[0.85] absolute bottom-0 left-0 w-full p-8 translate-y-[20%] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 border-none rounded-b-[var(--radius-lg)] h-[40%] md:h-[45%] lg:h-[40%] flex flex-col justify-end group-hover:justify-center">
                <h4 className="font-headline text-[32px] text-[var(--color-white)] mb-2 md:mb-4">{prod.title}</h4>
                <div className="flex flex-wrap gap-4 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 mt-2">
                  {prod.links.map((link, j) => (
                    <span key={j} className="font-sans font-light text-[12px] uppercase tracking-[0.1em] text-[var(--color-mist)] hover:text-[var(--color-white)] transition-colors">
                      {link}
                    </span>
                  ))}
                  <span className="font-sans font-bold text-[11px] uppercase tracking-[0.06em] text-[var(--color-red)] hover:text-[var(--color-red-bright)] transition-colors ml-auto flex items-center gap-1">
                    Explore
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
