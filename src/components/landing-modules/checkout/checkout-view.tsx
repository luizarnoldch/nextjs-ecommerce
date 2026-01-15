"use client"

import { useState, useEffect } from "react"
import { useCart } from "../lib/cart-context"
import { useAuth } from "../lib/auth-context"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "../shared/header"
import { CheckoutForm } from "../shared/checkout-form"

export default function CheckoutView() {
  const { items, total } = useCart()
  const { state } = useAuth()
  const router = useRouter()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "whatsapp">("card")

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, router])

  if (!state.isAuthenticated) {
    return (
      <>
        <Header />
        <main className="min-h-[calc(100vh-80px)] bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Please sign in to checkout</h1>
            <a href="/login" className="text-primary hover:underline">
              Go to login
            </a>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-80px)] bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <CheckoutForm
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={setSelectedPaymentMethod}
              />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-b-0">
                      <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm line-clamp-2">{item.product.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.quantity}x ${item.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="space-y-3 border-t border-border pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (estimated)</span>
                    <span className="font-medium text-foreground">${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>🔒</span>
                  <span>Secure checkout powered by TechHome</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
