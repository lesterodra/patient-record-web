import { ChangeEventHandler } from "react";

type DropdownProps = {
  label: string;
  options: string[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const Dropdown = ({ label, options, onChange }: DropdownProps) => {
  return (
    <div>
      <p>{label}</p>
      <select name={label} className="rounded-md" onChange={onChange}>
        <option></option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
