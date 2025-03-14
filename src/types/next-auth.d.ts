import { DefaultSession, DefaultUser } from "next-auth"

// Utvider NextAuth sine typer
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: "USER" | "ADMIN"
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    role: "USER" | "ADMIN"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string
    role?: "USER" | "ADMIN"
  }
}
