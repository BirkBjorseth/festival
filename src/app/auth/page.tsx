"use client"

import { useState } from "react"
import { registerUser, loginUser } from "@/lib/auth"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("") // Brukernavn, kun for registrering
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false) // 🔥 Styrer visning av login/registrering

  // ✅ Registrer bruker
  const handleRegister = async () => {
    setError(null)
    setLoading(true)
    try {
      await registerUser(email, password, username)
      alert("Bruker registrert!")
      setIsRegistering(false) // Bytt tilbake til login etter registrering
    } catch (err) {
      console.error("Feil ved registrering:", err)
      setError("Feil ved registrering. Sjekk at e-post og passord er korrekt.")
    }
    setLoading(false)
  }

  // ✅ Logg inn bruker
  const handleLogin = async () => {
    setError(null)
    setLoading(true)
    try {
      await loginUser(email, password)
      alert("Innlogging vellykket!")
    } catch (err) {
      console.error("Feil ved innlogging:", err)
      setError("Feil ved innlogging. Sjekk e-post og passord.")
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-2xl font-bold mb-4">{isRegistering ? "Registrer deg" : "Logg inn"}</h1>

      {/* 🔥 Hvis brukeren registrerer seg, vis brukernavn-input */}
      {isRegistering && <input type="text" placeholder="Brukernavn" className="mb-2 p-2 text-black" value={username} onChange={(e) => setUsername(e.target.value)} />}

      <input type="email" placeholder="E-post" className="mb-2 p-2 text-black" value={email} onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="Passord" className="mb-2 p-2 text-black" value={password} onChange={(e) => setPassword(e.target.value)} />

      {isRegistering ? (
        // 🔥 Registreringsknapp
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={handleRegister} disabled={loading}>
          {loading ? "Laster..." : "Registrer"}
        </button>
      ) : (
        // 🔥 Innloggingsknapp
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2" onClick={handleLogin} disabled={loading}>
          {loading ? "Laster..." : "Logg inn"}
        </button>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* 🔥 Bytte mellom registrering og login */}
      <p className="mt-4">
        {isRegistering ? (
          <>
            Har du allerede en bruker?{" "}
            <span className="text-blue-400 cursor-pointer underline" onClick={() => setIsRegistering(false)}>
              Logg inn her
            </span>
          </>
        ) : (
          <>
            Har du ikke en bruker?{" "}
            <span className="text-blue-400 cursor-pointer underline" onClick={() => setIsRegistering(true)}>
              Registrer deg her
            </span>
          </>
        )}
      </p>
    </div>
  )
}
