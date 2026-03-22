'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null)
  
  // Track cursor position and lerped position
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const cursorState = useRef('default')

  useEffect(() => {
    // Check if it's a touch device
    if (!window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(false)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const updateCursor = () => {
      if (!isTouch && dotRef.current && ringRef.current) {
        // Dot follows exactly
        dotRef.current.style.transform = `translate3d(calc(${mouse.current.x}px - 50%), calc(${mouse.current.y}px - 50%), 0)`

        // Ring interpolates (lerp 0.15)
        ring.current.x += (mouse.current.x - ring.current.x) * 0.15
        ring.current.y += (mouse.current.y - ring.current.y) * 0.15

        let ringTransform = `translate3d(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%), 0)`
        
        // Handle cursor states manually to avoid React state lag
        const state = document.documentElement.getAttribute('data-cursor') || 'default'
        if (state !== cursorState.current) {
          cursorState.current = state
          
          if (state === 'link') {
            dotRef.current.style.opacity = '0'
            ringRef.current.style.width = '48px'
            ringRef.current.style.height = '48px'
            ringRef.current.style.backgroundColor = 'var(--color-red)'
            ringRef.current.style.borderColor = 'var(--color-red)'
            ringRef.current.innerHTML = ''
            ringRef.current.style.animation = 'none'
          } else if (state === 'image') {
            dotRef.current.style.opacity = '0'
            ringRef.current.style.width = '64px'
            ringRef.current.style.height = '64px'
            ringRef.current.style.backgroundColor = 'transparent'
            ringRef.current.style.borderColor = 'var(--color-red)'
            ringRef.current.innerHTML = '<div style="width:100%; height:100%; animation: spin 4s linear infinite;"><span style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);" class="text-[9px] font-mono text-white uppercase">VIEW</span></div>'
            ringRef.current.style.animation = 'none'
          } else if (state === 'button') {
            dotRef.current.style.opacity = '1'
            ringRef.current.style.width = '120px'
            ringRef.current.style.height = '48px'
            ringRef.current.style.borderRadius = '24px'
            ringRef.current.style.backgroundColor = 'rgba(200,16,46,0.15)'
            ringRef.current.style.borderColor = 'transparent'
            ringRef.current.innerHTML = ''
            ringRef.current.style.animation = 'none'
          } else {
            // Default reset
            dotRef.current.style.opacity = '1'
            ringRef.current.style.width = '32px'
            ringRef.current.style.height = '32px'
            ringRef.current.style.borderRadius = '50%'
            ringRef.current.style.backgroundColor = 'transparent'
            ringRef.current.style.borderColor = 'var(--color-red)'
            ringRef.current.innerHTML = ''
            ringRef.current.style.animation = 'none'
          }
        }
        
        ringRef.current.style.transform = ringTransform
      }
      requestRef.current = requestAnimationFrame(updateCursor)
    }

    requestRef.current = requestAnimationFrame(updateCursor)

    // Interactive event listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink = target.closest('a') || target.closest('button')
      const isImage = target.closest('[data-cursor-image]')
      const isButton = target.closest('[data-cursor-button]')

      if (isButton) document.documentElement.setAttribute('data-cursor', 'button')
      else if (isImage) document.documentElement.setAttribute('data-cursor', 'image')
      else if (isLink) document.documentElement.setAttribute('data-cursor', 'link')
      else document.documentElement.removeAttribute('data-cursor')
    }

    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--color-white)] rounded-full pointer-events-none z-[9999] transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-difference"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-[var(--color-red)] pointer-events-none z-[9998] transition-[width,height,background-color,border-color,border-radius] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
      />
    </>
  )
}
