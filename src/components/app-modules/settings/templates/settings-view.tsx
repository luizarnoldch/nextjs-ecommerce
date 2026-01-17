"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell, Lock, User, Palette } from "lucide-react"

const SettingsView = () => {
  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground">Personaliza tu cuenta y preferencias</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Perfil */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Información del Perfil</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground">Nombre</Label>
                <Input defaultValue="Administrador" className="mt-2 bg-input border-border" />
              </div>
              <div>
                <Label className="text-foreground">Email</Label>
                <Input type="email" defaultValue="admin@ecommerce.com" className="mt-2 bg-input border-border" />
              </div>
            </div>
            <div>
              <Label className="text-foreground">Empresa</Label>
              <Input defaultValue="Mi E-commerce" className="mt-2 bg-input border-border" />
            </div>
            <Button className="bg-primary hover:bg-primary/90">Guardar Cambios</Button>
          </div>
        </Card>

        {/* Seguridad */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Seguridad</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-foreground">Contraseña Actual</Label>
              <Input type="password" placeholder="••••••••" className="mt-2 bg-input border-border" />
            </div>
            <div>
              <Label className="text-foreground">Nueva Contraseña</Label>
              <Input type="password" placeholder="••••••••" className="mt-2 bg-input border-border" />
            </div>
            <div>
              <Label className="text-foreground">Confirmar Contraseña</Label>
              <Input type="password" placeholder="••••••••" className="mt-2 bg-input border-border" />
            </div>
            <Button className="bg-primary hover:bg-primary/90">Cambiar Contraseña</Button>
          </div>
        </Card>

        {/* Notificaciones */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Notificaciones</h2>
          </div>

          <div className="space-y-4">
            {[
              { label: "Nuevas órdenes", desc: "Recibe alertas cuando llegan nuevas órdenes" },
              { label: "Bajos en stock", desc: "Notificaciones cuando los productos están bajos en stock" },
              { label: "Resumen semanal", desc: "Recibe un resumen de tus ventas cada semana" },
              { label: "Noticias y actualizaciones", desc: "Entérate de nuevas características y mejoras" },
            ].map((item) => (
              <label
                key={item.label}
                className="flex items-start gap-3 cursor-pointer p-3 hover:bg-muted/50 rounded transition"
              >
                <input type="checkbox" defaultChecked className="mt-1 rounded" />
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>

        {/* Apariencia */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Apariencia</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-foreground">Tema</Label>
              <div className="flex gap-3 mt-3">
                <Button variant="outline" className="w-full bg-transparent">
                  Claro
                </Button>
                <Button className="w-full bg-primary hover:bg-primary/90">Oscuro</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SettingsView