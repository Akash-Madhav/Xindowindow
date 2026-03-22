'use client'

import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function SmoothScroller({ children }: { children: ReactNode }) {
  const [isTouch, setIsTouch] = useState(false)

  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  }, [pathname, lenis])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
    }
  }, [])

  if (isTouch) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false
    }}>
      {children as any}
    </ReactLenis>
  )
}
