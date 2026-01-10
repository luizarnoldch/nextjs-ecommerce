"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signUp } from "@/lib/auth-client"

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    await signUp.email(
      {
        email,
        password,
        name
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully!")
          router.push("/dashboard")
        },
        onError: (ctx: { error: { message: string } }) => {
          toast.error(ctx.error.message || "Something went wrong")
          setIsLoading(false)
        }
      }
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Crear Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSignUp}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
              />
            </div>

            {/* Nombre */}
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Tu nombre"
              />
            </div>

            {/* Contraseña */}
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="********"
              />
            </div>

            {/* Botón submit */}
            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Registrarme"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
