import { UseFormRegister } from "react-hook-form";
import FormCheckbox from "./FormCheckbox";

type FormCheckboxWithInputProps = {
  formRegister: UseFormRegister<any>;
  isRow?: boolean;
  itemPerColumn?: number;
  items: any[];
};

const FormCheckboxWithInput = (props: FormCheckboxWithInputProps) => {
  const { formRegister, isRow = false, itemPerColumn, items } = props;

  const numberOfColumns = itemPerColumn
    ? Math.ceil(items.length / (itemPerColumn ?? 1))
    : 1;

  return (
    <div className="flex gap-10">
      {Array(numberOfColumns)
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
                <FormCheckbox
                  code={item.code}
                  label={item.name}
                  key={`group${index}`}
                  formRegister={formRegister}
                />
              ))}
            </div>
          );
        })}
    </div>
  );
};

export default FormCheckboxWithInput;
