import prisma from "@/db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          const user = await prisma.user.findFirst({
            include: { department: true },
            where: { username: credentials.username },
          });

          return user &&
            user.status === "Active" &&
            bcrypt.compareSync(credentials?.password, user.password ?? "")
            ? {
                id: user.id.toString(),
                username: user.username,
                name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
                email: user.email,
                departmentId: user.departmentId,
                department: user.department,
                image: null,
              }
            : null;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    //  maxAge: 24 * 60 * 60 = 1day
    maxAge: 60 * 30, // 1hr
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      const user = token.user as { id: string; username: string };
      session.user = user;

      return session;
    },
  },
};

export default authOptions;
