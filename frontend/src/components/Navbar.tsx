'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Sheet, SheetTitle, SheetContent, SheetDescription, SheetTrigger } from './ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  User,
  Menu,
  MessageSquare,
  BookOpen,
  Home,
  LogOut,
  Settings,
  LogIn,
} from 'lucide-react'

import { usePathname } from 'next/navigation'

import { useAuthStore } from '@/providers/auth-store-provider'

export default function Navbar() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
 
  const pathname = usePathname();
  // console.log(pathname);
  const [activeItem, setActiveItem] = useState(pathname||'home')



  type NavigationItem = {
    id: string;
    label: string;
    icon: React.ElementType;
    link: string;
  };

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: Home , link: '/' },
    { id: 'journal', label: 'Journal', icon: BookOpen , link: '/journal' },
    { id: 'chatbot', label: 'Chatbot', icon: MessageSquare , link: '/chatbot' },
  ];

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (

    <>
      {isLoggedIn ? (
        navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeItem === item.link ? 'default' : 'ghost'}
              onClick={() => setActiveItem(item.link)}
              className={mobile ? 'w-full justify-start' : ''}
              asChild={!!item.link}
            >
              <Link href={item.link || '#'}>
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            </Button>
          );
        })
      ) : null}
    </>
  )

  const AuthButtons = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {!isLoggedIn ? (
        <div className={`flex ${mobile ? 'flex-col w-full gap-2' : 'gap-2'}`}>
          <Link href="/auth">
            <Button
              variant="default"
              className={mobile ? 'w-full justify-start' : ''}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          
          
          </Link>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.jpg" alt="Profile" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem onClick={() => setActiveItem('profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
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
            <h1 className="text-xl font-semibold">MyApp</h1>
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
