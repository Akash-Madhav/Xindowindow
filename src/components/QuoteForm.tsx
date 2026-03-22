'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const quoteSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  projectType: z.string().min(1, 'Please select a project type'),
  requirements: z.string().optional(),
  budget: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema)
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-[var(--color-obsidian)] to-[#1a1112]">
      <div className="max-w-[1320px] mx-auto glass-surface rounded-[var(--radius-xl)] p-8 md:p-16 border border-[var(--glass-border-red)] relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[var(--color-red)] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <span className="caption text-[var(--color-red)] mb-4 block">PREMIUM CONSULTATION</span>
            <h2 className="text-[48px] md:text-[56px] font-headline text-on-surface leading-[1.1] mb-6">
              Start Your <br className="hidden md:block" /> Transformation
            </h2>
            <p className="text-[var(--color-mist)] body font-light mb-12 max-w-md">
              Share your architectural plans or brief. Our engineers will perform a 
              preliminary analysis and craft a bespoke proposal tailored to your vision.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[var(--color-red)] mt-1">support_agent</span>
                <div>
                  <h5 className="text-white font-sans font-bold text-[15px] mb-1">Dedicated Project Manager</h5>
                  <p className="text-white/50 text-[13px] font-light">From concept to final handover</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[var(--color-red)] mt-1">design_services</span>
                <div>
                  <h5 className="text-white font-sans font-bold text-[15px] mb-1">Custom Fabrication</h5>
                  <p className="text-white/50 text-[13px] font-light">Engineered to exact specifications</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-[#131314]/50 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-[var(--radius-lg)]">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-[fade_0.5s_ease-out]">
                <div className="w-20 h-20 rounded-full bg-[var(--color-red)]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[var(--color-red)] text-4xl">check_circle</span>
                </div>
                <h3 className="font-headline text-3xl text-white mb-4">Request Received</h3>
                <p className="text-[var(--color-mist)] mb-8">
                  Our engineering team will review your requirements and reach out within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 bg-[var(--color-red)] text-white font-bold uppercase tracking-widest text-[11px] rounded-[var(--radius-sm)] transition-all hover:bg-[var(--color-red-bright)]"
                >
                  Submit Another Project
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Name */}
                 <div className="space-y-2">
                   <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-widest text-white/50">Full Name</label>
                   <input 
                     {...register('name')}
                     type="text" 
                     id="name"
                     className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-sans focus:outline-none focus:border-[var(--color-red)] transition-colors placeholder:text-white/20"
                     placeholder="John Doe"
                   />
                   {errors.name && <p className="text-[var(--color-red)] text-[11px]">{errors.name.message}</p>}
                 </div>

                 {/* Phone */}
                 <div className="space-y-2">
                   <label htmlFor="phone" className="font-mono text-[10px] uppercase tracking-widest text-white/50">Phone Number</label>
                   <input 
                     {...register('phone')}
                     type="tel" 
                     id="phone"
                     className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-sans focus:outline-none focus:border-[var(--color-red)] transition-colors placeholder:text-white/20"
                     placeholder="+91 90000 00000"
                   />
                   {errors.phone && <p className="text-[var(--color-red)] text-[11px]">{errors.phone.message}</p>}
                 </div>
               </div>

               {/* Email */}
               <div className="space-y-2">
                 <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-white/50">Email Address</label>
                 <input 
                   {...register('email')}
                   type="email" 
                   id="email"
                   className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-sans focus:outline-none focus:border-[var(--color-red)] transition-colors placeholder:text-white/20"
                   placeholder="john@example.com"
                 />
                 {errors.email && <p className="text-[var(--color-red)] text-[11px]">{errors.email.message}</p>}
               </div>

               {/* Project Type */}
               <div className="space-y-2">
                 <label htmlFor="projectType" className="font-mono text-[10px] uppercase tracking-widest text-white/50">Project Type</label>
                 <select 
                   {...register('projectType')}
                   id="projectType"
                   className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-sans focus:outline-none focus:border-[var(--color-red)] transition-colors appearance-none cursor-pointer"
                 >
                   <option value="" className="bg-[#131314] text-white/50">Select Project Type</option>
                   <option value="luxury_villa" className="bg-[#131314]">Luxury Villa</option>
                   <option value="apartment" className="bg-[#131314]">Apartment Complex</option>
                   <option value="commercial" className="bg-[#131314]">Commercial Building</option>
                   <option value="renovation" className="bg-[#131314]">Renovation / Upgrade</option>
                 </select>
                 {errors.projectType && <p className="text-[var(--color-red)] text-[11px]">{errors.projectType.message}</p>}
               </div>

               {/* Requirements */}
               <div className="space-y-2">
                 <label htmlFor="requirements" className="font-mono text-[10px] uppercase tracking-widest text-white/50">Project Requirements</label>
                 <textarea 
                   {...register('requirements')}
                   id="requirements"
                   rows={3}
                   className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-sans focus:outline-none focus:border-[var(--color-red)] transition-colors resize-none placeholder:text-white/20"
                   placeholder="Briefly describe your requirements..."
                 ></textarea>
               </div>

               {/* File Upload (Visual only for now) */}
               <div className="pt-4">
                 <div className="border border-dashed border-white/20 rounded-[var(--radius-sm)] p-6 text-center hover:bg-white/5 hover:border-white/40 transition-colors cursor-pointer group">
                   <span className="material-symbols-outlined text-white/50 group-hover:text-[var(--color-red)] mb-2 transition-colors">upload_file</span>
                   <p className="font-sans text-[13px] text-white/70">Upload Floor Plan or Architecture Drawings</p>
                   <p className="font-mono text-[10px] text-white/30 mt-1">PDF, DWG, JPG up to 10MB</p>
                 </div>
               </div>

               {/* Submit Button */}
               <div className="pt-6">
                 <button 
                   type="submit" 
                   disabled={isSubmitting}
                   className="w-full py-4 bg-[var(--color-red)] text-white font-bold uppercase tracking-widest text-[13px] rounded-sm transition-all hover:bg-[var(--color-red-bright)] hover:shadow-[var(--shadow-glow)] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                 >
                   {isSubmitting ? (
                     <>
                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                       Processing...
                     </>
                   ) : 'Submit Request'}
                 </button>
               </div>
             </form>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}
