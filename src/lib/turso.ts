// -----------
// [Work]
// -- development
// import { createClient } from "@libsql/client";

// const client = createClient({
//   url: process.env.DATABASE_URL ?? "",
//   encryptionKey: process.env.ENCRYPTION_KEY,
// });

// export default client;
// -----------*

// -----------
// [Work]
// -- qa
// import { createClient } from "@libsql/client";

// -- turso dev --db-file local.db

// const client = createClient({
//   url: "http://127.0.0.1:8080",
// });
// export default client;
// -----------*

// -----------
// [Work]
// -- production

import { createClient } from "@libsql/client";

export const TursoClientProduction = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

// export default TursoClientProduction;
// -----------*
