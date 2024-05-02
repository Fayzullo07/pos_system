import AuthProvider from "@/components/Core/AuthProvider";
import HomePage from "@/components/HomePage";
import { auth } from "@/configs/auth";
// import { redirect } from "next/navigation";

const Home = async () => {

  const session = await auth()
  if (session?.user) {
    session.user = {
      name: session.user.name,
      id: session.user.id,
    }
  }
  return (
    <AuthProvider session={session}>
      <HomePage />
    </AuthProvider>
  )
}

export default Home;