"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Mail, Phone, MapPin } from "lucide-react"

const mockCustomers = [
  {
    id: 1,
    name: "Juan García",
    email: "juan@example.com",
    phone: "+34 123 456 789",
    city: "Madrid",
    totalOrders: 5,
    totalSpent: 6450.0,
    joinDate: "2023-08-15",
    status: "Activo",
  },
  {
    id: 2,
    name: "María López",
    email: "maria@example.com",
    phone: "+34 987 654 321",
    city: "Barcelona",
    totalOrders: 12,
    totalSpent: 15890.5,
    joinDate: "2023-05-22",
    status: "Activo",
  },
  {
    id: 3,
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    phone: "+34 555 666 777",
    city: "Valencia",
    totalOrders: 3,
    totalSpent: 4200.0,
    joinDate: "2023-11-10",
    status: "Activo",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana@example.com",
    phone: "+34 111 222 333",
    city: "Sevilla",
    totalOrders: 1,
    totalSpent: 549.99,
    joinDate: "2024-01-05",
    status: "Nuevo",
  },
]

const CustomersView = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = mockCustomers.filter((customer) => {
    const matchSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchTerm.toLowerCase())
    return matchSearch
  })

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
        <p className="text-muted-foreground">Gestiona tu base de clientes</p>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Clientes Totales</p>
          <p className="text-3xl font-bold text-foreground">3,847</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Nuevos Este Mes</p>
          <p className="text-3xl font-bold text-foreground">124</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Ingresos Promedio</p>
          <p className="text-3xl font-bold text-foreground">$1,847</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Tasa de Retención</p>
          <p className="text-3xl font-bold text-foreground">78%</p>
        </Card>
      </div>

      {/* Búsqueda */}
      <Card className="p-6 mb-6 bg-card border-border">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente por nombre, email o ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
      </Card>

      {/* Grid de Clientes */}
      <div className="grid gap-4">
        {filtered.map((customer) => (
          <Card key={customer.id} className="p-6 bg-card border-border hover:border-primary/50 transition">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">{customer.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${customer.email}`} className="hover:text-primary">
                      {customer.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{customer.city}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total de Órdenes</p>
                  <p className="text-2xl font-bold text-foreground">{customer.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Se unió</p>
                  <p className="text-sm text-foreground">{customer.joinDate}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total Gastado</p>
                  <p className="text-2xl font-bold text-accent">${customer.totalSpent}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Estado</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${customer.status === "Activo" ? "bg-green-500/20 text-green-500" : "bg-blue-500/20 text-blue-500"
                      }`}
                  >
                    {customer.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Contactar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CustomersView
