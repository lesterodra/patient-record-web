"use client";

import FormDropdownWithId from "@/app/components/FormDropdownWithId";
import FormDropdown from "@/app/components/FormDropdown";
import FormInput from "@/app/components/FormInput";
import { ERROR_MESSAGE } from "@/utils/constants";
import { FormState, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { DepartmentType } from "@/redux/features/user-slice";

type UserInputFormProps = {
  formRegister: UseFormRegister<any>;
  formState: FormState<any>;
  formSetValue: UseFormSetValue<any>;
  departmentList: DepartmentType[];
};

const UserInputForm = (props: UserInputFormProps) => {
  const { formRegister, formState, departmentList } = props;
  const { errors } = formState;

  return (
    <div className="space-y-6">
      <div className="flex gap-10 flex-wrap">
        <FormInput
          label="First Name"
          formRegister={formRegister("firstName", {
            required: ERROR_MESSAGE.REQUIRED,
          })}
          errorMessage={errors?.firstName?.message?.toString()}
        />
        <FormInput
          label="Last Name"
          formRegister={formRegister("lastName", {
            required: ERROR_MESSAGE.REQUIRED,
          })}
          errorMessage={errors?.lastName?.message?.toString()}
        />
        <FormInput
          label="Middle Name"
          formRegister={formRegister("middleName", {
            required: ERROR_MESSAGE.REQUIRED,
          })}
          errorMessage={errors?.middleName?.message?.toString()}
        />
      </div>
      <div className="flex gap-10 flex-wrap">
        <FormInput
          label="Email"
          formRegister={formRegister("email", {
            required: ERROR_MESSAGE.REQUIRED,
          })}
          errorMessage={errors?.email?.message?.toString()}
        />
        <FormDropdownWithId
          label="Department"
          options={departmentList?.map((department) => ({
            label: department.name,
            value: department.id.toString(),
          }))}
          formRegister={formRegister("departmentId", {
            required: ERROR_MESSAGE.REQUIRED,
          })}
          errorMessage={errors?.departmentId?.message?.toString()}
        />
        <FormDropdown
          label="Status"
          options={["Active", "Inactive"]}
          formRegister={formRegister("status", {
            required: ERROR_MESSAGE.REQUIRED,
          })}
          errorMessage={errors?.status?.message?.toString()}
        />
      </div>
    </div>
  );
};

export default UserInputForm;
