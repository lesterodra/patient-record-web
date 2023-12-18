import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type CheckboxItemProps = {
  name: string;
  items: string[];
  isRow?: boolean;
  itemPerColumn?: number;
  formRegister: UseFormRegisterReturn;
};

const CheckboxItem = ({
  items,
  isRow = false,
  itemPerColumn,
  formRegister,
}: CheckboxItemProps) => {
  const numberOfColumns = itemPerColumn
    ? Math.ceil(items.length / (itemPerColumn ?? 1))
    : 1;

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
                type="checkbox"
                value={item}
                className="h-7 w-7 rounded-md"
                key={index}
                {...formRegister}
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
