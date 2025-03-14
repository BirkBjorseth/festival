"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setError(null)
    setLoading(true)
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (result?.error) {
      setError("Feil e-post eller passord.")
    } else {
      router.push("/")
    }
    setLoading(false)
  }

  const handleRegister = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) throw new Error("Kunne ikke registrere bruker")

      await handleLogin()
    } catch {
      setError("Feil ved registrering. Sjekk at e-post ikke er i bruk.")
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">{isRegistering ? "Registrer deg" : "Logg inn"}</h1>

        {/* Navn-felt for registrering */}
        {isRegistering && <input type="text" placeholder="Navn" className="mb-3 p-2 border rounded w-full text-black" value={name} onChange={(e) => setName(e.target.value)} />}

        {/* E-post og passord */}
        <input type="email" placeholder="E-post" className="mb-3 p-2 border rounded w-full text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Passord" className="mb-3 p-2 border rounded w-full text-black" value={password} onChange={(e) => setPassword(e.target.value)} />

        {/* Login eller registreringsknapp */}
        <button
          className={`w-full py-2 text-white font-bold rounded ${isRegistering ? "bg-blue-500 hover:bg-blue-700" : "bg-green-500 hover:bg-green-700"}`}
          onClick={isRegistering ? handleRegister : handleLogin}
          disabled={loading}
        >
          {loading ? "Laster..." : isRegistering ? "Registrer" : "Logg inn"}
        </button>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        {/* Bytte mellom login og registrering */}
        <p className="mt-4 text-center">
          {isRegistering ? (
            <>
              Har du allerede en konto?{" "}
              <span className="text-blue-500 cursor-pointer underline" onClick={() => setIsRegistering(false)}>
                Logg inn her
              </span>
            </>
          ) : (
            <>
              Har du ikke en konto?{" "}
              <span className="text-blue-500 cursor-pointer underline" onClick={() => setIsRegistering(true)}>
                Registrer deg her
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
