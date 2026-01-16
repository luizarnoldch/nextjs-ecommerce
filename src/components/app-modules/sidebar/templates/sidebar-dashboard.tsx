import { ComponentProps } from "react"
import { Sidebar } from "@/components/ui/sidebar"
import SidebarDashboardHeader from "../components/sidebar-header"
import SidebarDashboardContent from "../components/sidebar-content"
import SidebarDashboardFooter from "../components/sidebar-footer"

type SidebarDashboardProps = ComponentProps<typeof Sidebar>

const SidebarDashboard = (props: SidebarDashboardProps) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <aside className="flex flex-col h-full">
        {/* <SidebarDashboardHeader /> */}
        <SidebarDashboardContent />
        <SidebarDashboardFooter />
      </aside>
    </Sidebar>
  )
}

export default SidebarDashboard