import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Sjekk om e-post allerede finnes
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return new Response(JSON.stringify({ error: "E-post er allerede i bruk" }), { status: 400 })
    }

    // Hash passordet før lagring
    const hashedPassword = await hash(password, 10)

    // Opprett bruker
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "USER" },
    })

    return new Response(JSON.stringify(newUser), { status: 201 })
  } catch (error) {
    console.error("Feil ved registrering:", error)
    return new Response(JSON.stringify({ error: "Feil ved registrering" }), { status: 500 })
  }
}
