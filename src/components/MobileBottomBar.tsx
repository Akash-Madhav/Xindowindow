import Link from 'next/link'

export default function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-[rgba(10,10,11,0.92)] backdrop-blur-md border-t border-[rgba(200,16,46,0.2)] z-[400]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex w-full h-full">
        {/* Left Call Button */}
        <a 
          href="tel:+919444045544"
          className="flex-1 flex items-center justify-center bg-transparent border-r border-[#2E2E33] text-[var(--color-white)] font-sans text-[11px] uppercase tracking-wider"
        >
          Call Now
        </a>
        
        {/* Right Request Quote Button */}
        <Link 
          href="/contact"
          className="flex-1 flex items-center justify-center bg-[var(--color-red)] active:bg-[#E8213F] text-[var(--color-white)] font-sans text-[11px] uppercase tracking-wider transition-colors"
        >
          Request Quote
        </Link>
      </div>
    </div>
  )
}
