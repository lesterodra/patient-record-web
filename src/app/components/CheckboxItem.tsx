import { ChangeEvent, useState, useEffect } from "react";

type CheckboxItemProps = {
  name: string;
  items: string[];
  isRow?: boolean;
  disabled?: boolean;
  isSingleSelection?: boolean;
  onSelectedItemsChanged?: (selectedItems: string[]) => void;
};

const CheckboxItem = ({
  name,
  items,
  onSelectedItemsChanged,
  isRow = false,
  disabled = false,
  isSingleSelection = false,
}: CheckboxItemProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    onSelectedItemsChanged && onSelectedItemsChanged(selectedItems);
  }, [selectedItems]);

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
            checked={selectedItems.includes(item)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.checked
                ? setSelectedItems((prev) =>
                    isSingleSelection
                      ? [e.target.value]
                      : [...prev, e.target.value]
                  )
                : setSelectedItems((prev: string[]) =>
                    prev.filter((value: string) => value !== e.target.value)
                  );
            }}
          />
          <span className="mr-1">{item}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxItem;
