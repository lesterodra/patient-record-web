type LabeledInputProps = {
    label: string;
    inputClassName?: string
}

const LabeledInput = ({ label, inputClassName }: LabeledInputProps) => {
  return (
    <div>
      <p>{label}</p>
      <input type="text" className={`rounded-md ${inputClassName}`} />
    </div>
  );
};

export default LabeledInput;
