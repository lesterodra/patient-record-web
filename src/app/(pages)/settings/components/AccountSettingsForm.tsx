"use client";

import { Button } from "flowbite-react";

type AccountSettingProps = {
  session: { user: { username: string } };
};

const AccountSettingsForm = (props: AccountSettingProps) => {
  const { session } = props;
  const { user } = session ?? {};

  return (
    <div className="mt-5">
      <div className="mt-3 flex flex-col gap-2">
        <p>Username</p>
        <input type="text" className="rounded w-60" />
        <div>
          <Button> Update Username</Button>
        </div>
        <hr className="my-6" />
        <p>Password</p>
        <input type="password" className="rounded w-60" />
        <p>Confirm Password</p>
        <input type="password" className="rounded w-60" />
        <div>
          <Button>Update Password</Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsForm;
