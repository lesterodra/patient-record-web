export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/patients",
    "/patients/:path*",
    "/records",
    "/records/:path*",
    "/users",
    "/users/:path*",
  ],
};
