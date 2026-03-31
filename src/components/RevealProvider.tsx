'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface RevealContextProps {
  isRevealed: boolean
  triggerReveal: () => void
}

const RevealContext = createContext<RevealContextProps | undefined>(undefined)

export function RevealProvider({ children }: { children: ReactNode }) {
  const [isRevealed, setIsRevealed] = useState(false)

  const triggerReveal = () => {
    setIsRevealed(true)
  }

  return (
    <RevealContext.Provider value={{ isRevealed, triggerReveal }}>
      {children}
    </RevealContext.Provider>
  )
}

export function useReveal() {
  const context = useContext(RevealContext)
  if (!context) {
    throw new Error('useReveal must be used within a RevealProvider')
  }
  return context
}
