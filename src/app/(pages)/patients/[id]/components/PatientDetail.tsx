"use client";

import CreatePatientRecordModal from "../../components/CreatePatientRecordModal";
import { Button } from "flowbite-react";
import { useState } from "react";
import { PatientInformation } from "@prisma/client";
import { convertToReadableDate, getValueDisplay } from "@/utils/displayParser";
import PatientRecordHistory from "./PatientRecordHistory";

const PatientDetail = ({
  patientDetail,
}: {
  patientDetail: PatientInformation;
}) => {
  const [isCreatePatientRecordModalOpen, setIsCreatePatientRecordModalOpen] =
    useState<boolean>(false);

  return (
    <div>
      <CreatePatientRecordModal
        patientInformationId={patientDetail.id}
        isOpen={isCreatePatientRecordModalOpen}
        setIsOpen={setIsCreatePatientRecordModalOpen}
      />
      <div className="mt-10">
        <div className="flex justify-between">
          <p className="text-3xl font-bold">{`${patientDetail.lastName}, ${patientDetail.firstName} ${patientDetail.middleName}`}</p>
          <Button onClick={() => setIsCreatePatientRecordModalOpen(true)}>
            Schedule Checkup
          </Button>
        </div>
        <p className="text-md">
          <b>PHIC: </b> {getValueDisplay(patientDetail.philHealthNo)}
        </p>
      </div>
      <div className="mt-6  border border-b-gray-500 border-t-0 border-x-0">
        <p className="text-xl">Personal Information</p>
      </div>
      <div className="mt-4">
        <p className="text-md">
          <b>Patient no: </b> {getValueDisplay(patientDetail.patientNo)}
        </p>
        <p className="text-sm">
          <b>Address Line 1:</b> {getValueDisplay(patientDetail.address)}
        </p>
        <p className="text-sm">
          <b>Province:</b> {getValueDisplay(patientDetail.province)}
        </p>
        <p className="text-sm">
          <b>City / Municipality:</b>{" "}
          {getValueDisplay(patientDetail.municipality)}
        </p>
        <p className="text-sm">
          <b>Barangay:</b> {getValueDisplay(patientDetail.barangay)}
        </p>
        <p className="text-sm">
          <b>Birth date:</b>{" "}
          {getValueDisplay(convertToReadableDate(patientDetail.birthDate))}
        </p>
        <p className="text-sm">
          <b>Age:</b> 19
        </p>
        <p className="text-sm">
          <b>Gender:</b> {getValueDisplay(patientDetail.gender)}
        </p>
        <p className="text-sm">
          <b>Nationality:</b> {getValueDisplay(patientDetail.nationality)}
        </p>
        <p className="text-sm">
          <b>Status:</b> {getValueDisplay(patientDetail.civilStatus)}
        </p>
        <p className="text-sm">
          <b>Mobile Number:</b> {getValueDisplay(patientDetail.contactNo)}
        </p>
        <p className="text-sm">
          <b>Height:</b> {getValueDisplay(patientDetail.height)}
        </p>
        <p className="text-sm">
          <b>Weight:</b> {getValueDisplay(patientDetail.weight)}
        </p>
        <p>
          <b>Known Allergy: </b>{" "}
          {getValueDisplay(patientDetail?.knownAllergies?.toString())}
        </p>
        <div>
          <p className="text-xs italic">Notes</p>
          <textarea disabled className="rounded w-full h-28" />
        </div>
        <p>
          <b>Referral From: </b> {patientDetail.sourceOfReferral}
        </p>
        <div>
          <p className="text-xs italic">Notes</p>
          <textarea disabled className="rounded w-full h-28" />
        </div>
        <p>
          <b>Personal Medical History: </b>{" "}
          {getValueDisplay(patientDetail.personalMedicalHistories?.toString())}
        </p>
        <div>
          <p className="text-xs italic">Notes</p>
          <textarea disabled className="rounded w-full h-28" />
        </div>
        <p>
          <b>Previous Laser/Surgery: </b>{" "}
          {getValueDisplay(patientDetail.previousSurgeries?.toString())}
        </p>
        <div>
          <p className="text-xs italic">Notes</p>
          <textarea disabled className="rounded w-full h-28" />
        </div>
        <PatientRecordHistory patientInformationId={patientDetail.id} />
      </div>
    </div>
  );
};

export default PatientDetail;
