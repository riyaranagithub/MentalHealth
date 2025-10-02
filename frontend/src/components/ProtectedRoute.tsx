'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/providers/auth-store-provider'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const hasChecked = useAuthStore((s) => s.hasChecked)
  const loading = useAuthStore((s) => s.loading)
  const checkLogin = useAuthStore((s) => s.checkLogin)

  const router = useRouter()
  const pathname = usePathname()

 useEffect(() => {
  // run checkLogin only once on mount
  checkLogin();
}, []); 

   // ✅ Redirect logic
  useEffect(() => {
    if (!loading && hasChecked) {
      if (!isLoggedIn && !pathname.startsWith("/auth")) {
        // User not logged in → trying to access protected route
        router.push("/auth");
      } else if (isLoggedIn && pathname.startsWith("/auth")) {
        // User is logged in → trying to visit /auth (login/signup)
        router.push("/");
      }
    }
  }, [isLoggedIn, loading, hasChecked, pathname, router]);


  if (loading || !hasChecked) return <p>Loading...</p>


  return <>{children}</>
}
