"use client"

import { create } from "zustand"

export interface JournalEntry {
  _id: string
  user: string
  date: string
  mood: "happy" | "sad" | "anxious" | "angry" | "calm" | "neutral" | "excited"
  moodEmoji: string
  stressLevel: number
  energyLevel: number
  triggers?: string
  gratitude?: string
  copingActivities?: string[]
  sleepQuality: "poor" | "average" | "good" | "excellent"
  reflection?: string
}

export interface JournalState {
  journals: JournalEntry[]
  loading: boolean
  error: string | null

  fetchJournals: () => Promise<void>
  fetchJournalById: (id: string) => Promise<void>
  createJournal: (data: Omit<JournalEntry, "_id" | "user" | "date">) => Promise<boolean>
  updateJournal: (id: string, data: Partial<JournalEntry>) => Promise<boolean>
  deleteJournal: (id: string) => Promise<boolean>
}

export const useJournalStore = create<JournalState>((set, get) => ({
  journals: [],
  selectedJournal: null,
  loading: false,
  error: null,

  // Fetch all journals
  fetchJournals: async () => {
    try {
      set({ loading: true, error: null })
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/journal`, {
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to fetch journals")
      const data = await res.json()
    console.log("Fetched journals:", data);
      set({ journals: data, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  // Fetch single journal by ID
  fetchJournalById: async (_id) => {
    try {
      set({ loading: true, error: null })
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/journal/${_id}`, {
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to fetch journal")
      const data = await res.json()
      set({loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  // Create new journal
  createJournal: async (data) => {
    try {
      set({ loading: true, error: null })
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/journal`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        throw new Error("Failed to create journal");
      }
      const result = await res.json()
      console.log("create journal response ..", result);
      set({ journals: [result.entry, ...get().journals], loading: false })
      return true;
    } catch (error: any) {
      set({ error: error.message, loading: false })
      return false;
    }
  },

  // Update journal by ID
  updateJournal: async (_id, data) => {
    
    try {
      set({ loading: true, error: null })
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/journal/${_id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to update journal")
      const result = await res.json()
      
    console.log("updating journal response....",result)
      set({
        journals: get().journals.map((j) => (j._id === _id ? result.entry : j)),
        loading: false,
      })
       return true;
    } catch (error: any) {
      set({ error: error.message, loading: false })
      return false;
    }
  },

  // Delete journal by ID
  deleteJournal: async (id) => {
    try {
      set({ loading: true, error: null })
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/journal/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to delete journal")
      await res.json()
      set({
        journals: get().journals.filter((j) => j._id !== id),
        loading: false,
      })
      return true;
    } catch (error: any) {
      set({ error: error.message, loading: false })
      return false;
    }
  },
}))
