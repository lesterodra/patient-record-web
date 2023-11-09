"use client";

import { Button, Modal, Table } from "flowbite-react";
import MedicalInformationInput from "./MedicalInformationInput";
import { createPatientRecord } from "@/utils/dataFetchers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const CreatePatientRecordModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const onCreateRecordClick = async () => {
    await createPatientRecord(dispatch, {
      patientInformationId: 1,
      reasonForVisit: "",
      previousMedicines: "",
      autoRefractionOD: "",
      autoRefractionOs: "",
      appointmentTime: "",
      intraOcularPressureOD: "",
      intraOcularPressureOS: "",
      medicalDoctor: "",
      visualAcuities: [],
    });
  };

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
        <Button onClick={onCreateRecordClick}>Create Record</Button>
        <Button color="red" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePatientRecordModal;
