import PageHeading from "@/app/components/PageHeading";
import options from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth/next";
import AccountSettingsForm from "./components/AccountSettingsForm";

const SettingsPage = async () => {
  const session = (await getServerSession(options)) as {
    user: { username: string; name: string; id: string };
  };

  return (
    <PageHeading pageTitle="Account Settings">
      <div>
        <AccountSettingsForm session={session} />
      </div>
    </PageHeading>
  );
};

export default SettingsPage;
