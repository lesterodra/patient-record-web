import { Button, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import MedicalInformationInput from "../../patients/components/MedicalInformationInput";
import { RecordType } from "@/redux/features/record-slice";
import { updatePatientRecord } from "@/utils/dataFetchers";

type UpdatePatientRecordModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  patientRecord?: RecordType;
};

const UpdatePatientRecordModal = (props: UpdatePatientRecordModalProps) => {
  const { isOpen, setIsOpen, patientRecord } = props;
  const {
    visitType,
    reasonForVisit,
    reasonForVisitNotes,
    previousMedicines,
    autoRefractionOD,
    autoRefractionOs,
    visualAcuities,
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
  } = patientRecord ?? {};
  const visualAcuityOd = visualAcuities?.find(
    (visualAcuity) => visualAcuity.eyeType === "OD"
  );
  const visualAcuityOs = visualAcuities?.find(
    (visualAcuity) => visualAcuity.eyeType === "OS"
  );
  const { register, handleSubmit, formState, getValues, setValue } = useForm({
    values: {
      visitType: [visitType],
      reasonForVisit,
      reasonForVisitNotes,
      previousMedicines,
      autoRefractionOD,
      autoRefractionOs,
      visualAcuityOdSc: visualAcuityOd?.sc,
      visualAcuityOdPh: visualAcuityOd?.ph,
      visualAcuityOdCc: visualAcuityOd?.cc,
      visualAcuityOdNcc: visualAcuityOd?.ncc,
      visualAcuityOdj: visualAcuityOd?.j,
      visualAcuityOsSc: visualAcuityOs?.sc,
      visualAcuityOsPh: visualAcuityOs?.ph,
      visualAcuityOsCc: visualAcuityOs?.cc,
      visualAcuityOsNcc: visualAcuityOs?.ncc,
      visualAcuityOsJ: visualAcuityOs?.j,
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
    },
  });

  const onUpdateRecordClick = async () => {
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

    await updatePatientRecord(patientRecord?.id as number, {
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
          sc: visualAcuityOdSc as string,
          ph: visualAcuityOdPh as string,
          cc: visualAcuityOdCc as string,
          ncc: visualAcuityOdNcc as string,
          j: visualAcuityOdj as string,
        },
        {
          eyeType: "OS",
          sc: visualAcuityOsSc as string,
          ph: visualAcuityOsPh as string,
          cc: visualAcuityOsCc as string,
          ncc: visualAcuityOsNcc as string,
          j: visualAcuityOsJ as string,
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
  };

  return (
    <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
      <Modal.Header>Update Patient Record</Modal.Header>
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
          onClick={handleSubmit(onUpdateRecordClick)}
        >
          Update Record
        </Button>
        <Button color="red" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePatientRecordModal;
