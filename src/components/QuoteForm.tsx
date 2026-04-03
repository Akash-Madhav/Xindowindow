'use client'
 
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import { WPQuoteFormData } from '@/lib/wp-types'

interface QuoteFormProps {
  data?: WPQuoteFormData;
}
 
const formSchema = z.object({
  name: z.string().min(2, 'Identification required.'),
  phone: z.string().min(10, 'Technical contact required.'),
  email: z.string().email('Invalid registry format.'),
  productType: z.string().min(1, 'Selection required.'),
  message: z.string().optional(),
})
 
export default function QuoteForm({ data }: QuoteFormProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Fallbacks
  const tag = data?.tag || "Channel 08"
  const titleLine1 = data?.titleLine1 || "Initiate"
  const titleLine2 = data?.titleLine2 || "Protocol."
  const phone = data?.phone || "+91 94440 45544"
  const address = data?.address || "No. 115/62, Canal Bank Road,\nCIT Nagar, Chennai — 600035"
  const responseStatus = data?.responseStatus || "24H RESPONSE TIME"
  const standardStatus = data?.standardStatus || "GLB STANDARDS"
 
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
 
  useGSAP(() => {
    if (!containerRef.current) return
    
    gsap.fromTo('.form-element',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'luxurious', scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }}
    )
  }, { scope: containerRef })
 
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
  }
   const labels = data?.formLabels;
 
  return (
    <section ref={containerRef} className="relative bg-[var(--color-black)] py-32 px-6 md:px-16 w-full overflow-hidden industrial-texture">
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
        
        {/* Left: Contact Info - 5 Cols */}
        <div className="lg:col-span-5 flex flex-col gap-16">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-8 sm:w-12 h-[1px] bg-[var(--color-primary)]" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase text-[var(--color-primary)] tracking-[0.4em] sm:tracking-[0.6em] font-black italic">{tag}</span>
            </div>
            <h2 className="font-display font-black text-[38px] sm:text-[54px] md:text-[88px] text-white leading-[0.9] sm:leading-[0.85] uppercase italic tracking-tighter">
              {titleLine1} <br className="hidden sm:block" />
              <span className="text-[var(--color-primary)]">{titleLine2}</span>
            </h2>
          </div>
 
          <div className="flex flex-col gap-12">
             <div className="flex flex-col gap-3 md:gap-4">
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.4em] text-[var(--color-silver)] opacity-30 font-black">Direct Line</span>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-display text-[26px] sm:text-[32px] md:text-[42px] text-white font-black italic tracking-tighter hover:text-[var(--color-primary)] transition-colors">{phone}</a>
             </div>
             
             <div className="flex flex-col gap-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--color-silver)] opacity-30 font-black">Technical Hub</span>
                <p className="font-sans text-[16px] md:text-[18px] text-[var(--color-silver)] font-medium leading-relaxed italic opacity-80 max-w-sm whitespace-pre-line">
                   {address}
                </p>
             </div>
   
             <div className="pt-12 border-t border-white/5 flex gap-10">
                <div className="flex flex-col">
                   <span className="font-display text-[24px] text-white font-black italic">{responseStatus.split(' ')[0]}</span>
                   <span className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-silver)] opacity-30 mt-1">{responseStatus.substring(responseStatus.indexOf(' ') + 1)}</span>
                </div>
                <div className="flex flex-col">
                   <span className="font-display text-[24px] text-white font-black italic">{standardStatus.split(' ')[0]}</span>
                   <span className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-silver)] opacity-30 mt-1">{standardStatus.substring(standardStatus.indexOf(' ') + 1)}</span>
                </div>
             </div>
          </div>
        </div>
 
        {/* Right: Technical Form - 7 Cols */}
        <div className="lg:col-span-7 bg-[var(--color-black-soft)] border border-white/5 p-10 md:p-16 lg:p-20 shadow-3xl relative overflow-hidden backdrop-blur-3xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12 relative z-10">
            
            <div className="form-element flex flex-col gap-4">
              <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--color-silver)] opacity-40 font-black italic">{labels?.name}</label>
              <input 
                {...register('name')}
                placeholder={labels?.placeholderName}
                className="bg-transparent border-b border-white/10 py-5 font-display text-[20px] md:text-[24px] text-white font-black italic placeholder:opacity-10 outline-none focus:border-[var(--color-primary)] transition-colors uppercase tracking-tight"
              />
              {errors.name && <span className="font-mono text-[9px] text-[var(--color-primary)] uppercase tracking-widest">{errors.name.message}</span>}
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="form-element flex flex-col gap-4">
                <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--color-silver)] opacity-40 font-black italic">{labels?.phone}</label>
                <input 
                  {...register('phone')}
                  placeholder={labels?.placeholderPhone}
                  className="bg-transparent border-b border-white/10 py-5 font-display text-[20px] md:text-[24px] text-white font-black italic placeholder:opacity-10 outline-none focus:border-[var(--color-primary)] transition-colors uppercase tracking-tight"
                />
              </div>
              <div className="form-element flex flex-col gap-4">
                <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--color-silver)] opacity-40 font-black italic">{labels?.email}</label>
                <input 
                  {...register('email')}
                  placeholder={labels?.placeholderEmail}
                  className="bg-transparent border-b border-white/10 py-5 font-display text-[20px] md:text-[24px] text-white font-black italic placeholder:opacity-10 outline-none focus:border-[var(--color-primary)] transition-colors uppercase tracking-tight"
                />
              </div>
            </div>
 
            <div className="form-element flex flex-col gap-4">
              <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--color-silver)] opacity-40 font-black italic">{labels?.category}</label>
              <select 
                {...register('productType')}
                className="bg-transparent border-b border-white/10 py-5 font-display text-[20px] md:text-[24px] text-white font-black italic outline-none focus:border-[var(--color-primary)] transition-colors uppercase tracking-tight appearance-none cursor-pointer"
              >
                <option value="" className="bg-[var(--color-black)]">{labels?.placeholderCategory}</option>
                <option value="sliding" className="bg-[var(--color-black)]">Sliding Systems</option>
                <option value="casement" className="bg-[var(--color-black)]">Casement Systems</option>
                <option value="special" className="bg-[var(--color-black)]">Technical Special</option>
              </select>
            </div>
 
            <div className="form-element flex flex-col gap-4">
              <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--color-silver)] opacity-40 font-black italic">{labels?.message}</label>
              <textarea 
                {...register('message')}
                placeholder={labels?.placeholderMessage}
                rows={3}
                className="bg-transparent border-b border-white/10 py-5 font-display text-[20px] md:text-[24px] text-white font-black italic placeholder:opacity-10 outline-none focus:border-[var(--color-primary)] transition-colors uppercase tracking-tight resize-none"
              />
            </div>
 
            <button 
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="group relative bg-[var(--color-primary)] text-white font-sans text-[12px] font-black uppercase tracking-[0.4em] py-8 px-16 shadow-primary overflow-hidden transition-all active:scale-95 disabled:bg-white/10"
              data-cursor-button="true"
            >
              <span className="relative z-10 flex items-center justify-center gap-6 italic">
                {isSubmitting ? labels?.submitting : isSuccess ? labels?.success : labels?.submit}
                {!isSubmitting && !isSuccess && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="group-hover:translate-x-4 transition-transform duration-500"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </form>

 
          {/* Form Watermark */}
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 pointer-events-none opacity-[0.03] overflow-hidden">
             <span className="font-display text-[80px] md:text-[144px] font-black italic leading-none">X-08</span>
          </div>
        </div>
      </div>
    </section>
  )
}

