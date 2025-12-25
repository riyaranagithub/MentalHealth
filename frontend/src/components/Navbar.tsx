'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Sheet, SheetTitle, SheetContent, SheetDescription, SheetTrigger } from './ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  User,
  Menu,
  MessageSquare,
  BookOpen,
  Home,
  TrendingUp
} from 'lucide-react'

import { usePathname, useRouter } from 'next/navigation'

import { useAuthStore } from '@/providers/auth-store-provider'

import LogoutButton from '@/components/LogoutButton'

export default function Navbar() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const user = useAuthStore((s) => s.user)


  const pathname = usePathname();
  const router = useRouter();
  // console.log(pathname);
  const [activeItem, setActiveItem] = useState(pathname || 'home')
  const [redirecting, setRedirecting] = useState(false)
  const [message, setMessage] = useState("Redirecting...")

  type NavigationItem = {
    id: string;
    label: string;
    icon: React.ElementType;
    link: string;
  };

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: Home, link: '/' },
    { id: 'journal', label: 'Journal', icon: BookOpen, link: '/journal' },
    { id: 'gentle support', label: 'Gentle Support', icon: MessageSquare, link: '/gentlesupport' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, link: '/progress' },
  ];


  const handleNavigation = (item: NavigationItem) => {
    setActiveItem(item.link)
    setMessage(`Redirecting to ${item.label}...`)
    setRedirecting(true)

    setTimeout(() => {
      router.push(item.link)
      setRedirecting(false)
    }, 1000) // short delay for the message
  }

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (

    <>

      <AlertDialog open={redirecting} onOpenChange={setRedirecting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Redirecting</AlertDialogTitle>
            <AlertDialogDescription>
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      {isLoggedIn ? (
        navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeItem === item.link ? 'default' : 'ghost'}
              onClick={() => {
                handleNavigation(item)
              }}


              className={mobile ? 'w-full justify-start cursor-pointer' : 'cursor-pointer'}
              asChild={!!item.link}
            >
              <div className="flex items-center">
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </div>


            </Button>
          );
        })
      ) : null}
    </>
  )

  const AuthButtons = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {!isLoggedIn ? (
        null
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem >
              <User className="mr-2 h-4 w-4" />
              {isLoggedIn
                    ? `Hello, ${user?.username || 'User'}!`
                    : 'Welcome! Please log in or sign up.'}
            </DropdownMenuItem>
           
            <DropdownMenuSeparator />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
             <h3 className="text-3xl text-purple-600 flex items-center gap-2">
                MindMate
              </h3>
          </div>
          

          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center space-x-4">
            <NavItems />
          </div>


          {/* Desktop Auth */}
          <div className="hidden md:flex items-center">
            <AuthButtons />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetTitle>Menu</SheetTitle>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetDescription>
                  {isLoggedIn
                    ? `Hello, ${user?.username || 'User'}!`
                    : 'Welcome! Please log in or sign up.'}
                </SheetDescription>
                <div className="flex flex-col space-y-4 mt-6">
                  <NavItems mobile />
                  <div className="pt-4 border-t">
                    <AuthButtons mobile />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
