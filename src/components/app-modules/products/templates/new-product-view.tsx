"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

const NewProductView = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    sku: "",
    categories: [] as string[],
    attributes: [] as { name: string; value: string }[],
  })

  const categories = ["Electrónica", "Ropa", "Hogar", "Deportes", "Accesorios"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleCategory = (cat: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat) ? prev.categories.filter((c) => c !== cat) : [...prev.categories, cat],
    }))
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

  return (
    <div className="p-8 bg-background min-h-screen">
      <Link
        href="/dashboard/products"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a Productos
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-2">Nuevo Producto</h1>
      <p className="text-muted-foreground mb-8">Completa el formulario para crear un nuevo producto</p>

      <div className="max-w-4xl">
        {/* Información Básica */}
        <Card className="p-6 mb-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Información Básica</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="name" className="text-foreground">
                Nombre del Producto *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Laptop Pro 15"
                className="mt-2 bg-input border-border"
              />
            </div>
            <div>
              <Label htmlFor="sku" className="text-foreground">
                SKU *
              </Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="Ej: LP-001"
                className="mt-2 bg-input border-border"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-foreground">
              Descripción
            </Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe el producto..."
              rows={4}
              className="mt-2 w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </Card>

        {/* Precio e Inventario */}
        <Card className="p-6 mb-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Precio e Inventario</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="basePrice" className="text-foreground">
                Precio Base *
              </Label>
              <Input
                id="basePrice"
                name="basePrice"
                type="number"
                value={formData.basePrice}
                onChange={handleInputChange}
                placeholder="0.00"
                className="mt-2 bg-input border-border"
              />
            </div>
            <div>
              <Label className="text-foreground">Permiso de Backorder</Label>
              <div className="mt-2 flex items-center gap-3">
                <input type="checkbox" id="backorder" className="rounded" />
                <label htmlFor="backorder" className="text-foreground cursor-pointer">
                  Permitir pedidos cuando no hay stock
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Categorías */}
        <Card className="p-6 mb-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Categorías</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="rounded"
                />
                <span className="text-foreground">{cat}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Atributos */}
        <Card className="p-6 mb-6 bg-card border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Atributos del Producto</h2>
            <Button onClick={addAttribute} variant="outline" size="sm">
              + Agregar Atributo
            </Button>
          </div>

          <div className="space-y-4">
            {formData.attributes.map((attr, index) => (
              <div key={index} className="flex gap-3 items-end">
                <div className="flex-1">
                  <Label className="text-foreground text-sm">Nombre del Atributo</Label>
                  <Input
                    value={attr.name}
                    onChange={(e) => updateAttribute(index, "name", e.target.value)}
                    placeholder="Ej: Color"
                    className="mt-1 bg-input border-border"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-foreground text-sm">Valor</Label>
                  <Input
                    value={attr.value}
                    onChange={(e) => updateAttribute(index, "value", e.target.value)}
                    placeholder="Ej: Negro"
                    className="mt-1 bg-input border-border"
                  />
                </div>
                <Button
                  onClick={() => removeAttribute(index)}
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10"
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Upload de Imágenes */}
        <Card className="p-6 mb-8 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Imágenes del Producto</h2>

          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition cursor-pointer">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium">Arrastra imágenes aquí o haz clic para seleccionar</p>
            <p className="text-sm text-muted-foreground mt-1">PNG, JPG hasta 5MB</p>
          </div>
        </Card>

        {/* Botones de Acción */}
        <div className="flex gap-3 justify-end">
          <Link href="/dashboard/products">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button className="bg-primary hover:bg-primary/90">Crear Producto</Button>
        </div>
      </div>
    </div>
  )
}

export default NewProductView