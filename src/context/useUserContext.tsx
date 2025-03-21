"use client"
import { createContext, useContext, useState, useEffect } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { QueryClient } from "@tanstack/react-query"
import { clearToken, setTokenToLocalStorage } from "@/helper/tokenStorage"
const queryClient = new QueryClient()

type UserContextType = {
  user: null | Record<string, any>
  loginUser: (userInfo: any, token: string) => void
  logoutUser: () => void
}

const UserContext = createContext<UserContextType | null>(null)

const setCookie = (name: string, value: string, days = 30) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<null | Record<string, any>>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      return storedUser ? JSON.parse(storedUser) : null
    }
    return null
  })

  const loginUser = (userInfo: any, token: string) => {
    setUser(userInfo)
    setTokenToLocalStorage(token)
    setCookie("accessToken", token)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.removeItem("user")
      }
    }
  }, [user])

  const logoutUser = () => {
    clearToken()
    setUser(null)
    // Also clear the cookie
    deleteCookie("accessToken")
    router.push("/")
    queryClient.clear()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

