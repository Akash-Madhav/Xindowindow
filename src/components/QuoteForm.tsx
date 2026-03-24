'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  productType: z.string().min(1, 'Please select a product type.'),
  message: z.string().optional(),
})

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    // For logging/tracking in development if needed
    if (process.env.NODE_ENV === 'development') {
      console.log('Form data:', data)
    }
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <section id="contact-form" className="relative bg-[var(--color-black-mid)] py-12 sm:py-16 md:py-[120px] px-5 sm:px-8 md:px-12 w-full overflow-hidden" data-section-id="08">
      {/* Decorative Grid BG */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'linear-gradient(rgba(200, 16, 46, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 16, 46, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10">
        
        {/* Left Column: Form */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
            <span className="font-mono text-[11px] uppercase text-[var(--color-red)] tracking-[0.18em]">Request Quote</span>
          </div>

          <h2 className="font-display text-[30px] sm:text-[36px] md:text-[42px] 2xl:text-[52px] font-normal text-[var(--color-white)] mb-8 md:mb-10 leading-[1.1]">
            Build Your Vision With Us
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full max-w-[500px]">
            {/* Name */}
            <div className="relative group">
              <label className="block font-mono text-[10px] uppercase text-[var(--color-silver)] transition-colors group-focus-within:text-[var(--color-red)] mb-1 tracking-widest">Name</label>
              <input 
                {...register('name')}
                disabled={isSubmitting || isSuccess}
                className="w-full bg-transparent border-b border-[#2E2E33] py-3 font-sans text-[15px] font-light text-[var(--color-white)] outline-none focus:border-[var(--color-red)] transition-colors"
                placeholder="Enter your full name"
              />
              {errors.name && <span className="text-[var(--color-red-bright)] font-sans text-[12px] absolute -bottom-5 left-0" aria-live="polite">{errors.name.message}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Phone */}
              <div className="relative group">
                <label className="block font-mono text-[10px] uppercase text-[var(--color-silver)] transition-colors group-focus-within:text-[var(--color-red)] mb-1 tracking-widest">Phone</label>
                <input 
                  {...register('phone')}
                  type="tel"
                  disabled={isSubmitting || isSuccess}
                  className="w-full bg-transparent border-b border-[#2E2E33] py-3 font-sans text-[15px] font-light text-[var(--color-white)] outline-none focus:border-[var(--color-red)] transition-colors"
                  placeholder="+91"
                />
                {errors.phone && <span className="text-[var(--color-red-bright)] font-sans text-[12px] absolute -bottom-5 left-0" aria-live="polite">{errors.phone.message}</span>}
              </div>

              {/* Email */}
              <div className="relative group">
                <label className="block font-mono text-[10px] uppercase text-[var(--color-silver)] transition-colors group-focus-within:text-[var(--color-red)] mb-1 tracking-widest">Email</label>
                <input 
                  {...register('email')}
                  type="email"
                  disabled={isSubmitting || isSuccess}
                  className="w-full bg-transparent border-b border-[#2E2E33] py-3 font-sans text-[15px] font-light text-[var(--color-white)] outline-none focus:border-[var(--color-red)] transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && <span className="text-[var(--color-red-bright)] font-sans text-[12px] absolute -bottom-5 left-0" aria-live="polite">{errors.email.message}</span>}
              </div>
            </div>

            {/* Product Type (Select) */}
            <div className="relative group">
              <label className="block font-mono text-[10px] uppercase text-[var(--color-silver)] transition-colors group-focus-within:text-[var(--color-red)] mb-2 tracking-[0.3em] font-bold opacity-60">System Category</label>
              <select 
                {...register('productType')}
                disabled={isSubmitting || isSuccess}
                className="w-full bg-transparent border-b border-[var(--color-black-light)] py-4 font-sans text-[15px] font-normal text-[var(--color-white)] outline-none focus:border-[var(--color-red)] transition-colors appearance-none rounded-none cursor-pointer"
              >
                <option value="" className="bg-[var(--color-black-mid)] text-[var(--color-silver)]">Select an option</option>
                <option value="sliding" className="bg-[var(--color-black-mid)]">Sliding Windows & Doors</option>
                <option value="casement" className="bg-[var(--color-black-mid)]">Casement Windows & Doors</option>
                <option value="special" className="bg-[var(--color-black-mid)]">Special Architectural Systems</option>
                <option value="accessories" className="bg-[var(--color-black-mid)]">Accessories & Meshes</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-silver)] mt-3">▼</div>
              {errors.productType && <span className="text-[var(--color-red)] font-sans text-[12px] absolute -bottom-5 left-0" aria-live="polite">{errors.productType.message}</span>}
            </div>

            {/* Message */}
            <div className="relative group">
              <label className="block font-mono text-[10px] uppercase text-[var(--color-silver)] transition-colors group-focus-within:text-[var(--color-red)] mb-2 tracking-[0.3em] font-bold opacity-60">Technical Requirements (Optional)</label>
              <textarea 
                {...register('message')}
                disabled={isSubmitting || isSuccess}
                rows={3}
                className="w-full bg-transparent border-b border-[var(--color-black-light)] py-4 font-sans text-[15px] font-normal text-[var(--color-white)] outline-none focus:border-[var(--color-red)] transition-colors resize-none"
                placeholder="Mention specific wind-load or acoustic needs..."
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || isSuccess}
              data-cursor-button="true"
              className={`relative w-full overflow-hidden mt-6 group flex items-center justify-center py-6 border ${isSuccess ? 'border-[#3A7A58] text-[#3A7A58]' : 'border-[var(--color-red)] text-[var(--color-white)] bg-[var(--color-red)]'} transition-all duration-500`}
            >
              {!isSuccess && <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[luxurious] z-0" />}
              
              <span className={`relative z-10 font-mono uppercase text-[12px] tracking-[0.3em] font-bold transition-colors ${isSuccess ? 'text-[#3A7A58]' : 'group-hover:text-black'}`}>
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <span className="w-4 h-4 border-2 border-transparent border-t-white group-hover:border-t-black rounded-full animate-spin" />
                    Processing Request
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center gap-2">✓ Technical request received.</span>
                ) : (
                  "Request Quote "
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Right Column: Contact Info */}
        <div className="flex flex-col w-full h-full lg:pl-20 mt-12 md:mt-0 pt-16 md:pt-0 border-t md:border-t-0 border-[var(--color-black-light)]">
          
          <div className="font-mono text-[10px] uppercase text-[var(--color-silver)] tracking-[0.4em] mb-12 font-bold opacity-60">Corporate Command Center</div>
          
          <div className="flex flex-col gap-16">
            <div>
              <div className="font-mono text-[10px] text-[var(--color-red)] uppercase tracking-[0.3em] mb-4 font-bold">Base of Operations</div>
              <p className="font-sans font-normal text-[18px] leading-relaxed text-[var(--color-silver)] max-w-[320px] italic">
                No. 115/62, Canal Bank Road,<br/>
                CIT Nagar, Chennai — 600035, India
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] text-[var(--color-red)] uppercase tracking-[0.3em] mb-4 font-bold">Direct Line</div>
              <a 
                href="tel:+919444045544" 
                data-cursor="link"
                className="font-display font-bold text-[32px] md:text-[44px] text-[var(--color-white)] inline-block group italic tracking-tighter"
              >
                 +91 94440 45544
                 <span className="block mt-2 w-0 h-[2px] bg-[var(--color-red)] group-hover:w-full transition-all duration-500" />
              </a>
            </div>

            <div className="mt-4">
               <a 
                href="https://wa.me/919444045544" 
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-4 py-4 px-8 bg-[rgba(37,211,102,0.1)] border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-500 font-mono text-[12px] uppercase tracking-[0.3em] font-bold"
               >
                 <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.68 4.61 1.86 6.496L4 29l7.697-1.835A12.93 12.93 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.98 9.98 0 01-5.12-1.404l-.37-.222-3.8.906.938-3.7-.24-.38A9.96 9.96 0 016 15c0-5.523 4.477-10 10-10zm-3.285 5.5c-.19 0-.498.072-.76.358-.26.287-1 .977-1 2.383 0 1.406 1.023 2.764 1.166 2.955.143.19 2.008 3.073 4.877 4.196 2.414.95 2.873.762 3.39.713.52-.048 1.666-.68 1.904-1.336.237-.656.237-1.217.166-1.336-.07-.12-.262-.19-.548-.334-.286-.143-1.666-.822-1.926-.916-.26-.094-.45-.142-.64.143-.19.284-.73.915-.896 1.105-.166.19-.333.214-.618.07-.286-.143-1.205-.443-2.295-1.414-.85-.754-1.42-1.686-1.59-1.97-.165-.285-.017-.44.127-.583.13-.13.286-.333.428-.5.143-.166.19-.285.285-.476.096-.19.048-.357-.024-.5-.07-.143-.63-1.527-.868-2.094-.225-.548-.463-.48-.63-.49-.165-.01-.356-.013-.546-.013z"/></svg>
                 WhatsApp Concierge
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
