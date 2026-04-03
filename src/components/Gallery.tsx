'use client'
 
import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
 
interface ProjectItem {
  id: string;
  name: string;
  categoryId: string;
  image: string;
  detail: string;
}
 
interface GalleryProps {
  id?: string;
  tag: string;
  title: string;
  projects: ProjectItem[];
}
 
export default function Gallery({ id, tag, title, projects }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Dynamic categories from projects
  const uniqueCategories = ["all", ...Array.from(new Set(projects.map(p => p.categoryId)))]
  const [filter, setFilter] = useState("all")
 
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.categoryId === filter)
 
  useGSAP(() => {
    if (!containerRef.current) return
 
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    })
 
    tl.from('.gallery-title', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'luxurious'
    })
  }, { scope: containerRef })
 
  return (
    <section 
      id={id}
      ref={containerRef}
      className="relative py-24 md:py-48 bg-[var(--color-black)] overflow-hidden"
    >
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-6 md:px-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-32">
          <div className="flex flex-col gap-10">
            <div className="gallery-title flex items-center gap-6">
              <div className="w-12 h-[1px] bg-[var(--color-primary)]" />
              <span className="font-mono text-[10px] uppercase text-[var(--color-primary)] tracking-[0.6em] font-black italic">{tag}</span>
            </div>
            <h2 className="gallery-title font-display font-black text-[36px] md:text-[64px] lg:text-[84px] text-white leading-none uppercase italic tracking-tighter">
              {title}
            </h2>
          </div>
 
          {/* Filter System */}
          <div className="flex flex-wrap gap-4 md:gap-8">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-[10px] uppercase tracking-[0.4em] font-black py-2 border-b-2 transition-all duration-500 ${filter === cat ? 'border-[var(--color-primary)] text-white' : 'border-transparent text-white/20 hover:text-white/60'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[4/5] overflow-hidden bg-white/5"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <span className="font-mono text-[9px] text-[var(--color-primary)] font-black uppercase tracking-[0.3em] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">ID_{project.id}</span>
                  <h3 className="font-display font-black text-[28px] md:text-[36px] text-white uppercase italic leading-none mb-2">{project.name}</h3>
                  <p className="font-mono text-[11px] text-[var(--color-silver)]/60 uppercase tracking-widest">{project.detail}</p>
                </div>
 
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-[var(--color-primary)]"><path d="M7 17L17 7M17 17V7H7" /></svg>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
