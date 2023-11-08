"use client";

import PatientRecordModal from "@/app/components/PatientRecordModal";
import CreatePatientRecordModal from "../../components/CreatePatientRecordModal";
import { Button } from "flowbite-react";
import { useState } from "react";
import { PatientInformation } from "@prisma/client";
import { convertToReadableDate, getValueDisplay } from "@/utils/displayParser";

const PatientDetail = ({
  patientDetail,
}: {
  patientDetail: PatientInformation;
}) => {
  const [isPatientRecordModalOpen, setIsPatientRecordModalOpen] =
    useState<boolean>(false);
  const [isCreatePatientRecordModalOpen, setIsCreatePatientRecordModalOpen] =
    useState<boolean>(false);

  return (
    <div>
      <PatientRecordModal
        isOpen={isPatientRecordModalOpen}
        setIsOpen={setIsPatientRecordModalOpen}
      />
      <CreatePatientRecordModal
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
          <b>Address:</b> {getValueDisplay(patientDetail.address)}
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
        <p>
          <b>Referral From: </b> {patientDetail.sourceOfReferral}
        </p>
        <p>
          <b>Personal Medical History: </b>{" "}
          {getValueDisplay(patientDetail.personalMedicalHistories?.toString())}
        </p>
        <p>
          <b>Previous Laser/Surgery: </b>{" "}
          {getValueDisplay(patientDetail.previousSurgeries?.toString())}
        </p>
      </div>
      <div className="mt-4">
        <div className="mt-6 flex justify-between items-end border border-b-gray-500 border-t-0 border-x-0">
          <p className="text-xl">Patient Records</p>
          <div>
            <span>Order by: </span>
            <select>
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <div
            className="underline text-blue-500 cursor-pointer"
            onClick={() => setIsPatientRecordModalOpen(true)}
          >
            <p>July 21, 2020</p>
          </div>
        </div>
        <div className="mt-4">
          <div
            className="underline text-blue-500 cursor-pointer"
            onClick={() => setIsPatientRecordModalOpen(true)}
          >
            <p>January 03, 2020</p>
          </div>
        </div>
        <div className="mt-4">
          <div
            className="underline text-blue-500 cursor-pointer"
            onClick={() => setIsPatientRecordModalOpen(true)}
          >
            <p>December 21, 2019</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
