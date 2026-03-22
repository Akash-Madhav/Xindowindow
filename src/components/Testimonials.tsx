'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const testimonials = [
  {
    quote: "The precision of Xindo systems transformed our luxury villa project. The acoustic insulation completely eliminated traffic noise, creating a true sanctuary in the heart of Chennai.",
    author: "Ar. Vikram Reddy",
    role: "Principal Architect, VR Design Studio",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi-bbEa8rYiKhfytSiyo4Lo6oP20rdtLvWDdfb5lr6DCQkRgK0N4wRHHmnY6RciAq3JiScR7dgHZDg_bzHw30aLALED2os1c3WX9E5Heu7HEQNhSWjVn9hDnEBZrumN11zfA6Ick27WG7-NZBg-rLNFNKhja1WXPzqAECT8TAftDonTVFY6_cyuqhzJ0dKD4r_1w08IR9KV4EICZih-fnRcLLl_JvU6VQKTJ0ZXWYLLVXNi8lC0eTVPn9PNeUjlSfnzstxMkMpYAUT"
  },
  {
    quote: "We required specialized multi-chamber profiles for a high-altitude resort. Xindo delivered exceptional thermal resistance while maintaining an incredibly sleek aesthetic profile.",
    author: "Meera Krishnan",
    role: "Lead Developer, Elevation Estates",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi-bbEa8rYiKhfytSiyo4Lo6oP20rdtLvWDdfb5lr6DCQkRgK0N4wRHHmnY6RciAq3JiScR7dgHZDg_bzHw30aLALED2os1c3WX9E5Heu7HEQNhSWjVn9hDnEBZrumN11zfA6Ick27WG7-NZBg-rLNFNKhja1WXPzqAECT8TAftDonTVFY6_cyuqhzJ0dKD4r_1w08IR9KV4EICZih-fnRcLLl_JvU6VQKTJ0ZXWYLLVXNi8lC0eTVPn9PNeUjlSfnzstxMkMpYAUT" // Placeholder reusing same image for now
  },
  {
    quote: "The 10-year warranty and the flawless installation process gave our clients immense peace of mind. The heavy-duty sliding doors operate with just a push of a finger.",
    author: "Sanjay Menon",
    role: "Homeowner, ECR Residence",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi-bbEa8rYiKhfytSiyo4Lo6oP20rdtLvWDdfb5lr6DCQkRgK0N4wRHHmnY6RciAq3JiScR7dgHZDg_bzHw30aLALED2os1c3WX9E5Heu7HEQNhSWjVn9hDnEBZrumN11zfA6Ick27WG7-NZBg-rLNFNKhja1WXPzqAECT8TAftDonTVFY6_cyuqhzJ0dKD4r_1w08IR9KV4EICZih-fnRcLLl_JvU6VQKTJ0ZXWYLLVXNi8lC0eTVPn9PNeUjlSfnzstxMkMpYAUT"
  }
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-24 bg-[var(--color-slate-mid)] border-t border-[var(--color-charcoal)] overflow-hidden relative">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--color-obsidian)] opacity-50 z-0 hidden lg:block"></div>

      <div className="max-w-[1320px] mx-auto relative z-10 w-full">
        
        {/* Header and Controls Row */}
        <div className="flex flex-col md:flex-row items-end justify-between px-6 md:px-12 mb-16">
          <div className="max-w-xl">
            <span className="caption text-[var(--color-red)] mb-4 block">CLIENT SUCCESS</span>
            <h2 className="text-[42px] font-headline text-[var(--color-white)] leading-[1.2]">
              Trusted by Architects <br className="hidden sm:block" />&amp; Visionaries
            </h2>
          </div>
          
          <div className="flex gap-4 mt-8 md:mt-0">
            <button 
              onClick={scrollPrev}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--color-red)] hover:border-[var(--color-red)] transition-colors group"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-white/50 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollNext}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--color-red)] hover:border-[var(--color-red)] transition-colors group"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-white/50 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Embla Viewport */}
        <div className="embla overflow-hidden px-6 md:px-12" ref={emblaRef}>
          <div className="embla__container flex touch-pan-y -ml-4 md:-ml-8">
            {testimonials.map((item, i) => (
              <div className="embla__slide flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_65%] min-w-0 pl-4 md:pl-8" key={i}>
                <div className="glass-surface bg-[#131314]/80 p-8 md:p-14 lg:p-16 h-full flex flex-col justify-between border-t border-[var(--color-red)] relative group hover:bg-[#131314] transition-colors duration-500">
                  
                  {/* Large Quote Mark Backing */}
                  <div className="absolute top-10 right-10 text-[var(--color-red)]/10 text-[180px] font-headline leading-none hidden sm:block pointer-events-none select-none">
                    "
                  </div>

                  {/* Red Accent Quote Mark */}
                  <div className="mb-8">
                    <svg className="w-8 h-8 text-[var(--color-red)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  
                  <p className="font-headline italic text-2xl md:text-[32px] text-[var(--color-off-white)] leading-[1.4] mb-12 relative z-10 max-w-3xl">
                    {item.quote}
                  </p>
                  
                  <div className="flex items-center gap-6 mt-auto">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
                       <Image src={item.image} alt={item.author} width={64} height={64} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-[15px] tracking-[0.05em] text-white m-0 leading-tight mb-1">{item.author}</h4>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-mist)] m-0">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
