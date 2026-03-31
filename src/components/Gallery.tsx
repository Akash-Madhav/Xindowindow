'use client'
 
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
 
interface ProjectItem {
  id: number
  name: string
  height: string
  image?: string
  location?: string
  system?: string
}
 
const DEFAULT_PROJECTS = [
  { id: 1, name: 'Royal Splendour', location: 'Chennai', system: 'VEKA', height: 'h-[400px]', image: '/images/gallery/sapphire.png' },
  { id: 2, name: 'Pacifica Companies', location: 'Bangalore', system: 'ALUK', height: 'h-[300px]', image: '/images/gallery/marina.png' },
  { id: 3, name: 'Pacifica Aurum', location: 'Hyderabad', system: 'TOTALIS', height: 'h-[450px]', image: '/images/gallery/skyline.png' },
  { id: 4, name: 'KG Foundations', location: 'Coimbatore', system: 'SLEEK', height: 'h-[320px]', image: '/images/gallery/emerald.png' },
  { id: 5, name: 'Janani Homes', location: 'Chennai', system: 'VEKA', height: 'h-[380px]', image: '/images/gallery/azure.png' },
  { id: 6, name: 'Jain Housing', location: 'Mumbai', system: 'ALUK', height: 'h-[280px]', image: '/images/gallery/ivory.png' }
]
 
interface GalleryProps {
  id?: string
  tag?: string
  title?: string
  projects?: ProjectItem[]
}
 
export default function Gallery({ 
  id = "05", 
  tag = "Project Portfolio", 
  title = "SHOWCASE", 
  projects = DEFAULT_PROJECTS 
}: GalleryProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)
 
  useGSAP(() => {
    if (!containerRef.current) return
 
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    })
 
    tl.fromTo('.gallery-item',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 1.2, ease: 'luxurious' }
    )
 
    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        y: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    }
  }, { dependencies: [projects], scope: containerRef })
 
  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [selectedId])
 
  const selectedProject = projects.find(p => p.id === selectedId)
 
  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--color-black)] py-32 md:py-48 px-6 md:px-16 min-h-screen items-center overflow-hidden z-10 industrial-texture"
      data-section-id={id}
    >
      {/* Absolute Cinematic Text */}
      <div ref={bgTextRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.02]">
        <span className="font-display font-black text-[25vw] leading-none text-transparent tracking-tighter uppercase italic" style={{ WebkitTextStroke: '2px var(--color-white)' }}>
          {title}
        </span>
      </div>
 
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto relative z-10 w-full flex flex-col items-center">
        
        <div className="flex items-center gap-6 mb-24">
          <div className="w-16 h-[1px] bg-[var(--color-primary)]" />
          <span className="font-mono text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">{tag}</span>
          <div className="w-16 h-[1px] bg-[var(--color-primary)]" />
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 w-full space-y-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`gallery-item group relative overflow-hidden bg-[var(--color-black-soft)] cursor-pointer ${project.height} border border-white/5 transition-all duration-700 hover:border-[var(--color-primary-muted)]`}
              onClick={() => setSelectedId(project.id)}
              data-cursor="image"
            >
              <div className="absolute inset-0 z-0 group-hover:scale-110 transition-all duration-[3s]">
                {project.image && (
                   <Image 
                    src={project.image} 
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx < 2}
                    className="object-cover opacity-40 group-hover:opacity-80 transition-all duration-1000 grayscale-[0.8] group-hover:grayscale-0 contrast-[1.2]"
                  />
                )}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-80 z-10" />
              
              <div className="absolute bottom-10 left-10 right-10 z-20 flex flex-col gap-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <div className="flex items-center gap-4">
                   <span className="font-mono text-[9px] text-[var(--color-primary)] font-black uppercase tracking-[0.4em] italic">{project.system} SYSTEM</span>
                   <div className="w-8 h-[1px] bg-white/20" />
                   <span className="font-mono text-[9px] text-white/40 font-black uppercase tracking-[0.4em] italic">{project.location}</span>
                </div>
                <h3 className="font-display font-black text-[28px] md:text-[36px] text-white leading-none uppercase italic tracking-tighter">{project.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Lightbox */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--color-black)]/98 backdrop-blur-3xl p-6 lg:p-20"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[1600px] aspect-video bg-[var(--color-black-soft)] shadow-3xl flex flex-col lg:flex-row overflow-hidden border border-white/5"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex-1 relative bg-black/40 overflow-hidden">
                {selectedProject.image && (
                   <Image 
                    src={selectedProject.image} 
                    alt={selectedProject.name}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-80"
                  />
                )}
                {/* Tech Detail Overlay */}
                <div className="absolute top-10 left-10 flex flex-col gap-2">
                   <span className="font-mono text-[10px] text-[var(--color-primary)] font-black tracking-[0.6em] italic">REGISTRY_ID: PROJECT-{selectedProject.id}</span>
                   <div className="w-16 h-[2px] bg-[var(--color-primary)] shadow-primary" />
                </div>
              </div>
              
              <div className="w-full lg:w-[450px] p-12 lg:p-16 flex flex-col justify-center bg-[var(--color-black)] industrial-texture border-l border-white/5">
                <div className="flex flex-col gap-10">
                   <div className="flex flex-col gap-4">
                      <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--color-primary)] font-black italic">Asset Detail</span>
                      <h2 className="font-display font-black text-[42px] md:text-[56px] text-white leading-[0.9] uppercase italic tracking-tighter">{selectedProject.name}</h2>
                   </div>
 
                   <div className="flex flex-col gap-8 opacity-60">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                         <span className="font-mono text-[10px] uppercase font-black tracking-widest">Location</span>
                         <span className="font-sans font-bold text-[14px] text-white italic">{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                         <span className="font-mono text-[10px] uppercase font-black tracking-widest">Core System</span>
                         <span className="font-sans font-bold text-[14px] text-white italic">{selectedProject.system}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                         <span className="font-mono text-[10px] uppercase font-black tracking-widest">Validation</span>
                         <span className="font-sans font-bold text-[14px] text-white italic">CERTIFIED</span>
                      </div>
                   </div>
 
                   <button className="bg-[var(--color-primary)] text-white w-full py-6 font-sans font-black text-[11px] uppercase tracking-[0.4em] shadow-primary hover:bg-white hover:text-black transition-all italic">Inquire Project Tech</button>
                </div>
              </div>
 
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-10 right-10 p-5 border border-white/10 hover:border-[var(--color-primary)] transition-all bg-black/40 backdrop-blur-xl"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
