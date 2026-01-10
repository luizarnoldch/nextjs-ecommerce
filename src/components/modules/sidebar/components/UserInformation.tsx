import { headers } from "next/headers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from "@/lib/auth"

const UserInformation = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const fullName = session?.user.name ?? ""

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join("")

  return (
    <>
      <Avatar className="size-8 rounded-lg">
        <AvatarImage
          className=""
          src={session?.user.image ?? ""}
          alt={session?.user.name}
        />
        <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
      </Avatar>
      <div className="grid w-4/5 flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{session?.user.name}</span>
        <span className="truncate text-xs opacity-80">{session?.user.email}</span>
      </div>
    </>
  )
}

export default UserInformation
