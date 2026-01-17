"use client"

import { DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"

type UserInforamtionDropDownContentProps = {
  children?: React.ReactNode
}

const UserInforamtionDropDownContent = ({ children }: UserInforamtionDropDownContentProps) => {
  const { isMobile } = useSidebar()
  return (
    <DropdownMenuContent
      className="rounded-lg"
      side={isMobile ? "bottom" : "right"}
      align="end"
      sideOffset={isMobile ? 4 : 0}
    >
      {children}
    </DropdownMenuContent>
  )
}

export default UserInforamtionDropDownContent
