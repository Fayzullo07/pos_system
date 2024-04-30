import NextAuth from "next-auth"

import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const config = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                login: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize(c) {
                // if (c.password) return null;
                return {
                    login: c.login,
                    password: c.password,
                    id: "1",
                };
            },
        }),
    ],
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname === "/middleware-example") return !!auth
            return true
        },
        jwt({ token, trigger, session }) {
            if (trigger === "update") token.name = session.user.name
            return token
        },
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)