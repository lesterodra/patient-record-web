"use client";

import { Button, Modal, Table } from "flowbite-react";
import PersonalInformationInput from "./PersonalInformationInput";
import { useForm } from "react-hook-form";
import { PatientType } from "@/redux/features/patient-slice";

const UpdatePatientModal = ({
  isOpen,
  setIsOpen,
  patientDetails,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  patientDetails?: PatientType;
}) => {
  const {
    firstName,
    lastName,
    middleName,
    province,
    municipality,
    barangay,
    appointmentType,
    dilateType,
    philHealthNo,
    address,
    gender,
    birthDate,
    nationality,
    civilStatus,
    contactNo,
    height,
    weight,
    sourceOfReferral,
    knownAllergies,
    knownAllergiesNotes,
    personalMedicalHistories,
    personalMedicalHistoriesNotes,
    previousSurgeries,
    previousSurgeriesNotes,
  } = patientDetails ?? {};
  const { register, handleSubmit, formState, getValues, reset, setValue } =
    useForm({
      values: {
        appointmentType,
        dilateType,
        philHealthNo,
        firstName,
        lastName,
        middleName,
        address,
        province,
        municipality,
        barangay,
        gender,
        birthDate,
        nationality,
        civilStatus,
        contactNo,
        height,
        weight,
        sourceOfReferral,
        knownAllergies,
        knownAllergiesNotes,
        personalMedicalHistories,
        personalMedicalHistoriesNotes,
        previousSurgeries,
        previousSurgeriesNotes,
      },
    });
  return (
    <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
      <Modal.Header>Update Patient Information</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <PersonalInformationInput
              formRegister={register}
              formSetValue={setValue}
              formState={formState}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={() => {}}>Update Record</Button>
        <Button color="red" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePatientModal;
