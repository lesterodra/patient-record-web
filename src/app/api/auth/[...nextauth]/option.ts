import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({ credentials });
        if (typeof credentials !== "undefined") {
          const user = { id: "1", username: "test", name: "john doe" };
          //   const res = await authenticate(
          //     credentials.email,
          //     credentials.password
          //   );
          //   if (typeof res !== "undefined") {
          //     return { ...res.user, apiToken: res.token };
          //   } else {
          //     return null;
          //   }

          return credentials?.username === "admin" &&
            credentials?.password === "admin"
            ? user
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
    maxAge: 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
};

export default authOptions;
