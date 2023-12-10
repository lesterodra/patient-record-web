import { Session } from "next-auth";

type AccountSettingProps = {
  session: { user: { username: string } };
};

const AccountSettingsForm = (props: AccountSettingProps) => {
  const { session } = props;
  const { user } = session;

  return (
    <div className="mt-5">
      <div className="mt-3 flex flex-col gap-2">
        <p>Username</p>
        <input value={user?.username} type="text" className="rounded w-60" />
        <p>Password</p>
        <input type="password" className="rounded w-60" />
        <p>Confirm Password</p>
        <input type="password" className="rounded w-60" />
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="px-3 py-2 bg-blue-500 text-white rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettingsForm;
