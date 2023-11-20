"use client";

import { Button, Modal, Table } from "flowbite-react";
import MedicalInformationInput from "./MedicalInformationInput";
import {
  createPatientRecord,
  getPatientList,
  getPatientRecordList,
} from "@/utils/dataFetchers";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";

type CreatePatientRecordModalProps = {
  isOpen: boolean;
  patientInformationId: number;
  setIsOpen: (value: boolean) => void;
};

const CreatePatientRecordModal = (props: CreatePatientRecordModalProps) => {
  const { isOpen, setIsOpen, patientInformationId } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { patientRecordInput } = useAppSelector(
    (state) => state.recordReducer.value
  );

  const onCreateRecordClick = async () => {
    await createPatientRecord(dispatch, {
      ...patientRecordInput,
      patientInformationId,
    });
    getPatientRecordList(dispatch, {});
    setIsOpen(false);
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
