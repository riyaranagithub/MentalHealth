'use client'

import React, { createContext, useContext, useRef } from 'react'
import { createChatStore, type ChatState } from '@/stores/chat-store'
import { StoreApi, useStore } from 'zustand'

// Create a React Context to hold the Zustand store
const ChatStoreContext = createContext<StoreApi<ChatState> | null>(null)

// ✅ Provider Component
export function ChatStoreProvider({ children }: { children: React.ReactNode }) {
  // useRef ensures the store is created only once (per component lifetime)
  const storeRef = useRef<StoreApi<ChatState>>(null)
  if (!storeRef.current) {
    storeRef.current = createChatStore()
  }

  return (
    <ChatStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatStoreContext.Provider>
  )
}

// ✅ Custom Hook for easy usage inside components
export function useChatStore<T>(selector: (state: ChatState) => T): T {
  const store = useContext(ChatStoreContext)
  if (!store) {
    throw new Error('useChatStore must be used within a ChatStoreProvider')
  }
  return useStore(store, selector)
}
