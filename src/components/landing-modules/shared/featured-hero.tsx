import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FeaturedHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/10 to-transparent py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/20 text-primary font-semibold rounded-full text-sm">
                Premium Selection
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
              Discover Premium Tech & Home Products
            </h1>

            <p className="text-lg text-muted-foreground max-w-md text-pretty">
              Experience the finest selection of technology and home solutions curated for the modern lifestyle.
              Quality, innovation, and elegance in every product.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition">
                  Shop Now
                </Button>
              </Link>
              <Link href="/categories">
                <Button
                  variant="outline"
                  className="border-border hover:bg-secondary font-semibold px-8 py-3 rounded-lg transition bg-transparent"
                >
                  Explore Categories
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="pt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">50k+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">4.8★</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/assets/hero/hero.png"
              alt="Premium products showcase"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
