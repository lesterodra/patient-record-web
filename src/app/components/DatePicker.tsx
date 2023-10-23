type DatePickerProps = {
    label: string;
    inputClassName?: string
}

const DatePicker = ({ label, inputClassName } : DatePickerProps) => {
  return (
    <div>
      <p>{label}</p>
      <input type="date" className={`rounded-md ${inputClassName}`} />
    </div>
  );
};

export default DatePicker;
