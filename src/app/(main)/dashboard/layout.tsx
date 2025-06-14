import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

import SidebarDashboardInset from "@/components/modules/sidebar/components/SidebarDashboardInset";
import SidebarDashboard from "@/components/modules/sidebar/templates/SidebarDashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
        <SidebarDashboardInset>
          {children}
        </SidebarDashboardInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
