"use client";

import CreatePatientRecordModal from "../../components/CreatePatientRecordModal";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { PatientInformation, Prisma } from "@prisma/client";
import { convertToReadableDate, getValueDisplay } from "@/utils/displayParser";
import PatientRecordHistory from "./PatientRecordHistory";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getDoctorList, getUserList } from "@/utils/dataFetchers";
import {
  MEDICAL_HISTORY_OBJECT,
  PREVIOUS_SURGERIES_OBJECT,
} from "@/utils/constants";

const displayPersonalMedicalHistories = (
  personalMedicalHistories: Prisma.JsonArray
) => {
  if (personalMedicalHistories.length === 0) {
    return <p className="italic text-xs">none</p>;
  }

  return (
    <div>
      {personalMedicalHistories.map((personalMedicalHistory, index) => {
        const parsedPersonalMedicalHistory = personalMedicalHistory as {
          id: number;
          notes: string;
        };
        const medicalHistoryObj = MEDICAL_HISTORY_OBJECT.find(
          (data) => data.id === parsedPersonalMedicalHistory?.id
        );

        return (
          <div key={`medHistory-${index}`}>
            <p>
              {medicalHistoryObj?.name}:{" "}
              {parsedPersonalMedicalHistory?.notes || "-"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const displayPreviousSurgeries = (previousSurgeries: Prisma.JsonArray) => {
  if (previousSurgeries.length === 0) {
    return <p className="italic text-xs">none</p>;
  }

  return (
    <div>
      {previousSurgeries.map((previousSurgery, index) => {
        const parsedPreviousSurgery = previousSurgery as {
          id: number;
          notes: string;
        };
        const previousSurgeryObj = PREVIOUS_SURGERIES_OBJECT.find(
          (data) => data.id === parsedPreviousSurgery?.id
        );

        return (
          <div key={`prevSurgery-${index}`}>
            <p>
              {previousSurgeryObj?.name}: {parsedPreviousSurgery?.notes || "-"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const PatientDetail = ({
  patientDetail,
}: {
  patientDetail: PatientInformation;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isCreatePatientRecordModalOpen, setIsCreatePatientRecordModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    getDoctorList(dispatch);
    getUserList(dispatch, { limit: 20000 });
  }, []);

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
          <b>Appointment Type:</b>{" "}
          {getValueDisplay(patientDetail.appointmentType)}
        </p>
        {/* <p className="text-sm">
          <b>Dilate Type:</b> {getValueDisplay(patientDetail.dilateType)}
        </p> */}
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
          <b>Referral From: </b> {patientDetail.sourceOfReferral}
        </p>
        {patientDetail?.sourceOfReferralNotes && (
          <div>
            <p className="text-xs italic">Notes</p>
            <textarea
              value={patientDetail.sourceOfReferralNotes}
              disabled
              className="rounded w-full h-28"
            />
          </div>
        )}
        <p>
          <b>Known Allergy: </b>{" "}
          {getValueDisplay(patientDetail?.knownAllergies?.toString())}
        </p>
        {patientDetail?.knownAllergiesNotes && (
          <div>
            <p className="text-xs italic">Notes</p>
            <textarea
              value={patientDetail.knownAllergiesNotes}
              disabled
              className="rounded w-full h-28"
            />
          </div>
        )}
        <p>
          <b>Personal Medical History: </b>{" "}
        </p>
        {displayPersonalMedicalHistories(
          patientDetail.personalMedicalHistories as Prisma.JsonArray
        )}
        {patientDetail?.personalMedicalHistoriesNotes && (
          <div>
            <p className="text-xs italic">Notes</p>
            <textarea
              value={patientDetail.personalMedicalHistoriesNotes}
              disabled
              className="rounded w-full h-28"
            />
          </div>
        )}
        <p>
          <b>Previous Laser/Surgery: </b>{" "}
        </p>
        {displayPreviousSurgeries(
          patientDetail.previousSurgeries as Prisma.JsonArray
        )}
        {patientDetail?.previousSurgeriesNotes && (
          <div>
            <p className="text-xs italic">Notes</p>
            <textarea
              value={patientDetail.previousSurgeriesNotes}
              disabled
              className="rounded w-full h-28"
            />
          </div>
        )}
        <PatientRecordHistory patientInformationId={patientDetail.id} />
      </div>
    </div>
  );
};

export default PatientDetail;
