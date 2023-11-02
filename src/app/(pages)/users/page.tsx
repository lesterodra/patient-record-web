import PageHeading from "@/app/components/PageHeading";
import UserList from "./components/UserList";
import CreateUserModal from "./components/CreateUserModal";

const Users = () => {
  return (
    <PageHeading pageTitle="Users">
      <div className="flex justify-end">
        <CreateUserModal />
      </div>
      <UserList />
    </PageHeading>
  );
};

export default Users;
