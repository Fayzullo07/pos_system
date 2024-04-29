import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

const Login = async () => {
    // if (session) redirect("/");

    return <LoginForm />
}

export default Login;