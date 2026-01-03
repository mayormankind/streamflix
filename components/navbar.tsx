"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { SearchModal } from "@/components/search-modal"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/tv-shows", label: "TV Shows" },
    { href: "/movies", label: "Movies" },
    { href: "/new-popular", label: "New & Popular" },
    { href: "/admin", label: "Admin" },
  ]

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 transition-colors duration-300 md:px-12",
          isScrolled ? "bg-background/95 backdrop-blur-md" : "bg-gradient-to-b from-black/80 to-transparent",
        )}
      >
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">
            STREAMFLIX
          </Link>
          <div className="hidden gap-6 text-sm font-medium text-muted-foreground md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  pathname === item.href ? "text-foreground font-semibold" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Search
            className="h-5 w-5 cursor-pointer transition-transform hover:scale-110"
            onClick={() => setIsSearchOpen(true)}
          />
          <Bell className="h-5 w-5 cursor-pointer transition-transform hover:scale-110" />
          <div className="h-8 w-8 overflow-hidden rounded-md bg-muted">
            <User className="h-full w-full p-1" />
          </div>
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
