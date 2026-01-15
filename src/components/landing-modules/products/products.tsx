import { Header } from "../shared/header"
import { ProductCard } from "../shared/product-card"
import { PRODUCTS, CATEGORIES } from "../lib/mock-data"
import Link from "next/link"

export const metadata = {
  title: "All Products - TechHome",
  description: "Browse all our premium technology and home products",
}

export default function ProductsView() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-80px)] bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">All Products</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Explore our complete collection of premium technology and home products. Filter by category to find
              exactly what you need.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition"
              >
                All Products
              </Link>
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="px-4 py-2 bg-secondary text-foreground rounded-full font-medium hover:bg-primary/10 transition border border-border"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 border-2 border-border text-foreground hover:bg-secondary rounded-lg font-semibold transition">
              Load More Products
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
