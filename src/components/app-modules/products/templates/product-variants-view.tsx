"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, Search, Copy, ChevronDown } from "lucide-react"
import Link from "next/link"

const mockProductsWithVariants = [
  {
    id: 1,
    name: 'Laptop Pro 15"',
    sku: "LP-001",
    variants: [
      {
        variant_id: 1,
        sku: "LP-001-SIL-8GB",
        price: 1299.99,
        attributes: { color: "Plateado", ram: "8GB", storage: "512GB" },
        allow_backorder: false,
        stock: 15,
      },
      {
        variant_id: 2,
        sku: "LP-001-SIL-16GB",
        price: 1499.99,
        attributes: { color: "Plateado", ram: "16GB", storage: "512GB" },
        allow_backorder: false,
        stock: 8,
      },
      {
        variant_id: 3,
        sku: "LP-001-BLK-16GB",
        price: 1499.99,
        attributes: { color: "Negro", ram: "16GB", storage: "512GB" },
        allow_backorder: true,
        stock: 0,
      },
    ],
  },
  {
    id: 2,
    name: "Monitor 4K",
    sku: "MON-001",
    variants: [
      {
        variant_id: 4,
        sku: "MON-001-27",
        price: 499.99,
        attributes: { size: "27 pulgadas", resolution: "4K", panel: "IPS" },
        allow_backorder: false,
        stock: 12,
      },
      {
        variant_id: 5,
        sku: "MON-001-32",
        price: 649.99,
        attributes: { size: "32 pulgadas", resolution: "4K", panel: "IPS" },
        allow_backorder: false,
        stock: 5,
      },
    ],
  },
  {
    id: 3,
    name: "Teclado Mecánico",
    sku: "KEY-001",
    variants: [
      {
        variant_id: 6,
        sku: "KEY-001-RGB-BLK",
        price: 159.99,
        attributes: { color: "Negro", backlight: "RGB", layout: "Full-size" },
        allow_backorder: false,
        stock: 22,
      },
      {
        variant_id: 7,
        sku: "KEY-001-RGB-WHT",
        price: 159.99,
        attributes: { color: "Blanco", backlight: "RGB", layout: "Full-size" },
        allow_backorder: true,
        stock: 0,
      },
      {
        variant_id: 8,
        sku: "KEY-001-RGB-MIN",
        price: 129.99,
        attributes: { color: "Negro", backlight: "RGB", layout: "60%" },
        allow_backorder: false,
        stock: 18,
      },
    ],
  },
]

const ProductVariantsView = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedProducts, setExpandedProducts] = useState<number[]>([1])

  const toggleExpand = (productId: number) => {
    setExpandedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const filtered = mockProductsWithVariants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalVariants = mockProductsWithVariants.reduce((sum, p) => sum + p.variants.length, 0)

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Encabezado */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Variantes de Productos</h1>
            <p className="text-muted-foreground">Gestiona las variantes, atributos y precios de tus productos</p>
          </div>
          <Link href="/dashboard/products/variants/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Variante
            </Button>
          </Link>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card className="p-4 bg-card border-border">
            <p className="text-sm text-muted-foreground mb-1">Total de Productos</p>
            <p className="text-2xl font-bold text-foreground">{mockProductsWithVariants.length}</p>
          </Card>
          <Card className="p-4 bg-card border-border">
            <p className="text-sm text-muted-foreground mb-1">Total de Variantes</p>
            <p className="text-2xl font-bold text-foreground">{totalVariants}</p>
          </Card>
          <Card className="p-4 bg-card border-border">
            <p className="text-sm text-muted-foreground mb-1">Variantes sin Stock</p>
            <p className="text-2xl font-bold text-red-500">
              {mockProductsWithVariants.reduce(
                (sum, p) => sum + p.variants.filter((v) => v.stock === 0 && !v.allow_backorder).length,
                0,
              )}
            </p>
          </Card>
        </div>
      </div>

      {/* Búsqueda */}
      <Card className="p-4 mb-6 bg-card border-border">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar producto por nombre o SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
      </Card>

      {/* Lista de Productos y Variantes */}
      <div className="space-y-4">
        {filtered.map((product) => (
          <Card key={product.id} className="overflow-hidden bg-card border-border">
            {/* Encabezado del Producto */}
            <div
              onClick={() => toggleExpand(product.id)}
              className="w-full px-6 py-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition border-b border-border cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center gap-4 flex-1 text-left">
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${expandedProducts.includes(product.id) ? "rotate-180" : ""
                    }`}
                />
                <div>
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {product.variants.length} variantes
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Add your add variant logic here
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tabla de Variantes */}
            {expandedProducts.includes(product.id) && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left py-3 px-6 text-muted-foreground font-semibold">SKU Variante</th>
                      <th className="text-left py-3 px-6 text-muted-foreground font-semibold">Atributos</th>
                      <th className="text-left py-3 px-6 text-muted-foreground font-semibold">Precio</th>
                      <th className="text-left py-3 px-6 text-muted-foreground font-semibold">Stock</th>
                      <th className="text-left py-3 px-6 text-muted-foreground font-semibold">Backorder</th>
                      <th className="text-center py-3 px-6 text-muted-foreground font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.variants.map((variant) => (
                      <tr key={variant.variant_id} className="border-b border-border hover:bg-muted/20 transition">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-foreground">
                              {variant.sku}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-foreground"
                              title="Copiar SKU"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(variant.attributes).map(([key, value]) => (
                              <span
                                key={key}
                                className="inline-block px-2 py-1 rounded text-xs bg-primary/10 text-primary"
                              >
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-foreground">${variant.price.toFixed(2)}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${variant.stock > 0 ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                              }`}
                          >
                            {variant.stock} unidades
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${variant.allow_backorder
                              ? "bg-blue-500/20 text-blue-500"
                              : "bg-gray-500/20 text-muted-foreground"
                              }`}
                          >
                            {variant.allow_backorder ? "Permitido" : "No permitido"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-center gap-2">
                            <Link href={`/dashboard/products/variants/${variant.variant_id}/edit`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary hover:bg-primary/10"
                                title="Editar variante"
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10"
                              title="Eliminar variante"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center bg-card border-border">
          <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">No hay resultados</p>
          <p className="text-muted-foreground">Intenta buscar con otros términos</p>
        </Card>
      )}
    </div>
  )
}

export default ProductVariantsView