import { ERROR_MESSAGE } from "@/utils/constants";
import { UseFormRegister } from "react-hook-form";

type FormGenderSelectProps = {
  formRegister: UseFormRegister<any>;
  errorMessage?: string;
};

const FormGenderSelect = ({
  formRegister,
  errorMessage,
}: FormGenderSelectProps) => {
  return (
    <div>
      <p>Gender</p>
      <div className="flex gap-1 items-center">
        <input
          {...formRegister("gender", { required: ERROR_MESSAGE.REQUIRED })}
          type="radio"
          value="Male"
        />
        <span className="mr-1">Male</span>
        <input
          {...formRegister("gender", { required: ERROR_MESSAGE.REQUIRED })}
          type="radio"
          value="Female"
        />
        <span className="mr-1">Female</span>
      </div>
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default FormGenderSelect;
