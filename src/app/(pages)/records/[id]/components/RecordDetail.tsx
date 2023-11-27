"use client";

import CheckboxItem from "@/app/components/CheckboxItem";
import { PatientRecord } from "@prisma/client";
import { Button, Table } from "flowbite-react";
import ViewAttachmentModal from "./ViewAttachmentModal";
import UploadAttachmentModal from "./UploadAttachmentModal";
import DrawingModal from "./DrawingModal";

type RecordDetailType = {
  recordDetail: PatientRecord;
};

const RecordDetail = (props: RecordDetailType) => {
  const { recordDetail } = props;

  return (
    <div>
      <div className="mt-6 mb-6 flex justify-between">
        <p className="text-2xl font-bold">{recordDetail.recordNo}</p>
        <div className="flex gap-4">
          <DrawingModal />
          <ViewAttachmentModal />
          <UploadAttachmentModal />
        </div>
      </div>
      <div className=" flex justify-between  mb-5">
        <CheckboxItem
          disabled
          name="type"
          checkedValue="OR"
          isRow
          items={["OR", "CONS"]}
        />
      </div>
      <div className="my-2">
        <span className="text-xl font-bold">Reason for Visit:</span>
        <span>{recordDetail.reasonForVisit?.toString()}</span>
      </div>
      <div className="my-2">
        <span className="text-xl font-bold">Previous Medicines: </span>
        <span>{recordDetail.previousMedicines}</span>
      </div>
      <div className="my-2">
        <span className="text-xl font-bold">Auto Refraction: </span>
        OD: {recordDetail.autoRefractionOD} OS: {recordDetail.autoRefractionOs}
      </div>
      <p>
        <span className="text-xl font-bold">Visual Acuity: </span>
      </p>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="w-20">EYE</Table.HeadCell>
          <Table.HeadCell className="w-20">SC</Table.HeadCell>
          <Table.HeadCell className="w-20">PH</Table.HeadCell>
          <Table.HeadCell className="w-20">CC</Table.HeadCell>
          <Table.HeadCell className="w-20">NCC</Table.HeadCell>
          <Table.HeadCell className="w-20">J.</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-black">
            <Table.Cell className=" whitespace-nowrap font-medium text-gray-900 dark:text-white">
              OD
            </Table.Cell>
            <Table.Cell>data</Table.Cell>
            <Table.Cell>data</Table.Cell>
            <Table.Cell>data</Table.Cell>
            <Table.Cell>data</Table.Cell>
            <Table.Cell>data</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-black">
            <Table.Cell className=" whitespace-nowrap font-medium text-gray-900 dark:text-white">
              OS
            </Table.Cell>
            <Table.Cell>data</Table.Cell>
            <Table.Cell>data</Table.Cell>
            <Table.Cell>data</Table.Cell>
            <Table.Cell>data</Table.Cell>
            <Table.Cell>data</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <p className="mb-3 mt-8 font-bold text-xl">Refraction</p>
      <div className="flex mb-5 gap-3">
        <div className="flex items-end gap-3">
          <p className="font-bold">OD:</p>
          data
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">D(-)</p>
          data
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">Dx</p>
          data
        </div>
      </div>
      <div className="flex mb-5 gap-3">
        <div className="flex items-end gap-3">
          <p className="font-bold">OS:</p>
          data
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">D(-)</p>
          data
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">Dx</p>
          data
        </div>
      </div>
      <div className="flex mb-5 gap-3">
        <div className="flex items-end gap-3">
          <p className="font-bold">Add:(J.)</p>
          data
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">PD</p>
          data
          <span>mm</span>
        </div>
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Intra Ocular Pressure</p>
      <div className="flex gap-3 mb-5">
        <div className="flex items-end gap-3">
          <p className="font-bold">Time:</p>
          {recordDetail.appointmentTime}
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">OD:</p>
          {recordDetail.intraOcularPressureOD}
        </div>
        <div className="flex items-end gap-3">
          <p className="font-bold">OS:</p>
          {recordDetail.intraOcularPressureOS}
        </div>
      </div>
      <div>
        <span className="mb-3 mt-8 font-bold text-xl">MD: </span>
        <span>{recordDetail.medicalDoctor}</span>
      </div>
    </div>
  );
};

export default RecordDetail;
