"use client"
import { signOut } from "@/lib/auth-client"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {}

const LogoutButton = (props: Props) => {
  const router = useRouter()
  return (
    <button
      className="w-full justify-start items-center flex gap-2"
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/sign-in")
            }
          }
        })
      }}
    >
      <LogOutIcon />
      <span>Sign out</span>
    </button>
  )
}

export default LogoutButton
