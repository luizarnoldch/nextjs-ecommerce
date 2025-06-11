import SidebarDashboard from "@/components/modules/sidebar/templates/SidebarDashboard";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
        <main className="w-full flex flex-col flex-1">
          <SidebarTrigger />
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
