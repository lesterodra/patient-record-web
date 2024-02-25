"use client";

import { Button, Modal } from "flowbite-react";
import MedicalInformationInput from "./MedicalInformationInput";
import {
  createPatientRecord,
  getPatientRecordList,
} from "@/utils/dataFetchers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useForm } from "react-hook-form";
import ButtonWithSpinner from "@/app/components/ButtonWithSpinner";

type CreatePatientRecordModalProps = {
  isOpen: boolean;
  patientInformationId: number;
  setIsOpen: (value: boolean) => void;
};

const CreatePatientRecordModal = (props: CreatePatientRecordModalProps) => {
  const { isOpen, setIsOpen, patientInformationId } = props;
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState, getValues, reset, setValue } =
    useForm({
      defaultValues: {
        visitType: null,
        reasonForVisit: [],
        dilateType: [],
        surgeries: [],
        surgeryNotes: null,
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
        medicalDoctorUserId: null,
        autoRefractionByUserId: null,
        visualAcuityByUserId: null,
        refractionByUserId: null,
        intraOcularPressureByUserId: null,
        paymentType: null,
        paymentNotes: null,
      },
    });

  const onCreateRecordClick = async () => {
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
      medicalDoctorUserId,
      dilateType,
      surgeries,
      surgeryNotes,
      autoRefractionByUserId,
      visualAcuityByUserId,
      refractionByUserId,
      intraOcularPressureByUserId,
      paymentType,
      paymentNotes,
    } = getValues();

    await createPatientRecord(dispatch, {
      patientInformationId,
      reasonForVisit,
      surgeries,
      surgeryNotes,
      reasonForVisitNotes,
      previousMedicines,
      autoRefractionOD,
      autoRefractionOs,
      appointmentTime,
      intraOcularPressureOD,
      intraOcularPressureOS,
      medicalDoctor,
      medicalDoctorUserId: Number(medicalDoctorUserId),
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
      dilateType: dilateType && dilateType[0],
      autoRefractionByUserId: autoRefractionByUserId
        ? Number(autoRefractionByUserId)
        : null,
      visualAcuityByUserId: visualAcuityByUserId
        ? Number(visualAcuityByUserId)
        : null,
      refractionByUserId: refractionByUserId
        ? Number(refractionByUserId)
        : null,
      intraOcularPressureByUserId: intraOcularPressureByUserId
        ? Number(intraOcularPressureByUserId)
        : null,
      paymentType: paymentType && paymentType[0],
      paymentNotes,
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
          <ButtonWithSpinner
            isLoading={formState.isSubmitting}
            onClick={handleSubmit(onCreateRecordClick)}
          >
            Create Record
          </ButtonWithSpinner>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default CreatePatientRecordModal;
