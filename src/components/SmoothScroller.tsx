'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from '@/lib/gsap-config'

export default function SmoothScroller({ children }: { children: ReactNode }) {
  const [isTouch, setIsTouch] = useState(false)

  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
    
    // Crucial: Refresh GSAP ScrollTrigger whenever the route changes
    // Add a slight delay to allow the new route content to render
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    
    return () => clearTimeout(timeout)
  }, [pathname, lenis])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    const handleMediaQueryChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsTouch(e.matches)
    }
    
    handleMediaQueryChange(mediaQuery)
    
    // Support older browsers that don't have addEventListener on MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaQueryChange)
    } else {
      mediaQuery.addListener(handleMediaQueryChange)
    }
    
    
    // Normalize scroll behavior for consistent feel across devices
    // This must happen after hydration to avoid mismatch on <html> and <body>
    ScrollTrigger.normalizeScroll(true)
    
    return () => {
      // Cleanup specifically if normalization was applied
      ScrollTrigger.normalizeScroll(false)
      
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaQueryChange)
      } else {
        mediaQuery.removeListener(handleMediaQueryChange)
      }
    }
  }, [])

  if (isTouch) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{
      lerp: 0.07,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    }}>
      {children}
    </ReactLenis>
  )
}
