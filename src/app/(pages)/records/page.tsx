import PageHeading from "@/app/components/PageHeading";
import PatientRecords from "./components/PatientRecords";
import PatientRecordSearch from "./components/PatientRecordSearch";
import { getServerSession } from "next-auth/next";
import { UserType } from "@/redux/features/user-slice";
import options from "@/app/api/auth/[...nextauth]/option";

const Records = async () => {
  const session = (await getServerSession(options)) as {
    user: UserType;
  };

  return (
    <PageHeading pageTitle="Patient Records">
      <PatientRecordSearch />
      <PatientRecords session={session} />
    </PageHeading>
  );
};

export default Records;
