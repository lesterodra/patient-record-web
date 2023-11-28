import PageHeading from "@/app/components/PageHeading";
import prisma from "@/db";
import PatientDetail from "./components/RecordDetail";
import { Prisma } from "@prisma/client";

const getRecordDetails = (id: number): Promise<any> =>
  prisma.patientRecord.findFirst({
    where: { id },
    include: { drawings: true },
  });

const PatientDetailPage = async ({ params }: { params: { id: string } }) => {
  const recordDetail = (await getRecordDetails(
    Number(params.id)
  )) as Prisma.PatientRecordGetPayload<{ include: { drawings: true } }>;

  return (
    <PageHeading pageTitle="Record Details">
      <PatientDetail recordDetail={recordDetail} />
    </PageHeading>
  );
};

export default PatientDetailPage;
