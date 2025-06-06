import { PrismaClient } from "@/../generated/prisma";
import { Config, createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

// const prismaClientSingleton = () => {
//   if (process.env.NODE_ENV === "development") {
//     return new PrismaClient();
//   }

//   if (process.env.NODE_ENV === "production") {
//     const adapter = new PrismaLibSQL({
//       url: `${process.env.TURSO_DATABASE_URL}`,
//       authToken: `${process.env.TURSO_AUTH_TOKEN}`,
//     });
//     return new PrismaClient({ adapter });
//   }
// };

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

declare global {
  var cachePrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  const adapter = new PrismaLibSQL({
    url: `${process.env.DATABASE_URL}`,
    syncUrl: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
    syncInterval: 60,
  });
  prisma = new PrismaClient({ adapter });
} else if (process.env.NODE_ENV === "development") {
  prisma = new PrismaClient();
} else {
  if (!global.cachePrisma) {
    const adapter = new PrismaLibSQL({
      url: `${process.env.DATABASE_URL}`,
      syncUrl: `${process.env.TURSO_DATABASE_URL}`,
      authToken: `${process.env.TURSO_AUTH_TOKEN}`,
      syncInterval: 60,
    });
    global.cachePrisma = new PrismaClient({ adapter });
  }
  prisma = global.cachePrisma;
}

export default prisma;
