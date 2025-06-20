# Scritps

```sh
bunx create-next-app@latest . --yes
bun add next-themes

bunx --bun shadcn@latest init
bunx --bun shadcn@latest add button avatar card input label select sheet textarea sidebar


bun add drizzle-orm @libsql/client drizzle-zod zod
bun add -D drizzle-kit
bun add better-auth

bunx @better-auth/cli@latest generate --config ./src/lib/auth.ts --output ./db/schemas/auth.ts --y
bunx drizzle-kit generate --name=init_better_auth
bunx drizzle-kit migrate # apply the migration

# bun drizzle-kit generate --config=drizzle-dev.config.ts
# bun drizzle-kit generate --config=drizzle-prod.config.ts

```
