"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"
import Link from "next/link"

const NewProductVariantView = () => {
  const [formData, setFormData] = useState({
    productId: "",
    sku: "",
    price: "",
    stock: "",
    allow_backorder: false,
    attributes: [] as { name: string; value: string }[],
    images: [] as string[],
  })

  // Mock data de productos disponibles
  const mockProducts = [
    { id: "1", name: 'Laptop Pro 15"', sku: "LP-001" },
    { id: "2", name: "Monitor 4K", sku: "MON-001" },
    { id: "3", name: "Teclado Mecánico", sku: "KEY-001" },
    { id: "4", name: "Ratón Inalámbrico", sku: "MOUSE-001" },
    { id: "5", name: "Webcam HD", sku: "WEB-001" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const addAttribute = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { name: "", value: "" }],
    }))
  }

  const updateAttribute = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newAttributes = [...prev.attributes]
      newAttributes[index] = { ...newAttributes[index], [field]: value }
      return { ...prev, attributes: newAttributes }
    })
  }

  const removeAttribute = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Variante creada:", formData)
    // Aquí irían las acciones de submit
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <Link
        href="/dashboard/products/variants"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a Variantes
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-2">Nueva Variante de Producto</h1>
      <p className="text-muted-foreground mb-8">Completa el formulario para crear una nueva variante</p>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        {/* Selección de Producto */}
        <Card className="p-6 mb-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Seleccionar Producto Base</h2>

          <div>
            <Label htmlFor="productId" className="text-foreground">
              Producto *
            </Label>
            <select
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              className="mt-2 w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Selecciona un producto</option>
              {mockProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} ({product.sku})
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Información de la Variante */}
        <Card className="p-6 mb-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Información de la Variante</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="sku" className="text-foreground">
                SKU de la Variante *
              </Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="Ej: LP-001-SIL-16GB"
                className="mt-2 bg-input border-border"
                required
              />
              <p className="text-xs text-muted-foreground mt-2">
                Usa un SKU único que distinga esta variante del producto
              </p>
            </div>

            <div>
              <Label htmlFor="price" className="text-foreground">
                Precio *
              </Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2.5 text-foreground">$</span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="pl-7 bg-input border-border"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="stock" className="text-foreground">
              Stock Disponible *
            </Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="0"
              className="mt-2 bg-input border-border"
              required
            />
          </div>
        </Card>

        {/* Opciones de Inventario */}
        <Card className="p-6 mb-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Opciones de Inventario</h2>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="allow_backorder"
              checked={formData.allow_backorder}
              onChange={handleInputChange}
              className="rounded"
            />
            <span className="text-foreground">Permitir Backorder (venta sin stock)</span>
          </label>
          <p className="text-sm text-muted-foreground mt-2 ml-7">
            Los clientes podrán comprar esta variante incluso si no hay stock disponible
          </p>
        </Card>

        {/* Atributos de la Variante */}
        <Card className="p-6 mb-6 bg-card border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Atributos de la Variante</h2>
            <Button onClick={addAttribute} variant="outline" size="sm" type="button">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Atributo
            </Button>
          </div>

          {formData.attributes.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Agregua atributos que diferencien esta variante (color, tamaño, capacidad, etc.)
            </p>
          ) : (
            <div className="space-y-4">
              {formData.attributes.map((attr, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label className="text-foreground text-sm">Nombre del Atributo</Label>
                    <Input
                      value={attr.name}
                      onChange={(e) => updateAttribute(index, "name", e.target.value)}
                      placeholder="Ej: Color, Tamaño, RAM"
                      className="mt-1 bg-input border-border"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-foreground text-sm">Valor</Label>
                    <Input
                      value={attr.value}
                      onChange={(e) => updateAttribute(index, "value", e.target.value)}
                      placeholder="Ej: Negro, XL, 16GB"
                      className="mt-1 bg-input border-border"
                    />
                  </div>
                  <Button
                    onClick={() => removeAttribute(index)}
                    variant="ghost"
                    type="button"
                    className="text-destructive hover:bg-destructive/10 p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Upload de Imágenes */}
        <Card className="p-6 mb-8 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Imágenes de la Variante</h2>

          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition cursor-pointer">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium">Arrastra imágenes aquí o haz clic para seleccionar</p>
            <p className="text-sm text-muted-foreground mt-1">PNG, JPG hasta 5MB cada una</p>
            <input type="file" multiple accept="image/*" className="hidden" />
          </div>
        </Card>

        {/* Botones de Acción */}
        <div className="flex gap-3 justify-end">
          <Link href="/dashboard/products/variants">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </Link>
          <Button className="bg-primary hover:bg-primary/90" type="submit">
            Crear Variante
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewProductVariantView