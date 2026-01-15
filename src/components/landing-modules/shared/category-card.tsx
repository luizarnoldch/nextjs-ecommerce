"use client"

import Image from "next/image"
import Link from "next/link"
import type { Category } from "../lib/types"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}`}>
      <div className="relative overflow-hidden rounded-lg group cursor-pointer h-48 md:h-64">
        <Image
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent group-hover:from-black/80 transition-all duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-1">{category.name}</h3>
          <p className="text-sm md:text-base text-gray-200 mb-2">{category.description}</p>
          <p className="text-xs md:text-sm text-gray-300">{category.count} products</p>
        </div>
      </div>
    </Link>
  )
}
