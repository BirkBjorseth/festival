"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react"

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <Navbar isBordered className="px-6 py-3 bg-[var(--background)] text-[var(--foreground)] shadow-lg">
      <NavbarBrand>
        <p className="font-bold text-xl text-[var(--foreground)] tracking-wide">Hardstyle</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6">
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

      {/* Brukermeny */}
      <NavbarContent className="ml-auto relative">
        {user ? (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="bg-gray-200 text-[var(--foreground)] px-4 py-2 rounded-full hover:bg-gray-300 transition">
              {user.displayName || user.email}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-[var(--foreground)] rounded-md shadow-lg py-2 border">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition">
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
