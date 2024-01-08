"use client";

import CheckboxItem from "@/app/components/CheckboxItem";
import { Prisma } from "@prisma/client";
import { Button, ListGroup, Table } from "flowbite-react";
import DrawingModal from "./DrawingModal";
import DrawingList from "./DrawingList";
import {
  convertToReadableDate,
  getDisplayStatus,
  getUserFullName,
  getValueDisplay,
} from "@/utils/displayParser";
import ChangeStatusModal from "./ChangeStatusModal";
import { useState } from "react";
import SetFollowUpVisitModal from "./SetFollowUpVisitModal";
import UploadAttachmentModal from "./UploadAttachmentModal";
import AttachmentList from "./AttachmentList";
import { VISIT_TYPE } from "@/utils/constants";

type RecordDetailType = {
  recordDetail: Prisma.PatientRecordGetPayload<{
    include: {
      drawings: true;
      visualAcuities: true;
      medicalDoctorUser: true;
      patientInformation: true;
      autoRefractionByUser: true;
      refractionByUser: true;
      visualAcuityByUser: true;
      intraOcularPressureByUser: true;
    };
  }>;
};

const RecordDetail = (props: RecordDetailType) => {
  const { recordDetail } = props;
  const [status, setStatus] = useState<string>(recordDetail.status ?? "");
  const [followUpDate, setFollowUpDate] = useState<string>(
    recordDetail.followUpDate ?? ""
  );
  const [isActionOpen, setIsActionOpen] = useState<boolean>(false);
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] =
    useState<boolean>(false);
  const [isDrawModalOpen, setIsDrawModalOpen] = useState<boolean>(false);
  const [isSetFollowUpVisitModalOpen, setIsSetFollowUpVisitModalOpen] =
    useState<boolean>(false);
  const [isUploadAttachmentModalOpen, setIsUploadAttachmentModalOpen] =
    useState<boolean>(false);

  const visualAcuityOd = recordDetail.visualAcuities.find(
    (visualAcuity) => visualAcuity.eyeType === "OD"
  );
  const visualAcuityOs = recordDetail.visualAcuities.find(
    (visualAcuity) => visualAcuity.eyeType === "OS"
  );

  return (
    <div>
      <div className="mt-6 mb-6 flex justify-between">
        <div>
          <div>
            <span className="text-2xl font-bold">{recordDetail.recordNo}</span>
            <span className="text-sm text-blue-900 font-bold">
              ({getDisplayStatus(status)})
            </span>
          </div>
          <div>
            <p>{recordDetail?.patientInformation?.patientNo}</p>
            <p>
              {recordDetail?.patientInformation?.lastName},{" "}
              {recordDetail?.patientInformation?.firstName}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Button
              className="mb-1"
              onClick={() => setIsActionOpen((prev) => !prev)}
            >
              Actions
            </Button>
            {isActionOpen && (
              <div className="absolute right-0">
                <ListGroup className="w-48">
                  <ListGroup.Item
                    onClick={() => {
                      setIsChangeStatusModalOpen(true);
                    }}
                  >
                    Change Status
                  </ListGroup.Item>
                  <ListGroup.Item
                    onClick={() => {
                      setIsDrawModalOpen(true);
                    }}
                  >
                    Draw
                  </ListGroup.Item>
                  <ListGroup.Item
                    onClick={() => {
                      setIsSetFollowUpVisitModalOpen(true);
                    }}
                  >
                    Set follow-up visit
                  </ListGroup.Item>
                  <ListGroup.Item
                    onClick={() => {
                      setIsUploadAttachmentModalOpen(true);
                    }}
                  >
                    Upload Attachments
                  </ListGroup.Item>
                </ListGroup>
              </div>
            )}
            <ChangeStatusModal
              isOpen={isChangeStatusModalOpen}
              setIsOpen={setIsChangeStatusModalOpen}
              currentStatus={recordDetail.status as string}
              patientRecordId={recordDetail.id}
              onStatusChange={(status) => {
                setStatus(status);
              }}
            />
            <DrawingModal
              isOpen={isDrawModalOpen}
              setIsOpen={setIsDrawModalOpen}
              patientRecordId={recordDetail.id}
            />
            <SetFollowUpVisitModal
              isOpen={isSetFollowUpVisitModalOpen}
              setIsOpen={setIsSetFollowUpVisitModalOpen}
              patientRecordId={recordDetail.id}
              followUpDate={recordDetail.followUpDate}
              onFollowUpDateChange={(followUpDateValue) => {
                setFollowUpDate(followUpDateValue);
              }}
            />
            {isUploadAttachmentModalOpen && (
              <UploadAttachmentModal
                patientRecordId={recordDetail.id}
                isOpen={isUploadAttachmentModalOpen}
                setIsOpen={setIsUploadAttachmentModalOpen}
              />
            )}
          </div>
        </div>
      </div>
      <div className=" flex justify-between mb-5">
        <CheckboxItem
          disabled
          name="type"
          checkedValue={recordDetail.visitType ?? ""}
          isRow
          items={VISIT_TYPE}
        />
        <CheckboxItem
          disabled
          name="dilateType"
          checkedValue={recordDetail.dilateType ?? ""}
          isRow
          items={["OD", "OS", "OU"]}
        />
      </div>
      <div className="my-2">
        <span className="text-xl font-bold">Follow Up date: </span>
        <span>{convertToReadableDate(followUpDate)}</span>
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
        <span className="text-xl font-bold">Surgeries: </span>
        <span>{recordDetail.surgeries?.toString()}</span>
      </div>
      {recordDetail?.surgeryNotes && (
        <div>
          <p className="text-xs italic">Notes</p>
          <textarea
            value={recordDetail.surgeryNotes}
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
        <p className="text-xs italic mb-3">
          By: {getUserFullName(recordDetail.autoRefractionByUser)}
        </p>
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
      <p className="text-xs italic mb-3">
        By: {getUserFullName(recordDetail.visualAcuityByUser)}
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
      <p className="mt-8 font-bold text-xl">Refraction</p>
      <p className="text-xs italic mb-3">
        By: {getUserFullName(recordDetail.refractionByUser)}
      </p>
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
      <p className="mt-8 font-bold text-xl">Intra Ocular Pressure</p>
      <p className="text-xs italic mb-3">
        By: {getUserFullName(recordDetail.intraOcularPressureByUser)}
      </p>
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
        <span>
          {getValueDisplay(
            recordDetail.medicalDoctorUserId
              ? `${recordDetail.medicalDoctorUser?.lastName}, ${recordDetail.medicalDoctorUser?.firstName}`
              : null
          )}
        </span>
      </div>
      <div className="mt-8">
        <span className="mb-3 mt-8 font-bold text-xl">Diagnosis: </span>
        <DrawingList patientRecordId={recordDetail.id} />
      </div>
      <div className="mt-8">
        <span className="mb-3 mt-8 font-bold text-xl">Attachments: </span>
        <AttachmentList patientRecordId={recordDetail.id} />
      </div>
    </div>
  );
};

export default RecordDetail;
