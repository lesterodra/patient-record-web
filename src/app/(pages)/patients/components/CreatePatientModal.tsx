"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import PersonalInformationInput from "./PersonalInformationInput";
import { useAppSelector } from "@/redux/store";

const CreatePatientModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { patientInformationInput } = useAppSelector(
    (state) => state.patientReducer.value
  );
  const savePatient = async (url: string) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(patientInformationInput),
    });

    return response.json();
  };
  const { trigger } = useSWRMutation("/api/patients", savePatient);
  const onSavePatientClick = () => {
    trigger();
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
              <PersonalInformationInput />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={onSavePatientClick}>Save </Button>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePatientModal;
