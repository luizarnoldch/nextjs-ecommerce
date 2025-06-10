import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { account, db, session, user, verification } from "@/db/index";
import { nextCookies } from "better-auth/next-js";

const databaseConfig = drizzleAdapter(db, {
  provider: "sqlite",
  schema: { account, session, user, verification },
});

const emailAndPasswordConfig = {
  enabled: true,
  autoSignIn: true,
};

const pluginsConfig = [nextCookies()];

export const auth = betterAuth({
  database: databaseConfig,
  emailAndPassword: emailAndPasswordConfig,
  plugins: pluginsConfig,
});
