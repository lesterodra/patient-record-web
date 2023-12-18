import { FocusEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormNotesProps = {
  formRegister?: UseFormRegisterReturn;
};

const FormNotes = (props: FormNotesProps) => {
  const { formRegister } = props;
  return (
    <div className="mt-4">
      <p className="text-xs italic">Notes</p>
      <textarea className="rounded w-full h-28" {...formRegister} />
    </div>
  );
};

export default FormNotes;
