import CreatePatientModal from "./components/CreatePatientModal";
import PatientList from "./components/PatientList";
import PageHeading from "@/app/components/PageHeading";
import PatientSearch from "./components/PatientSearch";
import prisma from "@/db";
import { useAppSelector } from "@/redux/store";

const getPatients = () => prisma.patientInformation.findMany();

const Patients = async () => {
  const patients = await getPatients();

  return (
    <PageHeading pageTitle="Patient List">
      <div className="flex justify-end">
        <CreatePatientModal />
      </div>
      <PatientSearch />
      <PatientList patientList={patients} />
    </PageHeading>
  );
};

export default Patients;
