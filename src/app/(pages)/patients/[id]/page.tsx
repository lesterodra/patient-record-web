"use client";

import { useState } from "react";
import PageHeading from "@/app/components/PageHeading";
import PatientRecordModal from "../../../components/PatientRecordModal";
import { Button } from "flowbite-react";
import CreatePatientRecordModal from "../components/CreatePatientRecordModal";

const PatientDetailPage = ({ params }: { params: { id: string } }) => {
  const [isPatientRecordModalOpen, setIsPatientRecordModalOpen] =
    useState<boolean>(false);
  const [isCreatePatientRecordModalOpen, setIsCreatePatientRecordModalOpen] =
    useState<boolean>(false);

  return (
    <PageHeading pageTitle="Patient Details">
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
          <p className="text-3xl font-bold">Lorem Ipsum Lorem-rem</p>
          <Button onClick={() => setIsCreatePatientRecordModalOpen(true)}>
            Schedule Checkup
          </Button>
        </div>
        <p className="text-md">
          <b>PHIC: </b>00-00000000-0
        </p>
      </div>
      <div className="mt-6  border border-b-gray-500 border-t-0 border-x-0">
        <p className="text-xl">Personal Information</p>
      </div>
      <div className="mt-4">
        <p className="text-md">
          <b>Patient no: </b>EC-2310-000001
        </p>
        <p className="text-sm">
          <b>Address:</b> Brgy Soledad Sta Rosa Nueva Ecija
        </p>
        <p className="text-sm">
          <b>Birth date:</b> July 23, 2020
        </p>
        <p className="text-sm">
          <b>Age:</b> 20 years old
        </p>
        <p className="text-sm">
          <b>Gender:</b> Male
        </p>
        <p className="text-sm">
          <b>Nationality:</b> Filipino
        </p>
        <p className="text-sm">
          <b>Status:</b> Single
        </p>
        <p className="text-sm">
          <b>Mobile Number:</b> 0999999999
        </p>
        <p className="text-sm">
          <b>Height:</b> 5'5in
        </p>
        <p className="text-sm">
          <b>Weight:</b> 60kg
        </p>
        <p>
          <b>Known Allergy: </b>Dust, Seafood, Beer
        </p>
        <p>
          <b>Referral From: </b>Friends
        </p>
        <p>
          <b>Personal Medical History: </b>Diabetes, Hypertension
        </p>
        <p>
          <b>Previous Laser/Surgery: </b>Cataract
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
    </PageHeading>
  );
};

export default PatientDetailPage;
