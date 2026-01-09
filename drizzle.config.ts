import { defineConfig } from "drizzle-kit"

import type { Config } from "drizzle-kit"

const config: Config = {
  out: "./db/migrations",
  schema: "./db/schemas",
  dialect: "turso",
  dbCredentials: {
    url: `${process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL}`,
    authToken: process.env.TURSO_AUTH_TOKEN || undefined
  }
}

export default defineConfig(config)
