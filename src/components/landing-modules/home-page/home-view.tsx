import { Header } from "../shared/header"
import { FeaturedHero } from "../shared/featured-hero"
import { ProductCard } from "../shared/product-card"
import { CategoryCard } from "../shared/category-card"
import { PRODUCTS, CATEGORIES } from "../lib/mock-data"
import Link from "next/link"

export const metadata = {
  title: "TechHome - Premium Tech & Home Products",
  description: "Discover premium technology and home products with exclusive variants and fast checkout",
}

export default function HomeView() {
  const featuredProducts = PRODUCTS.slice(0, 6)
  const featuredCategories = CATEGORIES.slice(0, 5)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <FeaturedHero />

        {/* Featured Categories */}
        <section className="py-12 md:py-20 bg-linear-to-b from-transparent to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Explore Categories</h2>
                <p className="text-muted-foreground mt-2">Browse our carefully curated collections</p>
              </div>
              <Link
                href="/categories"
                className="hidden sm:block text-primary hover:text-primary/80 font-semibold transition"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Featured Products</h2>
                <p className="text-muted-foreground mt-2">Handpicked premium selections for you</p>
              </div>
              <Link
                href="/products"
                className="hidden sm:block text-primary hover:text-primary/80 font-semibold transition"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-20 bg-primary/5 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 text-balance">
              Why Choose TechHome
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "🚚",
                  title: "Free Shipping",
                  description: "On orders over $50 to anywhere in the country",
                },
                {
                  icon: "✨",
                  title: "Premium Quality",
                  description: "Carefully selected products from trusted brands",
                },
                {
                  icon: "🔄",
                  title: "Easy Returns",
                  description: "30-day return policy for complete peace of mind",
                },
                {
                  icon: "💬",
                  title: "24/7 Support",
                  description: "WhatsApp support available around the clock",
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-linear-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Stay Updated with Exclusive Offers
              </h2>
              <p className="text-muted-foreground mb-8 text-pretty">
                Subscribe to our newsletter for new product launches, special discounts, and insider updates.
              </p>

              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground transition"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Unsubscribe anytime.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-foreground mb-4">TechHome</h3>
                <p className="text-muted-foreground text-sm">Premium tech and home products for modern living.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Shop</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/products" className="hover:text-primary transition">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories" className="hover:text-primary transition">
                      Categories
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
              <p>&copy; 2026 TechHome. All rights reserved.</p>
              <div className="flex gap-4 mt-4 sm:mt-0">
                <a href="#" className="hover:text-primary transition">
                  Twitter
                </a>
                <a href="#" className="hover:text-primary transition">
                  Instagram
                </a>
                <a href="#" className="hover:text-primary transition">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
