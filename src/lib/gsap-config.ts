import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import CustomEase from 'gsap/CustomEase'
// Use dynamic imports or optional requires if premium plugins are not installed.
// For now, importing normally based on the prompt instructions.
import SplitText from 'gsap/dist/SplitText'
import DrawSVG from 'gsap/dist/DrawSVGPlugin'

if (typeof window !== "undefined") {
  // Try to register, but wrap in try-catch in case they aren't installed properly
  try {
    gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText, DrawSVG)
    
    // Global configurations for mobile stability
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    })
    
    // Normalize scroll behavior for consistent feel across devices
    if (typeof window !== 'undefined') {
      ScrollTrigger.normalizeScroll(true)
    }
  } catch {
    gsap.registerPlugin(ScrollTrigger, CustomEase)
    console.warn("Premium GSAP plugins not found. Skipping registration.");
  }

  CustomEase.create('luxurious', '0.16, 1, 0.3, 1')
  CustomEase.create('precision', '0.25, 0.46, 0.45, 0.94')
  CustomEase.create('cinematic', '0.77, 0, 0.175, 1')
}

export { gsap, ScrollTrigger, CustomEase, SplitText, DrawSVG }
