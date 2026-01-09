import { sql } from "drizzle-orm"
import { integer, text, real, sqliteTable, primaryKey, unique, index, AnySQLiteColumn } from "drizzle-orm/sqlite-core"

export const categories = sqliteTable("product_categories", {
  categoryId: integer("category_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  parentId: integer("parent_id").references((): AnySQLiteColumn => categories.categoryId)
})

export const products = sqliteTable("products", {
  productId: integer("product_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: real("base_price").notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`)
})

export const productCategories = sqliteTable(
  "product_categories",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => products.productId, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.categoryId, { onDelete: "cascade" })
  },
  table => [primaryKey({ columns: [table.productId, table.categoryId] })]
)

export const productVariants = sqliteTable("product_variants", {
  variantId: integer("variant_id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.productId, { onDelete: "cascade" }),
  sku: text("sku").unique().notNull(),
  price: real("price").notNull(),
  attributes: text("attributes").notNull(),
  allowBackorder: integer("allow_backorder").default(0).notNull()
})

export const idxProductVariantsSku = index("idx_products_sku").on(productVariants.sku)

export const productAttributes = sqliteTable(
  "product_attributes",
  {
    attributeId: integer("attribute_id").primaryKey({
      autoIncrement: true
    }),
    productId: integer("product_id")
      .notNull()
      .references(() => products.productId, { onDelete: "cascade" }),
    attributeName: text("attribute_name").notNull(),
    attributeValue: text("attribute_value").notNull()
  },
  table => [unique().on(table.productId, table.attributeName)]
)
