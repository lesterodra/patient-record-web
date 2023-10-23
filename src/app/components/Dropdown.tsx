type DropdownProps = {
  label: string;
  options: string[];
};

const Dropdown = ({ label, options }: DropdownProps) => {
  return (
    <div>
      <p>{label}</p>
      <select name={label} className="rounded-md">
        <option></option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
