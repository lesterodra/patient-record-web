import { ChangeEventHandler } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type DatePickerProps = {
  label: string;
  value?: string;
  inputClassName?: string;
  formRegister?: UseFormRegisterReturn;
  errorMessage?: string;
};

const FormDatePicker = ({
  label,
  inputClassName,
  value,
  formRegister,
  errorMessage,
}: DatePickerProps) => {
  return (
    <div>
      <p>{label}</p>
      <input
        type="date"
        value={value}
        className={`${
          errorMessage ? "border border-red-700" : ""
        } rounded-md ${inputClassName}`}
        {...formRegister}
      />
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default FormDatePicker;
