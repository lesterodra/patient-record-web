"use client";

import ButtonWithSpinner from "@/app/components/ButtonWithSpinner";
import { AppDispatch } from "@/redux/store";
import { updateUserSettings } from "@/utils/dataFetchers";
import { validatePassword, validateUsername } from "@/utils/validation";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type AccountSettingProps = {
  session: { user: { username: string; id: string } };
};

const AccountSettingsForm = (props: AccountSettingProps) => {
  const { session } = props;
  const { user } = session ?? {};
  const [username, setUsername] = useState<string>(user?.username);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const onUpdateUsernameClick = async () => {
    const validationMessage = validateUsername(username);
    if (validationMessage) {
      setUsernameErrorMessage(validationMessage);
      return;
    }

    const response = await updateUserSettings(dispatch, {
      username: username.trim(),
      userId: Number(user.id),
    });

    if (response.status !== 200) {
      setUsernameErrorMessage(response.message);
      return;
    }

    setUsernameErrorMessage("");
  };

  const onUpdatePasswordClick = async () => {
    const validationMessage = validatePassword(password, confirmPassword);
    if (validationMessage) {
      setPasswordErrorMessage(validationMessage);
      return;
    }

    const response = await updateUserSettings(dispatch, {
      password: password.trim(),
      confirmPassword,
      userId: Number(user.id),
    });

    if (response.status !== 200) {
      setPasswordErrorMessage(response.message);
      return;
    }

    setPasswordErrorMessage("");
  };

  return (
    <div className="mt-5">
      <div className="mt-3 flex flex-col gap-2">
        <p>Username</p>
        <input
          type="text"
          value={username}
          className="rounded w-60"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        {usernameErrorMessage && (
          <p className="text-xs text-red-500">{usernameErrorMessage}</p>
        )}
        <div>
          <ButtonWithSpinner onClick={onUpdateUsernameClick}>
            Update Username
          </ButtonWithSpinner>
        </div>
        <hr className="my-6" />
        <p>Password</p>
        <input
          type="password"
          value={password}
          className="rounded w-60"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p>Confirm Password</p>
        <input
          type="password"
          value={confirmPassword}
          className="rounded w-60"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        {passwordErrorMessage && (
          <p className="text-xs text-red-500">{passwordErrorMessage}</p>
        )}
        <div>
          <ButtonWithSpinner onClick={onUpdatePasswordClick}>
            Update Password
          </ButtonWithSpinner>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsForm;
