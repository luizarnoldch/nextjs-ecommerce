import { drizzle } from 'drizzle-orm/libsql'

export const db = drizzle({
  connection: {
    url: `${process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL}`,
    authToken: process.env.TURSO_AUTH_TOKEN || undefined
  }
})

export * from './schemas/auth'
