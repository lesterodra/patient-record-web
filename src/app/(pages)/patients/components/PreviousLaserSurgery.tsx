import FormCheckboxWithInput from "@/app/components/FormCheckboxWithInput";
import { PREVIOUS_SURGERIES_OBJECT } from "@/utils/constants";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

type PreviousLaserSurgeryInputProp = {
  formRegister: UseFormRegister<any>;
};

const PreviousLaserSurgeryInput = (props: PreviousLaserSurgeryInputProp) => {
  const { formRegister } = props;

  return (
    <FormCheckboxWithInput
      itemPerColumn={4}
      items={PREVIOUS_SURGERIES_OBJECT}
      formRegister={formRegister}
    />
  );
};

export default PreviousLaserSurgeryInput;
