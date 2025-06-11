"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";

import { signUpAction } from "@/actions/auth/sign-up";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
  const router = useRouter()
  const [state, useSignUpAction, isPending] = useActionState(signUpAction, null);

  // Extraemos para comodidad y evitar problemas con undefined
  const fieldErrors = state?.flattenedError?.fieldErrors ?? {};
  const formErrors = state?.flattenedError?.formErrors ?? [];

  const emailHasError = (fieldErrors.email?.length ?? 0) > 0;
  const nameHasError = (fieldErrors.name?.length ?? 0) > 0;
  const passwordHasError = (fieldErrors.password?.length ?? 0) > 0;

  const handleSignUp = (form: FormData) => {
    useSignUpAction(form)
    router.push("/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Crear Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSignUp} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                aria-invalid={emailHasError}
                aria-errormessage="email-error"
              />
              {emailHasError && (
                <p
                  id="email-error"
                  className="text-red-600 text-sm mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  {(fieldErrors.email ?? []).map((err, idx) => (
                    <span key={idx} className="block">{err}</span>
                  ))}
                </p>
              )}
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
                aria-invalid={nameHasError}
                aria-errormessage="name-error"
              />
              {nameHasError && (
                <p
                  id="name-error"
                  className="text-red-600 text-sm mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  {(fieldErrors.name ?? []).map((err, idx) => (
                    <span key={idx} className="block">{err}</span>
                  ))}
                </p>
              )}
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
                aria-invalid={passwordHasError}
                aria-errormessage="password-error"
              />
              <p
                id="password-error"
                className="text-red-600 text-sm mt-1 h-16"
                role="alert"
                aria-live="polite"
              >
                {(fieldErrors.password ?? []).map((err, idx) => (
                  <span key={idx} className="block">{err}</span>
                ))}
              </p>
            </div>

            {/* Errores globales (errores no asignados a campo específico) */}
            {formErrors.length > 0 && (
              <div
                className="text-red-600 text-sm mt-2"
                role="alert"
                aria-live="assertive"
              >
                {formErrors.map((err, idx) => (
                  <p key={idx}>{err}</p>
                ))}
              </div>
            )}

            {/* Error general devuelto por server */}
            {state?.error && (
              <p
                className="text-red-700 text-center mt-4 font-semibold"
                role="alert"
                aria-live="assertive"
              >
                {state.error}
              </p>
            )}

            {/* Mensaje de éxito */}
            {state?.data && (
              <p className="text-green-700 text-center mt-4 font-semibold">
                ¡Usuario {state.data.name} creado correctamente!
              </p>
            )}

            {/* Botón submit */}
            <Button type="submit" className="w-full mt-2" disabled={isPending}>
              {isPending ? "Procesando..." : "Registrarme"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}