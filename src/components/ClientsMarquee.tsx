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
    <section className="bg-[var(--color-black)] py-[80px] w-full relative overflow-hidden flex flex-col items-center" data-section-id="07">
      
      <div className="flex items-center gap-4 mb-16">
        <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
        <span className="font-mono text-[11px] uppercase text-[var(--color-red)] tracking-[0.18em]">Our Clients</span>
        <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
      </div>

      <div 
        className="relative w-full overflow-hidden flex"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)'
        }}
      >
        {/* Marquee Track 1 */}
        <div className="flex shrink-0 animate-marquee hover:[animation-play-state:paused] items-center">
          {CLIENTS.map((client, i) => (
            <div 
              key={`c1-${i}`}
              className="px-6 py-3 border border-transparent hover:border-[rgba(200,16,46,0.2)] font-display text-[16px] md:text-[20px] font-normal text-[var(--color-silver)] opacity-50 hover:opacity-100 hover:text-[var(--color-white)] transition-all duration-300 mx-4 whitespace-nowrap cursor-default"
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
              className="px-6 py-3 border border-transparent hover:border-[rgba(200,16,46,0.2)] font-display text-[16px] md:text-[20px] font-normal text-[var(--color-silver)] opacity-50 hover:opacity-100 hover:text-[var(--color-white)] transition-all duration-300 mx-4 whitespace-nowrap cursor-default"
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
