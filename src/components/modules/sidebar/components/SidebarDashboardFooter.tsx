import { SidebarFooter, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import UserInformationDropDown from "./UserInformationDropDown"

const SidebarDashboardFooter = () => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <UserInformationDropDown />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

export default SidebarDashboardFooter
