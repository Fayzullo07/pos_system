import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                login: { label: "Login", type: "text", placeholder: "Enter your login" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                await connectMongoDB();

                const { login, password } = credentials;

                try {
                    const user = await User.findOne({ login });
                    if (!user) {
                        // If no user is found, return null to indicate failed login
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        // If the password doesn't match, return null to indicate failed login
                        return null;
                    }

                    // If password matches, return the user object which will be serialized in the JWT
                    return user;
                } catch (error) {
                    console.error("Login error:", error);
                    return null;  // Ensure returning null on error to prevent login
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
    },
    // session: {
    //     strategy: 'jwt'  // Using JSON Web Tokens for session strategy
    // },
    // secret: process.env.NEXTAUTH_SECRET,  // Secret used to encrypt the JWT
    pages: {
        signIn: "/login"  // Custom sign-in page path
    }
};