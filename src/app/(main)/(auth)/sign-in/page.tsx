"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { signInAction } from "@/actions/auth/sign-in";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();
  const [state, useSignInAction, isPending] = useActionState(signInAction, null);

  // Extraemos errores
  const fieldErrors = state?.flattenedError?.fieldErrors ?? {};
  const formErrors = state?.flattenedError?.formErrors ?? [];

  const emailHasError = (fieldErrors.email?.length ?? 0) > 0;
  const passwordHasError = (fieldErrors.password?.length ?? 0) > 0;

  useEffect(() => {
    if (state?.data) {
      router.push("/dashboard");
    }
  }, [state, router]);

  const handleSignIn = (form: FormData) => {
    useSignInAction(form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={handleSignIn}
            className="space-y-4"
            noValidate
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
                    <span key={idx} className="block">
                      {err}
                    </span>
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
              {passwordHasError && (
                <p
                  id="password-error"
                  className="text-red-600 text-sm mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  {(fieldErrors.password ?? []).map((err, idx) => (
                    <span key={idx} className="block">
                      {err}
                    </span>
                  ))}
                </p>
              )}
            </div>

            {/* Errores globales */}
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

            {/* Error genérico de servidor */}
            {state?.error && (
              <p
                className="text-red-700 text-center mt-4 font-semibold"
                role="alert"
                aria-live="assertive"
              >
                {state.error}
              </p>
            )}

            <Button type="submit" className="w-full mt-2" disabled={isPending}>
              {isPending ? "Procesando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
