"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Printer } from "lucide-react"

const mockOrders = [
  {
    id: "#ORD-001",
    customer: "Juan García",
    email: "juan@example.com",
    amount: 1299.99,
    items: 2,
    status: "Completada",
    paymentStatus: "Pagado",
    date: "2024-01-10",
    shippingAddress: "Calle 123, Ciudad",
  },
  {
    id: "#ORD-002",
    customer: "María López",
    email: "maria@example.com",
    amount: 899.5,
    items: 1,
    status: "Enviada",
    paymentStatus: "Pagado",
    date: "2024-01-09",
    shippingAddress: "Avenida 456, Pueblo",
  },
  {
    id: "#ORD-003",
    customer: "Carlos Ruiz",
    email: "carlos@example.com",
    amount: 2150.0,
    items: 4,
    status: "Pendiente",
    paymentStatus: "Pendiente",
    date: "2024-01-08",
    shippingAddress: "Plaza 789, Región",
  },
  {
    id: "#ORD-004",
    customer: "Ana Martínez",
    email: "ana@example.com",
    amount: 549.99,
    items: 1,
    status: "Cancelada",
    paymentStatus: "Reembolsado",
    date: "2024-01-07",
    shippingAddress: "Paseo 101, Zona",
  },
]

const OrdersView = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")

  const statuses = ["Todos", "Pendiente", "Enviada", "Completada", "Cancelada"]

  const filtered = mockOrders.filter((order) => {
    const matchSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === "Todos" || order.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Órdenes</h1>
        <p className="text-muted-foreground">Gestiona todos los pedidos de tus clientes</p>
      </div>

      {/* Filtros */}
      <Card className="p-6 mb-6 bg-card border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por orden, cliente o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statuses.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                onClick={() => setStatusFilter(status)}
                className={statusFilter === status ? "bg-primary hover:bg-primary/90" : ""}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Tabla de Órdenes */}
      <Card className="overflow-hidden bg-card border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Orden</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Cliente</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Email</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Monto</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Artículos</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Estado</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Pago</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Fecha</th>
                <th className="text-center py-4 px-6 text-muted-foreground font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="py-4 px-6 font-medium text-primary">{order.id}</td>
                  <td className="py-4 px-6 text-foreground">{order.customer}</td>
                  <td className="py-4 px-6 text-foreground text-xs">{order.email}</td>
                  <td className="py-4 px-6 font-semibold text-foreground">${order.amount}</td>
                  <td className="py-4 px-6 text-foreground">{order.items}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "Completada"
                        ? "bg-green-500/20 text-green-500"
                        : order.status === "Enviada"
                          ? "bg-blue-500/20 text-blue-500"
                          : order.status === "Pendiente"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-red-500/20 text-red-500"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-xs font-medium ${order.paymentStatus === "Pagado"
                        ? "text-green-500"
                        : order.paymentStatus === "Pendiente"
                          ? "text-yellow-500"
                          : "text-red-500"
                        }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{order.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                        <Printer className="w-4 h-4" />
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
            Mostrando {filtered.length} de {mockOrders.length} órdenes
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

export default OrdersView