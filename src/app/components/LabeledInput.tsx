import { ChangeEventHandler } from "react";

type LabeledInputProps = {
  label: string;
  inputClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const LabeledInput = ({
  label,
  inputClassName,
  onChange,
}: LabeledInputProps) => {
  return (
    <div>
      <p>{label}</p>
      <input
        type="text"
        onChange={onChange}
        className={`rounded-md ${inputClassName}`}
      />
    </div>
  );
};

export default LabeledInput;
