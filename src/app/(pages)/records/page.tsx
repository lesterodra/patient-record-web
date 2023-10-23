import PageHeading from "@/app/components/PageHeading";
import PatientRecords from "./components/PatientRecords";
import PatientRecordSearch from "./components/PatientRecordSearch";

const Records = () => {
  return (
    <PageHeading pageTitle="Patient Records">
      <PatientRecordSearch />
      <PatientRecords />
    </PageHeading>
  );
};

export default Records;
