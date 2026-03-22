'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'

const PROJECTS = [
  { id: 1, name: 'Royal Splendour Developers', height: 'h-[300px]' },
  { id: 2, name: 'Pacifica Companies', height: 'h-[400px]' },
  { id: 3, name: 'Pacifica Aurum', height: 'h-[250px]' },
  { id: 4, name: 'KG Foundations Pvt. Ltd.', height: 'h-[380px]' },
  { id: 5, name: 'Janani Homes', height: 'h-[280px]' },
  { id: 6, name: 'Jain Housing', height: 'h-[450px]' },
  { id: 7, name: 'Endee Shelters', height: 'h-[320px]' },
  { id: 8, name: 'Elegant Constructions', height: 'h-[290px]' },
  { id: 9, name: 'Arun Excello', height: 'h-[360px]' },
]

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    })

    const items = gsap.utils.toArray('.gallery-item')
    tl.fromTo(items,
      { opacity: 0, y: -30, rotation: -2 },
      { opacity: 1, y: 0, rotation: 0, stagger: 0.08, duration: 0.7, ease: 'luxurious' }
    )

    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        y: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }

    return () => { tl.kill() }
  }, [])

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
      if (e.key === 'ArrowRight') setSelectedId(prev => (prev! < 9 ? prev! + 1 : 1))
      if (e.key === 'ArrowLeft') setSelectedId(prev => (prev! > 1 ? prev! - 1 : 9))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedId])

  const selectedProject = PROJECTS.find(p => p.id === selectedId)

  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--color-black-mid)] py-24 px-2 md:px-12 min-h-[100svh] overflow-hidden"
      data-section-id="05"
    >
      {/* Background Parallax Text */}
      <div 
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <span 
          className="font-display font-light text-[180px] leading-none text-transparent tracking-widest opacity-[0.03]"
          style={{ WebkitTextStroke: '1px var(--color-white)' }}
        >
          PROJECTS
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 w-full">
        {/* Section divider logic left out here as it's a separate component */}
        
        {/* Masonry Layout Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-[2px] w-full">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-img-${project.id}`}
              className={`gallery-item group relative overflow-hidden mb-[2px] bg-[#111] cursor-none ${project.height}`}
              onClick={() => setSelectedId(project.id)}
              data-cursor-image="true"
            >
              {/* Image filter treatments */}
              <div className="absolute inset-0 z-0 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[var(--color-black)]" />
              {/* Red overlay hover */}
              <div className="absolute inset-0 bg-[rgba(200,16,46,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 z-20 translate-y-[20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <span className="font-display text-[24px] text-white tracking-wide block leading-[1.2]">{project.name}</span>
                <span className="font-sans text-[11px] text-[var(--color-silver)] uppercase tracking-widest">Chennai</span>
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.92)] backdrop-blur-[40px] px-4 py-12"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              layoutId={`project-img-${selectedProject.id}`}
              className="relative w-full max-w-[1000px] aspect-[4/3] bg-[#0A0A0B] shadow-2xl flex flex-col"
              // Prevent click on image from closing lightbox
              onClick={e => e.stopPropagation()}
              // Swipe to close or navigate
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100) setSelectedId(prev => (prev! > 1 ? prev! - 1 : 9))
                if (info.offset.x < -100) setSelectedId(prev => (prev! < 9 ? prev! + 1 : 1))
                if (info.offset.y > 100) setSelectedId(null) // Swipe down to close
              }}
            >
              {/* Fake Image Placeholder */}
              <div className="w-full h-full bg-[#111] flex items-center justify-center">
                 <span className="text-[var(--color-silver)] font-sans">Full {selectedProject.name} Image</span>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-[-64px] left-0 right-0 flex justify-between items-center px-4"
              >
                <div>
                  <div className="font-display text-[28px] text-white mb-1">{selectedProject.name}</div>
                  <div className="font-sans text-[12px] text-[var(--color-silver)] uppercase tracking-widest">Chennai</div>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedId(prev => (prev! > 1 ? prev! - 1 : 9))}
                    className="w-12 h-12 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                  >
                    ←
                  </button>
                  <button 
                    onClick={() => setSelectedId(prev => (prev! < 9 ? prev! + 1 : 1))}
                    className="w-12 h-12 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                  >
                    →
                  </button>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Close instruction top right */}
            <button className="absolute top-6 right-6 text-white font-sans text-[13px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
              Close [Esc]
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
