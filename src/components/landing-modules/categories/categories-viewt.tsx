import { Header } from "../shared/header"
import { CategoryCard } from "../shared/category-card"
import { CATEGORIES } from "../lib/mock-data"

export const metadata = {
  title: "Categories - TechHome",
  description: "Browse product categories at TechHome",
}

export default function CategoriesView() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-80px)] bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Categories</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Explore our carefully organized categories of premium tech and home products.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Upcoming Categories */}
          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">More Coming Soon</h2>
            <p className="text-muted-foreground mb-8">
              We're constantly adding new categories and products. Check back soon for fresh selections.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Kitchen Appliances", "Office Supplies", "Gaming Gear"].map((name, i) => (
                <div
                  key={i}
                  className="bg-card border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition"
                >
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="font-semibold text-foreground">{name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">Coming soon</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
