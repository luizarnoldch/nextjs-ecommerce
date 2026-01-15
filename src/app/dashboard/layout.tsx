import SidebarDashboardInset from "@/components/app-modules/sidebar/components/SidebarDashboardInset"
import SidebarDashboard from "@/components/app-modules/sidebar/templates/SidebarDashboard"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <SidebarDashboard />
        <SidebarDashboardInset>{children}</SidebarDashboardInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
