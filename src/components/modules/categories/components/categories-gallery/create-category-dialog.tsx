"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ResponsiveDialog from "@/components/modules/shared/responsive-dialog"

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
