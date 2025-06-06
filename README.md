```sh

bun/npm/pnpm/yarn i

bunx prisma generate

turso auth signup --headless
turso db create ecommerce
turso db show ecommerce
turso db tokens create ecommerce
turso db shell ecommerce < prisma/migrations/20250606063351_user/migration.sql

```