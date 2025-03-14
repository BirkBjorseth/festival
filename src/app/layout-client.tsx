"use client"

import { SessionProvider } from "next-auth/react"
import NavBar from "@/components/navbar"

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NavBar />
      <main>{children}</main>
    </SessionProvider>
  )
}
