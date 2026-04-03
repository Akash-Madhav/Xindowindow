'use client'

import { createContext, useContext, ReactNode } from 'react'
import { WPGlobalSettings } from './wp-types'
import { FALLBACK_GLOBAL_SETTINGS } from './wordpress'

const WPContext = createContext<WPGlobalSettings>(FALLBACK_GLOBAL_SETTINGS)

export function WordPressProvider({ 
  children, 
  settings = FALLBACK_GLOBAL_SETTINGS 
}: { 
  children: ReactNode; 
  settings?: WPGlobalSettings 
}) {
  return (
    <WPContext.Provider value={settings}>
      {children}
    </WPContext.Provider>
  )
}

export function useWordPress() {
  return useContext(WPContext)
}
