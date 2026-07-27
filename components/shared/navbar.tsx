'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CircleUser } from 'lucide-react'

// Navigation items array for easy organization
const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// User dropdown items array for easy organization
const USER_MENU_ITEMS = [
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', href: '/settings' },
  { label: 'Billing', href: '/billing' },
]

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-indigo-700">
            NextJs Press
          </Link>

          {/* Nav Links - Hidden on mobile */}
          <div className="hidden gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center"
              >
                <CircleUser className="h-5 w-5" />
              </Button> */}


               <div
                // variant="ghost"
                // size="icon"
                className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center hover:cursor-pointer hover:bg-amber-400 transition-colors"
              >
                <CircleUser className="h-5 w-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {USER_MENU_ITEMS.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
