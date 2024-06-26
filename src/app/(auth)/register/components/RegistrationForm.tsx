"use client";

import { registerUser, validateUserEmail } from "@/utils/dataFetchers";
import { User } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const [email, setEmail] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [createAccountErrorMessage, setCreateAccountErrorMessage] =
    useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const onClickNext = async () => {
    try {
      const user = await validateUserEmail(email);

      if (!user.isValid) {
        setErrorMessage(
          "Invalid Email. Please ask your administrator for assistance."
        );

        return;
      }

      setUser(user.data);
    } catch (error) {
      setErrorMessage(
        "Error encountered. Please ask your administrator for assistance."
      );
    }
  };

  const onCreateAccountClick = async () => {
    try {
      if (!username) {
        setCreateAccountErrorMessage("Username is required.");
        return;
      }

      if (username.length < 6) {
        setCreateAccountErrorMessage("Username must not less than 6 letters.");
        return;
      }

      if (/\s/g.test(username)) {
        setCreateAccountErrorMessage(
          "Invalid username format, Please remove white space."
        );
        return;
      }

      if (!password) {
        setCreateAccountErrorMessage("Password is required.");
        return;
      }

      if (password.length < 8) {
        setCreateAccountErrorMessage("Password must not less than 8 letters.");
        return;
      }

      if (password !== confirmPassword) {
        setCreateAccountErrorMessage("Password does not matched.");
        return;
      }

      const response = await registerUser(
        user?.id as number,
        username.trim(),
        password.trim()
      );

      if (response.status !== 200) {
        setCreateAccountErrorMessage(response.message);
        return;
      }

      if (response.status === 200) {
        setCreateAccountErrorMessage(
          "Account successfully created. You will redirected to the login page shortly."
        );
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error) {
      // console.log({ error });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col p-6">
        {!user && (
          <div className="border border-black p-6 rounded">
            {errorMessage && (
              <div className="mb-3">
                <p className="text-xs text-red-500">{errorMessage}</p>
              </div>
            )}
            <div>
              <p>Enter your email address</p>
              <input
                type="text"
                className="rounded"
                onBlur={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 px-3 text-white rounded"
                onClick={onClickNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {user && (
          <div className="mt-5 border border-black p-6 rounded w-96">
            <p className="text-xl font-bold">Setup your account.</p>
            <p className="text-xs mt-4 text-amber-700 font-bold italic">
              Hello {user.firstName}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <p>Username</p>
              <input
                type="text"
                className="rounded"
                onBlur={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <p>Password</p>
              <input
                type="password"
                className="rounded"
                onBlur={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p>Confirm Password</p>
              <input
                type="password"
                className="rounded"
                onBlur={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="px-3 bg-green-500 text-white rounded"
                onClick={onCreateAccountClick}
              >
                Create account
              </button>
            </div>
            <p className="mt-2 text-xs text-red-500 ">
              {createAccountErrorMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
