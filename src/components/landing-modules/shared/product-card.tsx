"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "../lib/types"
import { useCart } from "../lib/cart-context"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes[0])
  const [showQuickAdd, setShowQuickAdd] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, selectedColor, selectedSize, 1)
    setShowQuickAdd(false)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-secondary h-64 md:h-72">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
              -{discount}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-3">
            <h3 className="text-foreground font-semibold text-sm md:text-base line-clamp-2 hover:text-primary transition">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-xs mt-1">{product.category}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "text-accent" : "text-muted"}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Variant Options */}
          {showQuickAdd && (
            <div className="space-y-3 mb-4 pb-4 border-t border-border pt-4">
              {/* Color Selection */}
              {product.variants.colors.length > 1 && (
                <div>
                  <label className="text-xs font-medium text-foreground mb-2 block">Color: {selectedColor}</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs rounded-md border transition ${
                          selectedColor === color
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-secondary border-border hover:bg-secondary/80"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.variants.sizes.length > 1 && (
                <div>
                  <label className="text-xs font-medium text-foreground mb-2 block">Size: {selectedSize}</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs rounded-md border transition ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-secondary border-border hover:bg-secondary/80"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Price */}
          <div className="mb-4 mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-lg md:text-xl font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={(e) => {
              e.preventDefault()
              if (showQuickAdd) {
                handleQuickAdd(e)
              } else {
                setShowQuickAdd(true)
              }
            }}
            disabled={!product.inStock}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showQuickAdd ? "Add to Cart" : product.inStock ? "Quick Add" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </Link>
  )
}
