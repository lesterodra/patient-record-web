import { ChangeEventHandler } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type DropdownProps = {
  label: string;
  width?: string;
  options: (string | null)[];
  formRegister?: UseFormRegisterReturn;
  errorMessage?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const FormDropdown = ({
  label,
  width,
  options,
  formRegister,
  errorMessage,
  onChange,
}: DropdownProps) => {
  return (
    <div>
      <p>{label}</p>
      <select
        name={label}
        className={`${
          errorMessage ? "border border-red-700" : ""
        }  rounded-md ${width}`}
        {...formRegister}
        {...(onChange ? { onChange } : undefined)}
      >
        <option></option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default FormDropdown;
