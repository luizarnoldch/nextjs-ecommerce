"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card } from "@/components/ui/card"
import { ShoppingCart, Package, Users, TrendingUp } from "lucide-react"

const revenueData = [
  { month: "Ene", revenue: 4000, orders: 240 },
  { month: "Feb", revenue: 3000, orders: 221 },
  { month: "Mar", revenue: 2000, orders: 229 },
  { month: "Abr", revenue: 2780, orders: 200 },
  { month: "May", revenue: 1890, orders: 229 },
  { month: "Jun", revenue: 2390, orders: 200 },
]

const categoryData = [
  { name: "Electrónica", value: 35 },
  { name: "Ropa", value: 25 },
  { name: "Hogar", value: 20 },
  { name: "Deportes", value: 20 },
]

const colors = [
  "hsl(var(--color-chart-1))",
  "hsl(var(--color-chart-2))",
  "hsl(var(--color-chart-3))",
  "hsl(var(--color-chart-4))",
]

const HomeView = () => {
  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido a tu panel de control de e-commerce</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Ingresos Totales</p>
              <p className="text-3xl font-bold text-foreground">$16,060</p>
              <p className="text-xs text-green-500 mt-2">+12.5% vs mes anterior</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Órdenes Totales</p>
              <p className="text-3xl font-bold text-foreground">1,119</p>
              <p className="text-xs text-green-500 mt-2">+8.2% vs mes anterior</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Productos</p>
              <p className="text-3xl font-bold text-foreground">248</p>
              <p className="text-xs text-green-500 mt-2">+5 nuevos</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg">
              <Package className="w-6 h-6 text-secondary-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Clientes Activos</p>
              <p className="text-3xl font-bold text-foreground">3,847</p>
              <p className="text-xs text-green-500 mt-2">+18% vs mes anterior</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-border bg-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Ingresos y Órdenes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
              <XAxis stroke="hsl(var(--color-muted-foreground))" />
              <YAxis stroke="hsl(var(--color-muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--color-card))",
                  border: "1px solid hsl(var(--color-border))",
                }}
                labelStyle={{ color: "hsl(var(--color-foreground))" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--color-primary))"
                name="Ingresos ($)"
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="orders" stroke="hsl(var(--color-accent))" name="Órdenes" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-border bg-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Categorías Populares</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="mt-6 p-6 border-border bg-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Órdenes Recientes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">ID Orden</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Cliente</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Monto</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Estado</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#ORD-001", customer: "Juan García", amount: "$1,299", status: "Completada", date: "2024-01-10" },
                { id: "#ORD-002", customer: "María López", amount: "$899", status: "Pendiente", date: "2024-01-09" },
                { id: "#ORD-003", customer: "Carlos Ruiz", amount: "$2,150", status: "Enviada", date: "2024-01-08" },
                { id: "#ORD-004", customer: "Ana Martínez", amount: "$549", status: "Completada", date: "2024-01-07" },
              ].map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="py-3 px-4 text-foreground font-medium">{order.id}</td>
                  <td className="py-3 px-4 text-foreground">{order.customer}</td>
                  <td className="py-3 px-4 text-foreground">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "Completada"
                          ? "bg-green-500/20 text-green-500"
                          : order.status === "Pendiente"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-blue-500/20 text-blue-500"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default HomeView