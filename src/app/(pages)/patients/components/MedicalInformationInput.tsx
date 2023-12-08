import CheckboxItem from "@/app/components/CheckboxItem";
import Dropdown from "@/app/components/Dropdown";
import {
  VisualAcuity,
  updatePatientRecordInput,
} from "@/redux/features/record-slice";
import { AppDispatch } from "@/redux/store";
import { REASON_FOR_VISIT } from "@/utils/constants";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const initialOdValue = {
  eyeType: "OD",
  sc: "",
  ph: "",
  cc: "",
  ncc: "",
  j: "",
};

const initialOsValue = {
  eyeType: "OS",
  sc: "",
  ph: "",
  cc: "",
  ncc: "",
  j: "",
};

const MedicalInformationInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [odObjectInput, setOdObjectInput] =
    useState<VisualAcuity>(initialOdValue);
  const [osObjectInput, setOsObjectInput] =
    useState<VisualAcuity>(initialOsValue);

  useEffect(() => {
    dispatch(
      updatePatientRecordInput({
        visualAcuities: [odObjectInput, osObjectInput],
      })
    );
  }, [odObjectInput, osObjectInput]);

  return (
    <>
      <div className=" flex justify-between mb-5">
        <CheckboxItem
          name="visitType"
          isRow
          items={["OR", "CONS"]}
          isSingleSelection
          onSelectedItemsChanged={(selectedItems) => {
            dispatch(
              updatePatientRecordInput({
                visitType: selectedItems[0],
              })
            );
          }}
        />
      </div>
      <p className="mb-3 font-bold text-xl">Reason for your Visit/Complaints</p>
      <div className="flex gap-10">
        <CheckboxItem
          name="reason"
          items={REASON_FOR_VISIT}
          itemPerColumn={6}
          onSelectedItemsChanged={(selectedItems) => {
            dispatch(
              updatePatientRecordInput({
                reasonForVisit: selectedItems,
              })
            );
          }}
        />
      </div>
      <div className="mt-4">
        <p className="text-xs italic">Notes</p>
        <textarea className="rounded w-full h-28" />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Previous Meds</p>
      <textarea
        className="rounded-md w-full h-28"
        onChange={(e) => {
          dispatch(
            updatePatientRecordInput({
              previousMedicines: e.target.value,
            })
          );
        }}
      />
      <p className="mb-3 mt-8 font-bold text-xl">Auto Refraction</p>
      <div className="flex items-end gap-3">
        <p>OD:</p>
        <input
          type="text"
          className="border-t-0 border-l-0 border-r-0"
          onChange={(e) => {
            dispatch(
              updatePatientRecordInput({
                autoRefractionOD: e.target.value,
              })
            );
          }}
        />
      </div>
      <div className="flex items-end gap-3">
        <p>OS:</p>
        <input
          type="text"
          className="border-t-0 border-l-0 border-r-0"
          onChange={(e) => {
            dispatch(
              updatePatientRecordInput({
                autoRefractionOs: e.target.value,
              })
            );
          }}
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
              <input
                type="text"
                className="rounded-md w-20"
                onChange={(e) =>
                  setOdObjectInput((prev) => ({ ...prev, sc: e.target.value }))
                }
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input
                type="text"
                className="rounded-md w-20"
                onChange={(e) =>
                  setOdObjectInput((prev) => ({ ...prev, ph: e.target.value }))
                }
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input
                type="text"
                className="rounded-md w-20"
                onChange={(e) =>
                  setOdObjectInput((prev) => ({ ...prev, cc: e.target.value }))
                }
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input
                type="text"
                className="rounded-md w-20"
                onChange={(e) =>
                  setOdObjectInput((prev) => ({ ...prev, ncc: e.target.value }))
                }
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input
                type="text"
                className="rounded-md w-20"
                onChange={(e) =>
                  setOdObjectInput((prev) => ({ ...prev, j: e.target.value }))
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              OS
            </Table.Cell>
            <Table.Cell className="p-0">
              <input
                type="text"
                className="rounded-md w-20"
                onChange={(e) =>
                  setOsObjectInput((prev) => ({ ...prev, sc: e.target.value }))
                }
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input
                type="text"
                className="rounded-md w-20"
                onChange={(e) =>
                  setOsObjectInput((prev) => ({ ...prev, ph: e.target.value }))
                }
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input
                type="text"
                className="rounded-md w-20"
                onChange={(e) =>
                  setOsObjectInput((prev) => ({ ...prev, cc: e.target.value }))
                }
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input
                type="text"
                className="rounded-md w-20"
                onChange={(e) =>
                  setOsObjectInput((prev) => ({ ...prev, ncc: e.target.value }))
                }
              />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input
                type="text"
                className="rounded-md w-20"
                onChange={(e) =>
                  setOsObjectInput((prev) => ({ ...prev, j: e.target.value }))
                }
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <p className="mb-3 mt-8 font-bold text-xl">Refraction</p>
      <div className="flex mb-5">
        <div className="flex items-end gap-3">
          <p>OD:</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
            onChange={(e) => {
              dispatch(
                updatePatientRecordInput({
                  refractionOd: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>D(-)</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
            onChange={(e) => {
              dispatch(
                updatePatientRecordInput({
                  refractionOdNegative: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>Dx</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
            onChange={(e) => {
              dispatch(
                updatePatientRecordInput({
                  refractionOdX: e.target.value,
                })
              );
            }}
          />
        </div>
      </div>
      <div className="flex mb-5">
        <div className="flex items-end gap-3">
          <p>OS:</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
            onChange={(e) => {
              dispatch(
                updatePatientRecordInput({
                  refractionOs: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>D(-)</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
            onChange={(e) => {
              dispatch(
                updatePatientRecordInput({
                  refractionOsNegative: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>Dx</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
            onChange={(e) => {
              dispatch(
                updatePatientRecordInput({
                  refractionOsX: e.target.value,
                })
              );
            }}
          />
        </div>
      </div>
      <div className="flex mb-5">
        <div className="flex items-end gap-3">
          <p>Add:(J.)</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
            onChange={(e) => {
              dispatch(
                updatePatientRecordInput({
                  refractionAdd: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>PD</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
            onChange={(e) => {
              dispatch(
                updatePatientRecordInput({
                  refractionPd: e.target.value,
                })
              );
            }}
          />
          <span>mm</span>
        </div>
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Intra Ocular Pressure</p>
      <div className="flex gap-3 mb-5">
        <div className="flex items-end gap-3">
          <p>Time:</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-24"
            onChange={(e) => {
              dispatch(
                updatePatientRecordInput({
                  appointmentTime: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>OD:</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
            onChange={(e) => {
              dispatch(
                updatePatientRecordInput({
                  intraOcularPressureOD: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="flex items-end gap-3">
          <p>OS:</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
            onChange={(e) => {
              dispatch(
                updatePatientRecordInput({
                  intraOcularPressureOS: e.target.value,
                })
              );
            }}
          />
        </div>
      </div>
      <div className="flex items-end gap-3">
        <Dropdown
          width="w-72"
          label="MD"
          options={["Lorem Ipsum", "John Doe", "Jane Doe"]}
          onChange={(e) => {
            dispatch(
              updatePatientRecordInput({
                medicalDoctor: e.target.value,
              })
            );
          }}
        />
      </div>
    </>
  );
};

export default MedicalInformationInput;
