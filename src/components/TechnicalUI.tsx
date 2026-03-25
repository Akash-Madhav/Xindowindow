'use client'

import React from 'react'

export default function TechnicalUI() {
  return (
    <section className="relative bg-red-gradient py-24 sm:py-32 px-6 flex flex-col items-center industrial-texture overflow-hidden">
      <div className="flex items-center gap-4 mb-16">
        <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
        <span className="font-mono text-[11px] uppercase text-[var(--color-silver)] tracking-[0.4em] font-medium italic">Technical Showcase</span>
        <div className="w-[48px] h-[2px] bg-[var(--color-primary)]" />
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center justify-center max-w-[1200px] mx-auto">
        <div className="flex flex-col max-w-[400px]">
          <h2 className="font-display font-bold text-[32px] md:text-[44px] text-white leading-none uppercase italic mb-6 tracking-tighter">
            Precision <br /> 
            <span className="text-[var(--color-primary)]">Interfaces</span>
          </h2>
          <p className="font-sans text-[15px] text-[var(--color-silver)] opacity-70 leading-relaxed border-l border-[var(--color-primary-muted)] pl-6">
            Explore our industrial design language through interactive technical registries. Every component is engineered for millimetric accuracy.
          </p>
        </div>

        {/* Uiverse Component Integration */}
        <div className="technical-card-container">
          <div className="technical-card">
            <div className="panel">
              <span className="panel-text">Structural Integrity</span>
            </div>
            <div className="panel">
              <span className="panel-text">Thermal Efficiency</span>
            </div>
            <div className="panel">
              <span className="panel-text">Acoustic Logic</span>
            </div>
            <div className="panel">
              <span className="panel-text">Optical Clarity</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .technical-card-container {
          padding: 2rem;
          background: rgba(var(--primary-rgb), 0.03);
          border: 1px solid rgba(var(--primary-rgb), 0.1);
          backdrop-blur: 10px;
        }
        
        .technical-card {
          width: 320px;
          height: 380px;
          border-radius: 2px;
          background: var(--color-black-soft);
          display: flex;
          gap: 6px;
          padding: 0.6em;
          border: 1px border-[var(--color-black-light)];
        }

        .panel {
          height: 100%;
          flex: 1;
          overflow: hidden;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          background: var(--color-black-mid);
          border: 1px solid rgba(var(--primary-rgb), 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .panel:hover {
          flex: 6;
          background: var(--color-black-mid);
          border-color: var(--color-primary);
          box-shadow: 0 0 30px rgba(var(--primary-rgb), 0.15);
        }

        .panel-text {
          min-width: 18em;
          padding: 0.5em;
          text-align: center;
          transform: rotate(-90deg);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          text-transform: uppercase;
          color: var(--color-primary);
          letter-spacing: 0.2em;
          font-family: var(--font-space-mono);
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          opacity: 0.6;
        }

        .panel:hover .panel-text {
          transform: rotate(0);
          opacity: 1;
          letter-spacing: 0.3em;
        }

        @media (max-width: 640px) {
          .technical-card {
            width: 280px;
            height: 320px;
          }
        }
      `}</style>
    </section>
  )
}
