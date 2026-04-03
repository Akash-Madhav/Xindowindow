'use client'
 
import { useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import { WPHeroData } from '@/lib/wp-types'

interface HeroProps {
  data?: WPHeroData;
}
 
export default function Hero({ data }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const chipRef = useRef<HTMLDivElement>(null)
  const headlineWordsRef = useRef<(HTMLDivElement | null)[]>([])
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctAsRef = useRef<HTMLDivElement>(null)
 
  // Fallbacks
  const chipText = data?.chipText || "System Release 1.02"
  const line1 = data?.headlineLine1 || ["Engineering"]
  const line2 = data?.headlineLine2 || ["The", "Future"]
  const subtext = data?.subtext || "Crafting high-value industrial infrastructure through state-of-the-art German uPVC technology. Architectural precision designed for the future of Indian living."
  const ctaPrimary = data?.ctaPrimaryText || "Configure Project"
  const ctaSecondary = data?.ctaSecondaryText || "Facility Tour"
  const ctaSecondaryLink = data?.ctaSecondaryLink || "/infrastructure"
  const videoUrl = data?.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-building-4475-large.mp4"
  const bgImage = data?.bgImage || "/images/hero-bg.png"
  const watermark1 = data?.watermark1 || "XINDO"
  const watermark2 = data?.watermark2 || "PRECISION"

  useGSAP(() => {
    if (!containerRef.current) return
 
    // 1. Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })
 
    // Video/Background scaling and fade
    tl.fromTo([bgImageRef.current, videoRef.current],
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 0.4, duration: 2.5, ease: 'expo.out' }
    )
 
    // Chip reveal
    tl.fromTo(chipRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=1.8'
    )
 
    // Headline Staggered Reveal
    tl.fromTo(headlineWordsRef.current,
      { y: '110%', rotate: 2 },
      { y: 0, rotate: 0, opacity: 1, stagger: 0.1, duration: 1.2 },
      '-=1.2'
    )
 
    // Subtext & Buttons
    tl.fromTo([subtextRef.current, ctAsRef.current],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1 },
      '-=0.6'
    )
 
 
    // 2. Parallax Background
    gsap.to([bgImageRef.current, videoRef.current], {
      y: '10%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })
  }, { scope: containerRef })
 
  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[800px] sm:min-h-[900px] lg:min-h-[1000px] bg-[var(--color-black)] overflow-hidden flex flex-col items-center industrial-texture"
      data-section-id="01"
    >
      {/* Cinematic Media Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale-[0.5] contrast-[1.1] scale-110"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        
        <div ref={bgImageRef} className="absolute inset-0 opacity-20 pointer-events-none">
           <Image
            src={bgImage}
            alt="Xindo Background Overlay"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover mix-blend-overlay"
          />
        </div>
 
        {/* Elite Gradient Stack */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-black)] via-transparent to-[var(--color-black)] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1)_0%,transparent_80%)] z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[var(--color-black)] to-transparent z-10" />
      </div>
 
      <div className="w-full max-w-[1400px] 2xl:max-w-[1920px] mx-auto px-5 sm:px-8 md:px-16 z-20 relative flex-grow flex flex-col items-center justify-between py-32 lg:py-48 mt-16 sm:mt-24">
 
        {/* Top: Chip & Headline Group */}
        <div className="flex flex-col items-center">
          {/* Technical Chip */}
          <div ref={chipRef} className="mb-6 opacity-0">
            <div className="px-6 py-2.5 rounded-none border-l-2 border-[var(--color-primary)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl flex items-center gap-4">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">
                {chipText}
              </span>
            </div>
          </div>
 
          <h1 className="font-display font-black text-[32px] sm:text-[60px] lg:text-[100px] xl:text-[130px] 2xl:text-[160px] 3xl:text-[200px] tracking-[-0.05em] sm:tracking-[-0.07em] text-[var(--color-white)] leading-[0.9] sm:leading-[0.85] flex flex-col items-center uppercase italic">
            <div className="flex flex-wrap justify-center overflow-hidden h-fit py-1">
              {line1.map((word, i) => (
                <div 
                  key={i} 
                  ref={el => { headlineWordsRef.current[i] = el }}
                  className="mr-[0.2em] last:mr-0 inline-block translate-y-[110%]"
                >
                  {word}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center overflow-hidden h-fit py-1 text-[var(--color-primary)]">
              {line2.map((word, i) => (
                <div 
                  key={i + line1.length} 
                  ref={el => { headlineWordsRef.current[i + line1.length] = el }}
                  className="mr-[0.2em] last:mr-0 inline-block translate-y-[110%]"
                >
                  {word}
                </div>
              ))}
            </div>
          </h1>
 
          {/* Engineering Subtext */}
          <p
            ref={subtextRef}
            className="opacity-0 mt-6 sm:mt-12 lg:mt-16 max-w-[320px] sm:max-w-[580px] lg:max-w-[800px] 2xl:max-w-[950px] font-sans font-medium text-[13px] sm:text-[17px] lg:text-[20px] 2xl:text-[26px] leading-[1.6] text-[var(--color-silver)] px-4 sm:px-0 opacity-60 italic"
          >
            {subtext}
          </p>
 
          {/* Action Group */}
          <div
            ref={ctAsRef}
            className="opacity-0 mt-10 sm:mt-16 lg:mt-20 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full sm:w-auto px-10 sm:px-0"
          >
            <button
              className="group relative overflow-hidden px-14 py-6 bg-[var(--color-primary)] text-[var(--color-white)] transition-all duration-500 w-full sm:w-auto shadow-primary active:scale-95"
              data-cursor-button="true"
            >
              <span className="relative z-10 font-sans uppercase text-[12px] sm:text-[13px] tracking-[0.4em] font-black">{ctaPrimary}</span>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-full transition-all duration-1000" />
            </button>
            <Link
              href={ctaSecondaryLink}
              className="group flex items-center justify-center text-[var(--color-silver)] hover:text-[var(--color-white)] transition-all duration-300 w-[90%] sm:w-auto py-2 border-b border-white/5 hover:border-[var(--color-primary)]"
              data-cursor="link"
            >
              <span className="font-mono uppercase text-[11px] sm:text-[12px] tracking-[0.3em] font-bold mr-6">{ctaSecondary}</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-3 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
 
      </div>
 
      {/* Technical Watermark */}
      <div className="absolute -bottom-20 left-0 w-full pointer-events-none z-0 hidden lg:block opacity-[0.02]">
        <div className="flex justify-between px-20">
          <span className="font-display font-black text-[300px] leading-none uppercase italic">{watermark1}</span>
          <span className="font-display font-black text-[300px] leading-none uppercase italic">{watermark2}</span>
        </div>
      </div>
    </section>
  )
}
