import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { account, db, session, user, verification } from "@/db/index"

const databaseConfig = drizzleAdapter(db, {
  provider: "sqlite",
  schema: { account, session, user, verification }
})

const emailAndPasswordConfig = {
  enabled: true,
  autoSignIn: true
}

const pluginsConfig = [nextCookies()]

export const auth = betterAuth({
  database: databaseConfig,
  emailAndPassword: emailAndPasswordConfig,
  plugins: pluginsConfig
})
