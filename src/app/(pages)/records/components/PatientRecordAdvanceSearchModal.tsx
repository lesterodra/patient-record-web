import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { AiFillSetting } from "react-icons/ai";
import LabeledInput from "@/app/components/LabeledInput";
import DatePicker from "@/app/components/DatePicker";

const PatientRecordAdvanceSearchModal = () => {
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
            <LabeledInput label="Record No." />
            <LabeledInput label="Patient No." />
            <LabeledInput label="Patient Last Name" />
            <LabeledInput label="Patient First Name" />
            <LabeledInput label="Patient Middle Name" />
            <DatePicker label="Patient Birth date" />
            <DatePicker label="Record date from" />
            <DatePicker label="Record date to" />
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

export default PatientRecordAdvanceSearchModal;
