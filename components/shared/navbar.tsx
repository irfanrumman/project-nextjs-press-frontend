"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";

// Navigation items array for easy organization
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// User dropdown items array for easy organization
const USER_MENU_ITEMS = [
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Billing", href: "/billing" },
];

/*
{
    "success": true,
    "statusCode": 200,
    "message": "User Profile Fetched Successfully",
    "data": {
        "profile": {
            "id": "9807da2f-caed-403b-b3d3-6c5d47c6f404",
            "name": "Hablu-2",
            "email": "hablu2@gmail.com",
            "activestatus": "ACTIVE",
            "role": "USER",
            "createdAt": "2026-07-07T17:40:23.286Z",
            "updatedAt": "2026-07-07T17:40:23.286Z",
            "profile": {
                "id": "6f4e7b8e-752a-4a7f-83c0-18d38522f0e2",
                "profilePhoto": "www.google.com",
                "bio": null,
                "userId": "9807da2f-caed-403b-b3d3-6c5d47c6f404",
                "createdAt": "2026-07-07T17:40:23.365Z",
                "updatedAt": "2026-07-07T17:40:23.365Z"
            }
        }
    }
}
*/

type IUser = {
  Success: boolean;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activestatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

type NavbarProps = {
  user: IUser;
};

export function Navbar({ user }: NavbarProps) {
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
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.data?.profile.name || "Name"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.data?.profile.email || "Email"}
                  </p>
                </div>
              </DropdownMenuLabel>
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
  );
}
