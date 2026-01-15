import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Category } from "./types"

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card className="overflow-hidden h-[280px] group cursor-pointer hover:shadow-lg transition-all duration-300 p-0 m-0">
      <div className="relative h-full w-full">
        {/* Image Background */}
        <div className="absolute inset-0">
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <h3 className="text-xl font-bold mb-1">{category.name}</h3>
          <p className="text-sm text-white/80">{category.itemsCount} products</p>
        </div>
        {/* Hover Actions (Optional) */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="sm" className="bg-white/90 text-black hover:bg-white">
            Edit
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default CategoryCard
