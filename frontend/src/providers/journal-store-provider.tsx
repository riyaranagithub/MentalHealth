'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import type { JournalState } from '@/stores/journal-store'
import { useJournalStore } from '@/stores/journal-store'

// The type of the Zustand store API
export type JournalStoreApi = typeof useJournalStore

// Create context
const JournalStoreContext = createContext<JournalStoreApi | undefined>(undefined)

export interface JournalStoreProviderProps {
  children: ReactNode
}

export const JournalStoreProvider = ({ children }: JournalStoreProviderProps) => {
  // keep store in a ref so it's not recreated
const storeRef = useRef<JournalStoreApi | null>(null)

if (!storeRef.current) {
  storeRef.current = useJournalStore
}

  return (
    <JournalStoreContext.Provider value={storeRef.current}>
      {children}
    </JournalStoreContext.Provider>
  )
}

// custom hook to consume store
export const useJournalStoreContext = <T,>(selector: (state: JournalState) => T): T => {
  const store = useContext(JournalStoreContext)

  if (!store) {
    throw new Error('useJournalStoreContext must be used within JournalStoreProvider')
  }

  return useStore(store, selector)
}
