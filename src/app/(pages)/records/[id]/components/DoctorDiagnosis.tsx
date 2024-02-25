import ButtonWithSpinner from "@/app/components/ButtonWithSpinner";
import { AppDispatch } from "@/redux/store";
import { saveDoctorDiagnosisNotes } from "@/utils/dataFetchers";
import { useState } from "react";
import { useDispatch } from "react-redux";

type DoctorDiagnosisNotesProps = {
  diagnosisNotes: string | null;
  patientRecordId: number;
};

const DoctorDiagnosisNotes = (props: DoctorDiagnosisNotesProps) => {
  const { diagnosisNotes, patientRecordId } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(diagnosisNotes);
  const dispatch = useDispatch<AppDispatch>();

  const saveDiagnosisNotes = async () => {
    setIsLoading(true);
    await saveDoctorDiagnosisNotes(dispatch, patientRecordId, value);
    setIsLoading(false);
  };

  return (
    <div>
      <span className="mb-3 mt-8 font-bold text-xl">Doctor Diagnosis: </span>
      <textarea
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        className="rounded w-full h-28"
      />
      <ButtonWithSpinner isLoading={isLoading} onClick={saveDiagnosisNotes}>
        Save
      </ButtonWithSpinner>
    </div>
  );
};

export default DoctorDiagnosisNotes;
