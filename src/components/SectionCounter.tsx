'use client'
import { useEffect, useState } from 'react'

export default function SectionCounter() {
  const [current, setCurrent] = useState('01')
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section-id]')
    setTotal(sections.length)

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section-id')
          if (id) setCurrent(id)
        }
      }
    }, { threshold: 0.3 })

    sections.forEach(s => observer.observe(s))

    return () => observer.disconnect()
  }, [])

  if (total <= 1) return null // Hide if only one section

  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[500] font-mono text-[12px] text-[var(--color-silver)] mix-blend-difference pointer-events-none">
      <span className="text-[var(--color-red)]">{current}</span> / {total < 10 ? `0${total}` : total}
    </div>
  )
}
