import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "AuthProvider",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const res = await fetch("http://localhost:3331/auth/login", {
          method: 'PUT',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const resUser = await res.json();
        if (!resUser) return new Error('user not found')
        return resUser
      },
    }),
  ]
};
