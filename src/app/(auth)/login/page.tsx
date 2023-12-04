"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  console.log({ searchParams: searchParams.get("error") });
  useEffect(() => {
    if (session.data) {
      router.push("/dashboard");
    }
  }, [session.data]);

  const onLoginClick = async () => {
    const result = await signIn("credentials", {
      username,
      password,
      callbackUrl: "/dashboard",
    });

    console.log({ result });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-200">
      <div className="flex flex-col border rounded-lg bg-white p-10">
        {searchParams.get("error") && (
          <div>
            <p className="text-red-700 text-xs">Invalid credentials.</p>
          </div>
        )}
        <p>Username</p>
        <input
          type="text"
          className="rounded"
          onBlur={(e) => {
            setUsername(e.target.value);
          }}
        />
        <p className="mt-2">Password</p>
        <input
          type="password"
          className="rounded"
          onBlur={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="flex justify-center mt-5">
          <button
            onClick={onLoginClick}
            className="border w-fit py-1 px-2 bg-blue-700 rounded text-white"
          >
            Sign in
          </button>
        </div>
        <div className="mt-4">
          <p className="text-xs">
            New user? Register{" "}
            <Link className="underline text-blue-500 bold" href="/register">
              here
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
