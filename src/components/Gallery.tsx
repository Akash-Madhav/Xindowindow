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
}

const DEFAULT_PROJECTS = [
  { id: 1, name: 'Royal Splendour Developers', height: 'h-[300px]' },
  { id: 2, name: 'Pacifica Companies', height: 'h-[400px]' },
  { id: 3, name: 'Pacifica Aurum', height: 'h-[250px]' },
  { id: 4, name: 'KG Foundations Pvt. Ltd.', height: 'h-[380px]' },
  { id: 5, name: 'Janani Homes', height: 'h-[280px]' },
  { id: 6, name: 'Jain Housing', height: 'h-[450px]' },
  { id: 7, name: 'Endee Shelters', height: 'h-[320px]' },
  { id: 8, name: 'Elegant Constructions', height: 'h-[290px]' },
  { id: 19, name: 'Arun Excello', height: 'h-[360px]' },
]

interface GalleryProps {
  id?: string
  tag?: string
  title?: string
  projects?: ProjectItem[]
}

export default function Gallery({ 
  id = "05", 
  tag = "Inspiration", 
  title = "PROJECTS", 
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

    const items = gsap.utils.toArray('.gallery-item')
    tl.fromTo(items,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.05, duration: 1, ease: 'power4.out' }
    )

    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        y: '-15%',
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

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [selectedId])

  // Keybindings for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedId === null) return
      if (e.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedId])

  const selectedProject = projects.find(p => p.id === selectedId)

  return (
    <section 
      id={id.toLowerCase().replace(/\s+/g, '-')}
      ref={containerRef}
      className={`relative bg-red-gradient py-20 sm:py-32 md:py-40 px-5 sm:px-8 md:px-16 min-h-screen flex items-center overflow-hidden z-10 industrial-texture border-y border-[var(--color-black-light)]`}
      data-section-id={id}
    >
      {/* Background Cinematic Text */}
      <div 
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <span 
          className="font-display font-bold text-[18vw] md:text-[14vw] leading-none text-transparent tracking-tight opacity-[0.02] uppercase italic"
          style={{ WebkitTextStroke: '1px var(--color-white)' }}
        >
          {title}
        </span>
      </div>

      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto relative z-10 w-full flex flex-col items-center">
        
        <div className="flex items-center gap-4 mb-20">
          <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
          <span className="font-mono text-[11px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-medium">{tag}</span>
          <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
        </div>
        
        {/* Masonry Layout Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-img-${project.id}`}
              className={`gallery-item group relative overflow-hidden mb-6 bg-[var(--color-black-soft)] cursor-pointer ${project.height} border border-[var(--color-black-light)] hover:border-[var(--color-primary-muted)] transition-colors duration-500`}
              onClick={() => setSelectedId(project.id)}
            >
              {/* Image filter treatments */}
              <div className="absolute inset-0 z-0 scale-100 group-hover:scale-110 transition-all duration-[2s] ease-[luxurious]">
                {project.image && (
                  <Image 
                    src={project.image} 
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 contrast-[1.1] grayscale-[0.2] group-hover:grayscale-0"
                  />
                )}
              </div>
              
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 z-10 pointer-events-none" />
              
              <div className="absolute bottom-8 left-8 right-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[luxurious]">
                <div className="w-8 h-[2px] bg-[var(--color-primary)] mb-4" />
                <span className="font-display font-bold text-[24px] md:text-[28px] text-white tracking-tight block mb-2 uppercase italic">{project.name}</span>
                <span className="font-mono text-[10px] text-[var(--color-primary)] uppercase tracking-[0.2em] font-bold">Showcase Profile</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox shared element */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.96)] backdrop-blur-3xl px-6 py-12"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              layoutId={`project-img-${selectedProject.id}`}
              className="relative w-full max-w-[1200px] aspect-[16/9] bg-[#0A0A0B] shadow-2xl flex flex-col overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full h-full bg-[#111] flex items-center justify-center relative overflow-hidden">
                {selectedProject.image && (
                  <Image 
                    src={selectedProject.image} 
                    alt={selectedProject.name}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-70"
                    priority
                  />
                )}
                 <div className="flex flex-col items-center gap-6 relative z-10">
                   <div className="w-16 h-px bg-[var(--color-primary)] animate-pulse" />
                   <span className="text-[var(--color-silver)] font-sans uppercase tracking-widest text-[12px]">{selectedProject.name}</span>
                 </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black to-transparent"
              >
                <div className="font-display text-[32px] md:text-[48px] text-white mb-2 leading-tight">{selectedProject.name}</div>
                <div className="font-sans text-[12px] text-[var(--color-silver)] uppercase tracking-[0.3em]">Project Documentation / India</div>
              </motion.div>

              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group"
              >
                <span className="group-hover:scale-90 transition-transform">✕</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
