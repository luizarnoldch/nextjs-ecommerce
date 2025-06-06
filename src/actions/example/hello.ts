import prisma from "@/lib/prisma";

export async function HelloFromTurso() {
  try {
    if (!prisma) {
      return;
    }
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log(result);
  } catch (error) {
    console.error("Error al ejecutar query RAW:", error);
    throw error;
  }
}
