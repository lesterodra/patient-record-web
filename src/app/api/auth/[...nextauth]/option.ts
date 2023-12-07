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
            where: { username: credentials.username },
          });

          return user &&
            user.status === "Active" &&
            bcrypt.compareSync(credentials?.password, user.password ?? "")
            ? { id: user.id.toString(), username: user.username }
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
    maxAge: 60 * 60, // 1hr
  },
  pages: {
    signIn: "/login",
  },
};

export default authOptions;
