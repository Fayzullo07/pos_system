import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import NextAuth, { AuthOptions } from "next-auth";
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
                        // Any object returned will be saved in `user` property of the JWT
                        return user
                    } else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        return null

                        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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