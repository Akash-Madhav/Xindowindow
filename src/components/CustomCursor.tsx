'use client'
 
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
 
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null)
  
  // Track cursor position and lerped position
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const cursorState = useRef('default')
 
  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return
 
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
 
    window.addEventListener('mousemove', onMouseMove, { passive: true })
 
    const updateCursor = () => {
      if (dotRef.current && ringRef.current) {
        // Dot follows exactly (fast)
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`
 
        // Ring interpolates (lerp 0.15)
        ring.current.x += (mouse.current.x - ring.current.x) * 0.15
        ring.current.y += (mouse.current.y - ring.current.y) * 0.15
 
        const ringTransform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
        ringRef.current.style.transform = ringTransform
 
        // Handle cursor states manually via data-cursor attribute
        const state = document.documentElement.getAttribute('data-cursor') || 'default'
        
        if (state !== cursorState.current) {
          cursorState.current = state
          
          if (state === 'link') {
            gsap.to(dotRef.current, { opacity: 0, scale: 0, duration: 0.3 })
            gsap.to(ringRef.current, { 
              width: 50, height: 50, 
              backgroundColor: 'var(--color-primary)', 
              borderColor: 'var(--color-primary)', 
              mixBlendMode: 'normal',
              duration: 0.4,
              ease: 'power3.out'
            })
          } else if (state === 'image') {
            dotRef.current.style.opacity = '0'
            gsap.to(ringRef.current, { 
              width: 100, height: 100, 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              borderColor: 'rgba(255,255,255,0.2)', 
              backdropFilter: 'blur(10px)',
              mixBlendMode: 'normal',
              duration: 0.6,
              ease: 'expo.out'
            })
            ringRef.current.innerHTML = '<span class="text-[9px] font-mono text-white/50 uppercase tracking-[0.4em] rotate-12">VIEW</span>'
          } else if (state === 'button') {
            gsap.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.3 })
            gsap.to(ringRef.current, { 
              width: 140, height: 60, 
              borderRadius: '30px', 
              backgroundColor: 'rgba(200,16,46,0.1)', 
              borderColor: 'rgba(200,16,46,0.3)', 
              mixBlendMode: 'normal',
              duration: 0.5,
              ease: 'power4.out'
            })
          } else {
            // Default reset
            gsap.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.3 })
            gsap.to(ringRef.current, { 
              width: 32, height: 32, 
              borderRadius: '50%', 
              backgroundColor: 'transparent', 
              borderColor: 'var(--color-primary)', 
              mixBlendMode: 'difference',
              duration: 0.4,
              ease: 'power3.out'
            })
            ringRef.current.innerHTML = ''
          }
        }
      }
      requestRef.current = requestAnimationFrame(updateCursor)
    }
 
    requestRef.current = requestAnimationFrame(updateCursor)
 
    // Interactive event listeners with magnetic button logic
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink = target.closest('a') || target.closest('button')
      const isImage = target.closest('[data-cursor-image]')
      const isButton = target.closest('[data-cursor-button]')
 
      if (isButton) {
        document.documentElement.setAttribute('data-cursor', 'button')
        // Simple Magnetic Effect Integration
        const btn = target.closest('[data-cursor-button]') as HTMLElement
        if (btn) {
           const rect = btn.getBoundingClientRect()
           const x = e.clientX - rect.left - rect.width/2
           const y = e.clientY - rect.top - rect.height/2
           gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.4 })
        }
      }
      else if (isImage) document.documentElement.setAttribute('data-cursor', 'image')
      else if (isLink) document.documentElement.setAttribute('data-cursor', 'link')
      else {
        document.documentElement.removeAttribute('data-cursor')
        // Reset translation for any magnetic buttons
        const allBtns = document.querySelectorAll('[data-cursor-button]')
        gsap.to(allBtns, { x: 0, y: 0, duration: 0.5 })
      }
    }
 
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mousemove', handleMouseOver, { passive: true })
 
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousemove', handleMouseOver)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])
 
  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
        @media (pointer: coarse) {
          .xindo-cursor { display: none !important; }
        }
      `}</style>
      {/* Dot */}
      <div
        ref={dotRef}
        className="xindo-cursor fixed top-0 left-0 w-1.5 h-1.5 bg-[var(--color-white)] rounded-full pointer-events-none z-[10005] transition-opacity duration-300 pointer-events-none mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="xindo-cursor fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-[var(--color-primary)] pointer-events-none z-[10004] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      />
    </>
  )
}
