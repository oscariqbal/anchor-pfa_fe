"use client"

import { createContext, useContext } from "react"

type UserType = {
  id: number
  name: string
  email: string
  timezone: string
}

export const UserContext = createContext<UserType | null>(null)

export function UserProvider({ user, children }: { user: UserType, children: React.ReactNode }) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUser must be used within UserContext.Provider")
  }

  return context
}