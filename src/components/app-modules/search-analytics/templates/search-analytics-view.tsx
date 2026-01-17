"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, Search, Eye, Clock as Click } from "lucide-react"

const searchData = [
  { term: "Laptop pro", searches: 342, clicks: 128, ctr: "37.4%" },
  { term: "Monitor 4k", searches: 287, clicks: 95, ctr: "33.1%" },
  { term: "Teclado mecánico", searches: 215, clicks: 62, ctr: "28.8%" },
  { term: "Mouse inalámbrico", searches: 198, clicks: 71, ctr: "35.9%" },
  { term: "Webcam hd", searches: 156, clicks: 48, ctr: "30.8%" },
  { term: "Monitor ultrawide", searches: 142, clicks: 34, ctr: "23.9%" },
  { term: "Cable usb-c", searches: 134, clicks: 29, ctr: "21.6%" },
]

const trendsData = [
  { week: "Sem 1", searches: 1200, conversions: 340 },
  { week: "Sem 2", searches: 1450, conversions: 420 },
  { week: "Sem 3", searches: 1320, conversions: 380 },
  { week: "Sem 4", searches: 1680, conversions: 510 },
]

const filters = [
  { name: "Color: Negro", usage: 312, conversions: 89 },
  { name: "Precio: 100-500", usage: 287, conversions: 72 },
  { name: "Marca: Sony", usage: 245, conversions: 68 },
  { name: "Categoría: Electrónica", usage: 418, conversions: 124 },
  { name: "Precio: 500+", usage: 156, conversions: 34 },
  { name: "En stock", usage: 523, conversions: 156 },
]

const SearchAnalyticsView = () => {
  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Búsqueda y Filtros</h1>
        <p className="text-muted-foreground">Analiza cómo tus clientes buscan y filtran productos</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Búsquedas Totales</p>
              <p className="text-3xl font-bold text-foreground">6,898</p>
            </div>
            <Search className="w-6 h-6 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">CTR Promedio</p>
              <p className="text-3xl font-bold text-foreground">31.2%</p>
            </div>
            <Click className="w-6 h-6 text-accent" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Conversiones</p>
              <p className="text-3xl font-bold text-foreground">1,649</p>
            </div>
            <Eye className="w-6 h-6 text-secondary-foreground" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tasa de Conversión</p>
              <p className="text-3xl font-bold text-foreground">23.9%</p>
            </div>
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
        </Card>
      </div>

      {/* Gráfico de Tendencias */}
      <Card className="p-6 mb-8 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-6">Tendencias de Búsqueda</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis stroke="hsl(var(--color-muted-foreground))" />
            <YAxis stroke="hsl(var(--color-muted-foreground))" />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--color-card))", border: "1px solid hsl(var(--color-border))" }}
              labelStyle={{ color: "hsl(var(--color-foreground))" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="searches"
              stroke="hsl(var(--color-primary))"
              name="Búsquedas"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="conversions"
              stroke="hsl(var(--color-accent))"
              name="Conversiones"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Búsquedas Principales */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Búsquedas</h3>
          <div className="space-y-4">
            {searchData.map((item, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">"{item.term}"</p>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">#{index + 1}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Búsquedas</p>
                    <p className="font-semibold text-foreground">{item.searches}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Clicks</p>
                    <p className="font-semibold text-foreground">{item.clicks}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">CTR</p>
                    <p className="font-semibold text-accent">{item.ctr}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Filtros Populares */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Filtros Populares</h3>
          <div className="space-y-4">
            {filters.map((filter, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">{filter.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Usos</p>
                    <p className="font-semibold text-foreground">{filter.usage}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Conversiones</p>
                    <p className="font-semibold text-accent">{filter.conversions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SearchAnalyticsView