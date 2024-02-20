import PageHeading from "@/app/components/PageHeading";
import UserList from "./components/UserList";
import options from "@/app/api/auth/[...nextauth]/option";
import CreateUserModal from "./components/CreateUserModal";
import { getServerSession } from "next-auth/next";
import { UserType } from "@/redux/features/user-slice";
import { isAdminUser } from "@/utils/displayParser";

const Users = async () => {
  const session = (await getServerSession(options)) as {
    user: UserType;
  };

  return (
    <PageHeading pageTitle="Users">
      <div className="flex justify-end">
        {isAdminUser(session) && <CreateUserModal />}
      </div>
      <UserList session={session} />
    </PageHeading>
  );
};

export default Users;
