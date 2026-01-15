"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AuthFormProps {
  mode: "login" | "register"
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const { login, register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (mode === "login") {
        if (!formData.email || !formData.password) {
          setError("Please fill in all fields")
          setIsLoading(false)
          return
        }
        await login(formData.email, formData.password)
      } else {
        if (!formData.email || !formData.password || !formData.name) {
          setError("Please fill in all fields")
          setIsLoading(false)
          return
        }
        await register(formData.email, formData.password, formData.name)
      }
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-center text-pretty">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-muted-foreground text-center mb-8 text-pretty">
          {mode === "login" ? "Sign in to your account" : "Join TechHome today"}
        </p>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-6 text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground transition"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground transition"
            />
          </div>

          {mode === "login" && (
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        {/* Social Login Options */}
        <div className="mt-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition font-medium text-foreground"
            >
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition font-medium text-foreground"
            >
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Toggle between login and register */}
        <p className="text-center mt-6 text-muted-foreground text-sm">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <Link href={mode === "login" ? "/register" : "/login"} className="text-primary hover:underline font-semibold">
            {mode === "login" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  )
}
