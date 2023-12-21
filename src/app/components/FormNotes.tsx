import { FocusEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormNotesProps = {
  formRegister?: UseFormRegisterReturn;
  withLabel?: boolean;
};

const FormNotes = (props: FormNotesProps) => {
  const { formRegister, withLabel = true } = props;
  return (
    <div className="mt-4">
      {withLabel && <p className="text-xs italic">Notes</p>}
      <textarea className="rounded w-full h-28" {...formRegister} />
    </div>
  );
};

export default FormNotes;
