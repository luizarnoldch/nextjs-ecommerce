"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ResponsiveDialog from "@/components/app-modules/shared/responsive-dialog"
import { PlusIcon } from "lucide-react"

const CreateCategoryButton = ({ isOpen, onOpenChange }: CreateCategoryDialogProps) => {
  return (
    <Button
      type="button"
      className="p-4 border rounded-lg hover:bg-accent transition-colors"
      variant="outline"
      onClick={() => onOpenChange(true)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PlusIcon className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-medium">Create New Category</span>
        </div>
      </div>
    </Button>
  )
}

type CreateCategoryDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (name: string) => void
}

const CreateCategoryDialog = ({ isOpen, onOpenChange, onCreate }: CreateCategoryDialogProps) => {
  const [newCategoryName, setNewCategoryName] = useState("")

  const handleCreate = () => {
    if (!newCategoryName) return
    onCreate(newCategoryName)
    setNewCategoryName("")
  }

  return (
    <ResponsiveDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Create Category"
      description="Add a new category to your store. Click save when you're done."
      size="md"
      trigger={<CreateCategoryButton isOpen={isOpen} onOpenChange={onOpenChange} onCreate={onCreate} />}
    >
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Name
          </label>
          <Input
            id="name"
            placeholder="e.g., Summer Collection"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate()
            }}
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button onClick={handleCreate} disabled={!newCategoryName}>
            Create Category
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  )
}

export default CreateCategoryDialog
