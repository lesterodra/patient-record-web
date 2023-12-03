"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.data) {
      router.push("/dashboard");
    }
  }, [session.data]);

  const onLoginClick = () => {
    signIn("credentials", {
      username: "jsmith",
      password: "1234",
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col border rounded-lg bg-white p-5">
        <p>Username</p>
        <input type="text" className="rounded" />
        <p>Password</p>
        <input type="password" className="rounded" />
        <button
          onClick={onLoginClick}
          className="border w-fit mt-3 py-1 px-2 bg-blue-700 rounded text-white"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
