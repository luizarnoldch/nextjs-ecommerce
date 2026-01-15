"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import type { AuthState, User } from "./types"

interface AuthContextType {
  state: AuthState
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<void>
  updateUser: (user: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setState({
          user: JSON.parse(savedUser),
          isAuthenticated: true,
          isLoading: false,
        })
      } catch {
        setState({ user: null, isAuthenticated: false, isLoading: false })
      }
    } else {
      setState({ user: null, isAuthenticated: false, isLoading: false })
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call your backend
    if (email && password) {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
      }
      localStorage.setItem("user", JSON.stringify(user))
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const register = async (email: string, password: string, name: string) => {
    // Mock register
    if (email && password && name) {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
      }
      localStorage.setItem("user", JSON.stringify(user))
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false,
      })
    }
  }

  return <AuthContext.Provider value={{ state, login, logout, register, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
