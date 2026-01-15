import { Plus } from "lucide-react"
import { Card } from "@/components/ui/card"

type CreateCategoryCardProps = {
  onClick: () => void
}

const CreateCategoryCard = ({ onClick }: CreateCategoryCardProps) => {
  return (
    <Card
      className="group relative flex h-[280px] cursor-pointer flex-col items-center justify-center border-dashed border-2 hover:border-primary/50 hover:bg-muted/50 transition-colors p-0 m-0"
      onClick={onClick}
    >
      <div className="flexComponent flex h-16 w-16 items-center justify-center rounded-full bg-muted group-hover:bg-background transition-colors">
        <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <p className="mt-4 font-semibold text-muted-foreground group-hover:text-primary transition-colors">
        Create New Category
      </p>
    </Card>
  )
}

export default CreateCategoryCard
