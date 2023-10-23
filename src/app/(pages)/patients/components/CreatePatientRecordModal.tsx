"use client";

import { Button, Modal, Table } from "flowbite-react";
import MedicalInformationInput from "./MedicalInformationInput";

const CreatePatientRecordModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  return (
    <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
      <Modal.Header>Create Patient Record</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <MedicalInformationInput />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={() => {}}>Create Record</Button>
        <Button color="red" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePatientRecordModal;
