'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { ReactNode, useEffect, useState } from 'react'

export default function SmoothScroller({ children }: { children: ReactNode }) {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
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
