import { ChangeEvent, useState, useEffect } from "react";

type CheckboxItemProps = {
  name: string;
  items: string[];
  isRow?: boolean;
  disabled?: boolean;
  isSingleSelection?: boolean;
  itemPerColumn?: number;
  onSelectedItemsChanged?: (selectedItems: string[]) => void;
};

const CheckboxItem = ({
  name,
  items,
  onSelectedItemsChanged,
  isRow = false,
  disabled = false,
  isSingleSelection = false,
  itemPerColumn,
}: CheckboxItemProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const numberOfColumns = itemPerColumn
    ? Math.ceil(items.length / (itemPerColumn ?? 1))
    : 1;

  useEffect(() => {
    onSelectedItemsChanged && onSelectedItemsChanged(selectedItems);
  }, [selectedItems]);

  return Array(numberOfColumns)
    .fill(null)
    .map((_, colIndex) => {
      const columnItems =
        !isRow && itemPerColumn
          ? items.slice(
              colIndex * itemPerColumn,
              itemPerColumn * (colIndex + 1)
            )
          : items;

      return (
        <div
          key={`main-${colIndex}`}
          className={`flex ${!isRow && "flex-col"} gap-3`}
        >
          {columnItems.map((item, index) => (
            <div
              className="flex items-center gap-1"
              key={`checkboxWrapper-${index}`}
            >
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
              <span key={`label-${index}`} className="mr-1">
                {item}
              </span>
            </div>
          ))}
        </div>
      );
    });
};

export default CheckboxItem;
