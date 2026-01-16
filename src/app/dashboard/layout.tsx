import SidebarDashboardInset from "@/components/app-modules/sidebar/components/sidebar-dashboard-inset"
import SidebarDashboard from "@/components/app-modules/sidebar/templates/sidebar-dashboard"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <SidebarDashboard />
      <SidebarDashboardInset>{children}</SidebarDashboardInset>
    </SidebarProvider>
  )
}
