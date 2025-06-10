"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function signInAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString().trim() ?? "";

  const result = await auth.api.signInEmail({
    body: { email, password, callbackURL: "/dashboard", rememberMe: true },
    headers: await headers(),
  });

  return result;
}
