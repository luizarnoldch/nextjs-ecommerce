import { SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"

const SidebarDashboardHeader = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                Select Workspace
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[12rem] right-0">
              <DropdownMenuItem>
                <span>Acme Inc</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Acme Corp.</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <h3 className="text-center font-semibold text-2xl">Atomic Ecommerce</h3>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export default SidebarDashboardHeader
