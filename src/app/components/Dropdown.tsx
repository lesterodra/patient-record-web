import { ChangeEventHandler } from "react";

type DropdownProps = {
  label: string;
  width?: string;
  options: (string | null)[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  selected?: string;
};

const Dropdown = ({
  label,
  width,
  options,
  onChange,
  selected,
}: DropdownProps) => {
  return (
    <div>
      <p>{label}</p>
      <select
        name={label}
        className={`rounded-md ${width}`}
        onChange={onChange}
      >
        <option></option>
        {options.map((option, index) => (
          <option key={index} selected={selected === option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
