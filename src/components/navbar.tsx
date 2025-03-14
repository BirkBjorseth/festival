"use client"

import { useSession, signOut } from "next-auth/react"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react"
import { useState, useEffect, useRef } from "react"

export default function NavBar() {
  const { data: session, status } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)

  // Lytt etter sesjonens status, og sett isLoading til false når sesjonen er klar
  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false)
    }
  }, [status])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <Navbar isBordered className="px-6 py-3 bg-[var(--background)] text-[var(--foreground)] shadow-lg flex justify-between items-center">
      {/* Logo */}
      <NavbarBrand>
        <p className="font-bold text-xl text-[var(--foreground)] tracking-wide">Hardstyle</p>
      </NavbarBrand>

      {/* Meny (Hjem, Festivaler) */}
      <NavbarContent className="flex gap-6">
        <NavbarItem>
          <Link href="/" className="text-lg text-[var(--foreground)] hover:text-gray-600 transition">
            Hjem
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/events" className="text-lg text-[var(--foreground)] hover:text-gray-600 transition">
            Festivaler
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Brukermeny (logg inn/logg ut) */}
      <NavbarContent className="ml-auto">
        {isLoading ? (
          <p>Loading...</p> // Placeholder under lasting
        ) : session ? (
          <div className="relative">
            <button className="bg-gray-200 text-[var(--foreground)] px-4 py-2 rounded-full hover:bg-gray-300 transition" onClick={() => setMenuOpen((prev) => !prev)}>
              {session.user?.name || session.user?.email}
            </button>
            {menuOpen && (
              <div ref={menuRef} className="absolute right-0 mt-2 w-40 bg-white text-[var(--foreground)] rounded-md shadow-lg py-2 border">
                <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition">
                  Logg ut
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavbarItem>
            <Button as={Link} color="primary" href="/auth" variant="flat" className="bg-blue-600 text-white rounded-full px-5 py-2 hover:bg-blue-500 transition">
              Logg inn
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  )
}
