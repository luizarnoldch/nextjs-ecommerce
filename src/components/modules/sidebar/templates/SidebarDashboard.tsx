import {
  Sidebar,
} from "@/components/ui/sidebar"
import SidebarDashboardHeader from "../components/SidebarDashboardHeader"
import SidebarDashboardFooter from "../components/SidebarDashboardFooter"
import SidebarDashboardContent from "../components/SidebarDashboardContent"



type SidebarDashboardProps = {
}

const SidebarDashboard = ({ }: SidebarDashboardProps) => {
  return (
    <Sidebar>
      <SidebarDashboardHeader />
      <SidebarDashboardContent />
      <SidebarDashboardFooter />
    </Sidebar>
  )
}

export default SidebarDashboard