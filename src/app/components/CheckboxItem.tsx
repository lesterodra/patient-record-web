type CheckboxItemProps = {
  name: string;
  items: string[];
  isRow?: boolean;
  disabled?: boolean;
};

const CheckboxItem = ({
  name,
  items,
  isRow = false,
  disabled = false,
}: CheckboxItemProps) => {
  return (
    <div className={`flex ${!isRow && "flex-col"} gap-3`}>
      {items.map((item, index) => (
        <div className="flex items-center gap-1" key={index}>
          <input
            disabled={disabled}
            type="checkbox"
            name={name}
            value={item}
            className="h-7 w-7 rounded-md"
            key={index}
          />
          <span className="mr-1">{item}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxItem;
