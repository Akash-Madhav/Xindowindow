'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    let pulseRemoveTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      clearTimeout(pulseRemoveTimer);
      setIsPulsing(false);
      
      // trigger after 8s of inactivity
      idleTimer = setTimeout(() => {
        setIsPulsing(true);
        // Remove after 3 iterations (3 * 1.2s = 3.6s)
        pulseRemoveTimer = setTimeout(() => {
          setIsPulsing(false);
        }, 3600);
      }, 8000);
    };

    // Listen to user activity
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      clearTimeout(pulseRemoveTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
    };
  }, []);

  return (
    <a
      href="https://wa.me/919444045544?text=Hi%2C%20I%27m%20interested%20in%20Xindo%20Windows%20and%20Doors.%20I%27d%20like%20to%20know%20more%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed z-[450] flex items-center justify-center bottom-[calc(80px+env(safe-area-inset-bottom))] md:bottom-[32px] right-[20px] md:right-[32px] w-[56px] h-[56px] bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] cursor-pointer group transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] active:translate-y-0 active:scale-95 ${isPulsing ? 'animate-[whatsapp-pulse_1.2s_ease-out_3]' : ''}`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes whatsapp-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
          70% { box-shadow: 0 0 0 16px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
      `}} />
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.5"
           strokeLinecap="round" strokeLinejoin="round"
           aria-hidden="true"
           className="transition-opacity duration-300 opacity-100">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7
                 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8
                 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
      
      {/* Desktop Tooltip */}
      <span className="absolute right-full mr-4 bg-[#1a1a1e]/90 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] uppercase tracking-[0.1em] px-4 py-2 rounded-md shadow-xl opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap hidden md:block" aria-hidden="true">
        Chat on WhatsApp
      </span>
    </a>
  );
}
