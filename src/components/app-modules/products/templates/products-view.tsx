"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, Search } from "lucide-react"
import Link from "next/link"

const mockProducts = [
  {
    id: 1,
    name: 'Laptop Pro 15"',
    sku: "LP-001",
    category: "Electrónica",
    price: 1299.99,
    stock: 45,
    variants: 3,
    status: "Activo",
    image: "/modern-laptop-workspace.png",
  },
  {
    id: 2,
    name: "Monitor 4K",
    sku: "MON-001",
    category: "Electrónica",
    price: 499.99,
    stock: 12,
    variants: 2,
    status: "Activo",
    image: "/computer-monitor.png",
  },
  {
    id: 3,
    name: "Teclado Mecánico",
    sku: "KEY-001",
    category: "Accesorios",
    price: 159.99,
    stock: 0,
    variants: 5,
    status: "Sin stock",
    image: "/mechanical-keyboard.png",
  },
  {
    id: 4,
    name: "Mouse Inalámbrico",
    sku: "MOUSE-001",
    category: "Accesorios",
    price: 49.99,
    stock: 156,
    variants: 4,
    status: "Activo",
    image: "/field-mouse.png",
  },
  {
    id: 5,
    name: "Webcam HD",
    sku: "WEB-001",
    category: "Electrónica",
    price: 99.99,
    stock: 67,
    variants: 2,
    status: "Activo",
    image: "/classic-webcam.png",
  },
]

const ProductsView = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("Todos")

  const filtered = mockProducts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = filterCategory === "Todos" || p.category === filterCategory
    return matchSearch && matchCategory
  })

  const categories = ["Todos", ...new Set(mockProducts.map((p) => p.category))]

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Productos</h1>
            <p className="text-muted-foreground">Gestiona tu catálogo de productos</p>
          </div>
          <Link href="/dashboard/products/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>

      {/* Filtros */}
      <Card className="p-6 mb-6 bg-card border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filterCategory === cat ? "default" : "outline"}
                onClick={() => setFilterCategory(cat)}
                className={filterCategory === cat ? "bg-primary hover:bg-primary/90" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Tabla de Productos */}
      <Card className="overflow-hidden bg-card border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Producto</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">SKU</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Categoría</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Precio</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Stock</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Variantes</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Estado</th>
                <th className="text-center py-4 px-6 text-muted-foreground font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-10 h-10 rounded bg-muted"
                      />
                      <span className="font-medium text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-foreground">{product.sku}</td>
                  <td className="py-4 px-6 text-foreground">{product.category}</td>
                  <td className="py-4 px-6 text-foreground font-semibold">${product.price}</td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                      {product.stock} unidades
                    </span>
                  </td>
                  <td className="py-4 px-6 text-foreground">{product.variants}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${product.status === "Activo" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                        }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {filtered.length} de {mockProducts.length} productos
          </p>
          <div className="flex gap-2">
            <Button variant="outline">Anterior</Button>
            <Button variant="outline">Siguiente</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProductsView
