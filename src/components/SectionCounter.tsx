'use client'
import { useEffect, useState } from 'react'

export default function SectionCounter() {
  const [current, setCurrent] = useState('01')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section-id')
          if (id) setCurrent(id)
        }
      }
    }, { threshold: 0.3 })

    const sections = document.querySelectorAll('[data-section-id]')
    sections.forEach(s => observer.observe(s))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[500] font-mono text-[12px] text-[var(--color-silver)] mix-blend-difference pointer-events-none">
      <span className="text-[var(--color-red)]">{current}</span> / 09
    </div>
  )
}
