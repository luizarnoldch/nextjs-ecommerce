import { redirect } from "next/navigation"


type Props = {}

const HomePage = (props: Props) => {
  redirect("/sign-in")
}

export default HomePage