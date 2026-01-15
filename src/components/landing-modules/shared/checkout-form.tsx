"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../lib/auth-context"
import { useCart } from "../lib/cart-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface CheckoutFormProps {
  onPaymentMethodChange: (method: "card" | "whatsapp") => void
  selectedPaymentMethod: "card" | "whatsapp"
}

export function CheckoutForm({ onPaymentMethodChange, selectedPaymentMethod }: CheckoutFormProps) {
  const { state, updateUser } = useAuth()
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [formData, setFormData] = useState({
    email: state.user?.email || "",
    fullName: state.user?.name || "",
    phone: state.user?.phone || "",
    address: state.user?.address || "",
    city: state.user?.city || "",
    zipCode: state.user?.zipCode || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update user info
    updateUser({
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
    })

    if (selectedPaymentMethod === "whatsapp") {
      // WhatsApp order
      const message = `Hola! Quiero hacer un pedido:\n\n${items.map((item) => `- ${item.product.name} (${item.quantity}x $${item.price})`).join("\n")}\n\nTotal: $${total.toFixed(2)}\n\nNombre: ${formData.fullName}\nDirección: ${formData.address}, ${formData.city}\nTeléfono: ${formData.phone}`

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    }

    setOrderPlaced(true)
    clearCart()
    setIsProcessing(false)

    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  if (orderPlaced) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Order Placed Successfully!</h3>
        <p className="text-muted-foreground mb-6">
          {selectedPaymentMethod === "whatsapp"
            ? "Your WhatsApp chat will open to confirm your order details. A team member will contact you soon."
            : "Your order has been confirmed. You will receive an email confirmation shortly."}
        </p>
        <p className="text-sm text-muted-foreground">Redirecting to home page...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Contact Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Shipping Address */}
      <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Shipping Address</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Street Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payment Method */}
      <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Payment Method</h2>

        <div className="space-y-3">
          {/* Card Payment */}
          <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-secondary transition">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={selectedPaymentMethod === "card"}
              onChange={() => onPaymentMethodChange("card")}
              className="w-4 h-4"
            />
            <span className="ml-3 flex-1">
              <span className="font-semibold text-foreground block">Credit/Debit Card</span>
              <span className="text-sm text-muted-foreground">Visa, Mastercard, Amex</span>
            </span>
          </label>

          {selectedPaymentMethod === "card" && (
            <div className="mt-4 p-4 bg-secondary rounded-lg border border-border">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="4532 1488 0343 6467"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Payment */}
          <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-secondary transition">
            <input
              type="radio"
              name="paymentMethod"
              value="whatsapp"
              checked={selectedPaymentMethod === "whatsapp"}
              onChange={() => onPaymentMethodChange("whatsapp")}
              className="w-4 h-4"
            />
            <span className="ml-3 flex-1">
              <span className="font-semibold text-foreground block">WhatsApp</span>
              <span className="text-sm text-muted-foreground">Direct chat to confirm order</span>
            </span>
          </label>
        </div>
      </section>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isProcessing || items.length === 0}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {isProcessing ? "Processing..." : `Complete Purchase - $${total.toFixed(2)}`}
      </Button>
    </form>
  )
}
