'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/providers/auth-store-provider'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const hasChecked = useAuthStore((s) => s.hasChecked)
  const loading = useAuthStore((s) => s.loading)
  const checkLogin = useAuthStore((s) => s.checkLogin)
  const [redirecting,setRedirecting] = useState(false);

  const router = useRouter()
  const pathname = usePathname()

  // ✅ Check login status only once on mount
  useEffect(() => {
    checkLogin()
  }, [checkLogin])

  // ✅ Redirect logic
  useEffect(() => {
    if (!loading && hasChecked) {
      if (!isLoggedIn && !pathname.startsWith('/auth')) {
        router.push('/auth')
      } else if (isLoggedIn && pathname.startsWith('/auth')) {
        setRedirecting(true);
         setTimeout(() => {
        router.push("/");
        setRedirecting(false);
      }, 3000); 
      }
    }
  }, [isLoggedIn, loading, hasChecked, pathname, router])

  if (redirecting) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <p className="text-lg font-medium text-muted-foreground animate-pulse">
            Login successful, navigating to home...
          </p>
        </div>
      );
    }

  // ✅ Centered Loader
  if (loading || !hasChecked)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm z-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
    )

  return <>{children}</>
}
