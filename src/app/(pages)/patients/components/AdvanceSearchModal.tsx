import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { AiFillSetting } from "react-icons/ai";
import LabeledInput from "@/app/components/LabeledInput";
import DatePicker from "@/app/components/DatePicker";

const AdvanceSearchModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        color="white"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <AiFillSetting size="20" />
      </Button>
      <Modal show={isOpen} size="md" onClose={() => setIsOpen(false)}>
        <Modal.Header>Advance Search</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <LabeledInput label="Patient No." />
            <LabeledInput label="Last Name" />
            <LabeledInput label="First Name" />
            <LabeledInput label="Middle Name" />
            <DatePicker label="Birth date" />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={() => {}}>Search</Button>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdvanceSearchModal;
