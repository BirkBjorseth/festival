import { auth, db } from "./firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export const registerUser = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // 🔥 Lagre ekstra data i Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      username: username, // Brukernavn
      createdAt: new Date(),
    })

    return user
  } catch (error) {
    console.error("Feil ved registrering:", error)
    throw error
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Feil ved innlogging:", error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
    console.log("Bruker logget ut")
  } catch (error) {
    console.error("Feil ved utlogging:", error)
    throw error
  }
}
