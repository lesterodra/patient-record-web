import CreatePatientModal from "./components/CreatePatientModal";
import PatientList from "./components/PatientList";
import PageHeading from "@/app/components/PageHeading";
import PatientSearch from "./components/PatientSearch";
import { getServerSession } from "next-auth/next";
import options from "@/app/api/auth/[...nextauth]/option";
import { UserType } from "@/redux/features/user-slice";

const Patients = async () => {
  const session = (await getServerSession(options)) as {
    user: UserType;
  };

  return (
    <PageHeading pageTitle="Patient List">
      <div className="flex justify-end">
        <CreatePatientModal />
      </div>
      <PatientSearch />
      <PatientList session={session} />
    </PageHeading>
  );
};

export default Patients;
