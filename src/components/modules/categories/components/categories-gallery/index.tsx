"use client"

import { useState } from "react"
import CategoriesToolbar from "./categories-toolbar"
import CategoryCard from "./category-card"
import CreateCategoryCard from "./create-category-card"
import { Category } from "./types"

// Initial mock data
const INITIAL_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Electronics",
    imageUrl: "/assets/categories/electronics.png",
    itemsCount: 120,
  },
  {
    id: "2",
    name: "Clothing",
    imageUrl: "/assets/categories/clothing.png",
    itemsCount: 350,
  },
  {
    id: "3",
    name: "Home & Garden",
    imageUrl: "/assets/categories/garden.png",
    itemsCount: 85,
  },
]

const CategoriesGallery = () => {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateCategory = (name: string) => {
    const newCategory: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      imageUrl: "/assets/categories/electronics.png", // Placeholder image
      itemsCount: 0,
    }

    setCategories([...categories, newCategory])
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product categories and collections
          </p>
        </div>
      </div>

      {/* Toolbar Section */}
      <CategoriesToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Create New Card */}
        <CreateCategoryCard onClick={() => setIsDialogOpen(true)} />

        {/* Category Cards */}
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

export default CategoriesGallery
