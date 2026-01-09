import { Sidebar } from "@/components/ui/sidebar"
import SidebarDashboardContent from "../components/SidebarDashboardContent"
import SidebarDashboardFooter from "../components/SidebarDashboardFooter"
import SidebarDashboardHeader from "../components/SidebarDashboardHeader"

const SidebarDashboard = () => {
  return (
    <Sidebar>
      <SidebarDashboardHeader />
      <SidebarDashboardContent />
      <SidebarDashboardFooter />
    </Sidebar>
  )
}

export default SidebarDashboard
