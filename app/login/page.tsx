import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import LoginForm from "@/components/LoginForm";
import { authOptions } from "../api/auth/[...nextauth]";

const Login = async () => {
    const session = await getServerSession(authOptions);
    if (session) redirect("/");

    return <LoginForm />
}

export default Login;