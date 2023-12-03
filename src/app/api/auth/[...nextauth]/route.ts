// import { authenticate } from "@/services/authService";
import NextAuth from "next-auth";
import option from "./option";

const handler = NextAuth(option);

export { handler as GET, handler as POST };
