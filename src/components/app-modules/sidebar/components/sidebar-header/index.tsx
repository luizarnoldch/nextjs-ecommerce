import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { StarIcon } from "lucide-react"
import Link from "next/link"

const SidebarDashboardHeader = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <StarIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Atomic Ecommerce</span>
                <span className="truncate text-xs">Dashboard</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export default SidebarDashboardHeader
