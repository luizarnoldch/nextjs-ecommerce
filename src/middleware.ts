// [For future version of Nextjs]

// import { NextRequest, NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";

// export async function middleware(request: NextRequest) {
//   console.log("✅ middleware disparado en:", request.nextUrl.pathname);
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   runtime: "nodejs",
//   matcher: ["/dashboard/:path*"],
// };


// [For current Version]
import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  // console.log("✅ middleware disparado en:", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;

  // Obtén la sesión (o null si no hay)
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );


  // 1. Si está logueado y trata de ir a sign-in o sign-up → lo mandamos al dashboard
  if (session && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2. Si NO está logueado y trata de entrar al dashboard (o cualquier subruta) → al sign-in
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 3. En cualquier otro caso (por ejemplo, acceso libre a sign-in, sign-up o a rutas públicas)
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
