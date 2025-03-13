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
    <Navbar isBordered className="px-6 py-3 bg-gradient-to-r from-black via-gray-900 to-black shadow-lg">
      <NavbarBrand>
        <p className="font-bold text-xl text-white tracking-wide">Hardstyle Event Tracker</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6">
        <NavbarItem>
          <Link href="/" className="text-lg text-gray-300 hover:text-white transition">
            Hjem
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/events" className="text-lg text-gray-300 hover:text-white transition">
            Festivaler
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Brukermeny */}
      <NavbarContent className="ml-auto relative">
        {user ? (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition">
              {user.displayName || user.email}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-900 text-white rounded-md shadow-lg py-2">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-600 transition">
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
