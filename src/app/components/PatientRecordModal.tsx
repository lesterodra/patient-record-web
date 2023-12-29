"use client";

import CheckboxItem from "@/app/components/CheckboxItem";
import { Button, Modal, Table } from "flowbite-react";
import { PatientRecord, Prisma } from "@prisma/client";
import Link from "next/link";
import { getValueDisplay } from "@/utils/displayParser";

const PatientRecordModal = ({
  isOpen,
  setIsOpen,
  patientRecord,
}: {
  patientRecord: Prisma.PatientRecordGetPayload<{
    include: { visualAcuities: true; medicalDoctorUser: true };
  }>;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const visualAcuityOd = patientRecord.visualAcuities.find(
    (visualAcuity) => visualAcuity.eyeType === "OD"
  );
  const visualAcuityOs = patientRecord.visualAcuities.find(
    (visualAcuity) => visualAcuity.eyeType === "OS"
  );

  return (
    <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
      <Modal.Header>
        Record details:{" "}
        <Link
          className="text-blue-500 underline"
          target="_blank"
          href={`/records/${patientRecord.id}`}
        >
          {patientRecord.recordNo}
        </Link>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <div className=" flex justify-between  mb-5">
              <CheckboxItem
                disabled
                name="missing"
                isRow
                items={["OR", "CONS"]}
                checkedValue={patientRecord.visitType ?? ""}
              />
              <CheckboxItem
                disabled
                name="dilateType"
                isRow
                items={["OD", "OS", "OU"]}
                checkedValue={patientRecord.dilateType ?? ""}
              />
            </div>
            <div className="my-2">
              <span className="text-xl font-bold">Reason for Visit: </span>
              {patientRecord.reasonForVisit?.toString()}
            </div>
            {patientRecord?.reasonForVisitNotes && (
              <div>
                <p className="text-xs italic">Notes</p>
                <textarea
                  value={patientRecord.reasonForVisitNotes}
                  disabled
                  className="rounded w-full h-28"
                />
              </div>
            )}
            <div className="my-2">
              <p className="text-xl font-bold">Previous Medicines: </p>
              <textarea
                value={patientRecord?.previousMedicines ?? ""}
                disabled
                className="rounded w-full h-28"
              />
            </div>
            <div className="my-2">
              <p className="text-xl font-bold">Auto Refraction: </p>
              <b>OD:</b> {getValueDisplay(patientRecord.autoRefractionOD)}{" "}
              <b>OS:</b> {getValueDisplay(patientRecord.autoRefractionOs)}
            </div>
            <p>
              <span className="text-xl font-bold">Visual Acuity: </span>
            </p>
            <Table hoverable className="w-full">
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
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    OD
                  </Table.Cell>
                  <Table.Cell>{getValueDisplay(visualAcuityOd?.sc)}</Table.Cell>
                  <Table.Cell>{getValueDisplay(visualAcuityOd?.ph)}</Table.Cell>
                  <Table.Cell>{getValueDisplay(visualAcuityOd?.cc)}</Table.Cell>
                  <Table.Cell>
                    {getValueDisplay(visualAcuityOd?.ncc)}
                  </Table.Cell>
                  <Table.Cell>{getValueDisplay(visualAcuityOd?.j)}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-black">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    OS
                  </Table.Cell>
                  <Table.Cell>{getValueDisplay(visualAcuityOs?.sc)}</Table.Cell>
                  <Table.Cell>{getValueDisplay(visualAcuityOs?.ph)}</Table.Cell>
                  <Table.Cell>{getValueDisplay(visualAcuityOs?.cc)}</Table.Cell>
                  <Table.Cell>
                    {getValueDisplay(visualAcuityOs?.ncc)}
                  </Table.Cell>
                  <Table.Cell>{getValueDisplay(visualAcuityOs?.j)}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <p className="mb-3 mt-8 font-bold text-xl">Refraction</p>
            <div className="flex mb-5 gap-3">
              <div className="flex items-end gap-3">
                <p className="font-bold">OD:</p>
                {getValueDisplay(patientRecord.refractionOd)}
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">D(-)</p>
                {getValueDisplay(patientRecord.refractionOdNegative)}
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">Dx</p>
                {getValueDisplay(patientRecord.refractionOdX)}
              </div>
            </div>
            <div className="flex mb-5 gap-3">
              <div className="flex items-end gap-3">
                <p className="font-bold">OS:</p>
                {getValueDisplay(patientRecord.refractionOs)}
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">D(-)</p>
                {getValueDisplay(patientRecord.refractionOsNegative)}
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">Dx</p>
                {getValueDisplay(patientRecord.refractionOsX)}
              </div>
            </div>
            <div className="flex mb-5 gap-3">
              <div className="flex items-end gap-3">
                <p className="font-bold">Add:(J.)</p>
                {getValueDisplay(patientRecord.refractionAdd)}
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">PD</p>
                {getValueDisplay(patientRecord.refractionPd)}
                <span>mm</span>
              </div>
            </div>
            <p className="mb-3 mt-8 font-bold text-xl">Intra Ocular Pressure</p>
            <div className="flex gap-3 mb-5">
              <div className="flex items-end gap-3">
                <p className="font-bold">Time:</p>
                {getValueDisplay(patientRecord.appointmentTime)}
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">OD:</p>
                {getValueDisplay(patientRecord.intraOcularPressureOD)}
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">OS:</p>
                {getValueDisplay(patientRecord.intraOcularPressureOS)}
              </div>
            </div>
            <div>
              <span className="mb-3 mt-8 font-bold text-xl">MD: </span>
              <span>
                {getValueDisplay(
                  patientRecord.medicalDoctorUserId
                    ? `${patientRecord.medicalDoctorUser?.lastName}, ${patientRecord.medicalDoctorUser?.firstName}`
                    : null
                )}
              </span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button color="red" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientRecordModal;
