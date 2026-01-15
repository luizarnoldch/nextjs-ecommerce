import { Header } from "../shared/header"
import { CartSidebar } from "../shared/cart-sidebar"

export const metadata = {
  title: "Shopping Cart - TechHome",
  description: "Review and manage your shopping cart",
}

export default function CartView() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-80px)] bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartSidebar />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>
                <CartSidebar />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
