"use client";

import CheckboxItem from "@/app/components/CheckboxItem";
import { Prisma } from "@prisma/client";
import { Table } from "flowbite-react";
import DrawingModal from "./DrawingModal";
import DrawingList from "./DrawingList";
import { getValueDisplay } from "@/utils/displayParser";

type RecordDetailType = {
  recordDetail: Prisma.PatientRecordGetPayload<{
    include: { drawings: true; visualAcuities: true };
  }>;
};

const RecordDetail = (props: RecordDetailType) => {
  const { recordDetail } = props;

  const visualAcuityOd = recordDetail.visualAcuities.find(
    (visualAcuity) => visualAcuity.eyeType === "OD"
  );
  const visualAcuityOs = recordDetail.visualAcuities.find(
    (visualAcuity) => visualAcuity.eyeType === "OS"
  );

  return (
    <div>
      <div className="mt-6 mb-6 flex justify-between">
        <p className="text-2xl font-bold">{recordDetail.recordNo}</p>
        <div className="flex gap-4">
          <DrawingModal patientRecordId={recordDetail.id} />
        </div>
      </div>
      <div className=" flex justify-between  mb-5">
        <CheckboxItem
          disabled
          name="type"
          checkedValue={recordDetail.visitType ?? ""}
          isRow
          items={["OR", "CONS"]}
        />
      </div>
      <div className="my-2">
        <span className="text-xl font-bold">Reason for Visit: </span>
        <span>{recordDetail.reasonForVisit?.toString()}</span>
      </div>
      {recordDetail?.reasonForVisitNotes && (
        <div>
          <p className="text-xs italic">Notes</p>
          <textarea
            value={recordDetail.reasonForVisitNotes}
            disabled
            className="rounded w-full h-28"
          />
        </div>
      )}
      <div className="my-2">
        <span className="text-xl font-bold">Previous Medicines: </span>
        <textarea
          value={recordDetail.previousMedicines ?? ""}
          disabled
          className="rounded w-full h-28"
        />
      </div>
      <div className="my-4">
        <p className="text-xl font-bold">Auto Refraction: </p>
        <div>
          <div>
            <span className="font-bold">OD: </span>
            {getValueDisplay(recordDetail.autoRefractionOD)}
          </div>
          <div>
            <span className="font-bold">OS: </span>
            {getValueDisplay(recordDetail.autoRefractionOs)}
          </div>
        </div>
      </div>
      <p>
        <span className="text-xl font-bold">Visual Acuity: </span>
      </p>
      <Table hoverable className="w-auto">
        <Table.Head>
          <Table.HeadCell>EYE</Table.HeadCell>
          <Table.HeadCell>SC</Table.HeadCell>
          <Table.HeadCell>PH</Table.HeadCell>
          <Table.HeadCell>CC</Table.HeadCell>
          <Table.HeadCell>NCC</Table.HeadCell>
          <Table.HeadCell>J.</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-black">
            <Table.Cell className=" whitespace-nowrap text-gray-900 font-bold dark:text-white">
              OD
            </Table.Cell>
            <Table.Cell>{getValueDisplay(visualAcuityOd?.sc)}</Table.Cell>
            <Table.Cell>{getValueDisplay(visualAcuityOd?.ph)}</Table.Cell>
            <Table.Cell>{getValueDisplay(visualAcuityOd?.cc)}</Table.Cell>
            <Table.Cell>{getValueDisplay(visualAcuityOd?.ncc)}</Table.Cell>
            <Table.Cell>{getValueDisplay(visualAcuityOd?.j)}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-black">
            <Table.Cell className=" whitespace-nowrap font-bold text-gray-900 dark:text-white">
              OS
            </Table.Cell>
            <Table.Cell>{getValueDisplay(visualAcuityOs?.sc)}</Table.Cell>
            <Table.Cell>{getValueDisplay(visualAcuityOs?.ph)}</Table.Cell>
            <Table.Cell>{getValueDisplay(visualAcuityOs?.cc)}</Table.Cell>
            <Table.Cell>{getValueDisplay(visualAcuityOs?.ncc)}</Table.Cell>
            <Table.Cell>{getValueDisplay(visualAcuityOs?.j)}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <p className="mb-3 mt-8 font-bold text-xl">Refraction</p>
      <div className="flex mb-5 gap-3">
        <div className="flex items-end gap-3">
          <p className="font-bold">OD:</p>
          {getValueDisplay(recordDetail.refractionOd)}
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">D(-)</p>
          {getValueDisplay(recordDetail.refractionOdNegative)}
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">Dx</p>
          {getValueDisplay(recordDetail.refractionOdX)}
        </div>
      </div>
      <div className="flex mb-5 gap-3">
        <div className="flex items-end gap-3">
          <p className="font-bold">OS:</p>
          {getValueDisplay(recordDetail.refractionOs)}
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">D(-)</p>
          {getValueDisplay(recordDetail.refractionOsNegative)}
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">Dx</p>
          {getValueDisplay(recordDetail.refractionOsX)}
        </div>
      </div>
      <div className="flex mb-5 gap-3">
        <div className="flex items-end gap-3">
          <p className="font-bold">Add:(J.)</p>
          {getValueDisplay(recordDetail.refractionAdd)}
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">PD</p>
          {getValueDisplay(recordDetail.refractionPd)}
          <span>mm</span>
        </div>
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Intra Ocular Pressure</p>
      <div className="flex gap-3 mb-5">
        <div className="flex items-end gap-3">
          <p className="font-bold">Time:</p>
          {getValueDisplay(recordDetail.appointmentTime)}
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">OD:</p>
          {getValueDisplay(recordDetail.intraOcularPressureOD)}
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">OS:</p>
          {getValueDisplay(recordDetail.intraOcularPressureOS)}
        </div>
      </div>
      <div>
        <span className="mb-3 mt-8 font-bold text-xl">MD: </span>
        <span>{recordDetail.medicalDoctor}</span>
      </div>
      <div className="mt-8">
        <span className="mb-3 mt-8 font-bold text-xl">Diagnosis: </span>
        <DrawingList patientRecordId={recordDetail.id} />
      </div>
    </div>
  );
};

export default RecordDetail;
