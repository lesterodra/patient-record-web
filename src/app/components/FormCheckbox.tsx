import { useState } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

type FormCheckboxProps = {
  label: string;
  code: string;
  formRegister: UseFormRegister<any>;
};

const FormCheckbox = (props: FormCheckboxProps) => {
  const { formRegister, label, code } = props;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="h-7 w-7 rounded-md"
          {...formRegister(`${code}Checkbox`, {})}
        />
        <span className="mr-1">{label}</span>
      </div>
      <input
        type="text"
        className="w-36 rounded disabled:bg-slate-200 disabled:cursor-not-allowed"
        {...formRegister(`${code}Input`)}
      />
    </div>
  );
};

export default FormCheckbox;
