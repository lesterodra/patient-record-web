import { ChangeEventHandler } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type DropdownProps = {
  label: string;
  width?: string;
  options: { label: string; value: any }[];
  formRegister?: UseFormRegisterReturn;
  errorMessage?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  selected?: string | number;
};

const FormDropdownWithId = ({
  label,
  width,
  options,
  formRegister,
  errorMessage,
  onChange,
  selected,
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
          <option
            key={index}
            value={option.value}
            selected={selected === option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default FormDropdownWithId;
