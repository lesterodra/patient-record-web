"use client";

import { Button, Modal, Table } from "flowbite-react";
import MedicalInformationInput from "./MedicalInformationInput";
import {
  createPatientRecord,
  getPatientRecordList,
} from "@/utils/dataFetchers";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { clearRecordInput } from "@/redux/features/record-slice";
import { useForm } from "react-hook-form";

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

  const { register, handleSubmit, formState, getValues, reset, setValue } =
    useForm({
      defaultValues: {
        visitType: null,
        reasonForVisit: [],
        reasonForVisitNotes: null,
        previousMedicines: null,
        autoRefractionOD: null,
        autoRefractionOs: null,
        visualAcuityOdSc: null,
        visualAcuityOdPh: null,
        visualAcuityOdCc: null,
        visualAcuityOdNcc: null,
        visualAcuityOdj: null,
        visualAcuityOsSc: null,
        visualAcuityOsPh: null,
        visualAcuityOsCc: null,
        visualAcuityOsNcc: null,
        visualAcuityOsJ: null,
        refractionOd: null,
        refractionOdNegative: null,
        refractionOdX: null,
        refractionOs: null,
        refractionOsNegative: null,
        refractionOsX: null,
        refractionAdd: null,
        refractionPd: null,
        appointmentTime: null,
        intraOcularPressureOD: null,
        intraOcularPressureOS: null,
        medicalDoctor: null,
      },
    });

  const onCreateRecordClick = async () => {
    console.log({ values: getValues() });
    const {
      visitType,
      reasonForVisit,
      reasonForVisitNotes,
      previousMedicines,
      autoRefractionOD,
      autoRefractionOs,
      visualAcuityOdSc,
      visualAcuityOdPh,
      visualAcuityOdCc,
      visualAcuityOdNcc,
      visualAcuityOdj,
      visualAcuityOsSc,
      visualAcuityOsPh,
      visualAcuityOsCc,
      visualAcuityOsNcc,
      visualAcuityOsJ,
      refractionOd,
      refractionOdNegative,
      refractionOdX,
      refractionOs,
      refractionOsNegative,
      refractionOsX,
      refractionAdd,
      refractionPd,
      appointmentTime,
      intraOcularPressureOD,
      intraOcularPressureOS,
      medicalDoctor,
    } = getValues();

    await createPatientRecord(dispatch, {
      patientInformationId,
      reasonForVisit,
      reasonForVisitNotes,
      previousMedicines,
      autoRefractionOD,
      autoRefractionOs,
      appointmentTime,
      intraOcularPressureOD,
      intraOcularPressureOS,
      medicalDoctor,
      visualAcuities: [
        {
          eyeType: "OD",
          sc: visualAcuityOdSc,
          ph: visualAcuityOdPh,
          cc: visualAcuityOdCc,
          ncc: visualAcuityOdNcc,
          j: visualAcuityOdj,
        },
        {
          eyeType: "OS",
          sc: visualAcuityOsSc,
          ph: visualAcuityOsPh,
          cc: visualAcuityOsCc,
          ncc: visualAcuityOsNcc,
          j: visualAcuityOsJ,
        },
      ],
      refractionOd,
      refractionOdNegative,
      refractionOdX,
      refractionOs,
      refractionOsNegative,
      refractionOsX,
      refractionAdd,
      refractionPd,
      visitType: visitType && visitType[0],
    });
    reset();
    getPatientRecordList(dispatch, { patientInformationId, page: 1, limit: 3 });
    setIsOpen(false);
  };

  return (
    isOpen && (
      <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Create Patient Record</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <MedicalInformationInput
                formRegister={register}
                formSetValue={setValue}
                formState={formState}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            disabled={formState.isSubmitting}
            onClick={handleSubmit(onCreateRecordClick)}
          >
            Create Record
          </Button>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default CreatePatientRecordModal;
