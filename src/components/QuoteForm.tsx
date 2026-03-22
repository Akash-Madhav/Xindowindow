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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <section id="quote" className="relative bg-[var(--color-black-mid)] py-[64px] md:py-[120px] px-6 md:px-12 w-full overflow-hidden" data-section-id="08">
      {/* Decorative Grid BG */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'linear-gradient(rgba(200, 16, 46, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 16, 46, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative z-10">
        
        {/* Left Column: Form */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-[40px] h-[1px] bg-[var(--color-red)] opacity-40" />
            <span className="font-mono text-[11px] uppercase text-[var(--color-red)] tracking-[0.18em]">Request Quote</span>
          </div>

          <h2 className="font-display text-[42px] font-normal text-[var(--color-white)] mb-10 leading-[1.1]">
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
              <label className="block font-mono text-[10px] uppercase text-[var(--color-silver)] transition-colors group-focus-within:text-[var(--color-red)] mb-1 tracking-widest">Product Type</label>
              <select 
                {...register('productType')}
                disabled={isSubmitting || isSuccess}
                className="w-full bg-transparent border-b border-[#2E2E33] py-3 font-sans text-[15px] font-light text-[var(--color-white)] outline-none focus:border-[var(--color-red)] transition-colors appearance-none rounded-none"
              >
                <option value="" className="bg-[var(--color-black-light)] text-[var(--color-silver)]">Select an option</option>
                <option value="sliding" className="bg-[var(--color-black-light)]">Sliding Windows & Doors</option>
                <option value="casement" className="bg-[var(--color-black-light)]">Casement Windows & Doors</option>
                <option value="special" className="bg-[var(--color-black-light)]">Special Architectural Systems</option>
                <option value="accessories" className="bg-[var(--color-black-light)]">Accessories & Meshes</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-silver)] mt-2">▼</div>
              {errors.productType && <span className="text-[var(--color-red-bright)] font-sans text-[12px] absolute -bottom-5 left-0" aria-live="polite">{errors.productType.message}</span>}
            </div>

            {/* Message */}
            <div className="relative group">
              <label className="block font-mono text-[10px] uppercase text-[var(--color-silver)] transition-colors group-focus-within:text-[var(--color-red)] mb-1 tracking-widest">Message (Optional)</label>
              <textarea 
                {...register('message')}
                disabled={isSubmitting || isSuccess}
                rows={3}
                className="w-full bg-transparent border-b border-[#2E2E33] py-3 font-sans text-[15px] font-light text-[var(--color-white)] outline-none focus:border-[var(--color-red)] transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || isSuccess}
              data-cursor-button="true"
              className={`relative w-full overflow-hidden mt-4 group flex items-center justify-center py-5 border ${isSuccess ? 'border-[#3A7A58] text-[#3A7A58]' : 'border-[var(--color-red)] text-[var(--color-red)]'} bg-transparent transition-all duration-300 md:hover:border-transparent md:hover:shadow-[0_0_24px_rgba(200,16,46,0.3)]`}
            >
              {!isSuccess && <div className="absolute inset-0 bg-[var(--color-red)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />}
              
              <span className={`relative z-10 font-sans uppercase text-[12px] tracking-[0.18em] font-medium transition-colors ${isSuccess ? 'text-[#3A7A58]' : 'group-hover:text-[var(--color-white)]'}`}>
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <span className="w-4 h-4 border-2 border-transparent border-t-[var(--color-red)] group-hover:border-t-white rounded-full animate-spin" />
                    Processing
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center gap-2">✓ We'll be in touch shortly.</span>
                ) : (
                  "Submit Request ->"
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Right Column: Contact Info */}
        <div className="flex flex-col w-full h-full lg:pl-16 mt-8 md:mt-0 pt-16 md:pt-0 border-t md:border-t-0 border-[#2E2E33]">
          
          <div className="font-mono text-[10px] uppercase text-[var(--color-silver)] tracking-[0.18em] mb-8">Contact Information</div>
          
          <div className="flex flex-col gap-12">
            <div>
              <div className="font-mono text-[10px] text-[var(--color-red)] uppercase tracking-widest mb-2">Address</div>
              <p className="font-sans font-normal text-[16px] leading-[1.6] text-[var(--color-silver)] max-w-[280px]">
                No. 115/62, Canal Bank Road,<br/>
                CIT Nagar, Chennai — 600035, India
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] text-[var(--color-red)] uppercase tracking-widest mb-2">Phone</div>
              <a 
                href="tel:+919444045544" 
                data-cursor="link"
                className="font-display font-light text-[28px] md:text-[36px] text-[var(--color-white)] inline-block group"
              >
                 +91 94440 45544
                 <span className="block mt-1 w-0 h-px bg-[var(--color-red)] group-hover:w-full transition-all duration-300" />
              </a>
            </div>

            <div className="mt-4">
               <a 
                href="https://wa.me/919444045544" 
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 py-3 px-6 bg-[rgba(37,211,102,0.08)] border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-300 font-sans text-[13px] uppercase tracking-widest rounded-none"
               >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                 Chat on WhatsApp
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
