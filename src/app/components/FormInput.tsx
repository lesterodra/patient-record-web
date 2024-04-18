import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  label: string;
  inputClassName?: string;
  formRegister?: UseFormRegisterReturn;
  errorMessage?: string;
  placeholder?: string;
};

const FormInput = ({
  label,
  inputClassName,
  formRegister,
  errorMessage,
  placeholder,
}: FormInputProps) => {
  return (
    <div>
      <p>{label}</p>
      <input
        type="text"
        className={`${
          errorMessage ? "border border-red-700" : ""
        }  rounded-md ${inputClassName}`}
        placeholder={placeholder}
        {...formRegister}
      />
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default FormInput;
