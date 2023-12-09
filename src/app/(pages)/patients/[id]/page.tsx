import PageHeading from "@/app/components/PageHeading";
import prisma from "@/db";
import PatientDetail from "./components/PatientDetail";

const getPatientDetails = (id: number): Promise<any> =>
  prisma.patientInformation.findFirst({ where: { id } });

const PatientDetailPage = async ({ params }: { params: { id: string } }) => {
  const patientDetail = await getPatientDetails(Number(params.id));
  return (
    <PageHeading pageTitle="Patient Details">
      <PatientDetail patientDetail={patientDetail} />
    </PageHeading>
  );
};

export default PatientDetailPage;
