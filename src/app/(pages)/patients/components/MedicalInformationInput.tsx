import FormCheckboxItem from "@/app/components/FormCheckboxItem";
import FormDropdownWithId from "@/app/components/FormDropdownWithId";
import FormInput from "@/app/components/FormInput";
import FormNotes from "@/app/components/FormNotes";
import { useAppSelector } from "@/redux/store";
import {
  ERROR_MESSAGE,
  PAYMENT_TYPE,
  PREVIOUS_SURGERIES,
  REASON_FOR_VISIT,
  VISIT_TYPE,
} from "@/utils/constants";
import { Table } from "flowbite-react";
import { FormState, UseFormRegister, UseFormSetValue } from "react-hook-form";

type MedicalInformationInputProps = {
  formRegister: UseFormRegister<any>;
  formState: FormState<any>;
  formSetValue: UseFormSetValue<any>;
};

const MedicalInformationInput = (props: MedicalInformationInputProps) => {
  const { formRegister, formState, formSetValue } = props;
  const { doctorList, userList } = useAppSelector(
    (state) => state.userReducer.value
  );
  const users = userList?.data ?? [];

  const { errors } = formState ?? {};
  const visitTypeErrorMessage = errors?.visitType?.message?.toString();
  const reasonForVisitErrorMessage =
    errors?.reasonForVisit?.message?.toString();
  const dilateTypeMessage = errors?.dilateType?.message?.toString();

  return (
    <>
      <div className=" flex justify-between mb-5">
        <div>
          <FormCheckboxItem
            name="visitType"
            isRow
            items={VISIT_TYPE}
            formRegister={formRegister("visitType", {
              required: ERROR_MESSAGE.REQUIRED,
              onChange: (e) => {
                formSetValue(
                  "visitType",
                  e.target.checked ? e.target.value : null,
                  {
                    shouldValidate: true,
                  }
                );
              },
            })}
          />
          {visitTypeErrorMessage && (
            <p className="text-xs text-red-500">{visitTypeErrorMessage}</p>
          )}
        </div>
        <div>
          <FormCheckboxItem
            name="dilateType"
            isRow
            items={["OD", "OS", "OU"]}
            formRegister={formRegister("dilateType", {
              required: ERROR_MESSAGE.REQUIRED,
              onChange: (e) => {
                formSetValue(
                  "dilateType",
                  e.target.checked ? e.target.value : null,
                  {
                    shouldValidate: true,
                  }
                );
              },
            })}
          />
          {dilateTypeMessage && (
            <p className="text-xs text-red-500">{dilateTypeMessage}</p>
          )}
        </div>
      </div>
      <div className="mb-5">
        <div className="flex">
          <FormCheckboxItem
            name="isDilate"
            isRow
            items={["Dilate"]}
            formRegister={formRegister("isDilate", {
              onChange: (e) => {
                formSetValue("isDilate", Boolean(e.target.checked));
              },
            })}
          />
          <FormInput
            label=""
            inputClassName="w-28"
            placeholder="Dilate Time"
            formRegister={formRegister("dilateTime")}
          />
        </div>
      </div>
      <div className="mb-5">
        <div className="flex">
          <FormCheckboxItem
            name="isConstric"
            isRow
            items={["Constric"]}
            formRegister={formRegister("isConstric", {
              onChange: (e) => {
                formSetValue("isConstric", Boolean(e.target.checked));
              },
            })}
          />
        </div>
      </div>
      <p className="mb-3 font-bold text-xl">Reason for your Visit/Complaints</p>
      {reasonForVisitErrorMessage && (
        <p className="text-xs text-red-500">{reasonForVisitErrorMessage}</p>
      )}
      <div className="flex gap-10">
        <FormCheckboxItem
          name="reasonForVisit"
          itemPerColumn={6}
          items={REASON_FOR_VISIT}
          formRegister={formRegister("reasonForVisit", {
            required: ERROR_MESSAGE.REQUIRED,
          })}
        />
      </div>
      <FormNotes formRegister={formRegister("reasonForVisitNotes")} />
      <div className="mb-5 mt-8 gap-3 flex">
        <p className="font-bold text-xl">Surgeries</p>

        <FormCheckboxItem
          name="surgeryDilateType"
          isRow
          items={["OD", "OS", "OU"]}
          formRegister={formRegister("surgeryDilateType", {
            onChange: (e) => {
              formSetValue(
                "surgeryDilateType",
                e.target.checked ? e.target.value : null
              );
            },
          })}
        />
      </div>
      <div className="flex gap-10">
        <FormCheckboxItem
          name="surgeries"
          items={PREVIOUS_SURGERIES}
          itemPerColumn={5}
          formRegister={formRegister("surgeries", {})}
        />
      </div>
      <FormNotes formRegister={formRegister("surgeryNotes", {})} />
      <p className="mb-3 mt-8 font-bold text-xl">Previous Meds</p>
      <FormNotes
        withLabel={false}
        formRegister={formRegister("previousMedicines")}
      />
      <p className="mb-3 mt-8 font-bold text-xl">Auto Refraction</p>
      <FormDropdownWithId
        className="flex gap-3 items-baseline mb-2"
        label="By:"
        options={users.map((user) => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.id,
        }))}
        formRegister={formRegister("autoRefractionByUserId")}
      />
      <div className="flex items-end gap-3">
        <p>OD:</p>
        <FormInput
          label=""
          inputClassName="w-40 border-t-0 border-l-0 border-r-0 rounded-none"
          formRegister={formRegister("autoRefractionOD")}
        />
      </div>
      <div className="flex items-end gap-3">
        <p>OS:</p>
        <FormInput
          label=""
          inputClassName="w-40 border-t-0 border-l-0 border-r-0 rounded-none"
          formRegister={formRegister("autoRefractionOs")}
        />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Visual Acuity</p>
      <FormDropdownWithId
        className="flex gap-3 items-baseline mb-2"
        label="By:"
        options={users.map((user) => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.id,
        }))}
        formRegister={formRegister("visualAcuityByUserId")}
      />
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>EYE</Table.HeadCell>
          <Table.HeadCell>SC</Table.HeadCell>
          <Table.HeadCell>PH</Table.HeadCell>
          <Table.HeadCell>CC</Table.HeadCell>
          <Table.HeadCell>NCC</Table.HeadCell>
          <Table.HeadCell>J.</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              OD
            </Table.Cell>
            <Table.Cell className="p-0">
              <FormInput
                label=""
                inputClassName="w-20"
                formRegister={formRegister("visualAcuityOdSc")}
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <FormInput
                label=""
                inputClassName="w-20"
                formRegister={formRegister("visualAcuityOdPh")}
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <FormInput
                label=""
                inputClassName="w-20"
                formRegister={formRegister("visualAcuityOdCc")}
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <FormInput
                label=""
                inputClassName="w-20"
                formRegister={formRegister("visualAcuityOdNcc")}
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <FormInput
                label=""
                inputClassName="w-20"
                formRegister={formRegister("visualAcuityOdj")}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              OS
            </Table.Cell>
            <Table.Cell className="p-0">
              <FormInput
                label=""
                inputClassName="w-20"
                formRegister={formRegister("visualAcuityOsSc")}
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <FormInput
                label=""
                inputClassName="w-20"
                formRegister={formRegister("visualAcuityOsPh")}
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <FormInput
                label=""
                inputClassName="w-20"
                formRegister={formRegister("visualAcuityOsCc")}
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <FormInput
                label=""
                inputClassName="w-20"
                formRegister={formRegister("visualAcuityOsNcc")}
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <FormInput
                label=""
                inputClassName="w-20"
                formRegister={formRegister("visualAcuityOsJ")}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <p className="mb-3 mt-8 font-bold text-xl">Refraction</p>
      <FormDropdownWithId
        className="flex gap-3 items-baseline mb-2"
        label="By:"
        options={users.map((user) => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.id,
        }))}
        formRegister={formRegister("refractionByUserId")}
      />
      <div className="flex mb-5">
        <div className="flex items-end gap-3">
          <p>OD:</p>
          <FormInput
            label=""
            inputClassName="w-16 border-t-0 border-l-0 border-r-0 rounded-none"
            formRegister={formRegister("refractionOd")}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>D(-)</p>
          <FormInput
            label=""
            inputClassName="w-16 border-t-0 border-l-0 border-r-0 rounded-none"
            formRegister={formRegister("refractionOdNegative")}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>Dx</p>
          <FormInput
            label=""
            inputClassName="w-16 border-t-0 border-l-0 border-r-0 rounded-none"
            formRegister={formRegister("refractionOdX")}
          />
        </div>
      </div>
      <div className="flex mb-5">
        <div className="flex items-end gap-3">
          <p>OS:</p>
          <FormInput
            label=""
            inputClassName="w-16 border-t-0 border-l-0 border-r-0 rounded-none"
            formRegister={formRegister("refractionOs")}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>D(-)</p>
          <FormInput
            label=""
            inputClassName="w-16 border-t-0 border-l-0 border-r-0 rounded-none"
            formRegister={formRegister("refractionOsNegative")}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>Dx</p>
          <FormInput
            label=""
            inputClassName="w-16 border-t-0 border-l-0 border-r-0 rounded-none"
            formRegister={formRegister("refractionOsX")}
          />
        </div>
      </div>
      <div className="flex mb-5">
        <div className="flex items-end gap-3">
          <p>Add:(J.)</p>
          <FormInput
            label=""
            inputClassName="w-16 border-t-0 border-l-0 border-r-0 rounded-none"
            formRegister={formRegister("refractionAdd")}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>PD</p>
          <FormInput
            label=""
            inputClassName="w-16 border-t-0 border-l-0 border-r-0 rounded-none"
            formRegister={formRegister("refractionPd")}
          />
          <span>mm</span>
        </div>
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Intra Ocular Pressure</p>
      <FormDropdownWithId
        className="flex gap-3 items-baseline mb-2"
        label="By:"
        options={users.map((user) => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.id,
        }))}
        formRegister={formRegister("intraOcularPressureByUserId")}
      />
      <div className="flex gap-3 mb-5">
        <div className="flex items-end gap-3">
          <p>Time:</p>
          <FormInput
            label=""
            inputClassName="w-24 border-t-0 border-l-0 border-r-0 rounded-none"
            formRegister={formRegister("appointmentTime")}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>OD:</p>
          <FormInput
            label=""
            inputClassName="w-16 border-t-0 border-l-0 border-r-0 rounded-none"
            formRegister={formRegister("intraOcularPressureOD")}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>OS:</p>
          <FormInput
            label=""
            inputClassName="w-16 border-t-0 border-l-0 border-r-0 rounded-none"
            formRegister={formRegister("intraOcularPressureOS")}
          />
        </div>
      </div>
      <div className="flex items-end gap-3">
        <FormDropdownWithId
          label="MD"
          width="w-72"
          options={
            doctorList
              ? doctorList.map((user) => ({
                  label: `${user.lastName}, ${user.firstName}`,
                  value: user.id,
                }))
              : []
          }
          formRegister={formRegister("medicalDoctorUserId", {
            required: ERROR_MESSAGE.REQUIRED,
          })}
          errorMessage={errors?.medicalDoctorUserId?.message?.toString()}
        />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Payment Details</p>
      <div>
        <FormCheckboxItem
          name="paymentType"
          isRow
          items={PAYMENT_TYPE}
          formRegister={formRegister("paymentType", {
            onChange: (e) => {
              formSetValue(
                "paymentType",
                e.target.checked ? e.target.value : null
              );
            },
          })}
        />
        <FormNotes formRegister={formRegister("paymentNotes")} />
      </div>
    </>
  );
};

export default MedicalInformationInput;
