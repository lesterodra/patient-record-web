"use client";

import { Button, Modal } from "flowbite-react";
import PersonalInformationInput from "./PersonalInformationInput";
import { useForm } from "react-hook-form";
import { PatientType } from "@/redux/features/patient-slice";
import { updatePatientDetails } from "@/utils/dataFetchers";
import ButtonWithSpinner from "@/app/components/ButtonWithSpinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

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
    id,
    firstName,
    lastName,
    middleName,
    province,
    municipality,
    barangay,
    appointmentType,
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
    sourceOfReferralNotes,
  } = patientDetails ?? {};
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState, getValues, setValue } = useForm({
    values: {
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
      knownAllergies,
      knownAllergiesNotes,
      personalMedicalHistories,
      personalMedicalHistoriesNotes,
      previousSurgeries,
      previousSurgeriesNotes,
      appointmentType: [appointmentType],
      sourceOfReferral: [sourceOfReferral],
      sourceOfReferralNotes,
    },
  });

  const onUpdateRecordClick = async () => {
    const updatedPatientDetails = getValues();

    await updatePatientDetails(dispatch, Number(id), {
      ...updatedPatientDetails,
      sourceOfReferral:
        updatedPatientDetails?.sourceOfReferral &&
        updatedPatientDetails?.sourceOfReferral[0],
      appointmentType:
        updatedPatientDetails?.appointmentType &&
        updatedPatientDetails?.appointmentType[0],
    });

    setIsOpen(false);
  };

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
              addressDetails={{ province, municipality, barangay }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <ButtonWithSpinner
          isLoading={formState.isSubmitting}
          onClick={handleSubmit(onUpdateRecordClick)}
        >
          Update Patient
        </ButtonWithSpinner>
        <Button color="red" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePatientModal;
