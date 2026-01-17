"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, ChevronRight } from "lucide-react"


const mockCategories = [
  { id: 1, name: "Electrónica", products: 45, subcategories: 5, status: "Activa" },
  { id: 2, name: "Ropa", products: 128, subcategories: 8, status: "Activa" },
  { id: 3, name: "Hogar", products: 67, subcategories: 3, status: "Activa" },
  { id: 4, name: "Deportes", products: 34, subcategories: 2, status: "Activa" },
  { id: 5, name: "Accesorios", products: 89, subcategories: 6, status: "Inactiva" },
]


const CategoriesView = () => {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Categorías</h1>
            <p className="text-muted-foreground">Gestiona las categorías de tus productos</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Categoría
          </Button>
        </div>
      </div>

      {/* Formulario Nuevo */}
      {showForm && (
        <Card className="p-6 mb-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Crear Nueva Categoría</h3>
          <div className="flex gap-3">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nombre de la categoría"
              className="flex-1 bg-input border-border"
            />
            <Button className="bg-primary hover:bg-primary/90">Crear</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Tabla de Categorías */}
      <div className="grid gap-4">
        {mockCategories.map((category) => (
          <Card key={category.id} className="p-4 bg-card border-border hover:border-primary/50 transition">
            {editingId === category.id ? (
              <div className="flex gap-3 items-center">
                <Input defaultValue={category.name} className="flex-1 bg-input border-border" />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Guardar
                </Button>
                <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                  Cancelar
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.products} productos • {category.subcategories} subcategorías
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${category.status === "Activa" ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-500"
                      }`}
                  >
                    {category.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(category.id)}
                    className="text-primary hover:bg-primary/10"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CategoriesView