'use client'

const CLIENTS = [
  'Royal Splendour Developers',
  'Pacifica Companies',
  'KG Foundations Pvt. Ltd.',
  'Janani Homes',
  'Jain Housing',
  'Endee Shelters',
  'Elegant Constructions',
  'Arun Excello',
  'Pacifica Aurum'
]

export default function ClientsMarquee() {
  return (
    <section className="bg-red-gradient py-[80px] w-full relative overflow-hidden flex flex-col items-center" data-section-id="07">
      
      <div className="flex items-center gap-4 mb-20">
        <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
        <span className="font-mono text-[11px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-medium">Strategic Partners</span>
        <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
      </div>

      <div 
        className="relative w-full overflow-hidden flex bg-[var(--color-black-mid)] py-12 border-y border-[var(--color-black-light)] industrial-texture"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 150px, black calc(100% - 150px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 150px, black calc(100% - 150px), transparent)'
        }}
      >
        {/* Marquee Track 1 */}
        <div className="flex shrink-0 animate-marquee hover:[animation-play-state:paused] items-center">
          {CLIENTS.map((client, i) => (
            <div 
              key={`c1-${i}`}
              className="marquee-item px-8 py-4 border border-transparent hover:border-[var(--color-primary-muted)] font-display text-[20px] sm:text-[24px] md:text-[28px] 2xl:text-[36px] font-bold text-[var(--color-white)] opacity-30 hover:opacity-100 transition-all duration-700 mx-6 2xl:mx-10 whitespace-nowrap cursor-default uppercase italic tracking-tighter"
            >
              {client}
            </div>
          ))}
        </div>
        {/* Marquee Track 2 (Duplicate for infinite) */}
        <div className="flex shrink-0 animate-marquee hover:[animation-play-state:paused] items-center">
          {CLIENTS.map((client, i) => (
            <div 
              key={`c2-${i}`}
              className="marquee-item px-8 py-4 border border-transparent hover:border-[var(--color-primary-muted)] font-display text-[20px] sm:text-[24px] md:text-[28px] 2xl:text-[36px] font-bold text-[var(--color-white)] opacity-30 hover:opacity-100 transition-all duration-700 mx-6 2xl:mx-10 whitespace-nowrap cursor-default uppercase italic tracking-tighter"
            >
              {client}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}} />
    </section>
  )
}
