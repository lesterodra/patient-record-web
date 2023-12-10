import { ChangeEventHandler } from "react";

type LabeledInputProps = {
  label: string;
  inputClassName?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const LabeledInput = ({
  label,
  value,
  inputClassName,
  onChange,
}: LabeledInputProps) => {
  return (
    <div>
      <p>{label}</p>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`rounded-md ${inputClassName}`}
      />
    </div>
  );
};

export default LabeledInput;
