"use client"

import { useState, useEffect } from "react"
import { registerUser, loginUser, signInWithGoogle } from "@/lib/auth"
import { FaGoogle } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("") // Kun for registrering
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false) // Bytt mellom login/registrering
  const router = useRouter()

  // Hvis brukeren er logget inn, redirect til hjem-siden
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/")
    })
    return () => unsubscribe()
  }, [router])

  // ✅ Registrer bruker
  const handleRegister = async () => {
    setError(null)
    setLoading(true)
    try {
      await registerUser(email, password, username)
      router.push("/") // Redirect til hjem-siden etter registrering
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
      router.push("/") // Redirect til hjem-siden etter innlogging
    } catch (err) {
      console.error("Feil ved innlogging:", err)
      setError("Feil ved innlogging. Sjekk e-post og passord.")
    }
    setLoading(false)
  }

  // ✅ Google Log-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.push("/") // Redirect til hjem-siden etter Google-login
    } catch (error) {
      console.error("Feil ved Google Sign-In:", error)
      setError("Feil ved Google Sign-In.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">{isRegistering ? "Registrer deg" : "Logg inn"}</h1>

        {/* Brukernavn-felt for registrering */}
        {isRegistering && <input type="text" placeholder="Brukernavn" className="mb-3 p-2 border rounded w-full text-black" value={username} onChange={(e) => setUsername(e.target.value)} />}

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

        {/* Feilmelding */}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        {/* Horisontal avskillelse */}
        <div className="w-full flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-500">eller</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Google Login-knapp */}
        <button onClick={handleGoogleSignIn} className="flex items-center justify-center w-full border p-2 rounded-md shadow-md hover:bg-gray-200 transition">
          <FaGoogle className="mr-2 text-red-500" /> Logg inn med Google
        </button>

        {/* Bytte mellom login og registrering */}
        <p className="mt-4 text-center">
          {isRegistering ? (
            <>
              Har du allerede en bruker?{" "}
              <span className="text-blue-500 cursor-pointer underline" onClick={() => setIsRegistering(false)}>
                Logg inn her
              </span>
            </>
          ) : (
            <>
              Har du ikke en bruker?{" "}
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
