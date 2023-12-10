import { ChangeEventHandler } from "react";

type DatePickerProps = {
  label: string;
  value?: string;
  inputClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const DatePicker = ({
  label,
  inputClassName,
  onChange,
  value,
}: DatePickerProps) => {
  return (
    <div>
      <p>{label}</p>
      <input
        type="date"
        value={value}
        onChange={onChange}
        className={`rounded-md ${inputClassName}`}
      />
    </div>
  );
};

export default DatePicker;
