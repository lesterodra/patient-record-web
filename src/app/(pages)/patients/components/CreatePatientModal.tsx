"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import PersonalInformationInput from "./PersonalInformationInput";
import { AppDispatch } from "@/redux/store";
import { getPatientList } from "@/utils/dataFetchers";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const CreatePatientModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState, getValues, reset, setValue } =
    useForm({
      defaultValues: {
        firstName: null,
        lastName: null,
        middleName: null,
        philHealthNo: null,
        height: null,
        weight: null,
        birthDate: null,
        address: null,
        province: null,
        municipality: null,
        barangay: null,
        gender: null,
        nationality: null,
        civilStatus: null,
        contactNo: null,
        knownAllergiesNotes: null,
        personalMedicalHistoriesNotes: null,
        previousSurgeriesNotes: null,
        appointmentType: [],
        dilateType: [],
        sourceOfReferral: [],
        knownAllergies: [],
        previousSurgeries: [],
        personalMedicalHistories: [],
      },
    });
  const savePatient = async (url: string) => {
    const patientDetails = getValues();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...patientDetails,
        dilateType: patientDetails?.dilateType && patientDetails?.dilateType[0],
        sourceOfReferral:
          patientDetails?.sourceOfReferral &&
          patientDetails?.sourceOfReferral[0],
        appointmentType:
          patientDetails?.appointmentType && patientDetails?.appointmentType[0],
      }),
    });

    return response.json();
  };

  const { trigger } = useSWRMutation("/api/patients", savePatient);
  const onSavePatientClick = async () => {
    await trigger();
    reset();
    getPatientList(dispatch, {});
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New Patient</Button>
      <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Create Patient Information</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <PersonalInformationInput
                formRegister={register}
                formState={formState}
                formSetValue={setValue}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            disabled={formState.isSubmitting}
            onClick={handleSubmit(onSavePatientClick)}
          >
            Save
          </Button>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePatientModal;
