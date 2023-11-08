import CreatePatientModal from "./components/CreatePatientModal";
import PatientList from "./components/PatientList";
import PageHeading from "@/app/components/PageHeading";
import PatientSearch from "./components/PatientSearch";

const Patients = async () => {
  return (
    <PageHeading pageTitle="Patient List">
      <div className="flex justify-end">
        <CreatePatientModal />
      </div>
      <PatientSearch />
      <PatientList />
    </PageHeading>
  );
};

export default Patients;
