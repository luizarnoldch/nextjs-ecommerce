// [For current Version]
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  console.log("✅ middleware disparado en:", request.nextUrl.pathname);

  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";
  const isProtectedRoute = pathname.startsWith("/dashboard");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Aplica el middleware solo a estas rutas
  matcher: [
    "/sign-in",
    "/sign-up",
    "/dashboard/:path*", // cubre /dashboard y subrutas
  ],
};
