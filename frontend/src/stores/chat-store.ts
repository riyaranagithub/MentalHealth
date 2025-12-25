'use client'

import { createStore } from 'zustand'
import type { StateCreator } from 'zustand'

export interface ChatState {
  loading: boolean
  reply: string
  error: string | null
  sendMessage: (message: string,messages:{
      id: number,
      sender: string,
      text: string,
      timestamp: Date
    }[]) => Promise<void>
}

const createChatState: StateCreator<ChatState> = (set, get) => ({
  loading: false,
  reply: '',
  error: null,

  sendMessage: async (message,messages) => {
    try {
      set({ loading: true, error: null })

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message,messages}),
        credentials: 'include',
      })

      console.log("chat...",response);
      if (response.ok) {
        const data = await response.json()
        set({
          reply: data.reply,
          loading: false,
        })
      } else {
        set({
          reply: '',
          loading: false,
          error: 'Failed to get response',
        })
      }
    } catch (err: any) {
      set({
        error: err.message,
        reply: '',
        loading: false,
      })
    }
  },
})

export const createChatStore = () => createStore<ChatState>(createChatState)
