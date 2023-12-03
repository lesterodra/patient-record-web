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
    <div className="flex justify-center items-center h-screen bg-neutral-200">
      <div className="flex flex-col border rounded-lg bg-white p-10">
        <p>Username</p>
        <input type="text" className="rounded" />
        <p className="mt-2">Password</p>
        <input type="password" className="rounded" />
        <div className="flex justify-center mt-5">
          <button
            onClick={onLoginClick}
            className="border w-fit py-1 px-2 bg-blue-700 rounded text-white"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
