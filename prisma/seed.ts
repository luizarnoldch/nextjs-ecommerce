import { TursoClientProduction } from "@/lib/turso";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === "production") {
    try {
      console.log("Modo producción: insertando usuario vía Turso…");

      const result = await TursoClientProduction.execute(`
        INSERT INTO "auth_users" (
          id,
          email,
          password,
          firstName,
          lastName,
          role,
          updatedAt
        ) VALUES (
          '123e4567-e89b-12d3-a456-426614174000',
          'example@example.com',
          'pass',
          'Juan',
          'Perez',
          'ADMIN',
          CURRENT_TIMESTAMP
        )
        RETURNING *;
      `);

      const newUser = result.rows[0];

      console.log("Usuario creado (producción):", newUser);
    } catch (error) {
      console.error("Error al insertar en Turso:", error);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }

    return;
  }

  try {
    console.log("Modo desarrollo: insertando usuario vía Prisma…");
    const newUser = await prisma.auth_users.create({
      data: {
        email: "example@example.com",
        password: "pass",
        firstName: "Juan",
        lastName: "Perez",
        role: "ADMIN",
      },
    });
    console.log("Usuario creado (desarrollo):", newUser);

    const todos = await prisma.auth_users.findMany();
    console.log("Todos los usuarios (desarrollo):", todos);
  } catch (error) {
    console.error("Error en desarrollo:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
