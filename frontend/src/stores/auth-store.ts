'use client'

import { createStore } from 'zustand'
import type { StateCreator } from 'zustand'

interface User {
  _id: string
  username: string
  email: string
  // add more fields if needed
}

export interface AuthState {
  isLoggedIn: boolean
  user: User | null
  loading: boolean
  hasChecked: boolean
  error: string | null
  checkLogin: () => Promise<void>
  login: (email: string, password: string) => Promise<boolean | void>
  signup: (username: string, email: string, password: string) => Promise<boolean | void>
  logout: () => Promise<void>
}

const createAuthState: StateCreator<AuthState> = (set, get) => ({
  isLoggedIn: false,
  user: null,
  loading: false,
  hasChecked: false,
  error: null,

checkLogin: async () => {
  const { hasChecked } = get();
  if (hasChecked) return;  // ✅ only once

  console.log("checkLogin function called");

  try {
    set({ loading: true, error: null });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/status`,
      { method: "GET", credentials: "include" }
    );

    if (response.ok) {
      const data = await response.json();
      set({
        isLoggedIn: data.isLoggedIn,
        user: data.user,
        loading: false,
        hasChecked: true, // ✅ mark checked
      });
    } else {
      set({
        isLoggedIn: false,
        user: null,
        loading: false,
        hasChecked: true,
      });
    }
  } catch (err: any) {
    set({
      error: err.message,
      isLoggedIn: false,
      user: null,
      loading: false,
      hasChecked: true,
    });
  }
}

  ,

  login: async (email, password) => {
    console.log("login function called with:", email, password);
    try {
      set({ loading: true, error: null })
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        },
      )

      const data = await response.json();
      console.log("Login response:", data);

      if (response.status === 200) {
        console.log("Login successful....");
        set({ isLoggedIn: true, user: data.user, loading: false });
        return true;
      } else {
        set({
          error: data.message || "Login failed",
          loading: false,
        });
        return false;
      }

    } catch (err: any) {
      set({ error: err.message, loading: false })
      return false

    }
  },

  signup: async (username: string, email: string, password: string) => {
    console.log("signup function called with:", username, email, password);
    try {
      set({ loading: true, error: null })
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
          credentials: 'include',
        },
      )
      console.log("Signup response:", response);
      if (response.status === 201) {
        await get().login(email, password)
        return true
      } else {

        const errorData = await response.json().catch(() => ({}))
        set({
          error: errorData.message || 'Signup failed',
          loading: false,
        })
        return false
      }
    } catch (err: any) {
      set({ error: err.message, loading: false })
      return false
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })

      console.log("Logout response:", response);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        set({
          error: errorData.message || 'Logout failed',
          loading: false,
        })
        return
      }
      set({ isLoggedIn: false, user: null })
    } catch (err: any) {
      set({ error: err.message })
    }
  },
})

export const createAuthStore = () => createStore<AuthState>(createAuthState)
