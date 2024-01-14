import FormCheckboxItem from "@/app/components/FormCheckboxItem";
import FormCheckboxWithInput from "@/app/components/FormCheckboxWithInput";
import { MEDICAL_HISTORY, MEDICAL_HISTORY_OBJECT } from "@/utils/constants";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

type PersonalMedicalHistoryInputProp = {
  formRegister: UseFormRegister<any>;
};

const PersonalMedicalHistoryInput = (
  props: PersonalMedicalHistoryInputProp
) => {
  const { formRegister } = props;

  return (
    <FormCheckboxWithInput
      itemPerColumn={3}
      items={MEDICAL_HISTORY_OBJECT}
      formRegister={formRegister}
    />
  );
};

export default PersonalMedicalHistoryInput;
