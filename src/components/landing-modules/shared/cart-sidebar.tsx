"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "../lib/cart-context"
import { Button } from "@/components/ui/button"

export function CartSidebar() {
  const { items, removeItem, updateQuantity, total } = useCart()

  return (
    <div className="space-y-6">
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6">Add items to get started</p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 rounded-lg transition">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-secondary rounded-lg p-4 flex gap-4">
                {/* Product Image */}
                <div className="w-20 h-20 bg-background rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  <h4 className="font-semibold text-foreground text-sm line-clamp-2">{item.product.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.selectedColor}
                    {item.selectedSize !== "One Size" && ` • ${item.selectedSize}`}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-auto pt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-background rounded text-sm hover:bg-primary hover:text-primary-foreground transition"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium text-foreground w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-background rounded text-sm hover:bg-primary hover:text-primary-foreground transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price and Remove */}
                <div className="flex flex-col items-end gap-2">
                  <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-destructive hover:text-destructive/80 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-foreground">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Link href="/checkout" className="block">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition">
              Proceed to Checkout
            </Button>
          </Link>

          {/* Continue Shopping */}
          <Link href="/products" className="block">
            <Button
              variant="outline"
              className="w-full border-border hover:bg-secondary font-semibold py-3 rounded-lg transition bg-transparent"
            >
              Continue Shopping
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}
