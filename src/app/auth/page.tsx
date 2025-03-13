"use client"

import { useState } from "react"
import { registerUser, loginUser } from "@/lib/auth"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setError(null)
    setLoading(true)
    try {
      await registerUser(email, password)
      alert("Bruker registrert!")
    } catch (err) {
      setError("Feil ved registrering. Sjekk at e-post og passord er korrekt.")
    }
    setLoading(false)
  }

  const handleLogin = async () => {
    setError(null)
    setLoading(true)
    try {
      await loginUser(email, password)
      alert("Innlogging vellykket!")
    } catch (err) {
      setError("Feil ved innlogging. Sjekk e-post og passord.")
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Logg inn eller registrer deg</h1>

      <input type="email" placeholder="E-post" className="mb-2 p-2 text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Passord" className="mb-2 p-2 text-black" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={handleRegister} disabled={loading}>
        {loading ? "Laster..." : "Registrer"}
      </button>

      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2" onClick={handleLogin} disabled={loading}>
        {loading ? "Laster..." : "Logg inn"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
