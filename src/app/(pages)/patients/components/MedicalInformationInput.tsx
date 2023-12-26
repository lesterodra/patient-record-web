import Dropdown from "@/app/components/Dropdown";
import FormCheckboxItem from "@/app/components/FormCheckboxItem";
import FormDropdown from "@/app/components/FormDropdown";
import FormDropdownWithId from "@/app/components/FormDropdownWithId";
import FormInput from "@/app/components/FormInput";
import FormNotes from "@/app/components/FormNotes";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ERROR_MESSAGE, REASON_FOR_VISIT } from "@/utils/constants";
import { getDoctorList } from "@/utils/dataFetchers";
import { Table } from "flowbite-react";
import { useEffect } from "react";
import { FormState, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useDispatch } from "react-redux";

type MedicalInformationInputProps = {
  formRegister: UseFormRegister<any>;
  formState: FormState<any>;
  formSetValue: UseFormSetValue<any>;
};

const MedicalInformationInput = (props: MedicalInformationInputProps) => {
  const { formRegister, formState, formSetValue } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { doctorList } = useAppSelector((state) => state.userReducer.value);

  const { errors } = formState ?? {};
  const visitTypeErrorMessage = errors?.visitType?.message?.toString();
  const reasonForVisitErrorMessage =
    errors?.reasonForVisit?.message?.toString();

  useEffect(() => {
    getDoctorList(dispatch);
  }, []);

  return (
    <>
      <div className=" flex justify-between mb-5">
        <div>
          <FormCheckboxItem
            name="visitType"
            isRow
            items={["OR", "CONS"]}
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
      <p className="mb-3 mt-8 font-bold text-xl">Previous Meds</p>
      <FormNotes
        withLabel={false}
        formRegister={formRegister("previousMedicines")}
      />
      <p className="mb-3 mt-8 font-bold text-xl">Auto Refraction</p>
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
    </>
  );
};

export default MedicalInformationInput;
