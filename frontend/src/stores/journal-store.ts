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
  selectedJournal: JournalEntry | null
  loading: boolean
  error: string | null

  fetchJournals: () => Promise<void>
  fetchJournalById: (id: string) => Promise<void>
  createJournal: (data: Omit<JournalEntry, "_id" | "user" | "date">) => Promise<void>
  updateJournal: (id: string, data: Partial<JournalEntry>) => Promise<void>
  deleteJournal: (id: string) => Promise<void>
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
  fetchJournalById: async (id) => {
    try {
      set({ loading: true, error: null })
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/journal/${id}`, {
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to fetch journal")
      const data = await res.json()
      set({ selectedJournal: data, loading: false })
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
      if (!res.ok) throw new Error("Failed to create journal")
      const result = await res.json()
      set({ journals: [result.entry, ...get().journals], loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  // Update journal by ID
  updateJournal: async (id, data) => {
    try {
      set({ loading: true, error: null })
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/journal/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to update journal")
      const result = await res.json()
      set({
        journals: get().journals.map((j) => (j._id === id ? result.entry : j)),
        selectedJournal: result.entry,
        loading: false,
      })
    } catch (error: any) {
      set({ error: error.message, loading: false })
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
        selectedJournal: get().selectedJournal?._id === id ? null : get().selectedJournal,
        loading: false,
      })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },
}))
