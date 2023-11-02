"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import PersonalInformationInput from "./PersonalInformationInput";

const CreatePatientModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <Button onClick={() => {}}>Create Record</Button>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePatientModal;
