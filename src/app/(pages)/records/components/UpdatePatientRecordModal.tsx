import { Button, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import MedicalInformationInput from "../../patients/components/MedicalInformationInput";
import { RecordType } from "@/redux/features/record-slice";
import {
  getPatientRecordList,
  updatePatientRecord,
} from "@/utils/dataFetchers";
import ButtonWithSpinner from "@/app/components/ButtonWithSpinner";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";

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
    medicalDoctorUserId,
    dilateType,
    surgeries,
    surgeryNotes,
    autoRefractionByUserId,
    visualAcuityByUserId,
    refractionByUserId,
    intraOcularPressureByUserId,
    paymentNotes,
    paymentType,
  } = patientRecord ?? {};
  const visualAcuityOd = visualAcuities?.find(
    (visualAcuity) => visualAcuity.eyeType === "OD"
  );
  const visualAcuityOs = visualAcuities?.find(
    (visualAcuity) => visualAcuity.eyeType === "OS"
  );
  const dispatch = useDispatch<AppDispatch>();
  const { patientRecordListQueryParameters } = useAppSelector(
    (state) => state.recordReducer.value
  );

  const { register, handleSubmit, formState, getValues, setValue } = useForm({
    values: {
      visitType: [visitType],
      dilateType: [dilateType],
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
      medicalDoctorUserId,
      surgeries,
      surgeryNotes,
      autoRefractionByUserId,
      visualAcuityByUserId,
      refractionByUserId,
      intraOcularPressureByUserId,
      paymentType: [paymentType],
      paymentNotes,
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

    await updatePatientRecord(dispatch, patientRecord?.id as number, {
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

    getPatientRecordList(dispatch, {
      ...patientRecordListQueryParameters,
      page: 1,
      limit: 5,
    });

    setIsOpen(false);
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
        <ButtonWithSpinner
          isLoading={formState.isSubmitting}
          onClick={handleSubmit(onUpdateRecordClick)}
        >
          Update Record
        </ButtonWithSpinner>
        <Button color="red" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePatientRecordModal;
