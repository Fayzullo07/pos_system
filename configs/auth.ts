import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials: any) {
                await connectMongoDB();
                const { login, password } = credentials;
                try {
                    const user = await User.findOne({ login });

                    if (!user) {
                        return null
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null
                    }
                    console.log(user);
                    if (user) {
                        return user
                    } else {
                        return null
                    }

                } catch (error) {
                    console.log(error);

                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
};