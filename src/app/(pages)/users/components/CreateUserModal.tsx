"use client";

import Dropdown from "@/app/components/Dropdown";
import LabeledInput from "@/app/components/LabeledInput";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const CreateUserModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create New User</Button>
      <Modal show={isOpen} size="2xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Create User Information</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex gap-10">
              <LabeledInput label="First Name" />
              <LabeledInput label="Last Name" />
            </div>
            <div className="flex gap-10">
              <LabeledInput label="Email" />
              <Dropdown label="Role" options={["Admin", "Doctor"]} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={() => {}}>Create</Button>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateUserModal;
