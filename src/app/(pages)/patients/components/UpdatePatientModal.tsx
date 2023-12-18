"use client";

import { Button, Modal, Table } from "flowbite-react";
import PersonalInformationInput from "./PersonalInformationInput";
import { useForm } from "react-hook-form";

const UpdatePatientModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const { register, handleSubmit, formState, getValues, reset, setValue } =
    useForm();
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
        <Button onClick={() => {}}>Create Record</Button>
        <Button color="red" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePatientModal;
