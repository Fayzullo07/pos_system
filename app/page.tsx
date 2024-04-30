import AuthProvider from "@/components/Core/AuthProvider";
import HomePage from "@/components/HomePage";
import { auth } from "@/configs/auth";

const Home = async () => {

  // useEffect(() => {
  //   router.push("/login")
  // }, [])
  const session = await auth()
  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  }
  return (
    <AuthProvider session={session}>
      <HomePage />
    </AuthProvider>
  )
}

export default Home;