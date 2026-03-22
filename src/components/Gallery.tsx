'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';

const images = [
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy7QFL4v5oSvw1axzV6aEtJSN1g-3rsissMrGVmTHCkldMAbr27HvNpNERke35kW72yZiW9fhPoxqnp0DNJyCCg2IRQNWttik8bMsV1Hj6SmALXNHAeByanAGvOnFrTb-6349lK88216WG0DI7VDKNAWR1b3ww0ZJcMUD_b71gkARqWm5hcVJwSqlv9PCyxsOaS9PpkYALTysantkRGcsgvk0qgELMnK0lYJfW0CTN4_6zl1-hn1IKw-ZAhdzrKXKet7npyyzLRdE4', alt: 'Modern glass door architecture', class: 'col-span-1 md:col-span-2 row-span-2 aspect-square md:aspect-auto' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaOntmqtJIts_YO4Hd6gmXB0I0HWibvOIS-rCow3euPuSno7VmzPi3Mfrcf-WZjg0IwmrTrFiRzUbzM-9iVxD-c7pxn_Bb6cS02YfyMvUkMyZr5Nx7r96sC8ZjKJ_sSDnumU6_8n4wG5aFyDeZ0ynCr531TOt-quCku5Qwu57DTedZC6zZ582RS1mBhNfxGQnrkjaW3mhk-eGDPiSirSVTN3whVmqRlIck1PRj71-48dm5TtU8pg4r0CoqGdYhkuSi0iQu1axbAPk_', alt: 'High-end casement window', class: 'col-span-1 aspect-square' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg98G2mUqqU19YFmMnY841Gigu7P3bcubM7h2gzpdeNAo6OCorbWFf-Zz_3iK2b-4JWZ2DlyIbs1QzNA6P5pNIJJtJAXGHEwn5AZCVaLQdCDW9vnkG7uiyLr5_TcmTTyaA6UaNnjgEo5ccD7KOSiLrHjo3IuyTvszkvR9pdkdN9TnDreTA0-iKze-BmYTCNSjLpEU-73m9CO3GpY6R6F92p1aYy6r_vJnLwPpG9occrnKVuj4Q-SZ-oV-iSJllsLgCuJWVaCmzvI7O', alt: 'Unique architectural window', class: 'col-span-1 aspect-square' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAK6Ug5iCXWvyCjSWLVIHjrDnEpLEKcrVoUwviri40vryuJ8Qbq_ey3VT_eCIUfQOGhRlfY0CTxG86jdtLfreTui_tnab6M9XCBYMzS8J-qGz5DsSjmM4gleumAkwa_cx9aJij0QiRn_n0JVlm8oWfN-idWPISR2o9EQ2lMEQlayhS88yb-gl4sA5-XEU-Vum05pKB6_XGcS3KCv2NO57ZOaWb7znz9vSazzHqF7GZFQnyXNzN5LECAJ0Vj7O5ian6EZ-hEoJSmOAR', alt: 'Premium window installation', class: 'col-span-1 md:col-span-2 aspect-[2/1]' }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--color-obsidian)] border-t border-[var(--color-slate-mid)]">
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-12">
          <div className="max-w-xl">
            <span className="caption text-[var(--color-red)] mb-4 block">PORTFOLIO</span>
            <h2 className="text-[42px] font-headline text-on-surface leading-[1.25]">
              Architectural Masterpieces
            </h2>
          </div>
        </div>

        {/* CSS Grid for Asymmetric Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`${img.class} relative group cursor-pointer overflow-hidden rounded-[var(--radius-sm)]`}
              onClick={() => setSelectedImage(img)}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="border border-white/50 text-white px-6 py-2 rounded-full uppercase tracking-widest text-[10px] backdrop-blur-md">
                  View Project
                </span>
              </div>
              
              {/* Red border on hover */}
              <div className="absolute inset-0 border-[2px] border-transparent group-hover:border-[var(--color-red)] transition-colors duration-300 pointer-events-none z-10"></div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center md:text-left">
          <button className="text-[var(--color-red)] font-sans font-bold uppercase tracking-[0.12em] text-[13px] hover:text-[var(--color-red-bright)] transition-colors inline-flex items-center gap-2 group">
            View Full Gallery
            <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Radix Dialog for Lightbox */}
      <Dialog.Root open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/95 z-[500] backdrop-blur-sm animate-[fade_0.2s_ease-out]" />
          <Dialog.Content className="fixed inset-0 z-[501] flex items-center justify-center p-4">
             <Dialog.Close className="absolute top-6 right-6 lg:right-12 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full hover:bg-[var(--color-red)] transition-colors text-white outline-none">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
             </Dialog.Close>
             
             {selectedImage && (
               <div className="relative w-full max-w-5xl aspect-video bg-black/20 rounded-[var(--radius-md)] overflow-hidden shadow-2xl animate-[scaleUp_0.3s_ease-out]">
                 <Image
                   src={selectedImage.src}
                   alt={selectedImage.alt}
                   fill
                   className="object-contain"
                   quality={100}
                 />
               </div>
             )}
             
             <style dangerouslySetInnerHTML={{__html: `
               @keyframes fade { from { opacity: 0 } to { opacity: 1 } }
               @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
             `}} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </section>
  );
}
