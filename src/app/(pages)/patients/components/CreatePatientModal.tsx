"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import PersonalInformationInput from "./PersonalInformationInput";

const savePatient = async (url: string) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ test: 123 }),
  });

  return response.json();
};

const CreatePatientModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/patients",
    savePatient
  );

  console.log({ data });
  const onSavePatientClick = () => {
    trigger();
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
