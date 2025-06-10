"use client"

import { useActionState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/actions/auth/sign-in";
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signInAction, null);

  const HandleFromAction = (payload: FormData) => {
    formAction(payload)
    router.push(state?.url ?? '/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={HandleFromAction} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="name@example.com" />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" required placeholder="********" />
            </div>
            <Button type="submit" className="w-full mt-2" disabled={isPending}>
              {isPending ? "Procesando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
