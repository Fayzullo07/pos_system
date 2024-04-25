"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // const user: { account_type: string } = {
        //   account_type: "order_process"
        // }
        // localStorage.setItem('user', JSON.stringify(user))
        router.push("/admin");
    };
    return (
        <div className="bg-gradient-to-br from-purple-700 to-pink-500 min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
                <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Welcome to My System</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Login
                        </label>
                        <input className="w-full px-4 py-2 rounded-lg border border-gray-400" id="email" name="email"
                            type="text" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="w-full px-4 py-2 rounded-lg border border-gray-400" id="password" name="password"
                            type="password" required />
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg">
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;