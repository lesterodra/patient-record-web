import { ChangeEventHandler } from "react";

type DatePickerProps = {
  label: string;
  inputClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const DatePicker = ({ label, inputClassName, onChange }: DatePickerProps) => {
  return (
    <div>
      <p>{label}</p>
      <input
        type="date"
        onChange={onChange}
        className={`rounded-md ${inputClassName}`}
      />
    </div>
  );
};

export default DatePicker;
