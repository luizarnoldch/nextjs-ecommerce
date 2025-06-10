"use server";

import { auth } from "@/lib/auth";

export const handleSubmitAuth = async (formData: FormData) => {
  const email = formData.get("email")?.toString().trim() ?? "";
  const name = formData.get("name")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString().trim() ?? "";

  console.log({
    email,
    name,
    password,
  });

  try {
    // Llamada a Better Auth para crear usuario por email
    const result = await auth.api.signUpEmail({
      // Si quieres que te devuelva las cabeceras (por ejemplo, la cookie de sesión), deja returnHeaders: true.
      returnHeaders: true,
      body: {
        email,
        name,
        password,
      },
    });

    // Si necesitas obtener la cookie de sesión devuelta:
    // const sessionCookie = result.headers.get("set-cookie");

    // (Opcional) Si quisieras iniciar sesión automáticamente tras registrarte:
    // await auth.api.signInEmail({ returnHeaders: true, body: { email, password } });

    // Una vez que el usuario se creó correctamente, redirigimos a la pantalla de login o home
    // Por ejemplo, a /login:
    // redirect("/login");
  } catch (error: any) {
    // Aquí capturas cualquier error que devuelva Better Auth (por ejemplo, usuario ya existe)
    // console.error("Error registrando usuario:", error);
    // Podrías almacenar el mensaje en una cookie, base de datos de errores,
    // o bien mostrarlo “por fuerza” en el cliente devolviendo un objeto.
    // Pero para sencillez, hacemos una redirect a /register con query `?error=mensaje`.
    // const msg = encodeURIComponent(error.message || "Error desconocido");
    // redirect(`/register?error=${msg}`);
  }
};
